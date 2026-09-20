import type { ValleyPluginManifest } from '@valley/plugin-sdk/types'
import { calendarServices } from '../src/serviceClient'
// @vitest-environment jsdom
import * as React from 'react'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, it, expect, vi, beforeEach } from 'vitest'
import type { ConnectedAccount, DataRecord, IndexEntry, TimeControlState, ValleyGroup } from '@valley/plugin-sdk/types'
import { paletteRef } from '@valley/plugin-sdk/palette'
import {
  METADATA_PANEL_SEGMENT_V1,
  PLUGIN_SURFACE_V1,
  CALENDAR_ITEM_SOURCE_V2,
  CALENDAR_PANEL_SELECTION_V1,
  type DatasetRecord,
  type CalendarRevealTarget
} from '@valley/plugin-sdk'
import { createMockValleyApi, type MockValleyApi } from '@valley/plugin-testkit'
import { pagedSource } from './harness'
import { initRuntime, revealTargetStore } from '../src/runtime'
import { normalizeEventRecord, newEvent } from '../src/events'
import { resolveItemColor } from '../src/colors'
import { SWIPE_IDLE_MS, calendarSwipeStep, newSwipeGesture, type CalendarSwipeGesture } from '../src/swipe'
import { Calendar } from '../src/Calendar'
import { QuickAdd } from '../src/QuickAdd'
import { Page as CalendarPage } from '../src/Page'
import { AgendaPanel } from '../src/AgendaPanel'
import { registerCalendarCommands } from '../src/commands'
import { registerCalendarSurfaces } from '../src/surfaces'
import { gridHourWindow } from '../src/WeekGrid'
import { presetNoteDateSource } from '../src/noteDates'
import { eventMenuItems, eventToItem, sourcedToItem, type CalItem } from '../src/items'
import { Settings as CalendarSettings } from '../src/Settings'
import { getRemoteStore } from '../src/remoteSync'
import CALENDAR_PLUGIN_CONFIG from '../config.json'
import { rangeDays } from '../src/timeControl'
import { calendarItemColor, deduplicateCalendarItems } from '../src/useCalendarItems'
import { injectStyles as injectCalendarStyles } from '../src/styles'

Element.prototype.scrollIntoView = vi.fn()

let timeApi: ReturnType<typeof createMockValleyApi>['api']['workspace']
const readTimeControl = () => timeApi.getTimeControl()
const patchTimeControl = (patch: Partial<TimeControlState>) => timeApi.patchTimeControl(patch)
const flushTimeControl = async () => {}

function setupCalendarApi(opts: {
  todos?: DataRecord[]
  events?: DataRecord[]
  calendars?: DatasetRecord[]
  indexEntries?: IndexEntry[]
  noteDateSources?: DataRecord[]
  groups?: ValleyGroup[]
  settings?: Record<string, unknown>
  providerOpen?: (itemId: string) => void
  providerEdit?: (itemId: string) => void
} = {}): MockValleyApi {
  // `opts.todos` is seeded as a *contributed* `calendar.itemSource`, exactly how
  // the Todo plugin registers itself — Calendar has no access to Todo's datasets and
  // no knowledge that Todo exists. Any plugin offering this shape renders the same.
  const sourceItems = (opts.todos ?? []).map((t) => ({
    id: String(t.id),
    documentRef: { pluginId: 'todo', sourceId: 'tasks', itemId: String(t.id) },
    title: String(t.title ?? ''),
    date: String(t.dueDate ?? '').slice(0, 10),
    startTime: t.startTime as string | undefined,
    endTime: t.endTime as string | undefined,
    completed: t.completed === true,
    filePath: t.filePath as string | undefined,
    attachments: t.attachments as string[] | undefined,
    urls: t.urls as string[] | undefined,
    location: t.location as { name: string; lng?: number; lat?: number } | undefined,
    group: t.group as string | undefined,
    note: t.note as string | undefined,
    color: t.color as string | undefined,
    priority: t.priority as string | undefined,
    icon: 'list-todo',
    payload: t
  }))
  const events = opts.events ?? []
  const datasets = {
    'calendar.calendars': opts.calendars ?? [],
    'calendar.events': events.map(({ tags: _tags, urls: _urls, attachments: _attachments, ...event }) => event),
    'calendar.event_tags': events.flatMap((event) =>
      Array.isArray(event.tags) ? event.tags.map((tag) => ({ eventId: event.id, tag })) : []
    ),
    'calendar.event_links': events.flatMap((event) =>
      Array.isArray(event.urls) ? event.urls.map((url, position) => ({ eventId: event.id, position, url })) : []
    ),
    'calendar.event_attachments': events.flatMap((event) =>
      Array.isArray(event.attachments) ? event.attachments.map((path, position) => ({ eventId: event.id, position, path })) : []
    ),
    'calendar.note_date_sources': (opts.noteDateSources ?? []).map((definition, position) => ({
      id: definition.id,
      position,
      definition
    }))
  } as Record<string, DatasetRecord[]>
  const mock = createMockValleyApi({
    manifest: {
      id: 'calendar',
      indexState: 'scoped',
      noteDocuments: CALENDAR_PLUGIN_CONFIG.noteDocuments,
      datasets: CALENDAR_PLUGIN_CONFIG.datasets as unknown as ValleyPluginManifest['datasets']
    },
    indexEntries: opts.indexEntries ?? [],
    datasets,
    groups: opts.groups ?? [],
    settings: opts.settings ?? {}
  })
  mock.provideInterop(CALENDAR_ITEM_SOURCE_V2, {
    integration: {
      name: 'To-Do',
      version: '2.0.0',
      author: 'Cedar Lab',
      description: 'Structured task manager.'
    },
    list: pagedSource(async () => sourceItems),
    create: async () => true,
    update: async () => true,
    remove: async () => true,
    actions: async (itemId: string) => [
      { id: 'edit', label: 'Edit', icon: 'edit' as const },
      ...(sourceItems.find((item) => item.id === itemId)?.filePath ? [{ id: 'open-note', label: 'Open note', icon: 'note' as const }] : []),
      ...(opts.providerOpen ? [{ id: 'open-owner', label: 'Open in To-Do', icon: 'checklist' as const }] : [])
    ],
    runAction: async (itemId: string, actionId: string) => {
      if (actionId === 'edit') {
        opts.providerEdit?.(itemId)
        return true
      }
      if (actionId === 'open-note') {
        const path = sourceItems.find((item) => item.id === itemId)?.filePath
        if (!path) return false
        mock.api.workspace.openFile(path)
        return true
      }
      if (actionId !== 'open-owner' || !opts.providerOpen) return false
      opts.providerOpen(itemId)
      mock.api.workspace.revealOwnPanel('left_sidebar')
      return true
    },
    ...(opts.providerOpen ? {
      open: async (itemId: string) => {
        opts.providerOpen?.(itemId)
        mock.api.workspace.revealOwnPanel('left_sidebar')
      }
    } : {}),
    configure: () => mock.api.workspace.openOwnSettings()
  }, 'todo')
  timeApi = mock.api.workspace
  Object.assign(calendarServices(mock.api), { listAccounts: vi.fn(async () => ({ ok: true, data: { accounts: [] } })), listCalendarConnections: vi.fn(async () => ({ ok: true, data: { accounts: [], providers: [] } })), listCalendars: vi.fn(async () => ({ ok: true, data: { calendars: [] } })), fetchCalendar: vi.fn(async () => ({ ok: true, data: { events: [] } })) })
  initRuntime(mock.api)
  registerCalendarSurfaces(mock.api)
  return mock
}

function renderProperties(mock: MockValleyApi) {
  const snapshot = mock.api.interop.extensions.providers(PLUGIN_SURFACE_V1).find((entry) => entry.extension.surface === 'main_workspace')!.extension.getSnapshot()
  const segment = mock.api.interop.extensions.providers(METADATA_PANEL_SEGMENT_V1)[0].extension
  return render(React.createElement(React.Fragment, null, segment.render({ relPath: '', kind: 'unsupported', subject: { pluginId: 'calendar', surface: 'main_workspace', view: snapshot.view, item: snapshot.item } })))
}

afterEach(async () => {
  cleanup()
  await flushTimeControl()
  vi.clearAllMocks()
  vi.useRealTimers()
  // @ts-expect-error restore optional browser API mock
  delete global.ResizeObserver
})

describe('shared Calendar documents', () => {
  it('declares canonical local notes and read-only cached remote notes', () => {
    expect(CALENDAR_PLUGIN_CONFIG.noteDocuments).toEqual([
      expect.objectContaining({ dataset: 'events', bodyColumn: 'note', tags: { dataset: 'event_tags', itemIdColumn: 'eventId', valueColumn: 'tag' } }),
      expect.objectContaining({ dataset: 'remote_events', payloadColumn: 'event', keyColumns: ['accountId', 'id'], readOnly: true })
    ])
  })

  it('delegates an existing contributed composer request without opening a cross-owner draft', async () => {
    const ownerEdit = vi.fn()
    const mock = setupCalendarApi({ providerEdit: ownerEdit })
    const [provider] = mock.api.interop.services.providers(CALENDAR_ITEM_SOURCE_V2)
    const close = vi.fn()
    const read = vi.spyOn(mock.api.documents, 'read')
    const item = sourcedToItem({ sourceId: provider.providerId, sourceOwner: 'todo', labelKey: 'plugin.todo.name', editable: true,
      item: { id: 'owned-task', title: 'Ferns', date: '2026-06-08', documentRef: { pluginId: 'todo', sourceId: 'tasks', itemId: 'owned-task' } } })
    render(React.createElement(QuickAdd, { state: { date: item.date, editItem: item }, groups: [], onClose: close, onAdded: vi.fn() }))
    await waitFor(() => expect(close).toHaveBeenCalledTimes(1))
    expect(ownerEdit).toHaveBeenCalledWith('owned-task')
    expect(read).not.toHaveBeenCalled()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('reports an unavailable owning editor instead of falling back to unguarded editing', async () => {
    const mock = setupCalendarApi()
    const close = vi.fn()
    const item = sourcedToItem({ sourceId: 'disabled-provider', sourceOwner: 'other', labelKey: 'plugin.other.name', editable: true,
      item: { id: 'missing-task', title: 'Ferns', date: '2026-06-08' } })
    render(React.createElement(QuickAdd, { state: { date: item.date, editItem: item }, groups: [], onClose: close, onAdded: vi.fn() }))
    await waitFor(() => expect(mock.api.ui.confirm).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Item editor unavailable', message: expect.stringContaining('owning plugin')
    })))
    expect(screen.queryByLabelText('Note')).not.toBeInTheDocument()
    await waitFor(() => expect(close).toHaveBeenCalledTimes(1))
  })

  it('keeps note and tag drafts local until one guarded Save', async () => {
    const event = { ...newEvent('Canopy survey', '2026-06-08'), id: 'document-event', filePath: 'Notes/Canopy.md', note: '**Draft**', tags: ['flora'] }
    const mock = setupCalendarApi({ events: [event as unknown as DataRecord] })
    const update = vi.spyOn(mock.api.documents, 'update')
    const clear = vi.spyOn(mock.api.documents.drafts, 'clear')
    const contexts: unknown[] = []
    const NoteInput = mock.api.ui.NoteInput
    mock.api.ui.NoteInput = (props) => { contexts.push(props.context); return React.createElement(NoteInput, props) }
    const close = vi.fn()
    render(React.createElement(QuickAdd, { state: { date: event.date, editItem: eventToItem(event) }, groups: [], onClose: close, onAdded: vi.fn() }))
    await waitFor(() => expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled())
    expect(contexts.at(-1)).toEqual({ ref: { pluginId: 'calendar', sourceId: 'events', itemId: event.id }, sourcePath: event.filePath })
    fireEvent.change(screen.getByLabelText('Note'), { target: { value: '**Changed** [[Ferns]] #wald' } })
    fireEvent.change(screen.getByRole('combobox', { name: 'Tags' }), { target: { value: '#Äste/jung' } })
    fireEvent.keyDown(screen.getByRole('combobox', { name: 'Tags' }), { key: 'Enter' })
    expect(update).not.toHaveBeenCalled()
    expect(mock.datasets.get('calendar.events')?.[0].note).toBe('**Draft**')
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Save' })) })
    expect(update).toHaveBeenCalledWith({ pluginId: 'calendar', sourceId: 'events', itemId: event.id }, expect.objectContaining({ body: '**Changed** [[Ferns]] #wald', explicitTags: expect.arrayContaining(['flora', 'äste/jung']), expectedRevision: expect.any(Number), vaultGeneration: expect.any(Number) }))
    expect(clear).toHaveBeenCalledWith({ pluginId: 'calendar', sourceId: 'events', itemId: event.id })
    expect(close).toHaveBeenCalledTimes(1)
  })

  it('preserves a failed note save and renders cached events read-only', async () => {
    const event = { ...newEvent('Canopy survey', '2026-06-08'), id: 'failed-event', note: 'Original' }
    const mock = setupCalendarApi({ events: [event as unknown as DataRecord] })
    mock.api.documents.update = vi.fn(async () => { throw new Error('Stale revision') })
    const close = vi.fn()
    const mounted = render(React.createElement(QuickAdd, { state: { date: event.date, editItem: eventToItem(event) }, groups: [], onClose: close, onAdded: vi.fn() }))
    await waitFor(() => expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled())
    fireEvent.change(screen.getByLabelText('Note'), { target: { value: 'Unsaved' } })
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Save' })) })
    expect(screen.getByLabelText('Note')).toHaveValue('Unsaved')
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(close).not.toHaveBeenCalled()
    mounted.unmount()
    render(React.createElement(QuickAdd, { state: { date: event.date, editItem: { ...eventToItem(event), id: 'cached-event', readOnly: true } }, groups: [], onClose: close, onAdded: vi.fn() }))
    expect(screen.getByLabelText('Note')).toHaveAttribute('readonly')
    expect(screen.getByLabelText('Title')).toBeDisabled()
    expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument()
  })

  it('keeps the edit-start revision after external tags change and clears a canceled draft', async () => {
    const event = { ...newEvent('Ferns', '2026-06-08'), id: 'conflicted-event', note: 'Original' }
    const mock = setupCalendarApi({ events: [event as unknown as DataRecord] })
    const close = vi.fn()
    const clear = vi.spyOn(mock.api.documents.drafts, 'clear')
    render(React.createElement(QuickAdd, { state: { date: event.date, editItem: eventToItem(event) }, groups: [], onClose: close, onAdded: vi.fn() }))
    await waitFor(() => expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled())
    fireEvent.change(screen.getByLabelText('Note'), { target: { value: 'Local unsaved Markdown' } })
    await mock.api.data.dataset('calendar.event_tags').insert({ eventId: event.id, tag: 'external' })
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Save' })) })
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByLabelText('Note')).toHaveValue('Local unsaved Markdown')
    expect(mock.datasets.get('calendar.events')?.[0].note).toBe('Original')
    expect(close).not.toHaveBeenCalled()
    expect(clear).not.toHaveBeenCalled()
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Cancel' })) })
    expect(clear).toHaveBeenCalledWith({ pluginId: 'calendar', sourceId: 'events', itemId: event.id })
    expect(close).toHaveBeenCalledTimes(1)
  })
})

describe('normalizeEventRecord', () => {
  it('coerces a sparse record and defaults to all-day', () => {
    const e = normalizeEventRecord({ id: 'e1', title: 'Survey', date: '2026-06-05' })
    expect(e.title).toBe('Survey')
    expect(e.date).toBe('2026-06-05')
    expect(e.allDay).toBe(true)
    expect(e.startTime).toBeUndefined()
    expect(e.tags).toEqual([])
  })

  it('keeps valid times and marks timed events not all-day', () => {
    const e = normalizeEventRecord({
      id: 'e2',
      title: 'Fungal survey',
      date: '2026-06-05',
      startTime: '09:00',
      endTime: '10:30'
    })
    expect(e.startTime).toBe('09:00')
    expect(e.endTime).toBe('10:30')
    expect(e.allDay).toBe(false)
  })

  it('drops invalid times and colors', () => {
    const e = normalizeEventRecord({
      id: 'e3',
      title: 'X',
      date: '2026-06-05',
      startTime: '25:99',
      color: 'red'
    })
    expect(e.startTime).toBeUndefined()
    expect(e.color).toBeUndefined()
  })

  it('newEvent builds a valid record', () => {
    const e = newEvent('Canopy survey', '2026-06-06', { startTime: '18:00' })
    expect(e.title).toBe('Canopy survey')
    expect(e.date).toBe('2026-06-06')
    expect(e.allDay).toBe(false)
    expect(e.id).toMatch(/^event_/)
  })

  it('rejects legacy string locations after database migration', () => {
    const e = normalizeEventRecord({ id: 'e4', title: 'X', date: '2026-06-05', location: ' Room 3 ' })
    expect(e.location).toBeUndefined()
  })

  it('keeps coordinates only as a complete pair — half a fix is no fix', () => {
    const both = normalizeEventRecord({
      id: 'e5', title: 'X', date: '2026-06-05',
      location: { name: 'Woodland edge', lng: 8.54, lat: 47.37 }
    })
    expect(both.location).toEqual({ name: 'Woodland edge', lng: 8.54, lat: 47.37 })
    const half = normalizeEventRecord({
      id: 'e6', title: 'X', date: '2026-06-05', location: { name: 'Woodland edge', lat: 47.37 }
    })
    expect(half.location).toEqual({ name: 'Woodland edge' })
    const nameless = normalizeEventRecord({
      id: 'e7', title: 'X', date: '2026-06-05', location: { lng: 8.54, lat: 47.37 }
    })
    expect(nameless.location).toBeUndefined()
  })

  it('accepts only http(s) links, de-duplicated', () => {
    const e = normalizeEventRecord({
      id: 'e8', title: 'X', date: '2026-06-05',
      urls: ['https://example.org', 'https://example.org', 'javascript:alert(1)', 'file:///etc/passwd', '']
    })
    expect(e.urls).toEqual(['https://example.org'])
  })

  it('normalizes and de-duplicates attachment paths', () => {
    const e = normalizeEventRecord({
      id: 'e9', title: 'X', date: '2026-06-05',
      attachments: ['./Archive/Plan.pdf', 'Archive/Plan.pdf', '', 42]
    })
    expect(e.attachments).toEqual(['Archive/Plan.pdf'])
  })

  it('leaves the new fields absent on a record that carries none', () => {
    const e = normalizeEventRecord({ id: 'e10', title: 'X', date: '2026-06-05' })
    expect(e.urls).toBeUndefined()
    expect(e.attachments).toBeUndefined()
    expect(e.location).toBeUndefined()
    expect(e.group).toBeUndefined()
  })

  it('keeps one attachment and one link in named hover submenus and dispatches each child', async () => {
    const mock = setupCalendarApi()
    const item = eventToItem(normalizeEventRecord({
      id: 'event-menu',
      title: 'Survey references',
      date: '2026-06-05',
      attachments: ['Archive/fern-sheet.pdf'],
      urls: ['https://example.com/fern']
    }))

    const menu = eventMenuItems(item)
    expect(menu).toMatchObject([
      { id: 'open-attachment', label: 'Attachment', submenu: [{ label: 'fern-sheet.pdf' }] },
      { id: 'open-link', label: 'Link', submenu: [{ label: 'https://example.com/fern' }] }
    ])
    await menu[0].submenu?.[0].onSelect?.()
    await menu[1].submenu?.[0].onSelect?.()
    expect(mock.api.workspace.openFile).toHaveBeenCalledWith('Archive/fern-sheet.pdf')
    expect(mock.externalUrls).toEqual(['https://example.com/fern'])
  })
})

describe('resolveItemColor precedence', () => {
  it('falls back to priority, then status, then default', () => {
    expect(resolveItemColor({ priority: 'high' })).toBe(paletteRef('red'))
    expect(resolveItemColor({ status: 'active' })).toBe(paletteRef('primary-blue'))
    expect(resolveItemColor({})).toBe(paletteRef('gray'))
  })

  it('uses explicit color, shared group, priority, status, then gray in that order', () => {
    const base: CalItem = { kind: 'event', id: 'i', title: 'Survey', date: '2026-06-05' }
    const groups = [{ id: 'fungi', name: 'Fungi', color: 'palette:green' }]
    expect(calendarItemColor({ ...base, color: '#abcdef', groupId: 'fungi', priority: 'high' }, groups)).toBe('#abcdef')
    expect(calendarItemColor({ ...base, groupId: 'fungi', priority: 'high' }, groups)).toBe('palette:green')
    expect(calendarItemColor({ ...base, priority: 'high', status: 'active' }, groups)).toBe('palette:red')
    expect(calendarItemColor({ ...base, status: 'active' }, groups)).toBe('palette:primary-blue')
    expect(calendarItemColor(base, groups)).toBe('palette:gray')
  })
})

describe('rangeDays', () => {
  it('lists inclusive days regardless of order', () => {
    expect(rangeDays('2026-06-03', '2026-06-05')).toEqual([
      '2026-06-03',
      '2026-06-04',
      '2026-06-05'
    ])
    expect(rangeDays('2026-06-05', '2026-06-03')).toHaveLength(3)
  })
})

describe('calendarSwipeStep', () => {
  it('allows one navigation per horizontal wheel gesture', () => {
    let gesture: CalendarSwipeGesture = newSwipeGesture()

    let result = calendarSwipeStep(gesture, -35, 0)
    expect(result.step).toBe(0)
    expect(result.gesture).toMatchObject({ acc: -35, fired: false })

    result = calendarSwipeStep(result.gesture, -35, 0)
    expect(result.step).toBe(-1)
    expect(result.gesture).toMatchObject({ acc: 0, fired: true })

    // Still rising after the fire: same fling cresting, swallowed (not yet decaying).
    result = calendarSwipeStep(result.gesture, -120, 0)
    expect(result.step).toBe(0)
    expect(result.gesture).toMatchObject({ acc: 0, fired: true })

    gesture = newSwipeGesture()
    result = calendarSwipeStep(gesture, -61, 0)
    expect(result.step).toBe(-1)
  })

  it('ignores vertical wheel input and resets accumulation on direction change', () => {
    const idle = newSwipeGesture()
    const vertical = calendarSwipeStep(idle, -100, 120)
    expect(vertical.step).toBe(0)
    expect(vertical.gesture).toBe(idle) // untouched — incidental vertical frame

    const reversed = calendarSwipeStep({ ...newSwipeGesture(), acc: -40 }, 30, 0)
    expect(reversed.step).toBe(0)
    expect(reversed.gesture).toMatchObject({ acc: 30, fired: false })
  })

  it('collapses a fling plus its decaying inertia tail into a single step', () => {
    let r = calendarSwipeStep(newSwipeGesture(), -90, 0)
    expect(r.step).toBe(-1)
    for (const d of [-70, -55, -40, -28, -18, -10, -4]) {
      r = calendarSwipeStep(r.gesture, d, 0)
      expect(r.step).toBe(0)
    }
    expect(r.gesture.fired).toBe(true)
  })

  it('requires two growing frames to distinguish a fast reswipe from one momentum spike', () => {
    let r = calendarSwipeStep(newSwipeGesture(), -90, 0)
    expect(r.step).toBe(-1)
    for (const d of [-60, -32, -14]) r = calendarSwipeStep(r.gesture, d, 0)
    expect(r.step).toBe(0)
    r = calendarSwipeStep(r.gesture, -20, 0)
    expect(r.step).toBe(0)
    r = calendarSwipeStep(r.gesture, -50, 0)
    expect(r.step).toBe(-1)
    expect(r.gesture.fired).toBe(true)
  })
})

describe('Calendar shell chrome', () => {
  beforeEach(async () => {
    setupCalendarApi()
    await readTimeControl()
    patchTimeControl({
      view: 'week',
      cursor: '2026-06-01',
      selectedDate: '2026-06-04',
      rangeStart: null,
      rangeEnd: null,
      selectedTime: null
    })
    await flushTimeControl()
  })

  it('keeps the main workspace topbar as the first full-bleed child', async () => {
    const { container } = render(React.createElement(CalendarPage))
    await screen.findByRole('heading', { name: /W23\s+2026/i })

    const root = container.querySelector('.calendar-view')
    expect(container.firstElementChild).toBe(root)
    expect(root).toHaveClass('calendar-view-main')
    expect(root).not.toHaveClass('calendar-view-sidebar')
    expect(root?.firstElementChild).toHaveClass('calendar-topbar')
    const leading = root?.querySelector('.calendar-topbar-leading')
    expect(leading?.firstElementChild).toBe(screen.getByRole('heading', { name: /W23\s+2026/i }))
    expect(container.querySelector('.calendar-history-actions')).not.toBeInTheDocument()
    expect(container.querySelector('.calendar-header')).not.toBeInTheDocument()
  })

  it('does not turn a narrow main workspace calendar into the sidebar variant', async () => {
    class NarrowResizeObserver {
      constructor(private readonly cb: ResizeObserverCallback) {}
      observe(): void {
        this.cb([{ contentRect: { width: 300 } } as ResizeObserverEntry], this as unknown as ResizeObserver)
      }
      disconnect(): void {}
      unobserve(): void {}
    }
    global.ResizeObserver = NarrowResizeObserver as unknown as typeof ResizeObserver

    const { container } = render(React.createElement(Calendar, { variant: 'main' }))
    await waitFor(() => expect(container.querySelector('.calendar-view')).toHaveClass('calendar-view-compact'))

    const root = container.querySelector('.calendar-view')
    expect(root).toHaveClass('calendar-view-main')
    expect(root).not.toHaveClass('calendar-view-sidebar')
    expect(root?.firstElementChild).toHaveClass('calendar-topbar')
  })

  it('measures both the calendar shell and week grid using the visible iframe observer', async () => {
    const frame = document.createElement('iframe')
    document.body.append(frame)
    const container = frame.contentDocument!.body.appendChild(frame.contentDocument!.createElement('div'))
    const observed: Element[] = []
    const disconnect = vi.fn()
    class FrameObserver {
      constructor(private readonly callback: ResizeObserverCallback) {}
      observe(target: Element): void {
        expect(target.ownerDocument === frame.contentDocument).toBe(true)
        observed.push(target)
        this.callback([{ contentRect: { width: 300 } } as ResizeObserverEntry], this as unknown as ResizeObserver)
      }
      disconnect = disconnect
      unobserve(): void {}
    }
    Object.defineProperty(frame.contentWindow, 'ResizeObserver', { value: FrameObserver })
    const mounted = render(React.createElement(Calendar, { variant: 'main' }), { container })
    try {
      await waitFor(() => expect(container.querySelector('.calendar-view')?.classList.contains('calendar-view-compact')).toBe(true))
      expect(observed.some((element) => element === container.querySelector('.calendar-view'))).toBe(true)
      await waitFor(() => expect(observed.some((element) => element === container.querySelector('.calendar-weekgrid-body'))).toBe(true))
      mounted.unmount()
      expect(disconnect).toHaveBeenCalledTimes(observed.length)
    } finally { mounted.unmount(); frame.remove() }
  })

  it('keeps the right-sidebar calendar on the compact topbar path', async () => {
    const { container } = render(React.createElement(Calendar, { variant: 'right' }))
    await screen.findByRole('heading', { name: /W23\s+2026/i })

    const root = container.querySelector('.calendar-view')
    expect(root).toHaveClass('calendar-view-sidebar')
    expect(root).toHaveClass('calendar-view-compact')
    expect(root?.firstElementChild).toHaveClass('calendar-topbar')
    expect(root?.querySelector('.calendar-header')).not.toBeInTheDocument()
    expect(root?.querySelector('.calendar-topbar .calendar-switcher')).toBeInTheDocument()
    expect(screen.getAllByRole('tab').map((tab) => tab.textContent)).toEqual(['Week', 'Month', 'Year'])
  })

  it('keeps every right-sidebar period tab, chevron and Today control active', async () => {
    const { container } = render(React.createElement(Calendar, { variant: 'right' }))
    await screen.findByRole('heading', { name: /W23\s+2026/i })

    for (const [mode, label, before, after] of [
      ['month', 'Month', /Jun\s+2026/i, /Jul\s+2026/i],
      ['year', 'Year', /^2026$/, /^2027$/],
      ['week', 'Week', /W23\s+2026/i, /W24\s+2026/i]
    ] as const) {
      await act(async () => { fireEvent.click(screen.getByRole('tab', { name: label })) })
      expect(screen.getByRole('tab', { name: label })).toHaveAttribute('aria-selected', 'true')
      expect(container.querySelector('.calendar-scroll-area')).toHaveAttribute('data-view', mode)
      expect(screen.getByRole('heading', { name: before })).toBeInTheDocument()
      await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Next' })) })
      expect(screen.getByRole('heading', { name: after })).toBeInTheDocument()
      await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Previous' })) })
      expect(screen.getByRole('heading', { name: before })).toBeInTheDocument()
    }
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Today' })) })
    const today = new Date()
    const expectedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    await act(async () => { expect((await readTimeControl()).selectedDate).toBe(expectedDate) })
    expect(container.querySelectorAll('.calendar-topbar')).toHaveLength(1)
  })

  it('keeps period facts in Markdown rows and source controls in their own inspector tab', async () => {
    const mock = setupCalendarApi({
      calendars: [{ id: 'field-calendar', name: 'Field observations', accountId: 'field-account', provider: 'test-calendar', timezone: 'Europe/Berlin', readOnly: true }],
      settings: { hiddenSources: ['calendar:noteDates'], disabledCalendarAccounts: ['field-account'] }
    })
    const executeOwn = vi.spyOn(mock.api.commands, 'executeOwn')
    vi.spyOn(calendarServices(mock.api), 'listAccounts').mockResolvedValue({ ok: true, data: { accounts: [
      { id: 'field-account', provider: 'test-calendar', displayName: 'Field team', address: 'field@example.test', capabilities: ['calendar'],  },
      { id: 'mail-account', provider: 'test-mail', displayName: 'Mail only', address: 'mail@example.test', capabilities: ['email'],  }
    ] } })
    const segment = mock.api.interop.extensions.providers(METADATA_PANEL_SEGMENT_V1)[0].extension
    const context = { relPath: '', kind: 'unsupported' as const, subject: { pluginId: 'calendar', surface: 'main_workspace' as const, view: { v: 1, view: 'week', cursor: '2026-06-01', selectedDate: '2026-06-04', rangeStart: '2026-06-03', rangeEnd: '2026-06-05', selectedTime: '09:00' } } }
    const fields = await segment.inspect!(context)
    expect(fields.every((field) => field.readOnly)).toBe(true)
    expect(Object.fromEntries(fields.map((field) => [field.id, field.value]))).toMatchObject({
      plugin: 'calendar', view: 'week', selectedDate: '2026-06-04', month: '2026-06', week: { number: 23, start: '2026-06-01', end: '2026-06-07' }, year: 2026, range: ['2026-06-03', '2026-06-05'], selectedTime: '09:00'
    })
    const segments = mock.api.interop.extensions.providers(METADATA_PANEL_SEGMENT_V1).map((entry) => entry.extension)
    expect(segments.map(({ id, icon }) => ({ id, icon }))).toEqual([
      { id: 'calendar.properties', icon: 'calendar' }, { id: 'calendar.groups', icon: 'group' }, { id: 'calendar.sources', icon: 'layers' }, { id: 'calendar.noteDates', icon: 'push-pin' }
    ])
    const sources = segments.find((entry) => entry.id === 'calendar.sources')!
    expect(Object.fromEntries((await sources.inspect!(context)).map((field) => [field.id, field.value]))).toMatchObject({
      sources: [{ id: 'calendar:events', name: 'Events' }, { id: 'calendar:plugin:todo', name: 'To-Do' }],
      calendars: [{ id: 'field-calendar', name: 'Field observations', timezone: 'Europe/Berlin', readOnly: true }],
      accounts: [{ id: 'field-account', name: 'Field team', enabled: false }]
    })
    const rendered = render(React.createElement(React.Fragment, null, segment.render(context)))
    expect(rendered.container.querySelector('dl.props-info-table')).toBeInTheDocument()
    expect(screen.queryByText('Field team')).not.toBeInTheDocument()
    expect(screen.getByText('Active plugin').nextElementSibling).toHaveTextContent('Calendar')
    expect(screen.getByText('Selected date').nextElementSibling).toHaveTextContent('2026-06-04')
    expect(screen.getByText('Month').nextElementSibling).toHaveTextContent('Jun 2026')
    expect(rendered.container.querySelector('input, select, button')).not.toBeInTheDocument()
    expect(executeOwn).not.toHaveBeenCalled()
    rendered.rerender(React.createElement(React.Fragment, null, segment.render({ ...context, subject: { ...context.subject, view: { ...context.subject.view, view: 'year', cursor: '2027-07-01' } } })))
    expect(screen.getByText('Year', { selector: 'dt' }).nextElementSibling).toHaveTextContent('2027')
    expect(screen.getByText('Month').nextElementSibling).toHaveTextContent('Jul 2027')
    rendered.rerender(React.createElement(React.Fragment, null, sources.render(context)))
    await screen.findByText('Field team')
    expect(screen.getByText(/Sync disabled/)).toBeInTheDocument()
    expect(screen.queryByText('Mail only')).not.toBeInTheDocument()
    expect(screen.queryByText('Selected date')).not.toBeInTheDocument()
    const todoSwitch = screen.getByRole('switch', { name: 'To-Do' })
    expect(todoSwitch).toBeChecked()
    expect(todoSwitch.closest('.calendar-filter-property-row')).toHaveClass('calendar-filter-property-row')
    expect(todoSwitch.parentElement).toHaveClass('calendar-filter-property-value')
    await act(async () => fireEvent.click(screen.getByRole('switch', { name: 'To-Do' })))
    expect(mock.api.settings.get().hiddenSources).toEqual(['calendar:noteDates', 'calendar:plugin:todo'])
    expect(screen.getByRole('switch', { name: 'To-Do' })).not.toBeChecked()
    await act(async () => { await mock.api.settings.set('hiddenSources', []) })
    expect(screen.getByRole('switch', { name: 'To-Do' })).toBeChecked()
  })

  it('isolates account loading errors to Sources and keeps source filters usable', async () => {
    const mock = setupCalendarApi()
    vi.spyOn(calendarServices(mock.api), 'listAccounts').mockResolvedValue({ ok: false, error: 'Account storage unavailable' })
    const segment = mock.api.interop.extensions.providers(METADATA_PANEL_SEGMENT_V1)[0].extension
    render(React.createElement(React.Fragment, null, segment.render({ relPath: '', kind: 'unsupported', subject: { pluginId: 'calendar', surface: 'main_workspace', view: { v: 1, view: 'month', cursor: '2026-06-01', selectedDate: '2026-06-04' } } })))
    expect(screen.getByText('Selected date').nextElementSibling).toHaveTextContent('2026-06-04')
    expect(calendarServices(mock.api).listAccounts).not.toHaveBeenCalled()
    const sources = mock.api.interop.extensions.providers(METADATA_PANEL_SEGMENT_V1).find((entry) => entry.extension.id === 'calendar.sources')!.extension
    render(React.createElement(React.Fragment, null, sources.render({ relPath: '', kind: 'unsupported' })))
    expect(await screen.findByRole('alert')).toHaveTextContent('Calendar details could not be loaded')
    expect(screen.getByRole('switch', { name: 'To-Do' })).toBeEnabled()
  })

  it('uses shared groups and the existing visibility filter in a separate Groups tab', async () => {
    const mock = setupCalendarApi({ groups: [{ id: 'field', name: 'Field work', color: paletteRef('green') }] })
    const segment = mock.api.interop.extensions.providers(METADATA_PANEL_SEGMENT_V1).find((entry) => entry.extension.id === 'calendar.groups')!.extension
    const { container } = render(React.createElement(React.Fragment, null, segment.render({ relPath: '', kind: 'unsupported' })))
    expect(container.querySelector('.props-info-row dt')).toHaveTextContent('Field work')
    const groupSwitch = screen.getByRole('switch', { name: 'Field work' })
    expect(groupSwitch.closest('.calendar-filter-property-row')).toHaveClass('calendar-filter-property-row')
    await act(async () => fireEvent.click(groupSwitch))
    expect(mock.api.settings.get().hiddenGroups).toEqual(['field'])
    expect(screen.getByRole('switch', { name: 'Field work' })).not.toBeChecked()
    await act(async () => { await mock.api.settings.set('hiddenGroups', []) })
    expect(screen.getByRole('switch', { name: 'Field work' })).toBeChecked()
    fireEvent.click(screen.getByRole('button', { name: 'Manage groups' }))
    expect(mock.api.workspace.openSettings).toHaveBeenCalledWith('groups')
    expect(mock.api.workspace.setGroups).not.toHaveBeenCalled()
  })

  it('shows persisted note-date source state in a separate Pin tab', async () => {
    const mock = setupCalendarApi({
      indexEntries: [
        { relPath: 'Contacts/Fern.md', title: 'Fern', kind: 'note', frontmatter: { type: 'contact', birthdate: '1990-05-04' }, mtimeMs: 0 },
        { relPath: 'Projects/Canopy.md', title: 'Canopy', kind: 'note', frontmatter: { type: 'project', due: '2026-06-08' }, mtimeMs: 0 }
      ],
      noteDateSources: [
        { id: 'birthdays', title: 'Birthdays', matchKey: 'type', matchValue: 'contact', dateField: 'birthdate', match: 'day-month', showCount: true, labelMode: 'filename', showFields: [], color: 'palette:blue', icon: 'cake', visible: true, hidden: false },
        { id: 'deadlines', title: 'Deadlines', matchKey: 'type', matchValue: 'project', dateField: 'due', match: 'exact', showCount: false, labelMode: 'filename', showFields: [], color: 'palette:orange', icon: 'flag', visible: false, hidden: false }
      ]
    })
    const segment = mock.api.interop.extensions.providers(METADATA_PANEL_SEGMENT_V1).find((entry) => entry.extension.id === 'calendar.noteDates')!.extension
    expect(await segment.inspect!({ relPath: '', kind: 'unsupported' })).toEqual([
      expect.objectContaining({ id: 'birthdays', label: 'Birthdays', value: true, type: 'boolean' }),
      expect.objectContaining({ id: 'deadlines', label: 'Deadlines', value: false, type: 'boolean' })
    ])

    const { container } = render(React.createElement(React.Fragment, null, segment.render({ relPath: '', kind: 'unsupported' })))
    const birthdays = await screen.findByRole('switch', { name: 'Birthdays' })
    const deadlines = screen.getByRole('switch', { name: 'Deadlines' })
    expect(birthdays).toBeChecked()
    await waitFor(() => expect(deadlines).not.toBeChecked())
    await waitFor(() => expect([...container.querySelectorAll('.calendar-filter-option-count')].map((node) => node.textContent)).toEqual(['1', '1']))

    await act(async () => fireEvent.click(deadlines))
    await waitFor(() => expect(mock.datasets.get('calendar.note_date_sources')?.find((row) => row.id === 'deadlines')?.definition).toMatchObject({ visible: true }))
    expect(screen.getByRole('switch', { name: 'Deadlines' })).toBeChecked()
  })

  it('shows an icon beside every day-menu action', async () => {
    const mock = setupCalendarApi()
    patchTimeControl({
      view: 'month',
      cursor: '2026-06-01',
      selectedDate: '2026-06-05',
      rangeStart: null,
      rangeEnd: null,
      selectedTime: null
    })
    flushTimeControl()
    const { container } = render(React.createElement(Calendar, { variant: 'right' }))
    await screen.findByRole('heading', { name: /Jun\s+2026/i })

    const day = [...container.querySelectorAll('.calendar-day-cell')].find((cell) =>
      !cell.classList.contains('outside') && cell.querySelector('.calendar-day-num')?.textContent === '5'
    )
    expect(day).toBeDefined()
    fireEvent.contextMenu(day as Element)

    const actions = (mock.menus.at(-1) ?? []).filter((entry) => entry.type !== 'separator')
    expect(actions.map((entry) => entry.label)).toEqual(['Add todo', 'Add event', 'Go to today', 'Open week'])
    expect(actions.every((entry) => React.isValidElement(entry.icon))).toBe(true)
  })

  it('publishes only right-panel date selections and clears them on unmount', async () => {
    const mock = setupCalendarApi()
    patchTimeControl({
      view: 'month',
      cursor: '2026-06-01',
      selectedDate: null,
      rangeStart: null,
      rangeEnd: null,
      selectedTime: null
    })
    flushTimeControl()
    const { container, unmount } = render(React.createElement(Calendar, { variant: 'right' }))
    await screen.findByRole('heading', { name: /Jun\s+2026/i })

    const day = [...container.querySelectorAll('.calendar-day-cell')].find((cell) =>
      !cell.classList.contains('outside') && cell.querySelector('.calendar-day-num')?.textContent === '5'
    )
    expect(day).toBeDefined()
    fireEvent.click(day as Element)

    await waitFor(() => expect(mock.api.interop.state.get(CALENDAR_PANEL_SELECTION_V1)).toEqual({
      selectedDate: '2026-06-05',
      rangeStart: null,
      rangeEnd: null
    }))
    unmount()
    expect(mock.api.interop.state.get(CALENDAR_PANEL_SELECTION_V1)).toBeNull()
  })

  it('publishes the persisted range when the right Calendar becomes active', async () => {
    const mock = setupCalendarApi()
    patchTimeControl({
      view: 'month',
      cursor: '2026-06-01',
      selectedDate: '2026-06-03',
      rangeStart: '2026-06-03',
      rangeEnd: '2026-06-07',
      selectedTime: '11:30'
    })
    flushTimeControl()

    const { unmount } = render(React.createElement(Calendar, { variant: 'right' }))

    await waitFor(() => expect(mock.api.interop.state.get(CALENDAR_PANEL_SELECTION_V1)).toEqual({
      selectedDate: '2026-06-03',
      rangeStart: '2026-06-03',
      rangeEnd: '2026-06-07'
    }))
    unmount()
    expect(mock.api.interop.state.get(CALENDAR_PANEL_SELECTION_V1)).toBeNull()
  })
})

describe('compact month selected-day entries', () => {
  it('shows local events, note dates, and contributed plugin items together', async () => {
    setupCalendarApi({
      events: [{ id: 'event-one', title: 'Canopy survey', date: '2026-05-04' }],
      todos: [{ id: 'todo-one', title: 'Pack field kit', dueDate: '2026-05-04', completed: false, group: 'Field work', color: 'palette:green', startTime: '08:00', endTime: '09:00', note: 'Bring specimen labels.', filePath: 'Tasks/Pack.md', attachments: ['Files/List.pdf'] }],
      indexEntries: [{
        relPath: 'Contacts/Fern.md',
        title: 'Fern birthday',
        kind: 'note',
        frontmatter: { type: 'contact', birthdate: '1990-05-04' },
        mtimeMs: 0
      }],
      noteDateSources: [{
          id: 'birthdays',
          title: 'Birthdays',
          matchKey: 'type',
          matchValue: 'contact',
          dateField: 'birthdate',
          match: 'day-month',
          showCount: true,
          labelMode: 'filename',
          showFields: [],
          visible: true,
          hidden: false
        }]
    })
    patchTimeControl({
      view: 'month',
      cursor: '2026-05-01',
      selectedDate: '2026-05-04',
      rangeStart: null,
      rangeEnd: null,
      selectedTime: null
    })
    flushTimeControl()

    const { container } = render(React.createElement(Calendar, { variant: 'right' }))
    await waitFor(() => expect(container.querySelectorAll('.calendar-todos .agenda-card')).toHaveLength(3))
    expect(container.querySelector('.calendar-todos .agenda-day-header')).not.toBeInTheDocument()
    const titles = [...container.querySelectorAll('.calendar-todos .agenda-card-title')].map((node) => node.textContent)
    expect(titles).toEqual(expect.arrayContaining(['Canopy survey', 'Pack field kit', 'Fern birthday (36)']))
    const todoRow = container.querySelector('[data-calendar-item-id="todo-one"]')
    expect(todoRow).toHaveTextContent('08:00–09:00')
    expect(todoRow).toHaveTextContent('Bring specimen labels.')
    expect(todoRow?.querySelector('.agenda-card-dot')).toHaveStyle({ background: 'var(--color-green)' })
    expect(todoRow?.querySelector('.calendar-chip-glyph path')).toHaveAttribute('d', expect.stringContaining('M3 6a1 1'))
    expect(todoRow?.querySelector('.calendar-source-card-check')).not.toBeInTheDocument()
    expect(todoRow?.querySelector('.calendar-source-card-menu')).not.toBeInTheDocument()
  })
})

describe('calendar item deduplication', () => {
  it('keeps the contributed item when a local event mirrors its linked slot', () => {
    const task: CalItem = {
      kind: 'sourced',
      id: 'task',
      title: 'Grade last week before writing next week',
      date: '2026-08-24',
      startTime: '08:00',
      endTime: '08:30',
      filePath: 'Focus/The Week Ahead.md',
      sourceId: 'provider-todo'
    }
    const event = eventToItem(normalizeEventRecord({
      id: 'event',
      title: 'Week-ahead review',
      date: '2026-08-24',
      startTime: '08:00',
      endTime: '08:30',
      filePath: 'Focus/The Week Ahead.md'
    }))

    expect(deduplicateCalendarItems([task, event])).toEqual([task])
  })

  it('keeps events with a different slot, remote events, and multi-day events', () => {
    const task: CalItem = {
      kind: 'sourced',
      id: 'task',
      title: 'Inspect the wetland',
      date: '2026-06-08',
      startTime: '08:00',
      endTime: '09:00',
      filePath: 'Field/Wetland.md'
    }
    const later = eventToItem(normalizeEventRecord({
      id: 'later',
      title: 'Wetland review',
      date: '2026-06-08',
      startTime: '10:00',
      endTime: '11:00',
      filePath: 'Field/Wetland.md'
    }))
    const remote = eventToItem({
      ...normalizeEventRecord({
        id: 'google:wetland',
        title: 'Inspect the wetland',
        date: '2026-06-08',
        startTime: '08:00',
        endTime: '09:00',
        filePath: 'Field/Wetland.md'
      }),
      source: 'google'
    })
    const span = eventToItem(normalizeEventRecord({
      id: 'span',
      title: 'Wetland survey window',
      date: '2026-06-07',
      endDate: '2026-06-08',
      startTime: '08:00',
      endTime: '09:00',
      filePath: 'Field/Wetland.md'
    }))

    expect(deduplicateCalendarItems([task, later, remote, { ...span, date: '2026-06-08' }]))
      .toEqual([task, later, remote, { ...span, date: '2026-06-08' }])
  })
})

describe('Calendar item clicks', () => {
  let mock: MockValleyApi
  let ownerEdit: ReturnType<typeof vi.fn>
  beforeEach(() => {
    ownerEdit = vi.fn()
    mock = setupCalendarApi({
      providerEdit: ownerEdit,
      todos: [
        {
          id: 't1',
          title: 'Open field survey',
          completed: false,
          dueDate: '2026-06-08',
          startTime: '08:00',
          endTime: '09:00',
          filePath: 'Notes/Field Survey.md',
          note: 'Task note [[Ferns]]'
        } as DataRecord,
        {
          id: 't2',
          title: 'All-day deadline',
          completed: false,
          dueDate: '2026-06-08'
        } as DataRecord
      ]
    })
    patchTimeControl({
      view: 'week',
      cursor: '2026-06-01',
      selectedDate: '2026-06-08',
      rangeStart: null,
      rangeEnd: null,
      selectedTime: null
    })
    flushTimeControl()
  })

  it('selects on click, edits on double click, and opens related content only from the context menu', async () => {
    render(React.createElement(Calendar))

    // Wait for the async time-control to settle into the seeded week view (W24
    // contains 2026-06-08) before interacting — the right-click menu is week-only.
    await screen.findByRole('heading', { name: /W24\s+2026/i })
    const title = screen.getByText('Open field survey')
    fireEvent.click(title)

    const block = title.closest('.calendar-weekgrid-block')
    expect(block).toHaveClass('selected')
    expect(block).toHaveStyle({ zIndex: '7' })
    expect(mock.api.workspace.openFile).not.toHaveBeenCalled()

    const properties = renderProperties(mock)
    await waitFor(() => expect(properties.container).toHaveTextContent('Open field survey'))
    expect(properties.container.querySelector('input, textarea, select, button')).not.toBeInTheDocument()
    const segment = mock.api.interop.extensions.providers(METADATA_PANEL_SEGMENT_V1)[0].extension
    expect(segment.editCommand).toBeUndefined()
    properties.unmount()

    await act(async () => { fireEvent.doubleClick(title) })
    expect(ownerEdit).toHaveBeenCalledWith('t1')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(mock.api.workspace.showProperties).not.toHaveBeenCalled()

    fireEvent.contextMenu(title)

    await waitFor(() => expect(mock.menus.at(-1)?.map((item) => item.label)).toContain('Edit'))
    expect(mock.menus.at(-1)?.map((item) => item.label)).toContain('Delete')
    expect(mock.menus.at(-1)?.find((item) => item.label === 'Edit')?.icon).toBeTruthy()
    expect(mock.menus.at(-1)?.find((item) => item.label === 'Delete')?.icon).toBeTruthy()
    expect(mock.api.workspace.openFile).not.toHaveBeenCalled()
    await act(async () => { await mock.menus.at(-1)?.find((item) => item.label === 'Edit')?.onSelect?.() })
    expect(ownerEdit).toHaveBeenCalledTimes(2)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    const openNote = mock.menus.at(-1)?.find((item) => item.label === 'Open note')
    expect(openNote).toBeTruthy()
    await act(async () => { await openNote?.onSelect?.() })
    expect(mock.api.workspace.openFile).toHaveBeenCalledWith('Notes/Field Survey.md')
  })

  it.each(['main', 'right', 'agenda'] as const)('opens the owner editor for a contributed item from %s', async (surface) => {
    const contexts: unknown[] = []
    const MarkdownView = mock.api.ui.MarkdownView
    mock.api.ui.MarkdownView = (props) => { contexts.push(props.context); return React.createElement(MarkdownView, props) }
    const { container } = render(surface === 'agenda' ? React.createElement(AgendaPanel) : React.createElement(Calendar, { variant: surface }))
    const selector = surface === 'agenda' ? '.agenda-card[data-calendar-item-id="t1"]' : '.calendar-weekgrid-block[data-calendar-item-id="t1"]'
    await waitFor(() => expect(container.querySelector(selector)).toBeInTheDocument())
    await act(async () => { fireEvent.doubleClick(container.querySelector(selector)!) })
    expect(ownerEdit).toHaveBeenCalledWith('t1')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(mock.api.workspace.showProperties).not.toHaveBeenCalled()
    if (surface === 'agenda') expect(contexts).toContainEqual({ sourcePath: 'Notes/Field Survey.md', ref: { pluginId: 'todo', sourceId: 'tasks', itemId: 't1' } })
  })

  it.each(['main', 'right'] as const)('opens event editing from the %s Calendar menu in a modal', async (variant) => {
    mock = setupCalendarApi({ events: [{ id: 'event-modal', title: 'Canopy survey', date: '2026-06-08' } as DataRecord] })
    patchTimeControl({ view: 'week', cursor: '2026-06-01', selectedDate: '2026-06-08' })
    await flushTimeControl()
    render(React.createElement(Calendar, { variant }))
    await screen.findByRole('heading', { name: /W24\s+2026/i })
    const title = await screen.findByText('Canopy survey')
    fireEvent.contextMenu(title)
    await waitFor(() => expect(mock.menus.at(-1)?.some((item) => item.label === 'Edit')).toBe(true))
    await act(async () => { await mock.menus.at(-1)?.find((item) => item.label === 'Edit')?.onSelect?.() })
    expect(screen.getAllByRole('dialog')).toHaveLength(1)
    expect(screen.getByLabelText('Title')).toHaveValue('Canopy survey')
    expect(mock.api.workspace.showProperties).not.toHaveBeenCalled()
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Discarded survey draft' } })
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Cancel' })) })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.doubleClick(await screen.findByText('Canopy survey'))
    expect(screen.getByLabelText('Title')).toHaveValue('Canopy survey')
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Close' })) })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('flashes the exact timed and all-day contributed items', async () => {
    const { container } = render(React.createElement(Calendar))
    await screen.findByRole('heading', { name: /W24\s+2026/i })
    const sourceId = mock.api.interop.services.providers(CALENDAR_ITEM_SOURCE_V2)[0].providerId

    const reveal = (itemId: string, nonce: number): void => {
      const target: CalendarRevealTarget = {
        surface: 'main',
        sourceId,
        itemId,
        date: '2026-06-08',
        nonce
      }
      act(() => revealTargetStore().publish(target))
    }

    reveal('t1', 1)
    await waitFor(() => {
      const timed = container.querySelector(
        `.calendar-weekgrid-block[data-calendar-source-id="${sourceId}"][data-calendar-item-id="t1"]`
      )
      expect(timed).toHaveClass('calendar-reveal-target')
    })

    reveal('t2', 2)
    await waitFor(() => {
      const allDay = container.querySelector(
        `.calendar-chip[data-calendar-source-id="${sourceId}"][data-calendar-item-id="t2"]`
      )
      expect(allDay).toHaveClass('calendar-reveal-target')
    })
  })

  it('uses the same item interactions for month chips', async () => {
    patchTimeControl({ view: 'month', cursor: '2026-06-01', selectedDate: null })
    flushTimeControl()
    render(React.createElement(Calendar))

    await screen.findByRole('heading', { name: /Jun\s+2026/i })
    const chip = screen.getByRole('button', { name: /Open field survey/ })
    fireEvent.click(chip)
    expect(chip).toHaveClass('selected')
    expect(mock.api.workspace.openFile).not.toHaveBeenCalled()

    await act(async () => { fireEvent.doubleClick(chip) })
    expect(ownerEdit).toHaveBeenCalledWith('t1')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(mock.api.workspace.showProperties).not.toHaveBeenCalled()

    fireEvent.contextMenu(chip)
    await waitFor(() => expect(mock.menus.at(-1)?.map((item) => item.label)).toContain('Edit'))
    expect(mock.menus.at(-1)?.map((item) => item.label)).toContain('Open note')
  })

  it('renders a mirrored local event and contributed item once and keeps owner navigation', async () => {
    const opened = vi.fn()
    mock = setupCalendarApi({
      todos: [{
        id: 'week-task',
        title: 'Grade last week before writing next week',
        dueDate: '2026-08-24',
        startTime: '08:00',
        endTime: '08:30',
        filePath: 'Focus/The Week Ahead.md'
      }],
      events: [{
        id: 'week-event',
        title: 'Week-ahead review',
        date: '2026-08-24',
        startTime: '08:00',
        endTime: '08:30',
        filePath: 'Focus/The Week Ahead.md'
      }],
      providerOpen: opened
    })
    patchTimeControl({ view: 'month', cursor: '2026-08-01', selectedDate: null })
    flushTimeControl()
    render(React.createElement(Calendar))

    const task = await screen.findByRole('button', { name: /Grade last week before writing next week/ })
    expect(screen.queryByText('Week-ahead review')).not.toBeInTheDocument()
    fireEvent.click(task)
    await waitFor(() => expect(opened).toHaveBeenCalledWith('week-task'))
  })

  it('reveals the local event instead when the matching contributed source is hidden', async () => {
    mock = setupCalendarApi({
      todos: [{
        id: 'week-task',
        title: 'Grade last week before writing next week',
        dueDate: '2026-08-24',
        startTime: '08:00',
        endTime: '08:30',
        filePath: 'Focus/The Week Ahead.md'
      }],
      events: [{
        id: 'week-event',
        title: 'Week-ahead review',
        date: '2026-08-24',
        startTime: '08:00',
        endTime: '08:30',
        filePath: 'Focus/The Week Ahead.md'
      }],
      settings: { hiddenSources: ['calendar:plugin:todo'] }
    })
    patchTimeControl({ view: 'month', cursor: '2026-08-01', selectedDate: null })
    flushTimeControl()
    render(React.createElement(Calendar))

    expect(await screen.findByRole('button', { name: /Week-ahead review/ })).toBeInTheDocument()
    expect(screen.queryByText('Grade last week before writing next week')).not.toBeInTheDocument()
  })

  it('opens a normal sourced-item click in Calendar Agenda when configured', async () => {
    const opened = vi.fn()
    mock = setupCalendarApi({
      todos: [{ id: 'owned', title: 'Owned task', dueDate: '2026-06-08' }],
      providerOpen: opened,
      settings: { itemClickTarget: 'agenda' }
    })
    patchTimeControl({ view: 'month', cursor: '2026-06-01', selectedDate: '2026-06-08' })
    flushTimeControl()
    const { container } = render(React.createElement(React.Fragment, null,
      React.createElement(Calendar),
      React.createElement(AgendaPanel)
    ))

    await waitFor(() => expect(container.querySelector('.calendar-chip[data-calendar-item-id="owned"]')).toBeTruthy())
    const chip = container.querySelector<HTMLElement>('.calendar-chip[data-calendar-item-id="owned"]')!
    fireEvent.click(chip)
    await waitFor(() => expect(mock.api.workspace.revealOwnPanel).toHaveBeenCalledWith('left_sidebar'))
    expect(opened).not.toHaveBeenCalled()
    expect((await readTimeControl()).selectedDate).toBe('2026-06-08')
    expect(chip).not.toHaveClass('calendar-reveal-target')
    await waitFor(() => expect(
      container.querySelector('.agenda-card[data-calendar-item-id="owned"]')
    ).toHaveClass('calendar-reveal-target'))
  })

  it('opens a sourced item in its owning plugin by default', async () => {
    const opened = vi.fn()
    mock = setupCalendarApi({
      todos: [{ id: 'owned', title: 'Owned task', dueDate: '2026-06-08' }],
      providerOpen: opened
    })
    patchTimeControl({ view: 'month', cursor: '2026-06-01', selectedDate: null })
    flushTimeControl()
    render(React.createElement(Calendar))

    fireEvent.click(await screen.findByRole('button', { name: /Owned task/ }))
    await waitFor(() => expect(opened).toHaveBeenCalledWith('owned'))
    expect(revealTargetStore().get()).toBeNull()
    expect(mock.api.workspace.revealOwnPanel).toHaveBeenCalledWith('left_sidebar')
  })

  it('falls back to Calendar Agenda when the owning provider cannot open', async () => {
    mock = setupCalendarApi({
      todos: [{ id: 'owned', title: 'Owned task', dueDate: '2026-06-08' }]
    })
    patchTimeControl({ view: 'month', cursor: '2026-06-01', selectedDate: null })
    flushTimeControl()
    const { container } = render(React.createElement(React.Fragment, null,
      React.createElement(Calendar),
      React.createElement(AgendaPanel)
    ))

    await waitFor(() => expect(container.querySelector('.calendar-chip[data-calendar-item-id="owned"]')).toBeTruthy())
    const chip = container.querySelector<HTMLElement>('.calendar-chip[data-calendar-item-id="owned"]')!
    fireEvent.click(chip)
    await waitFor(() => expect(mock.api.workspace.revealOwnPanel).toHaveBeenCalledWith('left_sidebar'))
    expect(chip).not.toHaveClass('calendar-reveal-target')
    await waitFor(() => expect(
      container.querySelector('.agenda-card[data-calendar-item-id="owned"]')
    ).toHaveClass('calendar-reveal-target'))
  })

  it('keeps the explicit Open in To-Do context-menu action', async () => {
    const opened = vi.fn()
    mock = setupCalendarApi({
      todos: [{ id: 'owned', title: 'Owned task', dueDate: '2026-06-08' }],
      providerOpen: opened
    })
    patchTimeControl({ view: 'month', cursor: '2026-06-01', selectedDate: '2026-06-08' })
    flushTimeControl()
    render(React.createElement(Calendar))

    fireEvent.contextMenu(await screen.findByRole('button', { name: /Owned task/ }))
    await waitFor(() => expect(mock.menus.at(-1)?.map((item) => item.label)).toContain('Open in To-Do'))
    const openInTodo = mock.menus.at(-1)?.find((item) => item.label === 'Open in To-Do')
    expect(openInTodo?.icon).toBeTruthy()
    await act(async () => { await openInTodo?.onSelect?.() })

    expect(opened).toHaveBeenCalledWith('owned')
    expect(mock.api.workspace.revealOwnPanel).toHaveBeenCalledWith('left_sidebar')
  })
})

describe('AgendaPanel item clicks', () => {
  let mock: MockValleyApi
  let providerOpen: ReturnType<typeof vi.fn>
  beforeEach(() => {
    providerOpen = vi.fn()
    mock = setupCalendarApi({
      todos: [
        {
          id: 'todo-agenda',
          title: 'Agenda todo',
          completed: false,
          dueDate: '2026-06-08',
          startTime: '09:00',
          endTime: '10:00',
          filePath: 'Notes/Todo.md'
        } as DataRecord
      ],
      events: [
        {
          id: 'event-agenda',
          title: 'Agenda event',
          createdAt: '2026-06-01T00:00:00.000Z',
          updatedAt: '2026-06-01T00:00:00.000Z',
          date: '2026-07-12',
          startTime: '14:30',
          endTime: '15:15',
          filePath: 'Notes/Event.md'
        } as DataRecord
      ],
      providerOpen
    })
    patchTimeControl({
      view: 'month',
      cursor: '2026-06-01',
      selectedDate: null,
      rangeStart: null,
      rangeEnd: null,
      selectedTime: null
    })
    flushTimeControl()
  })

  it('keeps source, group, and note-date header filters icon-only', async () => {
    await act(async () => render(React.createElement(AgendaPanel)))

    const sources = await screen.findByRole('button', { name: 'Sources' })
    for (const label of ['Sources', 'Groups', 'Note dates']) {
      const button = screen.getByRole('button', { name: label })
      expect(button.textContent).toBe('')
      expect(button.querySelector('svg')).toBeInTheDocument()
      expect(button).toHaveAttribute('title', label)
    }
    expect(sources).not.toHaveClass('active')
    await act(async () => fireEvent.click(sources))
    expect(mock.popovers).toHaveLength(1)
    let popover: ReturnType<typeof render>
    await act(async () => { popover = render(React.createElement(React.Fragment, null, mock.popovers[0].node)) })
    const sourceRows = [...popover!.container.querySelectorAll<HTMLButtonElement>('.calendar-filter-option')]
    expect(sourceRows.map((row) => row.querySelector('.calendar-filter-option-label')?.textContent)).toEqual(['Events', 'Note dates', 'To-Do'])
    expect(sourceRows.map((row) => row.querySelector('.calendar-filter-option-count')?.textContent)).toEqual(['1', '0', '1'])
    expect(screen.getByRole('button', { name: /Deselect all/ })).toBeInTheDocument()
    await act(async () => fireEvent.click(screen.getByRole('button', { name: /To-Do/ })))
    expect(mock.driverCalls).toContainEqual({
      driver: 'settings',
      method: 'updatePluginSettings',
      payload: { pluginId: 'calendar', key: 'hiddenSources', value: ['calendar:plugin:todo'] }
    })
    await waitFor(() => expect(sources).toHaveClass('active'))
    expect(sources.textContent).toBe('')
  })

  it('filters individual note-date sources from the Agenda header', async () => {
    mock = setupCalendarApi({
      indexEntries: [
        { relPath: 'Contacts/Fern.md', title: 'Fern', kind: 'note', frontmatter: { type: 'contact', birthdate: '1990-05-04' }, mtimeMs: 0 },
        { relPath: 'Projects/Canopy.md', title: 'Canopy', kind: 'note', frontmatter: { type: 'project', due: '2026-06-08' }, mtimeMs: 0 }
      ],
      noteDateSources: [
        { id: 'birthdays', title: 'Birthdays', matchKey: 'type', matchValue: 'contact', dateField: 'birthdate', match: 'day-month', showCount: true, labelMode: 'filename', showFields: [], color: 'palette:blue', icon: 'cake', visible: true, hidden: false },
        { id: 'deadlines', title: 'Deadlines', matchKey: 'type', matchValue: 'project', dateField: 'due', match: 'exact', showCount: false, labelMode: 'filename', showFields: [], color: 'palette:orange', icon: 'flag', visible: false, hidden: false }
      ]
    })
    await act(async () => render(React.createElement(AgendaPanel)))

    const button = await screen.findByRole('button', { name: 'Note dates' })
    expect(button.textContent).toBe('')
    expect(button).toHaveClass('active')
    expect(button.querySelector('.calendar-filter-icon path')).toHaveAttribute('d', 'M14 4v5c0 1.12.37 2.16 1 3H9c.65-.86 1-1.9 1-3V4zm3-2H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3V4h1c.55 0 1-.45 1-1s-.45-1-1-1')
    await act(async () => fireEvent.click(button))
    let popover: ReturnType<typeof render>
    await act(async () => { popover = render(React.createElement(React.Fragment, null, mock.popovers.at(-1)?.node)) })
    const rows = [...popover!.container.querySelectorAll<HTMLButtonElement>('.calendar-filter-option')]
    expect(rows.map((row) => row.querySelector('.calendar-filter-option-label')?.textContent)).toEqual(['Birthdays', 'Deadlines'])
    expect(rows.map((row) => row.querySelector('.calendar-filter-option-count')?.textContent)).toEqual(['1', '1'])
    expect(rows.map((row) => row.getAttribute('aria-pressed'))).toEqual(['true', 'false'])

    await act(async () => fireEvent.click(rows[1]))
    await waitFor(() => expect(mock.datasets.get('calendar.note_date_sources')?.find((row) => row.id === 'deadlines')?.definition).toMatchObject({ visible: true }))
    expect(button.textContent).toBe('')
    expect(button).not.toHaveClass('active')
  })

  it('uses the rail To-Do glyph for contributed tasks in Agenda', async () => {
    const { container } = render(React.createElement(AgendaPanel))
    await screen.findByText('Agenda todo')
    const glyph = container.querySelector('.agenda-card[data-calendar-item-id="todo-agenda"] .calendar-chip-glyph path')
    expect(glyph).toHaveAttribute('d', expect.stringContaining('M3 6a1 1'))
    expect(glyph).toHaveAttribute('fill', 'currentColor')
    const disposeStyles = injectCalendarStyles()
    expect(document.getElementById('notes-calendar-styles')?.textContent).toContain('.agenda-card-title { display: flex; align-items: flex-start; gap: 5px; }')
    disposeStyles()
  })

  it('searches Agenda titles and clears with Escape', async () => {
    render(React.createElement(AgendaPanel))
    await screen.findByText('Agenda todo')
    const search = screen.getByRole('textbox', { name: 'Search agenda' })

    fireEvent.change(search, { target: { value: 'todo' } })
    expect(screen.getByText('Agenda todo')).toBeInTheDocument()
    expect(screen.queryByText('Agenda event')).not.toBeInTheDocument()

    fireEvent.keyDown(search, { key: 'Escape' })
    expect(screen.getByText('Agenda event')).toBeInTheDocument()
  })

  it('merges adjacent Calendar group selections into independent rounded runs', async () => {
    mock = setupCalendarApi({
      groups: [
        { id: 'apple', name: 'Apple', color: 'palette:gray' },
        { id: 'next', name: 'Next', color: 'palette:purple' },
        { id: 'pixar', name: 'Pixar', color: 'palette:orange' },
        { id: 'design', name: 'Design', color: 'palette:cyan' },
        { id: 'focus', name: 'Focus', color: 'palette:green' }
      ]
    })
    await act(async () => render(React.createElement(AgendaPanel)))

    await act(async () => fireEvent.click(await screen.findByRole('button', { name: /Groups/ })))
    await act(async () => render(React.createElement(React.Fragment, null, mock.popovers.at(-1)?.node)))
    await act(async () => fireEvent.click(screen.getByRole('button', { name: /^Pixar/ })))

    const apple = screen.getByRole('button', { name: /^Apple/ })
    const next = screen.getByRole('button', { name: /^Next/ })
    const pixar = screen.getByRole('button', { name: /^Pixar/ })
    const design = screen.getByRole('button', { name: /^Design/ })
    const focus = screen.getByRole('button', { name: /^Focus/ })
    expect(apple).toHaveClass('active', 'selection-run-start')
    expect(apple).not.toHaveClass('selection-run-end')
    expect(next).toHaveClass('active', 'selection-run-end')
    expect(next).not.toHaveClass('selection-run-start')
    expect(pixar).not.toHaveClass('active', 'selection-run-start', 'selection-run-end')
    expect(design).toHaveClass('active', 'selection-run-start')
    expect(design).not.toHaveClass('selection-run-end')
    expect(focus).toHaveClass('active', 'selection-run-end')
    expect(focus).not.toHaveClass('selection-run-start')

    const disposeStyles = injectCalendarStyles()
    const css = document.getElementById('notes-calendar-styles')?.textContent ?? ''
    expect(css).toContain('.calendar-filter-option.active:hover {\n  background: color-mix(in srgb, var(--title-color) 14%, transparent);')
    expect(css).toContain('.calendar-filter-option.active:has(+ .calendar-filter-option:hover)')
    expect(css).toContain('.calendar-filter-option:hover + .calendar-filter-option.active')
    disposeStyles()
  })

  it('orders dated sections newest to oldest', async () => {
    const { container } = render(React.createElement(AgendaPanel))
    await screen.findByText('Agenda event')
    expect([...container.querySelectorAll('.agenda-card-title')].map((node) => node.textContent)).toEqual([
      'Agenda event',
      'Agenda todo'
    ])
  })

  it('opens a sourced item in Calendar main without moving or pulsing Agenda', async () => {
    const { container } = render(React.createElement(React.Fragment, null,
      React.createElement(AgendaPanel),
      React.createElement(Calendar)
    ))

    await waitFor(() => expect(container.querySelector('.agenda-card[data-calendar-item-id="todo-agenda"]')).toBeTruthy())
    const agendaCard = container.querySelector<HTMLElement>('.agenda-card[data-calendar-item-id="todo-agenda"]')!
    fireEvent.click(agendaCard)

    expect(mock.api.workspace.openFile).not.toHaveBeenCalled()
    await waitFor(() => expect(mock.api.workspace.openMainTab).toHaveBeenCalled())
    const tc = await readTimeControl()
    expect(tc.view).toBe('month')
    expect(tc.selectedDate).toBe('2026-06-08')
    expect(tc.selectedTime).toBe('09:00')
    expect(providerOpen).not.toHaveBeenCalled()
    expect(mock.api.workspace.revealOwnPanel).not.toHaveBeenCalled()
    expect(agendaCard).not.toHaveClass('calendar-reveal-target')
    await waitFor(() => expect(
      container.querySelector('.calendar-chip[data-calendar-item-id="todo-agenda"]')
    ).toHaveClass('calendar-reveal-target'))

    const disposeStyles = injectCalendarStyles()
    const css = document.getElementById('notes-calendar-styles')?.textContent ?? ''
    expect(css).toContain('.calendar-reveal-target::after')
    expect(css).toContain('background: var(--accent-color)')
    expect(css).toContain('animation: calendar-reveal-fill-pulse 1.8s ease-out')
    disposeStyles()
  })

  it('opens a Calendar-owned event in Calendar main without pulsing Agenda', async () => {
    render(React.createElement(AgendaPanel))

    const title = await screen.findByText('Agenda event')
    fireEvent.click(title)

    expect(mock.api.workspace.openFile).not.toHaveBeenCalled()
    await waitFor(() => expect(mock.api.workspace.openMainTab).toHaveBeenCalled())
    const tc = await readTimeControl()
    expect(tc.view).toBe('month')
    expect(tc.cursor).toBe('2026-07-01')
    expect(tc.selectedDate).toBe('2026-07-12')
    expect(tc.selectedTime).toBe('14:30')
    expect(mock.api.workspace.revealOwnPanel).not.toHaveBeenCalled()
    expect(title.closest('.agenda-card')).not.toHaveClass('calendar-reveal-target')
  })

  it('edits Agenda events in a modal without opening a main tab or Properties', async () => {
    render(React.createElement(AgendaPanel))

    const title = await screen.findByText('Agenda event')
    fireEvent.click(title)
    fireEvent.doubleClick(title)

    expect(screen.getByRole('dialog', { name: 'Edit Event' })).toBeInTheDocument()
    expect(await screen.findByDisplayValue('Agenda event')).toBeInTheDocument()
    expect(screen.getByLabelText('Title')).toHaveAttribute('data-modal-initial-focus', 'true')
    expect(mock.api.workspace.showProperties).not.toHaveBeenCalled()
    expect(mock.api.workspace.openMainTab).not.toHaveBeenCalled()
    expect(mock.api.workspace.revealOwnPanel).not.toHaveBeenCalled()
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated agenda event' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(await screen.findByText('Updated agenda event')).toBeInTheDocument()
  })

  it('offers the note behind a right-click instead', async () => {
    render(React.createElement(AgendaPanel))

    fireEvent.contextMenu(await screen.findByText('Agenda event'))

    await waitFor(() => expect(mock.menus).not.toHaveLength(0))
    const openNote = mock.menus.at(-1)?.find((entry) => entry.id === 'open-note')
    expect(openNote).toBeTruthy()
    await act(async () => {
      await openNote?.onSelect?.()
    })
    expect(mock.api.workspace.openFile).toHaveBeenCalledWith('Notes/Event.md')
  })
})

describe('Calendar wheel navigation', () => {
  beforeEach(() => {
    setupCalendarApi()
    patchTimeControl({
      view: 'week',
      cursor: '2026-07-01',
      selectedDate: '2026-07-20',
      rangeStart: null,
      rangeEnd: null,
      selectedTime: null
    })
    flushTimeControl()
  })

  it('keeps one trackpad swipe burst to one week step', async () => {
    vi.useFakeTimers()
    const { container } = render(React.createElement(Calendar))
    await act(async () => {})
    const stage = container.querySelector('.calendar-stage') as HTMLElement

    expect(screen.getByRole('heading', { name: /W30\s+2026/i })).toBeInTheDocument()

    fireEvent.wheel(stage, { deltaX: -70, deltaY: 0 })
    expect(screen.getByRole('heading', { name: /W29\s+2026/i })).toBeInTheDocument()

    act(() => { vi.advanceTimersByTime(20) })
    fireEvent.wheel(stage, { deltaX: -20, deltaY: 40 })
    act(() => { vi.advanceTimersByTime(20) })
    fireEvent.wheel(stage, { deltaX: -80, deltaY: 0 })

    expect(screen.getByRole('heading', { name: /W29\s+2026/i })).toBeInTheDocument()

    act(() => { vi.advanceTimersByTime(SWIPE_IDLE_MS + 10) })
    fireEvent.wheel(stage, { deltaX: -70, deltaY: 0 })

    expect(screen.getByRole('heading', { name: /W28\s+2026/i })).toBeInTheDocument()
  })

  it('accepts a fast second month swipe without waiting for the first momentum tail to end', async () => {
    vi.useFakeTimers()
    patchTimeControl({
      view: 'month',
      cursor: '2026-07-01',
      selectedDate: '2026-07-20',
      rangeStart: null,
      rangeEnd: null,
      selectedTime: null
    })
    flushTimeControl()
    const { container } = render(React.createElement(Calendar))
    await act(async () => {})
    const stage = container.querySelector('.calendar-stage') as HTMLElement

    expect(screen.getByRole('heading', { name: /Jul\s+2026/i })).toBeInTheDocument()

    fireEvent.wheel(stage, { deltaX: -90, deltaY: 0 })
    expect(screen.getByRole('heading', { name: /Jun\s+2026/i })).toBeInTheDocument()

    for (const d of [-60, -32, -14]) fireEvent.wheel(stage, { deltaX: d, deltaY: 0 })
    fireEvent.wheel(stage, { deltaX: -20, deltaY: 0 })
    expect(screen.getByRole('heading', { name: /Jun\s+2026/i })).toBeInTheDocument()

    fireEvent.wheel(stage, { deltaX: -50, deltaY: 0 })
    expect(screen.getByRole('heading', { name: /May\s+2026/i })).toBeInTheDocument()
  })
})

describe('Note dates on the calendar', () => {
  const specimen = (relPath: string, frontmatter: Record<string, unknown>): IndexEntry => ({
    relPath,
    title: relPath.replace(/^.*\//, '').replace(/\.md$/, ''),
    kind: 'note',
    frontmatter,
    mtimeMs: 0
  })

  const setup = (source: Partial<DataRecord> = {}, view: 'month' | 'week' = 'month'): MockValleyApi => {
    const mock = setupCalendarApi({
      indexEntries: [
        specimen('Biodiversity/Fern.md', {
          type: 'species',
          observed: '1990-05-04',
          reading: 'forest-radio'
        })
      ],
      noteDateSources: [
          {
            id: 'b1',
            title: 'Emergence dates',
            matchKey: 'type',
            matchValue: 'species',
            dateField: 'observed',
            match: 'day-month',
            showCount: true,
            showFields: ['reading'],
            icon: 'cake',
            ...source
          } as DataRecord
        ]
    })
    patchTimeControl({
      view,
      cursor: '2026-05-01',
      selectedDate: '2026-05-04',
      rangeStart: null,
      rangeEnd: null,
      selectedTime: null
    })
    flushTimeControl()
    return mock
  }

  it('renders a yearly note date as a read-only chip and selects it without opening its note', async () => {
    const mock = setup()
    const { container } = render(React.createElement(CalendarPage))
    const chip = await screen.findByRole('button', { name: /Fern \(36\)/ })

    expect(chip).toHaveClass('calendar-chip')
    expect(chip.getAttribute('title')).toContain('reading: forest-radio')
    expect(container.querySelector('.calendar-chip-glyph')).toBeInTheDocument()

    fireEvent.click(chip)
    expect(chip).toHaveClass('selected')
    expect(mock.api.workspace.openFile).not.toHaveBeenCalled()
  })

  it('paints the source colour, and falls back to the neutral precedence without one', async () => {
    setup({ color: '#ec4899' })
    const { container } = render(React.createElement(CalendarPage))
    await screen.findByRole('button', { name: /Fern \(36\)/ })
    const chip = container.querySelector('.calendar-chip') as HTMLElement
    expect(chip.style.getPropertyValue('--chip-color')).toBe('#ec4899')

    cleanup()
    setup({ color: undefined })
    const bare = render(React.createElement(CalendarPage))
    await screen.findByRole('button', { name: /Fern \(36\)/ })
    const plain = bare.container.querySelector('.calendar-chip') as HTMLElement
    expect(plain.style.getPropertyValue('--chip-color')).not.toBe('#ec4899')
  })

  // The month grid routes right-click to the day cell; the week all-day strip is
  // where an item's own menu opens. The mock's openMenu is a plain function, so
  // capture the items it is handed.
  it('offers no edit or delete in its context menu, only the note', async () => {
    const mock = setup({}, 'week')
    const menus: { label: string; enabled?: boolean; onSelect?: () => void }[][] = []
    mock.api.ui.openMenu = (async (items: { label: string; enabled?: boolean; onSelect?: () => void }[]) => {
      menus.push(items)
      return null
    }) as unknown as typeof mock.api.ui.openMenu
    render(React.createElement(CalendarPage))
    const chip = await screen.findByRole('button', { name: /Fern \(36\)/ })

    fireEvent.contextMenu(chip)
    await waitFor(() => expect(menus.length).toBe(1))
    const menu = menus[0]
    expect(menu.some((m) => m.onSelect && /delete/i.test(m.label))).toBe(false)
    expect(menu.some((m) => m.label === 'reading' && m.enabled === false)).toBe(true)
    const open = menu.find((m) => m.onSelect)
    expect(open).toBeTruthy()
    open?.onSelect?.()
    expect(mock.api.workspace.openFile).toHaveBeenCalledWith('Biodiversity/Fern.md')
  })

  it('lists the entry in the agenda panel, in its own day section', async () => {
    setup()
    const { container } = render(React.createElement(AgendaPanel))
    await waitFor(() => expect(container.querySelector('.agenda-card')).toBeInTheDocument())
    expect(container.querySelector('.agenda-card-title')?.textContent).toContain('Fern')
    // The separate "Upcoming" block is gone — a note date is an agenda row like
    // any other, so it is never listed twice.
    expect(container.querySelector('.agenda-upcoming')).not.toBeInTheDocument()
  })

  it('drops note dates from every surface when the sources filter switches them off', async () => {
    const mock = setup()
    const { container } = render(React.createElement(AgendaPanel))
    await waitFor(() => expect(container.querySelector('.agenda-card')).toBeInTheDocument())

    await act(async () => {
      mock.api.settings.set('hiddenSources', ['calendar:noteDates'])
      // The host broadcasts this after a settings write; the mock does not.
      window.dispatchEvent(new Event('valley:plugin-settings-changed'))
    })

    await waitFor(() => expect(container.querySelector('.agenda-card')).not.toBeInTheDocument())
    // Persisted, so the choice survives a remount and a restart.
    expect(mock.driverCalls).toContainEqual({
      driver: 'settings',
      method: 'updatePluginSettings',
      payload: { pluginId: 'calendar', key: 'hiddenSources', value: ['calendar:noteDates'] }
    })
  })

  it('drops the entries entirely when the source is hidden', async () => {
    setup({ hidden: true })
    const { container } = render(React.createElement(CalendarPage))
    await screen.findByRole('heading', { name: /May\s+2026/i })
    expect(container.querySelector('.calendar-chip')).not.toBeInTheDocument()
  })
})

describe('Note dates settings section', () => {
  it('renders the source editor for the "dates" section and adds a prefilled source', async () => {
    const mock = setupCalendarApi()
    render(React.createElement(CalendarSettings, { section: 'dates' }))

    const add = await screen.findByRole('button', { name: /Add source/i })
    expect(CALENDAR_PLUGIN_CONFIG.settingsSections).toContainEqual(
      expect.objectContaining({
        id: 'dates'
      })
    )
    expect(CALENDAR_PLUGIN_CONFIG.datasets).toContainEqual(
      expect.objectContaining({ id: 'note_date_sources', store: 'durable' })
    )

    // Add offers the presets first; "Blank source" is the old behaviour.
    await act(async () => {
      fireEvent.click(add)
    })
    const menu = mock.menus.at(-1) ?? []
    expect(menu.map((entry) => entry.id)).toEqual([
      'birthdays',
      'anniversaries',
      'deadlines',
      undefined,
      'blank'
    ])
    await act(async () => {
      await menu.find((entry) => entry.id === 'blank')?.onSelect?.()
    })

    // Prefilled defaults land in the row and are persisted to the durable dataset.
    expect(await screen.findByDisplayValue('type')).toBeInTheDocument()
    expect(screen.getByDisplayValue('date')).toBeInTheDocument()
    await waitFor(() => {
      const written = mock.datasets.get('calendar.note_date_sources') ?? []
      expect(written).toHaveLength(1)
      expect(written[0].definition).toMatchObject({ matchKey: 'type', dateField: 'date', match: 'exact' })
    })
  })

  it('adds the Birthdays preset already configured for contact notes', async () => {
    const mock = setupCalendarApi()
    render(React.createElement(CalendarSettings, { section: 'dates' }))

    const add = await screen.findByRole('button', { name: /Add source/i })
    await act(async () => {
      fireEvent.click(add)
    })
    await act(async () => {
      await mock.menus.at(-1)?.find((entry) => entry.id === 'birthdays')?.onSelect?.()
    })

    await waitFor(() => {
      const written = mock.datasets.get('calendar.note_date_sources') ?? []
      expect(written).toHaveLength(1)
      expect(written[0].definition).toMatchObject({
        title: 'Birthdays',
        matchKey: 'type',
        matchValue: 'contact',
        dateField: 'birthdate',
        match: 'day-month',
        showCount: true,
        icon: 'cake'
      })
    })
  })

  it('reports what each rule finds, and warns when it finds nothing', async () => {
    const specimen = (relPath: string, frontmatter: Record<string, unknown>): IndexEntry => ({
      relPath,
      title: relPath.replace(/\.md$/, ''),
      kind: 'note',
      frontmatter,
      mtimeMs: 0
    })
    const rule = (over: Partial<DataRecord>): DataRecord =>
      ({
        id: 'b1',
        title: 'Emergence dates',
        matchKey: 'type',
        dateField: 'observed',
        match: 'day-month',
        ...over
      }) as DataRecord

    const setupRule = (over: Partial<DataRecord>): void => {
      setupCalendarApi({
        indexEntries: [
          specimen('Biodiversity/Fern.md', { type: 'species', observed: '1990-05-04' }),
          specimen('Biodiversity/Lichen.md', { type: 'species' })
        ],
        noteDateSources: [rule(over)]
      })
    }

    setupRule({ matchValue: 'species' })
    const { container } = render(React.createElement(CalendarSettings, { section: 'dates' }))
    const stats = await waitFor(() => {
      const el = container.querySelector('.notedate-source-stats')
      expect(el).toBeInTheDocument()
      return el as HTMLElement
    })
    expect(stats.textContent).toBe('2 notes match · 1 with a usable date')
    expect(stats).not.toHaveClass('warn')

    // The exact live-vault failure: a plural value nothing in the vault uses.
    cleanup()
    setupRule({ matchValue: 'animals' })
    const missed = render(React.createElement(CalendarSettings, { section: 'dates' }))
    const warn = await waitFor(() => {
      const el = missed.container.querySelector('.notedate-source-stats')
      expect(el).toBeInTheDocument()
      return el as HTMLElement
    })
    expect(warn.textContent).toBe('No notes match type: animals')
    expect(warn).toHaveClass('warn')

    // Matching notes, but the date property does not exist on them.
    cleanup()
    setupRule({ matchValue: 'species', dateField: 'date' })
    const undated = render(React.createElement(CalendarSettings, { section: 'dates' }))
    await waitFor(() => {
      expect(undated.container.querySelector('.notedate-source-stats')?.textContent).toBe(
        '2 notes match · none has a usable date'
      )
    })
  })

  it('shows and persists the optional end only for recurring sources', async () => {
    const repeating = setupCalendarApi({
      noteDateSources: [{
          id: 'b1',
          title: 'Emergence dates',
          matchKey: 'type',
          matchValue: 'species',
          dateField: 'observed',
          match: 'day-month'
        }]
    })
    render(React.createElement(CalendarSettings, { section: 'dates' }))

    const end = await screen.findByRole('spinbutton', { name: 'Recurring date range in years' })
    expect(end).toHaveValue(null)
    fireEvent.change(end, { target: { value: '4' } })
    fireEvent.blur(end)
    await waitFor(() => {
      expect(repeating.datasets.get('calendar.note_date_sources')?.[0]?.definition).toMatchObject({ recurrenceLimitYears: 4 })
    })

    fireEvent.change(end, { target: { value: '' } })
    fireEvent.blur(end)
    await waitFor(() => {
      const definition = repeating.datasets.get('calendar.note_date_sources')?.[0]?.definition as DataRecord | undefined
      expect(definition?.recurrenceLimitYears).toBeUndefined()
    })

    cleanup()
    setupCalendarApi({
      noteDateSources: [{
          id: 'once',
          title: 'Deadline',
          matchKey: 'type',
          matchValue: 'task',
          dateField: 'due',
          match: 'exact'
        }]
    })
    render(React.createElement(CalendarSettings, { section: 'dates' }))
    await screen.findByDisplayValue('Deadline')
    expect(screen.queryByRole('spinbutton', { name: 'Recurring date range in years' })).not.toBeInTheDocument()
  })

  it('keeps the plain Calendar pane on the default section', async () => {
    setupCalendarApi()
    render(React.createElement(CalendarSettings, {}))
    expect(screen.queryByRole('button', { name: /Add source/i })).not.toBeInTheDocument()
  })
})

describe('grid hour window', () => {
  const at = (startTime?: string, endTime?: string): CalItem =>
    ({ kind: 'event', id: `i-${startTime ?? 'all'}`, title: 't', date: '2026-08-14', startTime, endTime })

  it('opens on the configured day, when everything fits inside it', () => {
    expect(gridHourWindow([at('09:00', '10:00')], 7, 22)).toEqual({ startHour: 7, endHour: 22 })
  })

  it('reaches up for an item that starts before the day does', () => {
    // Otherwise a 06:30 stand-up is simply invisible, with nothing on screen
    // saying anything was missed.
    expect(gridHourWindow([at('06:30', '07:15')], 7, 22)).toEqual({ startHour: 6, endHour: 22 })
  })

  it('reaches down for an item that ends after the day does', () => {
    expect(gridHourWindow([at('23:00', '23:30')], 7, 22)).toEqual({ startHour: 7, endHour: 24 })
  })

  it('covers an item with no end time by its starting hour', () => {
    expect(gridHourWindow([at('23:30')], 7, 22)).toEqual({ startHour: 7, endHour: 24 })
  })

  it('ignores all-day items, which never sit in the time grid', () => {
    expect(gridHourWindow([at(undefined)], 7, 22)).toEqual({ startHour: 7, endHour: 22 })
  })

  it('never inverts, even when the stored hours are nonsense', () => {
    const { startHour, endHour } = gridHourWindow([], 20, 3)
    expect(endHour).toBeGreaterThan(startHour)
  })
})

describe('note date presets', () => {
  it('builds the Birthdays source the settings screenshot describes', () => {
    expect(presetNoteDateSource('birthdays', [])).toMatchObject({
      title: 'Birthdays',
      matchKey: 'type',
      matchValue: 'contact',
      dateField: 'birthdate',
      match: 'day-month',
      showCount: true,
      icon: 'cake'
    })
  })

  it('picks a colour the existing sources are not already using', () => {
    const first = presetNoteDateSource('birthdays', [])
    const second = presetNoteDateSource('anniversaries', [first])
    expect(second.color).not.toBe(first.color)
  })

  it('falls back to a blank source for an id it does not know', () => {
    expect(presetNoteDateSource('nope', []).matchValue).toBe('')
  })
})

describe('Synced calendars section', () => {
  const account: ConnectedAccount = {
    kind: 'oauth', id: 'canopy-account', provider: 'google', address: 'canopy@biodiversity.example',
    displayName: 'Canopy', capabilities: ['calendar'], scopes: [], createdAt: 1, secretState: 'ok'
  }
  const calendars = [{ id: 'primary', name: 'Fieldwork', primary: true }, { id: 'shared', name: 'Bird surveys', primary: false }]
  const connect = (mock: MockValleyApi): void => {
    vi.spyOn(calendarServices(mock.api), 'listAccounts').mockResolvedValue({ ok: true, data: { accounts: [account] } })
    vi.spyOn(calendarServices(mock.api), 'listCalendarConnections').mockResolvedValue({ ok: true, data: { accounts: [account], providers: [] } })
    vi.spyOn(calendarServices(mock.api), 'listCalendars').mockResolvedValue({ ok: true, data: { calendars } })
    vi.spyOn(calendarServices(mock.api), 'fetchCalendar').mockImplementation(async (_id, _min, _max, calendarId) => ({
      ok: true, data: { events: [{ ...newEvent(`${calendarId} observation`, '2026-08-31'), id: `google:${calendarId}` }] }
    }))
  }

  it('keeps saved provider setups visible without pretending they are connected', async () => {
    const mock = setupCalendarApi()
    vi.spyOn(calendarServices(mock.api), 'listCalendarConnections').mockResolvedValue({ ok: true, data: {
      accounts: [], providers: [{ id: 'google', name: 'Google', configured: true, capabilities: ['calendar'] }]
    } })
    render(React.createElement(CalendarSettings, { section: 'sync' }))
    fireEvent.click(await screen.findByRole('button', { name: /Google Credentials saved/ }))
    expect(screen.getByText(/no account is connected yet/i)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Manage accounts' }))
    expect(mock.api.workspace.openSettings).toHaveBeenCalledWith('accounts')
    expect(calendarServices(mock.api).fetchCalendar).not.toHaveBeenCalled()
  })

  it('persists calendar selection and group assignment under the existing account', async () => {
    const mock = setupCalendarApi({ groups: [{ id: 'fieldwork', name: 'Field Work', color: '#338855' }] })
    connect(mock)
    render(React.createElement(CalendarSettings, { section: 'sync' }))
    fireEvent.click(await screen.findByRole('button', { name: /Canopy canopy@biodiversity.example Connected/ }))
    const shared = await screen.findByRole('switch', { name: 'Sync Bird surveys' })
    expect(shared).not.toBeChecked()
    await act(async () => fireEvent.click(shared))
    const group = await screen.findByRole('combobox', { name: 'Group for Bird surveys' })
    await act(async () => fireEvent.change(group, { target: { value: 'fieldwork' } }))
    await waitFor(() => expect(getRemoteStore().getEvents()).toContainEqual(expect.objectContaining({
      id: 'google:shared', groupId: 'fieldwork', group: 'Field Work', calendarId: 'shared', readOnly: true
    })))
    expect(mock.api.settings.get().remoteCalendars).toEqual({ 'canopy-account': { shared: { enabled: true, groupId: 'fieldwork' } } })
  })

  it('retains cached events on failure and excludes disabled calendars from later pulls', async () => {
    const mock = setupCalendarApi({ settings: { remoteCalendars: { 'canopy-account': { shared: { enabled: true } } } } })
    connect(mock)
    const store = getRemoteStore()
    await store.sync()
    expect(store.getEvents()).toHaveLength(2)
    vi.mocked(calendarServices(mock.api).fetchCalendar).mockResolvedValue({ ok: false, error: 'Offline' })
    await store.sync()
    expect(store.getEvents()).toHaveLength(2)
    expect(store.getStatus().accounts[account.id].error).toContain('Offline')
    await mock.api.settings.set('remoteCalendars', { [account.id]: { shared: { enabled: false } } })
    vi.mocked(calendarServices(mock.api).fetchCalendar).mockClear()
    await store.sync()
    expect(store.getEvents().map((event) => event.calendarId)).toEqual(['primary'])
    expect(calendarServices(mock.api).fetchCalendar).toHaveBeenCalledTimes(1)
    vi.mocked(calendarServices(mock.api).listAccounts).mockResolvedValue({ ok: false, error: 'Account list unavailable' })
    await store.sync()
    expect(store.getEvents()).toHaveLength(1)
    expect(store.getStatus().error).toBe('Account list unavailable')
  })

  it('honors an account being disabled during an in-flight sync', async () => {
    const mock = setupCalendarApi()
    connect(mock)
    let finish!: (value: Awaited<ReturnType<ReturnType<typeof calendarServices>['fetchCalendar']>>) => void
    vi.mocked(calendarServices(mock.api).fetchCalendar).mockImplementation(() => new Promise((resolve) => { finish = resolve }))
    const store = getRemoteStore()
    const pending = store.sync()
    await waitFor(() => expect(finish).toBeTypeOf('function'))
    await mock.api.settings.set('disabledCalendarAccounts', [account.id])
    finish({ ok: true, data: { events: [{ ...newEvent('Late result', '2026-08-31'), id: 'google:late' }] } })
    await pending
    expect(store.getEvents()).toEqual([])
  })

  it('is declared as its own settings sub-page', () => {
    expect(CALENDAR_PLUGIN_CONFIG.settingsSections).toContainEqual(
      expect.objectContaining({ id: 'sync', labelKey: 'plugin.calendar.section.sync' })
    )
  })

  it('renders the account list, and the Calendar page no longer does', async () => {
    setupCalendarApi()
    const sync = render(React.createElement(CalendarSettings, { section: 'sync' }))
    expect(await screen.findByText(/No calendar accounts connected yet/i)).toBeInTheDocument()
    sync.unmount()

    render(React.createElement(CalendarSettings, {}))
    expect(screen.queryByText(/No calendar accounts connected yet/i)).not.toBeInTheDocument()
    // The day window leads instead.
    expect(await screen.findByText('Day start hour')).toBeInTheDocument()
    expect(screen.getByText('Day end hour')).toBeInTheDocument()
  })
})

describe('Calendar item destination setting', () => {
  it('defaults to the owning plugin and persists the Calendar Agenda choice', async () => {
    const mock = setupCalendarApi()
    await act(async () => render(React.createElement(CalendarSettings, {})))

    const field = await screen.findByRole('combobox', { name: 'Open items in' })
    expect(field).toHaveValue('owner')
    expect(field).toHaveTextContent('Owning plugin')
    expect(field).toHaveTextContent('Calendar Agenda')

    await act(async () => fireEvent.change(field, { target: { value: 'agenda' } }))
    expect(mock.driverCalls).toContainEqual({
      driver: 'settings',
      method: 'updatePluginSettings',
      payload: { pluginId: 'calendar', key: 'itemClickTarget', value: 'agenda' }
    })
  })
})

describe('Calendar plugin integrations section', () => {
  it('uses the shared Plugins glyph and Calendar-only top spacing', async () => {
    setupCalendarApi()
    const { container } = render(React.createElement(CalendarSettings, { section: 'plugins' }))

    expect(CALENDAR_PLUGIN_CONFIG.settingsSections).toContainEqual(
      expect.objectContaining({ id: 'plugins', icon: 'blocks' })
    )
    expect(container.querySelector('.calendar-plugins-settings')).toBeInTheDocument()

    const disposeStyles = injectCalendarStyles()
    const css = document.getElementById('notes-calendar-styles')?.textContent ?? ''
    expect(css).toContain('.calendar-plugins-settings {\n  margin-top: var(--space-3);')
    disposeStyles()
  })

  it('discovers a provider registered while the settings view subscribes', async () => {
    const mock = createMockValleyApi({
      manifest: {
        id: 'calendar',
      indexState: 'scoped',
        datasets: CALENDAR_PLUGIN_CONFIG.datasets as unknown as ValleyPluginManifest['datasets']
      }
    })
    const subscribe = mock.api.interop.services.subscribe
    let registered = false
    mock.api.interop.services.subscribe = vi.fn((contract, listener) => {
      if (contract.id === CALENDAR_ITEM_SOURCE_V2.id && !registered) {
        registered = true
        mock.provideInterop(CALENDAR_ITEM_SOURCE_V2, {
          integration: {
            name: 'To-Do',
            version: '2.0.0',
            author: 'Cedar Lab',
            description: 'Structured task manager.'
          },
          list: pagedSource(async () => [])
        }, 'todo')
      }
      return subscribe(contract, listener)
    })
    Object.assign(calendarServices(mock.api), { listAccounts: vi.fn(async () => ({ ok: true, data: { accounts: [] } })), listCalendarConnections: vi.fn(async () => ({ ok: true, data: { accounts: [], providers: [] } })), listCalendars: vi.fn(async () => ({ ok: true, data: { calendars: [] } })), fetchCalendar: vi.fn(async () => ({ ok: true, data: { events: [] } })) })
  initRuntime(mock.api)

    render(React.createElement(CalendarSettings, { section: 'plugins' }))

    expect(await screen.findByText('To-Do')).toBeInTheDocument()
  })

  it('lists a zero-item provider and delegates visibility and configuration', async () => {
    const mock = setupCalendarApi()
    render(React.createElement(CalendarSettings, { section: 'plugins' }))

    expect(await screen.findByText('To-Do')).toBeInTheDocument()
    expect(screen.getByText('Structured task manager.')).toBeInTheDocument()
    expect(screen.getByText(/2.0.0/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('switch', { name: 'Disable To-Do in Calendar' }))
    expect(mock.driverCalls).toContainEqual({
      driver: 'settings',
      method: 'updatePluginSettings',
      payload: { pluginId: 'calendar', key: 'hiddenSources', value: ['calendar:plugin:todo'] }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Configure To-Do' }))
    await waitFor(() => expect(mock.api.workspace.openOwnSettings).toHaveBeenCalled())
  })

  it('discards stale runtime provider ids', async () => {
    setupCalendarApi({ settings: { hiddenSources: ['provider-17', 'calendar:plugin:todo'] } })
    render(React.createElement(CalendarSettings, { section: 'plugins' }))
    expect(await screen.findByRole('switch', { name: 'Enable To-Do in Calendar' })).not.toBeChecked()
  })
})

describe('Calendar automation and item restoration', () => {
  it('edits an explicit event and refuses stale edits and remote writes', async () => {
    const mock = setupCalendarApi({ events: [
      { id: 'local', title: 'Field work', date: '2026-09-01', updatedAt: 'revision-1' },
      { id: 'google:remote', title: 'Remote meeting', date: '2026-09-01', readOnly: true }
    ] })
    registerCalendarCommands(mock.api)
    expect((await mock.api.commands.execute('calendar:edit-fields', { id: 'local', values: { title: 'Updated field work' }, expectedUpdatedAt: 'stale' })).ok).toBe(false)
    expect((await mock.api.commands.execute('calendar:edit-fields', { id: 'google:remote', values: { title: 'Changed' } })).ok).toBe(false)
    const saved = await mock.api.commands.execute('calendar:edit-fields', { id: 'local', values: { title: 'Updated field work', startTime: '09:00', endTime: '10:00' }, expectedUpdatedAt: 'revision-1' })
    expect(saved.ok).toBe(true)
    expect(mock.datasets.get('calendar.events')?.find((row) => row.id === 'local')).toMatchObject({ title: 'Updated field work', startTime: '09:00', allDay: false })
    expect(mock.busUndo).toHaveLength(1)
  })

  it('restores item identity and leaves the current view intact when a target is missing', async () => {
    const mock = setupCalendarApi({ events: [{ id: 'local', title: 'Field work', date: '2026-09-01' }] })
    const provider = mock.api.interop.extensions.providers(PLUGIN_SURFACE_V1).find((entry) => entry.extension.surface === 'main_workspace')!.extension
    const state = { v: 1, view: 'month', cursor: '2026-09-01', selectedDate: '2026-09-01', itemId: 'local', kind: 'event' }
    await provider.restore(state)
    expect(provider.getSnapshot().item?.state.itemId).toBe('local')
    await expect(provider.restore({ ...state, itemId: 'missing' })).rejects.toThrow('no longer exists')
    expect(provider.getSnapshot().item?.state.itemId).toBe('local')
  })
})
