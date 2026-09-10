import { createMockValleyApi as createBaseMock } from '@valley/plugin-testkit'
import { calendarServices } from '../src/serviceClient'
import { vi } from 'vitest'
export * from '@valley/plugin-testkit'

export function createMockValleyApi(options: Parameters<typeof createBaseMock>[0] = {}) {
  const mock = createBaseMock(options)
  Object.assign(calendarServices(mock.api), {
    listAccounts: vi.fn(async () => ({ ok: true, data: { accounts: [] } })),
    listCalendarConnections: vi.fn(async () => ({ ok: true, data: { accounts: [], providers: [] } })),
    listCalendars: vi.fn(async () => ({ ok: true, data: { calendars: [] } })),
    fetchCalendar: vi.fn(async () => ({ ok: true, data: { events: [] } }))
  })
  return mock
}
