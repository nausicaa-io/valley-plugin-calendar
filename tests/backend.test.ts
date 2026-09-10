import de from '../locales/de.json'
import { describe, expect, it, vi } from 'vitest'
import type { PluginBackendApi } from '@valley/plugin-sdk'
import type { PluginAccountConnection } from '@valley/plugin-sdk/pluginNetwork'
import { register } from '../src/backend'

function setup(accounts: PluginAccountConnection[]) {
  const i18n = { t: (key: string) => key }
  const handlers = new Map<string, (payload: unknown) => unknown>()
  const authorize = vi.fn(async () => 'opaque')
  const fetch = vi.fn(async () => ({ status: 200, headers: {}, bodyBase64: Buffer.from(JSON.stringify({ items: [{ id: 'primary', summary: 'Work', primary: true }] })).toString('base64') }))
  const providers = vi.fn(async () => [{ id: 'google', name: 'Google', capabilities: ['mail', 'calendar'], configured: true }])
  const dispose = register({ i18n, accounts: { list: async () => accounts, providers, authorize, subscribe: () => () => {} }, network: { fetch }, rpc: { handle: (method: string, handler: (payload: unknown) => unknown) => { handlers.set(method, handler); return () => {} }, emit: () => {} } } as unknown as PluginBackendApi)
  return { i18n, call: async (method: string, payload: unknown = {}) => handlers.get(method)!(payload), authorize, fetch, dispose }
}

describe('Calendar package backend', () => {
  it('keeps configured providers and accounts visible while requiring calendar consent for remote reads', async () => {
    const mock = setup([{ id: 'mail-only', provider: 'google', address: 'fixture@example.test', capabilities: [], credentialState: 'ok' }])
    expect(await mock.call('listCalendarConnections')).toMatchObject({ ok: true, data: { accounts: [{ id: 'mail-only' }], providers: [{ id: 'google', configured: true }] } })
    expect(await mock.call('listCalendars', { accountId: 'mail-only' })).toMatchObject({ ok: false, error: expect.stringContaining('Calendar permission is missing') })
    expect(mock.authorize).not.toHaveBeenCalled()
    expect(mock.fetch).not.toHaveBeenCalled()
    mock.dispose()
  })

  it('retrieves provider calendars using opaque account authorization and the generic HTTPS broker', async () => {
    const mock = setup([{ id: 'field', provider: 'google', capabilities: ['calendar'], credentialState: 'ok' }])
    expect(await mock.call('listCalendars', { accountId: 'field' })).toMatchObject({ ok: true, data: { calendars: [{ id: 'primary', name: 'Work', primary: true }] } })
    expect(mock.authorize).toHaveBeenCalledWith('field', 'calendar', { host: 'www.googleapis.com', port: 443, security: 'tls' })
    expect(mock.fetch).toHaveBeenCalledWith(expect.objectContaining({ url: expect.stringContaining('https://www.googleapis.com/calendar/v3/users/me/calendarList'), credential: { handle: 'opaque', placement: 'header', name: 'Authorization', prefix: 'Bearer ' } }))
    mock.dispose()
  })

  it('rejects invalid time windows before touching credentials', async () => {
    const mock = setup([{ id: 'field', provider: 'google', capabilities: ['calendar'] }])
    expect(await mock.call('fetchCalendar', { accountId: 'field', timeMin: 'invalid', timeMax: '2026-09-01' })).toMatchObject({ ok: false })
    expect(mock.authorize).not.toHaveBeenCalled()
    mock.dispose()
  })
  it('pages large event results below the IPC payload limit without losing events', async () => {
    const mock = setup([{ id: 'field', provider: 'google', capabilities: ['calendar'] }])
    const note = 'x'.repeat(1100000)
    mock.fetch.mockResolvedValue({ status: 200, headers: {}, bodyBase64: Buffer.from(JSON.stringify({ items: [{ id: 'one', summary: 'First', description: note, start: { date: '2026-09-01' } }, { id: 'two', summary: 'Second', description: note, start: { date: '2026-09-02' } }] })).toString('base64') })
    const first = await mock.call('fetchCalendar', { accountId: 'field', timeMin: '2026-09-01', timeMax: '2026-10-01' }) as { ok: boolean; data: { events: Array<{ title: string; note: string }>; next: string } }
    expect(first).toMatchObject({ ok: true, data: { events: [{ title: 'First' }], next: expect.any(String) } })
    expect(Buffer.byteLength(JSON.stringify(first))).toBeLessThan(2 * 1024 * 1024)
    const second = await mock.call('nextEvents', { cursor: first.data.next })
    expect(second).toMatchObject({ ok: true, data: { events: [{ title: 'Second', note }] } })
    expect(await mock.call('nextEvents', { cursor: first.data.next })).toMatchObject({ ok: false, error: expect.stringContaining('expired') })
    mock.dispose()
  })

})

  it('uses the package locale for backend errors and follows language changes', async () => {
    const mock = setup([])
    mock.i18n.t = (key: string) => (de as Record<string, string>)[key] ?? key
    expect(await mock.call('fetchCalendar', { accountId: 'account', timeMin: 'invalid', timeMax: 'invalid' })).toMatchObject({ ok: false, error: de['backend.window'] })
    mock.i18n.t = (key: string) => key
    expect((await mock.call('fetchCalendar', { accountId: 'account', timeMin: 'invalid', timeMax: 'invalid' }) as { error: string }).error).not.toBe(de['backend.window'])
    mock.dispose()
  })
