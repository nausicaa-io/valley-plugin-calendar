import type { CalendarAccount } from './serviceClient'
import { calendarServices } from './serviceClient'
import { api } from './runtime'
import type { EventRecord, RemoteCalendar } from '@valley/plugin-sdk/types'
import type { DatasetBatchOperation, DatasetRecord } from '@valley/plugin-sdk'
import { calendarEnabled, readCalendarSettings } from './settingsStore'
import { uiText } from './localization'

/**
 * Read-only remote calendar layer. Connected Google/Microsoft accounts (set up
 * once in Settings → Accounts) are pulled through its own backend and merged
 * into the calendar views as non-editable events. The owner-scoped runtime lets
 * every Calendar surface share one pulled set for the duration of the load.
 */
const KEY = 'calendar.remote'
const REMOTE_EVENTS_DATASET = 'calendar.remote_events'
const PAGE_SIZE = 1000
const BATCH_SIZE = 500

export interface RemoteStore {
  getEvents(): EventRecord[]
  getStatus(): RemoteSyncStatus
  subscribe(cb: () => void): () => void
  /** Re-pull every enabled calendar account. */
  sync(): Promise<void>
}

export interface RemoteSyncStatus {
  syncing: boolean
  error: string | null
  calendars: Record<string, RemoteCalendar[]>
  accounts: Record<string, { error?: string; lastSyncAt?: string; eventCount: number }>
}

/** Pull window: previous month through ~13 months out (covers month/week/year grids). */
function syncWindow(): { timeMin: string; timeMax: string } {
  const now = new Date()
  const min = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const max = new Date(now.getFullYear(), now.getMonth() + 13, 1)
  return { timeMin: min.toISOString(), timeMax: max.toISOString() }
}

function calendarAccounts(accounts: CalendarAccount[]): CalendarAccount[] {
  const disabled = new Set(readCalendarSettings().disabledCalendarAccounts)
  return accounts.filter((a) => a.capabilities.includes('calendar') && !disabled.has(a.id))
}

function asCachedEvent(row: DatasetRecord): EventRecord | null {
  if (!row.event || typeof row.event !== 'object' || Array.isArray(row.event)) return null
  const event = row.event as unknown as EventRecord
  if (!event.id || !event.title || !event.date) return null
  return {
    ...event,
    id: String(row.id),
    accountId: String(row.accountId),
    readOnly: true
  }
}

async function cachedEvents(accountIds: string[]): Promise<EventRecord[]> {
  if (accountIds.length === 0) return []
  const dataset = api.data.dataset(REMOTE_EVENTS_DATASET)
  const rows: DatasetRecord[] = []
  let cursor: string | undefined
  do {
    const page = await dataset.query({
      where: { accountId: { in: accountIds } },
      orderBy: [{ field: 'accountId', direction: 'asc' }, { field: 'id', direction: 'asc' }],
      limit: PAGE_SIZE,
      cursor
    })
    rows.push(...page.rows)
    cursor = page.cursor
  } while (cursor)
  return rows.flatMap((row) => {
    const event = asCachedEvent(row)
    return event ? [event] : []
  })
}

function cacheRow(accountId: string, event: EventRecord): DatasetRecord {
  const normalized = {
    ...event,
    accountId,
    readOnly: true
  }
  return {
    accountId,
    id: normalized.id,
    date: normalized.date,
    endDate: normalized.endDate ?? null,
    event: JSON.parse(JSON.stringify(normalized)) as DatasetRecord
  }
}

async function replaceAccountCache(accountId: string, next: EventRecord[]): Promise<void> {
  const dataset = api.data.dataset(REMOTE_EVENTS_DATASET)
  const existing: DatasetRecord[] = []
  let cursor: string | undefined
  do {
    const page = await dataset.query({ where: { accountId }, limit: PAGE_SIZE, cursor })
    existing.push(...page.rows)
    cursor = page.cursor
  } while (cursor)
  const nextIds = new Set(next.map((event) => event.id))
  const operations: DatasetBatchOperation[] = [
    ...existing
      .filter((row) => !nextIds.has(String(row.id)))
      .map((row) => ({ operation: 'delete' as const, key: { accountId, id: String(row.id) } })),
    ...next.map((event) => ({ operation: 'upsert' as const, values: cacheRow(accountId, event) }))
  ]
  for (let offset = 0; offset < operations.length; offset += BATCH_SIZE) {
    await dataset.batch(operations.slice(offset, offset + BATCH_SIZE))
  }
}

function create(): RemoteStore {
  let events: EventRecord[] = []
  let status: RemoteSyncStatus = { syncing: false, error: null, calendars: {}, accounts: {} }
  let pending: Promise<void> | undefined
  let queued = false
  let stop: (() => void) | undefined
  let hydration = 0
  const listeners = new Set<() => void>()
  const emit = (): void => listeners.forEach((listener) => listener())

  const project = (rows: EventRecord[]): EventRecord[] => {
    const settings = readCalendarSettings()
    return rows.flatMap((event) => {
      const accountId = event.accountId ?? ''
      if (settings.disabledCalendarAccounts.includes(accountId)) return []
      const calendar = status.calendars[accountId]?.find((item) => item.id === event.calendarId || (!event.calendarId && item.primary))
      const setting = settings.remoteCalendars[accountId]?.[event.calendarId ?? calendar?.id ?? '']
      if (!(setting?.enabled ?? calendar?.primary ?? true)) return []
      const group = settings.groups.find((item) => item.id === setting?.groupId)
      return [{ ...event, groupId: group?.id, group: group?.name, color: group ? undefined : event.color }]
    })
  }

  const hydrate = async (): Promise<void> => {
    const mine = ++hydration
    try {
      const res = await calendarServices(api).listAccounts()
      if (!res.ok || !res.data) throw new Error(res.error || uiText('calendar.sync.accountsError'))
      const accounts = calendarAccounts(res.data.accounts)
      const cached = await cachedEvents(accounts.map((account) => account.id))
      if (mine !== hydration) return
      events = project(cached)
      emit()
    } catch (error) {
      if (mine !== hydration) return
      status = { ...status, error: error instanceof Error ? error.message : uiText('calendar.sync.failed') }
      emit()
    }
  }

  const pull = async (): Promise<void> => {
    ++hydration
    status = { ...status, syncing: true, error: null }
    emit()
    try {
      const res = await calendarServices(api).listAccounts()
      if (!res.ok || !res.data) throw new Error(res.error || uiText('calendar.sync.accountsError'))
      const targets = calendarAccounts(res.data.accounts)
      const previous = await cachedEvents(targets.map((account) => account.id))
      const { timeMin, timeMax } = syncWindow()
      const next: EventRecord[] = []
      const failures: string[] = []
      for (const account of targets) {
        const cached = previous.filter((event) => event.accountId === account.id)
        const accountEvents: EventRecord[] = []
        const errors: string[] = []
        try {
          const result = await calendarServices(api).listCalendars(account.id)
          if (!result.ok || !result.data) throw new Error(result.error || uiText('calendar.sync.calendarsError'))
          const calendars = result.data.calendars
          status = { ...status, calendars: { ...status.calendars, [account.id]: calendars } }
          emit()
          for (const calendar of calendars.filter((item) => calendarEnabled(account.id, item))) {
            try {
              const result = await calendarServices(api).fetchCalendar(account.id, timeMin, timeMax, calendar.id)
              if (!result.ok || !result.data) throw new Error(result.error || uiText('calendar.sync.failed'))
              accountEvents.push(...result.data.events.map((event) => ({
                ...event, calendarId: calendar.id, category: calendar.name,
                color: event.color || calendar.color, accountId: account.id, readOnly: true
              })))
            } catch (error) {
              accountEvents.push(...cached.filter((event) => event.calendarId === calendar.id || (!event.calendarId && calendar.primary)))
              errors.push(`${calendar.name}: ${error instanceof Error ? error.message : uiText('calendar.sync.failed')}`)
            }
          }
          await replaceAccountCache(account.id, accountEvents)
        } catch (error) {
          accountEvents.splice(0, accountEvents.length, ...cached)
          errors.push(error instanceof Error ? error.message : uiText('calendar.sync.failed'))
        }
        next.push(...accountEvents)
        const accountError = errors.length ? `${errors.join(' ')} ${uiText('calendar.sync.cached')}` : undefined
        if (accountError) failures.push(`${account.displayName || account.address}: ${accountError}`)
        status = { ...status, accounts: { ...status.accounts, [account.id]: {
          error: accountError,
          lastSyncAt: errors.length ? status.accounts[account.id]?.lastSyncAt : new Date().toISOString(),
          eventCount: project(accountEvents).length
        } } }
      }
      ++hydration
      events = project(next)
      status = { ...status, error: failures.length ? failures.join(' ') : null }
    } catch (error) {
      status = { ...status, error: error instanceof Error ? error.message : uiText('calendar.sync.failed') }
    } finally {
      status = { ...status, syncing: false }
      emit()
    }
  }

  const sync = (): Promise<void> => {
    if (pending) {
      queued = true
      return pending
    }
    pending = (async () => {
      do {
        queued = false
        await pull()
      } while (queued)
    })().finally(() => { pending = undefined })
    return pending
  }

  return {
    getEvents: () => events,
    getStatus: () => status,
    subscribe: (cb) => {
      listeners.add(cb)
      if (!stop) {
        const offCache = api.data.dataset(REMOTE_EVENTS_DATASET).subscribe(() => { if (!status.syncing) void hydrate() })
        let selection = JSON.stringify([readCalendarSettings().disabledCalendarAccounts, readCalendarSettings().remoteCalendars])
        const offSettings = api.settings.subscribe(() => {
          const next = JSON.stringify([readCalendarSettings().disabledCalendarAccounts, readCalendarSettings().remoteCalendars])
          if (next === selection) return
          selection = next
          events = project(events)
          emit()
          void sync()
        })
        stop = () => { offCache(); offSettings() }
        void hydrate().then(() => { if (listeners.size) void sync() })
      }
      return () => {
        listeners.delete(cb)
        if (listeners.size === 0) {
          stop?.()
          stop = undefined
        }
      }
    },
    sync
  }
}

export function getRemoteStore(): RemoteStore {
  return api.runtime.getOrCreate(KEY, create)
}
