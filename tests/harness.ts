import { createMockValleyApi as createBaseMock } from '@valley/plugin-testkit'
import { calendarServices } from '../src/serviceClient'
import { vi } from 'vitest'
import type { CalendarItemSourceRequest, CalendarSourceItem } from '@valley/plugin-sdk'
export * from '@valley/plugin-testkit'

export function createMockValleyApi(options: Parameters<typeof createBaseMock>[0] = {}) {
  const mock = createBaseMock({ ...options, manifest: { ...options.manifest, indexState: 'scoped' } })
  Object.assign(calendarServices(mock.api), {
    listAccounts: vi.fn(async () => ({ ok: true, data: { accounts: [] } })),
    listCalendarConnections: vi.fn(async () => ({ ok: true, data: { accounts: [], providers: [] } })),
    listCalendars: vi.fn(async () => ({ ok: true, data: { calendars: [] } })),
    fetchCalendar: vi.fn(async () => ({ ok: true, data: { events: [] } }))
  })
  return mock
}

export function pagedSource(read: () => Promise<CalendarSourceItem[]>) {
  return async ({ startDate, endDate, limit, cursor }: CalendarItemSourceRequest) => {
    const all = (await read()).filter(item => item.date <= endDate && (item.endDate ?? item.date) >= startDate)
    const offset = Number(cursor ?? 0)
    return { items: all.slice(offset, offset + limit), revision: 'fixture', ...(offset + limit < all.length ? { cursor: String(offset + limit) } : {}) }
  }
}
