import { uiText, initBackendLocalization } from '../localization'
import type { PluginBackendApi } from '@valley/plugin-sdk'
import type { EventRecord } from '@valley/plugin-sdk/types'
import type { CalendarAccount } from '../serviceClient'
import type { CalendarRequest } from './transport'
import * as google from './google'
import * as microsoft from './microsoft'

const providers = { google, microsoft }
const object = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(uiText('backend.request'))
  return value as Record<string, unknown>
}
const text = (value: unknown): string => {
  if (typeof value !== 'string' || !value.trim() || value.length > 4096) throw new Error(uiText('backend.text'))
  return value
}

export function register(api: PluginBackendApi): () => void {
  initBackendLocalization(api)
  const handlers: Array<() => void> = []
  const cursors = new Map<string, { events: EventRecord[]; index: number; timer: ReturnType<typeof setTimeout> }>()
  const page = (cursor: string) => {
    const pending = cursors.get(cursor)
    if (!pending) throw new Error(uiText('backend.expired'))
    const events: EventRecord[] = []
    let bytes = 0
    while (pending.index < pending.events.length) {
      const event = pending.events[pending.index]
      const length = new TextEncoder().encode(JSON.stringify(event)).length
      if (length > 2 * 1024 * 1024) throw new Error(uiText('backend.large'))
      if (bytes + length > 2 * 1024 * 1024) break
      bytes += length
      events.push(event)
      pending.index++
    }
    if (pending.index === pending.events.length) { clearTimeout(pending.timer); cursors.delete(cursor); return { events } }
    return { events, next: cursor }
  }
  const accounts = async (): Promise<CalendarAccount[]> => (await api.accounts.list()).filter((account) => Object.hasOwn(providers, account.provider)).map((account) => ({ id: account.id, provider: account.provider, address: account.address ?? '', displayName: account.displayName, oauthSetupId: account.oauthSetupId, capabilities: account.capabilities, secretState: account.credentialState }))
  const connection = async (id: unknown) => {
    const account = (await accounts()).find((entry) => entry.id === text(id))
    if (!account) throw new Error(uiText('backend.account'))
    if (!account.capabilities.includes('calendar')) throw new Error(uiText('backend.permission'))
    const host = account.provider === 'google' ? 'www.googleapis.com' : 'graph.microsoft.com'
    const credential = await api.accounts.authorize(account.id, 'calendar', { host, port: 443, security: 'tls' })
    const request: CalendarRequest = async (url, headers) => {
      if (url.protocol !== 'https:' || url.hostname !== host) throw new Error(uiText('backend.endpoint'))
      const response = await api.network.fetch({ url: url.toString(), headers, credential: { handle: credential, placement: 'header', name: 'Authorization', prefix: 'Bearer ' } })
      return { ok: response.status >= 200 && response.status < 300, status: response.status, json: async () => JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(response.bodyBase64), (character) => character.charCodeAt(0)))) }
    }
    return { account, request, provider: providers[account.provider as keyof typeof providers] }
  }
  const handle = (method: string, run: (payload: Record<string, unknown>) => unknown | Promise<unknown>) => handlers.push(api.rpc.handle(method, async (payload) => {
    try { return { ok: true, data: await run(object(payload ?? {})) } } catch (error) { return { ok: false, error: error instanceof Error ? error.message : String(error) } }
  }))
  handle('listAccounts', async () => ({ accounts: await accounts() }))
  handle('listCalendarConnections', async () => ({ accounts: await accounts(), providers: (await api.accounts.providers()).filter((provider) => !provider.hidden && provider.capabilities.includes('calendar')) }))
  handle('listCalendars', async ({ accountId }) => { const { request, provider } = await connection(accountId); return { calendars: await provider.listCalendars(request) } })
  handle('fetchCalendar', async ({ accountId, timeMin, timeMax, calendarId }) => {
    const start = text(timeMin)
    const end = text(timeMax)
    if (!Number.isFinite(Date.parse(start)) || !Number.isFinite(Date.parse(end)) || Date.parse(start) >= Date.parse(end)) throw new Error(uiText('backend.window'))
    const { account, request, provider } = await connection(accountId)
    const events = await provider.fetchCalendar(request, account.id, start, end, calendarId === undefined ? undefined : text(calendarId))
    if (cursors.size >= 4) throw new Error(uiText('backend.pending'))
    const cursor = crypto.randomUUID()
    const timer = setTimeout(() => cursors.delete(cursor), 60000)
    cursors.set(cursor, { events, index: 0, timer })
    return page(cursor)
  })
  handle('nextEvents', ({ cursor }) => page(text(cursor)))
  handlers.push(api.accounts.subscribe(() => api.rpc.emit('connectionsChanged', undefined)))
  return () => { for (const dispose of handlers.reverse()) dispose(); for (const cursor of cursors.values()) clearTimeout(cursor.timer); cursors.clear() }
}
