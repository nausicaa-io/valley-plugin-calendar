import type { CalendarRevealTarget, ValleyPluginApi } from '@valley/plugin-sdk'
import { normalizeTimeRange } from '@valley/plugin-sdk/timeControl'

/**
 * Module-global handles to the host's React instance and plugin API, set once in
 * `register(api)` before any view renders — same pattern as the Music and Todo
 * plugins. Components import these instead of bundling their own `react`. JSX
 * compiles to `React.createElement` (classic transform), resolving to this binding.
 */
export let React!: typeof import('react')
export let api!: ValleyPluginApi

export function initRuntime(a: ValleyPluginApi): void {
  api = a
  React = a.React
}

interface RevealTargetStore {
  value: CalendarRevealTarget | null
  listeners: Set<() => void>
  get(): CalendarRevealTarget | null
  publish(value: CalendarRevealTarget | null): void
  subscribe(listener: () => void): () => void
}

export function revealTargetStore(): RevealTargetStore {
  return api.runtime.getOrCreate('calendar.revealTarget', () => {
    const store: RevealTargetStore = {
      value: null,
      listeners: new Set(),
      get: () => store.value,
      publish: (value) => {
        store.value = value
        for (const listener of [...store.listeners]) listener()
      },
      subscribe: (listener) => {
        store.listeners.add(listener)
        return () => store.listeners.delete(listener)
      }
    }
    return store
  })
}

/**
 * Reveal one dated item: move the shared time selection to it and publish a
 * pulse addressed only to the destination surface. The caller then opens that
 * destination. Keeping the surface on the target prevents the clicked origin
 * from pulsing or scrolling itself.
 *
 * The nonce lives beside the store, in host runtime state, so the pulse survives
 * a module re-import and clears with the session rather than with a component.
 */
interface RevealPulse {
  nonce: number
  timer: ReturnType<typeof setTimeout> | null
}

const PULSE_MS = 2400

function publishCalendarReveal(request: {
  date: string
  startTime?: string
  endTime?: string
  sourceId?: string
  itemId?: string
  /** Switch the grid to this view; omit to keep whatever the user is on. */
  view?: 'month' | 'week' | 'year'
}, surface: CalendarRevealTarget['surface']): void {
  const pulse = api.runtime.getOrCreate<RevealPulse>('calendar.revealPulse', () => ({
    nonce: 0,
    timer: null
  }))
  const reveals = revealTargetStore()

  api.workspace.patchTimeControl({
    ...(request.view ? { view: request.view } : {}),
    cursor: `${request.date.slice(0, 7)}-01`,
    selectedDate: request.date,
    selectedTime: request.startTime ?? null,
    timeRange: normalizeTimeRange({ start: request.startTime, end: request.endTime }),
    rangeStart: null,
    rangeEnd: null
  })

  if (pulse.timer) clearTimeout(pulse.timer)
  // Republish from null so re-revealing the same item flashes again rather than
  // rendering an unchanged target and looking like the click was swallowed.
  reveals.publish(null)
  // No `sourceId` means the Calendar's own event; the flash is the same either way.
  if (request.itemId) {
    const target: CalendarRevealTarget = {
      surface,
      sourceId: request.sourceId ?? '',
      itemId: request.itemId,
      date: request.date,
      nonce: ++pulse.nonce
    }
    reveals.publish(target)
    pulse.timer = setTimeout(() => {
      if (reveals.get()?.nonce === target.nonce) reveals.publish(null)
      pulse.timer = null
    }, PULSE_MS)
  }

}

export function revealCalendarItem(request: {
  date: string
  startTime?: string
  endTime?: string
  sourceId?: string
  itemId?: string
  view?: 'month' | 'week' | 'year'
}): void {
  publishCalendarReveal(request, 'main')
  api.workspace.openMainTab()
}

export function revealCalendarAgendaItem(request: {
  date: string
  startTime?: string
  endTime?: string
  sourceId?: string
  itemId?: string
}): void {
  publishCalendarReveal(request, 'agenda')
  api.workspace.revealOwnPanel('left_sidebar')
}
