import { React } from './runtime'
import type { EventRecord } from '@valley/plugin-sdk/types'
import { loadEvents, onChanged as onEventsChanged } from './events'
import { useSourcedItems, type SourcedItem, type CalendarSourceError } from './itemSources'
import { getRemoteStore } from './remoteSync'
import { createReloadQueue } from './reloadQueue'

// ── data hook: contributed items + events for the whole vault ────────────────
// Events are the Calendar's own: local ones from
// Calendar's durable database, read-only ones merged in from
// connected Google/Microsoft calendars. Everything else dated on the grid is
// contributed by another plugin through `calendar.itemSource` (see
// `itemSources.ts`) — the Calendar never reads another plugin's data file.

export function useCalendarData(startDate: string, endDate: string): {
  sourced: SourcedItem[]
  events: EventRecord[]
  sourceErrors: CalendarSourceError[]
  reload: () => void
} {
  const [localEvents, setLocalEvents] = React.useState<EventRecord[]>([])
  const { items: sourced, errors: sourceErrors, reload: reloadSourced } = useSourcedItems(startDate, endDate)
  const remoteStore = getRemoteStore()
  const remoteEvents = React.useSyncExternalStore(remoteStore.subscribe, remoteStore.getEvents)
  const localQueue = React.useRef<ReturnType<typeof createReloadQueue<EventRecord[]>> | null>(null)
  const reload = React.useCallback(() => {
    reloadSourced()
    void localQueue.current?.reload()
  }, [reloadSourced])
  React.useEffect(() => {
    const current = createReloadQueue(() => loadEvents(startDate, endDate), setLocalEvents, (error) => console.error('[calendar] events reload failed', error))
    localQueue.current = current
    void current.reload()
    const offEvents = onEventsChanged(() => { void current.reload() })
    return () => {
      current.dispose()
      if (localQueue.current === current) localQueue.current = null
      offEvents()
    }
  }, [endDate, reload, startDate])
  const events = React.useMemo(() => [...localEvents, ...remoteEvents], [localEvents, remoteEvents])
  return { sourced, events, sourceErrors, reload }
}
