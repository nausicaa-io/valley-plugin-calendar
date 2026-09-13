import { afterEach, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { CALENDAR_ITEM_SOURCE_REVISION_V1, CALENDAR_ITEM_SOURCE_V1, type CalendarSourceItem } from '@valley/plugin-sdk'
import { createMockValleyApi } from './harness'
import { initRuntime } from '../src/runtime'
import { useSourcedItems } from '../src/itemSources'
import { createReloadQueue } from '../src/reloadQueue'
import { useCalendarData } from '../src/useCalendarData'
import { AgendaPanel } from '../src/AgendaPanel'
import { initLocalization } from '../src/localization'
import { loadEvents } from '../src/events'
import { loadNoteDateSources, saveNoteDateSources } from '../src/noteDateStore'
import { defaultNoteDateSource } from '../src/noteDates'

afterEach(cleanup)

it('keeps Agenda typing, clear, and Escape inside the same shared search frame', async () => {
  const mock = createMockValleyApi({ manifest: { id: 'calendar' } })
  initRuntime(mock.api)
  initLocalization(mock.api)
  render(React.createElement(AgendaPanel))
  const input = await screen.findByRole('textbox', { name: 'Search agenda' })
  const frame = input.parentElement!
  expect(frame).toHaveClass('search-field')
  expect(input).toHaveClass('search-field-input')
  expect(frame.querySelector('.search-field-icon')).toBeInTheDocument()
  fireEvent.change(input, { target: { value: 'moss' } })
  const clear = screen.getByRole('button', { name: 'Clear search' })
  expect(clear).toHaveClass('search-field-action')
  expect(clear.parentElement).toBe(frame)
  fireEvent.click(clear)
  expect(input).toHaveValue('')
  fireEvent.change(input, { target: { value: 'fern' } })
  fireEvent.keyDown(input, { key: 'Escape' })
  expect(input).toHaveValue('')
  expect(screen.getByRole('textbox', { name: 'Search agenda' })).toBe(input)
})

it('shares a contributed-item burst across mounted surfaces and publishes the newest result', async () => {
  const mock = createMockValleyApi({ manifest: { id: 'calendar' } })
  initRuntime(mock.api)
  let release!: () => void
  const held = new Promise<void>((resolve) => { release = resolve })
  let title = 'Before'
  const list = vi.fn(async () => {
    const snapshot = title
    await held
    return [{ id: 'fern', title: snapshot, date: '2026-08-24' }]
  })
  const offProvider = mock.provideInterop(CALENDAR_ITEM_SOURCE_V1, { list }, 'todo')
  const main = renderHook(useSourcedItems)
  const sidebar = renderHook(useSourcedItems)
  expect(list).toHaveBeenCalledTimes(1)
  await act(async () => {
    title = 'After'
    for (let revision = 1; revision <= 20; revision++) {
      mock.api.interop.state.publish(CALENDAR_ITEM_SOURCE_REVISION_V1, revision)
    }
  })
  expect(list).toHaveBeenCalledTimes(1)
  await act(async () => { release() })
  await waitFor(() => {
    expect(main.result.current.items[0]?.item.title).toBe('After')
    expect(sidebar.result.current.items[0]?.item.title).toBe('After')
  })
  expect(list).toHaveBeenCalledTimes(2)
  main.unmount(); sidebar.unmount(); offProvider()
})

it('shares identical event ranges without conflating different ranges', async () => {
  const mock = createMockValleyApi({ manifest: { id: 'calendar' }, datasets: { 'calendar.events': [{ id: 'fern', title: 'Fern', date: '2026-08-24' }] } })
  initRuntime(mock.api)
  const dataset = mock.api.data.dataset
  const ranges: unknown[] = []
  mock.api.data.dataset = ((id: string) => {
    const handle = dataset(id)
    return { ...handle, query: async (query) => { if (id === 'calendar.events') ranges.push(query?.where); return handle.query(query) } }
  }) as typeof dataset
  const results = await Promise.all([loadEvents('2026-08-01', '2026-08-31'), loadEvents('2026-08-01', '2026-08-31'), loadEvents('2026-09-01', '2026-09-30')])
  expect(ranges).toHaveLength(2)
  expect(results.map((items) => items.length)).toEqual([1, 1, 0])
})

it.each([999, 1000, 1001])('loads and edits every one of %i note-date sources atomically', async (count) => {
  const sources = Array.from({ length: count }, (_, position) => ({ ...defaultNoteDateSource(), id: `source-${position}`, title: `Source ${position}` }))
  const mock = createMockValleyApi({ manifest: { id: 'calendar' }, datasets: { 'calendar.note_date_sources': sources.map((definition, position) => ({ id: definition.id, position, definition })) } })
  initRuntime(mock.api)
  expect((await loadNoteDateSources()).map((source) => source.id)).toEqual(sources.map((source) => source.id))
  const next = sources.slice().reverse().map((source) => ({ ...source, title: `${source.title} edited` }))
  await saveNoteDateSources(next)
  expect((await loadNoteDateSources()).map(({id,title})=>({id,title}))).toEqual(next.map(({id,title})=>({id,title})))
  if (count === 1001) {
    await expect(saveNoteDateSources([])).rejects.toThrow('1000 operations')
    expect(await loadNoteDateSources()).toHaveLength(count)
  }
})

it('finishes an accepted read after unmount without starting queued reloads or publishing stale state', async () => {
  let release!: (items: CalendarSourceItem[]) => void
  const read = vi.fn(() => new Promise<CalendarSourceItem[]>((resolve) => { release = resolve }))
  const publish = vi.fn()
  const queue = createReloadQueue(read, publish)
  const first = queue.reload()
  expect(queue.reload()).toBe(first)
  queue.dispose()
  release([{ id: 'fern', title: 'Fern', date: '2026-08-24' }])
  await first
  expect(read).toHaveBeenCalledTimes(1)
  expect(publish).not.toHaveBeenCalled()
})

it('coalesces local event reloads from core-state changes and retains a newer event mutation', async () => {
  const mock = createMockValleyApi({ manifest: { id: 'calendar' }, datasets: {
    'calendar.events': [{ id: 'fern', title: 'Before', date: '2026-08-24' }]
  } })
  initRuntime(mock.api)
  const dataset = mock.api.data.dataset
  let reads = 0
  let release!: () => void
  const held = new Promise<void>((resolve) => { release = resolve })
  mock.api.data.dataset = ((id: string) => {
    const handle = dataset(id)
    return { ...handle, query: async (query) => {
      const first = id === 'calendar.events' && ++reads === 1
      const result = await handle.query(query)
      if (first) await held
      return result
    } }
  }) as typeof dataset
  const hook = renderHook(() => useCalendarData('2026-08-01', '2026-08-31'))
  await act(async () => {
    for (let index = 0; index < 20; index++) mock.emitState({ activePath: `Notes/Fern-${index}.md` })
    await dataset('calendar.events').update({ id: 'fern' }, { title: 'After' })
  })
  expect(reads).toBe(1)
  await act(async () => { release() })
  await waitFor(() => expect(hook.result.current.events[0]?.title).toBe('After'))
  expect(reads).toBe(2)
  hook.unmount()
})

it('keeps read failures observable and permits a later reload', async () => {
  const read = vi.fn().mockRejectedValueOnce(new Error('Unavailable')).mockResolvedValue(['fern'])
  const publish = vi.fn()
  const queue = createReloadQueue(read, publish)
  await expect(queue.reload()).rejects.toThrow('Unavailable')
  await queue.reload()
  expect(publish).toHaveBeenCalledWith(['fern'])
})

it('reports a coalesced fire-and-forget failure once and allows the next refresh', async () => {
  let reject!: (error: Error) => void
  const read = vi.fn().mockImplementationOnce(() => new Promise((_, fail) => { reject = fail })).mockResolvedValue(['fern'])
  const publish = vi.fn()
  const report = vi.fn()
  const queue = createReloadQueue(read, publish, report)
  void queue.reload()
  for (let index = 0; index < 20; index++) void queue.reload()
  const error = new Error('Read unavailable')
  reject(error)
  await waitFor(() => expect(report).toHaveBeenCalledOnce())
  expect(report).toHaveBeenCalledWith(error)
  await queue.reload()
  expect(publish).toHaveBeenCalledWith(['fern'])
})
