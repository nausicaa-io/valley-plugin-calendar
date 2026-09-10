/**
 * Agenda — a flat chronological list of every event and todo (anything with a
 * date), grouped into per-day sections sorted newest→oldest. The Calendar
 * plugin's `left_sidebar` view; reuses the Calendar's data + color layers so
 * there is a single source of truth.
 *
 * It tracks the shared Calendar selection (via the SDK time-control surface).
 * Clicking a card opens the Calendar page at that day without moving or
 * highlighting the sidebar that originated the navigation.
 */
import { React, api, revealTargetStore } from './runtime'
import { selectCalendarProperties, useCalendarSurface } from './surfaces'
import type { ReactElement } from 'react'
import { useTimeControl } from './timeControl'
import { useCalendarItems } from './useCalendarItems'
import { HIDDEN_GROUPS_KEY, HIDDEN_SOURCES_KEY, useCalendarSettings } from './settingsStore'
import { CalendarFilterButton, NoteDateSourceFilterButton } from './filters'
import {
  CalendarAgendaCard,
  eventMenuItems,
  itemFieldMenuItems,
  openItemInCalendarMain,
  openNoteMenuItem,
  sourcedMenuItems,
  type CalItem
} from './items'
import { GroupGlyph, Layers, Search, X } from './icons'
import { localizedMonth, localizedWeekday, parseLocalDate } from './dateMath'
import { uiText } from './localization'
import { QuickAdd, type QuickAddState } from './QuickAdd'
import { editSourcedItem } from './itemSources'

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isoDay(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function AgendaPanel(): ReactElement {
  const today = new Date()
  const todayKey = isoDay(today)
  const [tc, patch] = useTimeControl()
  useCalendarSurface('left_sidebar', tc)
  const { items, sourceOptions, groupCounts, colorFor } = useCalendarItems()
  const { groups: calendarGroups, hiddenGroups, hiddenSources } = useCalendarSettings()
  const bodyRef = React.useRef<HTMLDivElement>(null)
  const revealStore = revealTargetStore()
  const revealTarget = React.useSyncExternalStore(
    React.useCallback((listener: () => void) => revealStore.subscribe(listener), [revealStore]),
    React.useCallback(() => {
      const target = revealStore.get()
      return target?.surface === 'agenda' ? target : null
    }, [revealStore]),
    React.useCallback(() => {
      const target = revealStore.get()
      return target?.surface === 'agenda' ? target : null
    }, [revealStore])
  )
  const sectionRefs = React.useRef<Map<string, HTMLDivElement>>(new Map())
  const didInitialScroll = React.useRef(false)
  const suppressSelectionScrollRef = React.useRef<string | null>(null)
  const [todayVisible, setTodayVisible] = React.useState(true)
  const [search, setSearch] = React.useState('')
  const [quickAdd, setQuickAdd] = React.useState<QuickAddState | null>(null)
  const itemClickTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const selectItem = React.useCallback((item: CalItem): void => {
    selectCalendarProperties(item, 'left_sidebar')
    if (itemClickTimerRef.current) clearTimeout(itemClickTimerRef.current)
    itemClickTimerRef.current = setTimeout(() => {
      itemClickTimerRef.current = null
      suppressSelectionScrollRef.current = item.date
      openItemInCalendarMain(item)
    }, 220)
  }, [])

  const editItem = React.useCallback((item: CalItem): void => {
    if (itemClickTimerRef.current) {
      clearTimeout(itemClickTimerRef.current)
      itemClickTimerRef.current = null
    }
    selectCalendarProperties(item, 'left_sidebar')
    if (item.readOnly) return
    if (item.kind === 'sourced') {
      void editSourcedItem(item.sourceId ?? '', item.id)
      return
    }
    setQuickAdd({ date: item.date, editItem: item })
  }, [])

  React.useEffect(() => () => {
    if (itemClickTimerRef.current) clearTimeout(itemClickTimerRef.current)
  }, [])

  const visibleItems = React.useMemo(() => {
    const needle = search.trim().toLowerCase()
    if (!needle) return items
    return items.filter((item) => [
      item.title,
      item.note,
      item.group,
      item.status,
      item.location?.name,
      ...(item.tags ?? []),
      ...(item.fields ?? []).flatMap((field) => [field.key, field.value])
    ].some((value) => value?.toLowerCase().includes(needle)))
  }, [items, search])

  const { days, byDay } = React.useMemo(() => {
    const map = new Map<string, CalItem[]>()
    for (const it of visibleItems) {
      const list = map.get(it.date) ?? []
      list.push(it)
      map.set(it.date, list)
    }
    for (const list of map.values()) {
      list.sort((a, b) => (a.startTime ?? '99:99').localeCompare(b.startTime ?? '99:99'))
    }
    if (!search.trim() && tc.selectedDate && !map.has(tc.selectedDate)) map.set(tc.selectedDate, [])
    const keys = [...map.keys()].sort((a, b) => b.localeCompare(a))
    return { days: keys, byDay: map }
  }, [search, tc.selectedDate, visibleItems])

  React.useEffect(() => {
    if (didInitialScroll.current || days.length === 0) return
    const target = days.includes(todayKey) ? todayKey : [...days].reverse().find((k) => k >= todayKey)
    if (!target) {
      didInitialScroll.current = true
      return
    }
    const el = sectionRefs.current.get(target)
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ block: 'start' })
      didInitialScroll.current = true
    }
  }, [days, todayKey])

  React.useEffect(() => {
    if (!tc.selectedDate) return
    if (suppressSelectionScrollRef.current === tc.selectedDate) {
      suppressSelectionScrollRef.current = null
      return
    }
    const el = sectionRefs.current.get(tc.selectedDate)
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [tc.selectedDate])

  React.useEffect(() => {
    if (!revealTarget) return
    const frame = requestAnimationFrame(() => {
      const cards = bodyRef.current?.querySelectorAll<HTMLElement>('[data-calendar-item-id]') ?? []
      const card = [...cards].find((element) =>
        element.dataset.calendarItemId === revealTarget.itemId &&
        (element.dataset.calendarSourceId ?? '') === revealTarget.sourceId
      )
      card?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
    return () => cancelAnimationFrame(frame)
  }, [revealTarget])

  // Show the "Today" button whenever today's section scrolls out of view.
  React.useEffect(() => {
    const root = bodyRef.current
    if (!root) return
    const update = (): void => {
      const el = sectionRefs.current.get(todayKey)
      if (!el) {
        setTodayVisible(false)
        return
      }
      const rootRect = root.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      setTodayVisible(elRect.bottom > rootRect.top && elRect.top < rootRect.bottom)
    }
    root.addEventListener('scroll', update, { passive: true })
    update()
    return () => root.removeEventListener('scroll', update)
  }, [todayKey, days])

  function scrollToToday(): void {
    const el = sectionRefs.current.get(todayKey)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const openItemMenu = async (item: CalItem, e: React.MouseEvent): Promise<void> => {
    e.preventDefault()
    e.stopPropagation()
    selectCalendarProperties(item, 'left_sidebar')
    const owned = await sourcedMenuItems(item, { onEdit: () => editItem(item) })
    const fields = itemFieldMenuItems(item)
    // The Calendar's own event builds the same entries a provider contributes.
    const openables = eventMenuItems(item)
    // A sourced item's own "Open note" comes from its provider, and an event's
    // comes from `eventMenuItems` — adding ours as well would list it twice.
    const leading = [...owned, ...openables]
    const generic = leading.length > 0 ? [] : openNoteMenuItem(item)
    const items = [
      ...leading,
      ...(leading.length > 0 && (generic.length > 0 || fields.length > 0)
        ? [{ type: 'separator' as const }]
        : []),
      ...generic,
      ...fields
    ]
    if (items.length === 0) return
    await api.ui.openMenu(items, { x: e.clientX, y: e.clientY })
  }

  return (
    <div className="panel calendar-agenda-panel">
      <div className="panel-header">
        <span className="panel-title">{uiText('auto.891e9d6d47f1')}</span>
        <div className="agenda-header-actions">
          <CalendarFilterButton
            label={uiText('calendar.filter.sources')}
            icon={<Layers />}
            options={sourceOptions.map((source) => ({ ...source, color: 'palette:primary-blue' }))}
            hidden={hiddenSources}
            settingsKey={HIDDEN_SOURCES_KEY}
            emptyText={uiText('calendar.filter.noSources')}
          />
          <CalendarFilterButton
            label={uiText('calendar.filter.groups')}
            icon={<GroupGlyph />}
            options={calendarGroups.map((group) => ({ id: group.id, label: group.name, color: group.color, count: groupCounts[group.id] ?? 0 }))}
            hidden={hiddenGroups}
            settingsKey={HIDDEN_GROUPS_KEY}
            emptyText={uiText('calendar.filter.noGroups')}
            onOpenSettings={() => api.workspace.openSettings('groups')}
          />
          <NoteDateSourceFilterButton />
          {!todayVisible && (
            <button className="agenda-today-btn" onClick={scrollToToday}>
              {uiText('auto.24345a14377f')}</button>
          )}
          <button
            className="plugin-open-page"
            onClick={() => api.workspace.openMainTab()}
            aria-label={uiText('auto.9ee309dcedc9')}
            title={uiText('auto.9ee309dcedc9')}
          />
        </div>
      </div>
      <div className="agenda-search search-field">
        <Search className="search-field-icon" />
        <input
          className="search-field-input"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setSearch('')
          }}
          placeholder={uiText('calendar.agenda.searchPlaceholder')}
          aria-label={uiText('calendar.agenda.searchLabel')}
        />
        {search && <button className="search-field-action" type="button" onClick={() => setSearch('')} aria-label={uiText('calendar.agenda.clearSearch')}><X /></button>}
      </div>
      <div className="panel-body agenda-body hidescrollbar" ref={bodyRef}>
        {days.length === 0 ? (
          <div className="tree-empty">{uiText('auto.418713defbf7')}</div>
        ) : (
          days.map((key, i) => {
            const date = parseLocalDate(key)
            const list = byDay.get(key) ?? []
            const isToday = sameDay(date, today)
            const isSelected = tc.selectedDate === key
            const year = date.getFullYear()
            const prevYear = i > 0 ? parseLocalDate(days[i - 1]).getFullYear() : null
            const showYear = prevYear !== null && year !== prevYear
            return (
              <div
                key={key}
                className="agenda-section"
                ref={(el) => {
                  if (el) sectionRefs.current.set(key, el)
                  else sectionRefs.current.delete(key)
                }}
              >
                {showYear && <div className="agenda-year-sep">{year}</div>}
                <button
                  type="button"
                  className={`agenda-day-header${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}`}
                  onClick={() => patch({ selectedDate: isSelected ? null : key, rangeStart: null, rangeEnd: null })}
                >
                  <span className="agenda-day-dow">{localizedWeekday(date.getDay(), api.ui.language())}</span>
                  <span className="agenda-day-num">{date.getDate()}</span>
                  <span className="agenda-day-month">{localizedMonth(date.getMonth(), api.ui.language())}</span>
                </button>
                {list.length === 0 ? (
                  <div className="agenda-day-empty">{uiText('auto.f4e12416c6b8')}</div>
                ) : (
                  list.map((it) => {
                    const revealed = revealTarget?.itemId === it.id &&
                      revealTarget.sourceId === (it.sourceId ?? '')
                    return (
                    <CalendarAgendaCard
                      key={`${it.occurrenceKey ?? it.id}:${revealed ? revealTarget?.nonce : 0}`}
                      item={it}
                      sourceId={it.sourceId ?? ''}
                      color={colorFor(it)}
                      revealNonce={revealed ? revealTarget?.nonce : undefined}
                      onClick={() => selectItem(it)}
                      onDoubleClick={() => editItem(it)}
                      onContextMenu={(e) => void openItemMenu(it, e)}
                    />
                    )
                  })
                )}
              </div>
            )
          })
        )}
      </div>
      {quickAdd && <QuickAdd
        key={`${quickAdd.editItem?.sourceId ?? quickAdd.editItem?.kind}:${quickAdd.editItem?.id}`}
        state={quickAdd}
        groups={calendarGroups}
        indexEntries={api.getState().indexEntries}
        onClose={() => setQuickAdd(null)}
        onAdded={() => setQuickAdd(null)}
      />}
    </div>
  )
}
