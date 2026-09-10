import { React, api, revealCalendarAgendaItem, revealCalendarItem } from './runtime'
import type { ReactElement } from 'react'
import type { EventRecord } from '@valley/plugin-sdk/types'
import type {
  CalendarItemAction,
  CalendarItemActionIcon,
  CalendarItemBadge,
  CalendarSourceItem,
  UiMenuItem
} from '@valley/plugin-sdk'
import { CALENDAR_ITEM_ACTION_EDIT } from '@valley/plugin-sdk'
import type { NoteDateEntry } from './noteDates'
import { addDays, daysBetween } from './dateMath'
import { canOpenLocation, canOpenUrl, openLocation, openUrl } from './fields'
import { Checklist, ChevronRight, FileText, ItemBadges, Link, MapPin, NoteDateGlyph, Paperclip, Pencil, badgeLabels } from './icons'
import { updateEvent } from './events'
import { runSourcedItemAction, sourcedItemActions, updateSourcedItem, type SourcedItem } from './itemSources'
import { uiText } from './localization'
import { paletteCssValue } from '@valley/plugin-sdk/palette'

// ── unified calendar item model ──────────────────────────────────────────────

export interface CalItem {
  /** `sourced` = contributed by another plugin through `calendar.itemSource`;
   *  `event` = the Calendar's own record; `noteDate` = scraped from a note. */
  kind: 'sourced' | 'event' | 'noteDate'
  id: string
  title: string
  /** The day this entry sits on — for a span, the one day it was materialized
   *  for, never the whole range. */
  date: string
  /** Last day of a multi-day event; absent ⇒ one day. Carried on **every** day
   *  of a materialized span, so a move can shift both ends together. */
  endDate?: string
  /**
   * Unique per materialized day of a span (`<id>@<day>`), absent otherwise. A
   * React key only: `id` stays the record id, because every mutation, the
   * `data-calendar-item-id` reveal path and the drag handlers address the
   * record, not the day it is drawn on.
   */
  occurrenceKey?: string
  startTime?: string
  endTime?: string
  completed?: boolean
  filePath?: string
  /** Which `calendar.itemSource` offered this (kind `sourced` only) — the
   *  address mutations are routed back to. Never rendered. */
  sourceId?: string
  /** Stable plugin owner used by Calendar-owned source visibility settings. */
  sourceOwner?: string
  /** i18n key for the offering source's display name (kind `sourced` only). */
  sourceLabelKey?: string
  /** The contributed item as handed over, opaque payload included. */
  sourced?: CalendarSourceItem
  event?: EventRecord
  tags?: string[]
  note?: string
  location?: { name: string; lng?: number; lat?: number }
  urls?: string[]
  attachments?: string[]
  category?: string
  groupId?: string
  /** The group's name, when the item references one that way. */
  group?: string
  priority?: string
  status?: string
  /** Explicit colour (a note-date source) — wins over every fallback. */
  color?: string
  /** Explicit outline colour (a note-date source). */
  borderColor?: string
  /** Glyph id drawn on the chip (a note-date source); absent ⇒ text only. */
  icon?: string
  /** Extra frontmatter rows surfaced on hover and in the context menu. */
  fields?: { key: string; value: string }[]
  /**
   * What hangs off the item, drawn as glyphs on the chip. Every badge mirrors an
   * entry the context menu offers, which is the whole point: you can see that an
   * item has an attachment without right-clicking it to find out.
   */
  badges?: CalendarItemBadge[]
  /** Pulled from a connected remote calendar or scraped from a note — display only. */
  readOnly?: boolean
}

export function calendarItemKey(item: CalItem): string {
  return `${item.sourceId ?? item.kind}:${item.id}:${item.occurrenceKey ?? item.date}`
}

interface CalendarEditRequest {
  item: CalItem
  nonce: number
}

interface CalendarEditRequestStore {
  value: CalendarEditRequest | null
  listeners: Set<() => void>
  get(): CalendarEditRequest | null
  publish(value: CalendarEditRequest | null): void
  subscribe(listener: () => void): () => void
}

export function calendarEditRequestStore(): CalendarEditRequestStore {
  return api.runtime.getOrCreate('calendar.editRequest', () => {
    const store: CalendarEditRequestStore = {
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

export function requestCalendarItemEdit(item: CalItem): void {
  const store = calendarEditRequestStore()
  store.publish({ item, nonce: (store.get()?.nonce ?? 0) + 1 })
  api.workspace.openMainTab()
}

export function revealItemInCalendarAgenda(item: CalItem): void {
  revealCalendarAgendaItem({
    date: item.date,
    startTime: item.startTime,
    endTime: item.endTime,
    sourceId: item.sourceId,
    itemId: item.id
  })
}

export function openItemInCalendarMain(item: CalItem): void {
  revealCalendarItem({
    date: item.date,
    startTime: item.startTime,
    endTime: item.endTime,
    sourceId: item.sourceId,
    itemId: item.id
  })
}

/** A contributed item, in the Calendar's own vocabulary. */
export function sourcedToItem({ sourceId, sourceOwner, labelKey, item, editable }: SourcedItem): CalItem {
  return {
    kind: 'sourced',
    id: item.id,
    title: item.title,
    date: item.date,
    startTime: item.startTime,
    endTime: item.endTime,
    completed: item.completed,
    filePath: item.filePath,
    sourceId,
    sourceOwner,
    sourceLabelKey: labelKey,
    sourced: item,
    group: item.group,
    tags: item.tags,
    note: item.note,
    location: item.location,
    urls: item.urls,
    attachments: item.attachments,
    priority: item.priority,
    status: item.status,
    color: item.color,
    borderColor: item.borderColor,
    icon: item.icon,
    fields: item.fields,
    badges: item.badges,
    readOnly: item.readOnly || !editable
  }
}

/** The badges an event earns from its own fields. */
function eventBadges(event: EventRecord): CalendarItemBadge[] | undefined {
  const badges: CalendarItemBadge[] = []
  if (event.filePath) badges.push('note')
  if (event.attachments?.length) badges.push('attachment')
  if (event.urls?.length) badges.push('link')
  if (event.location) badges.push('location')
  return badges.length > 0 ? badges : undefined
}

export function eventToItem(event: EventRecord): CalItem {
  return {
    kind: 'event',
    id: event.id,
    title: event.title,
    date: event.date,
    endDate: event.endDate,
    startTime: event.startTime,
    endTime: event.endTime,
    filePath: event.filePath,
    event,
    tags: event.tags,
    note: event.note,
    location: event.location,
    urls: event.urls,
    attachments: event.attachments,
    category: event.category,
    groupId: event.groupId,
    group: event.group,
    badges: eventBadges(event),
    readOnly: event.readOnly
  }
}

/** A note-scraped date: read-only, opens its note, never written back. */
export function noteDateToItem(occ: NoteDateEntry): CalItem {
  return {
    kind: 'noteDate',
    id: occ.id,
    title: occ.title,
    date: occ.date,
    startTime: occ.startTime,
    endTime: occ.endTime,
    filePath: occ.relPath,
    color: occ.color,
    borderColor: occ.borderColor,
    icon: occ.icon,
    fields: occ.fields,
    readOnly: true
  }
}

/**
 * Hover text for a chip: the title, any "Show" rows the source configured, and
 * what the item carries. The badge glyphs are `aria-hidden`, so this line is
 * where a screen reader learns there is an attachment.
 */
export function itemTooltip(item: CalItem): string {
  const rows = (item.fields ?? []).map((f) => `${f.key}: ${f.value}`)
  const carries = badgeLabels(item.badges)
  return [item.title, item.note?.trim(), ...rows, ...(carries.length > 0 ? [carries.join(' · ')] : [])]
    .filter((value): value is string => !!value)
    .join('\n')
}

function agendaTimeRange(item: CalItem): string {
  if (!item.startTime) return uiText('auto.1ac1ff7616a6')
  return item.endTime ? `${item.startTime}–${item.endTime}` : item.startTime
}

export function CalendarAgendaCard({
  item,
  sourceId,
  color,
  revealNonce,
  onClick,
  onDoubleClick,
  onContextMenu
}: {
  item: CalItem
  sourceId: string
  color: string
  revealNonce?: number
  onClick: () => void
  onDoubleClick: () => void
  onContextMenu: (event: React.MouseEvent) => void
}): ReactElement {
  return (
    <div
      role="button"
      tabIndex={0}
      className={`agenda-card${item.completed ? ' completed' : ''}${item.filePath ? ' linked' : ''}${revealNonce != null ? ' calendar-reveal-target' : ''}`}
      data-calendar-source-id={sourceId}
      data-calendar-item-id={item.id}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget || (event.key !== 'Enter' && event.key !== ' ')) return
        event.preventDefault()
        onClick()
      }}
      title={itemTooltip(item)}
    >
      <span className="agenda-card-dot" style={{ background: paletteCssValue(color) }} />
      <span className="agenda-card-body">
        <span className="agenda-card-title">
          {item.icon && <NoteDateGlyph id={item.icon} className="calendar-chip-glyph" />}
          {item.title}
        </span>
        <span className="agenda-card-time">
          {agendaTimeRange(item)}
          <ItemBadges badges={item.badges} />
        </span>
        {item.note?.trim() && <api.ui.MarkdownView className="agenda-card-note" value={item.note}
          context={{ sourcePath: item.filePath, ref: item.sourced?.documentRef ?? (item.kind === 'event' && !item.readOnly ? { pluginId: 'calendar', sourceId: 'events', itemId: item.id } : undefined) }} />}
        {item.fields && item.fields.length > 0 && (
          <span className="agenda-card-fields">{item.fields.map((field) => field.value).join(' · ')}</span>
        )}
      </span>
    </div>
  )
}

/**
 * A provider's label, translated if we can and in its own English if we cannot.
 *
 * `uiText` resolves against *this* plugin's catalog, and the key belongs to the
 * plugin that sent the action — so an unresolved key comes back unchanged and
 * would render as `todo.action.openInTodo` in the menu. That is exactly why the
 * contract carries a bundled English `label` beside the key.
 */
function providerLabel(action: CalendarItemAction): string {
  if (!action.labelKey) return action.label
  const translated = uiText(action.labelKey)
  return translated === action.labelKey ? action.label : translated
}

/**
 * A provider names the *meaning* of its glyph; the Calendar draws its own. That
 * is what keeps a shared component out of an interop payload that is validated
 * and cloned on the way over.
 */
function actionGlyph(icon: CalendarItemActionIcon | undefined): ReactElement | undefined {
  switch (icon) {
    case 'note': return <FileText />
    case 'attachment': return <Paperclip />
    case 'link': return <Link />
    case 'map': return <MapPin />
    case 'edit': return <Pencil />
    case 'open': return <ChevronRight />
    case 'checklist': return <Checklist />
    default: return undefined
  }
}

/**
 * The menu entries the owning plugin contributes for one of its items — "Open in
 * To-Do", the linked note, each attachment, each link.
 *
 * The Calendar renders these without knowing what any of them mean: a leaf sends
 * its id straight back to the provider. That is what keeps "open the attachment"
 * out of a plugin the attachment does not belong to.
 */
export async function sourcedMenuItems(
  item: CalItem,
  options: { skip?: readonly string[]; onEdit?: () => void } = {}
): Promise<UiMenuItem[]> {
  const sourceId = item.sourceId
  if (item.kind !== 'sourced' || !sourceId) return []
  const toMenuItem = (action: CalendarItemAction): UiMenuItem => ({
    id: action.id,
    label: providerLabel(action),
    description: action.description,
    icon: actionGlyph(action.icon),
    danger: action.danger,
    enabled: action.enabled,
    ...(action.submenu?.length
      ? { submenu: action.submenu.map(toMenuItem) }
      : { onSelect: action.id === CALENDAR_ITEM_ACTION_EDIT && options.onEdit
          ? options.onEdit
          : () => void runSourcedItemAction(sourceId, item.id, action.id) })
  })
  const skip = new Set(options.skip ?? [])
  return (await sourcedItemActions(sourceId, item.id))
    .filter((action) => !skip.has(action.id))
    .map(toMenuItem)
}

/** The read-only rows a note-date or a synced event carries, as disabled items. */
export function itemFieldMenuItems(item: CalItem): UiMenuItem[] {
  return (item.fields ?? []).map((field) => ({
    id: `field:${field.key}`,
    label: field.key,
    description: field.value,
    enabled: false
  }))
}

/** "Open note" for an item that links one — the surfaces no longer open files on click. */
export function openNoteMenuItem(item: CalItem): UiMenuItem[] {
  if (!item.filePath) return []
  const relPath = item.filePath
  return [{
    id: 'open-note',
    label: uiText('auto.c66a827e3397'),
    icon: <FileText />,
    onSelect: () => api.workspace.openFile(relPath)
  }]
}

/** `Archive/Images/Apple - Lantern.png` → `Apple - Lantern.png`. */
function fileName(relPath: string): string {
  const cut = relPath.lastIndexOf('/')
  return cut === -1 ? relPath : relPath.slice(cut + 1)
}

/**
 * Everything hanging off the Calendar's **own** event — the note it links, each
 * attachment, each link, the place. The mirror of what To-Do contributes for its
 * items, so the two kinds of item offer the same menu.
 *
 * A submenu appears whenever there is at least one attachment or link, including
 * the one-child case. Places still depend on a map provider.
 */
export function eventMenuItems(item: CalItem): UiMenuItem[] {
  const event = item.kind === 'event' ? item.event : undefined
  if (!event) return []
  const items: UiMenuItem[] = [...openNoteMenuItem(item)]

  const attachments = event.attachments ?? []
  if (attachments.length > 0) {
    items.push({
      id: 'open-attachment',
      label: uiText('calendar.action.openAttachment'),
      icon: <Paperclip />,
      submenu: attachments.map((relPath) => ({
        id: `attachment:${relPath}`,
        label: fileName(relPath),
        description: relPath,
        icon: <Paperclip />,
        onSelect: () => api.workspace.openFile(relPath)
      }))
    })
  }

  const urls = event.urls ?? []
  if (urls.length > 0 && canOpenUrl()) {
    items.push({
      id: 'open-link',
      label: uiText('calendar.action.openLink'),
      icon: <Link />,
      submenu: urls.map((url) => ({
        id: `url:${url}`,
        label: url,
        icon: <Link />,
        onSelect: () => openUrl(url)
      }))
    })
  }

  if (event.location && canOpenLocation()) {
    const location = event.location
    items.push({
      id: 'show-on-map',
      label: uiText('calendar.action.showOnMap'),
      description: location.name,
      icon: <MapPin />,
      onSelect: () => openLocation(location)
    })
  }

  return items
}

export async function persistItemMove(
  item: CalItem,
  date: string,
  startTime: string | undefined,
  endTime: string | undefined
): Promise<void> {
  const now = new Date().toISOString()
  if (item.readOnly) return // remote calendar events can't be moved
  if (item.kind === 'sourced' && item.sourced && item.sourceId) {
    // The provider decides what "moved to this day" means for its record.
    await updateSourcedItem(item.sourceId, item.sourced.id, { date, startTime, endTime })
  } else if (item.kind === 'event' && item.event) {
    // A span is dragged by one of its days, so the record's own start is not
    // where the drag began: shift both ends by the distance the *grabbed* day
    // travelled, or a four-day event dropped one week on would silently become
    // a one-day event.
    const shift = daysBetween(item.date, date)
    await updateEvent(item.id, {
      ...item.event,
      date: addDays(item.event.date, shift),
      endDate: item.event.endDate ? addDays(item.event.endDate, shift) : undefined,
      startTime,
      endTime,
      allDay: !startTime && !endTime,
      updatedAt: now
    })
  }
}
