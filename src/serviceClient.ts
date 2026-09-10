import type { ValleyPluginApi } from '@valley/plugin-sdk'
import type { EventRecord, RemoteCalendar } from '@valley/plugin-sdk/types'

export interface CalendarAccount {
  id: string
  provider: string
  address: string
  displayName?: string
  oauthSetupId?: string
  capabilities: string[]
  secretState?: 'absent' | 'ok' | 'unreadable'
}
export interface CalendarProvider {
  id: string
  providerId?: string
  name: string
  label?: string
  email?: string
  configured: boolean
  hidden?: boolean
  capabilities: string[]
}
type Result<T> = { ok: boolean; data?: T; error?: string }
const clients = new WeakMap<ValleyPluginApi, ReturnType<typeof createClient>>()
function createClient(api: ValleyPluginApi) {
  return {
    listAccounts: () => api.backend.call<Result<{ accounts: CalendarAccount[] }>>('listAccounts'),
    listCalendarConnections: () => api.backend.call<Result<{ accounts: CalendarAccount[]; providers: CalendarProvider[] }>>('listCalendarConnections'),
    listCalendars: (accountId: string) => api.backend.call<Result<{ calendars: RemoteCalendar[] }>>('listCalendars', { accountId }),
    fetchCalendar: async (accountId: string, timeMin: string, timeMax: string, calendarId?: string): Promise<Result<{ events: EventRecord[] }>> => {
      let page = await api.backend.call<Result<{ events: EventRecord[]; next?: string }>>('fetchCalendar', { accountId, timeMin, timeMax, calendarId })
      const events: EventRecord[] = []
      for (;;) {
        if (!page.ok || !page.data) return page
        events.push(...page.data.events)
        if (!page.data.next) return { ok: true, data: { events } }
        page = await api.backend.call<Result<{ events: EventRecord[]; next?: string }>>('nextEvents', { cursor: page.data.next })
      }
    }
  }
}
export function calendarServices(api: ValleyPluginApi) {
  let client = clients.get(api)
  if (!client) { client = createClient(api); clients.set(api, client) }
  return client
}
