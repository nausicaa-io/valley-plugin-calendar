import { React, api } from './runtime'
import type { ReactElement, ReactNode } from 'react'
import type { IndexEntry } from '@valley/plugin-sdk/types'
import { parseAppOpenUrl } from '@valley/plugin-sdk/paths'
import {
  AttachmentCard,
  FilePathInput,
  LocationField,
  type EventLocation
} from './fields'
import { appendEvent, loadEvents, newEvent, normalizeEventUrl, updateEvent, type DocumentRevision } from './events'
import { createSourcedItem, creatableSources, editSourcedItem } from './itemSources'
import { CalendarDays, Clock, FileText, Flag, Hash, Link, MapPin, Plus, Tags, X } from './icons'
import type { CalItem } from './items'
import { uiText } from './localization'

// ── quick-add popover ────────────────────────────────────────────────────────
//
// One composer for both kinds of dated thing. The two used to be separate JSX
// branches that had quietly drifted apart — the event grew attachments and
// links, the contributed item grew tags and a priority, and neither ever gained
// the other's. There is now a single field list; only priority is conditional,
// because only a contributed item has one.

type SourcePriority = 'normal' | 'low' | 'medium' | 'high'

const SOURCE_PRIORITIES: SourcePriority[] = ['normal', 'low', 'medium', 'high']
const PRIORITY_LABEL_KEYS: Record<SourcePriority, string> = {
  normal: 'calendar.priority.none',
  low: 'calendar.priority.low',
  medium: 'calendar.priority.medium',
  high: 'calendar.priority.high'
}

export interface QuickAddState {
  date: string
  startTime?: string
  endTime?: string
  /** `event` = the Calendar's own record; anything else is a
   *  `calendar.itemSource` id (the first creatable source is the default). */
  kind?: string
  editItem?: CalItem
}

interface EventDraft {
  fields: Map<string, unknown>
  listeners: Set<() => void>
}

function eventDraft(key: string): EventDraft {
  const drafts = api.runtime.getOrCreate('calendar.eventDrafts', () => new Map<string, EventDraft>())
  let draft = drafts.get(key)
  if (!draft) {
    draft = { fields: new Map(), listeners: new Set() }
    drafts.set(key, draft)
  }
  return draft
}

function useEventField<T>(key: string, field: string, initial: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
  const draft = eventDraft(key)
  const initialRef = React.useRef(initial)
  initialRef.current = initial
  const read = React.useCallback((): T => {
    if (!draft.fields.has(field)) {
      const seed = initialRef.current
      draft.fields.set(field, typeof seed === 'function' ? (seed as () => T)() : seed)
    }
    return draft.fields.get(field) as T
  }, [draft, field])
  const value = React.useSyncExternalStore(React.useCallback((listener) => {
    draft.listeners.add(listener)
    return () => { draft.listeners.delete(listener) }
  }, [draft]), read, read)
  const setValue = React.useCallback((next: React.SetStateAction<T>) => {
    draft.fields.set(field, typeof next === 'function' ? (next as (previous: T) => T)(read()) : next)
    for (const listener of draft.listeners) listener()
  }, [draft, field, read])
  return [value, setValue]
}

/** A titled block of fields. The label is what turns a stack of grey boxes into
 *  a form you can skim. */
function Section({ title, children }: { title: string; children: ReactNode }): ReactElement {
  return (
    <div className="calendar-quickadd-section">
      <span className="calendar-quickadd-section-label">{title}</span>
      {children}
    </div>
  )
}

/** One labelled row: a leading glyph, then the control. */
function Row({ glyph, children }: { glyph: ReactNode; children: ReactNode }): ReactElement {
  return (
    <div className="calendar-quickadd-row">
      <span className="calendar-quickadd-row-glyph" aria-hidden="true">{glyph}</span>
      <div className="calendar-quickadd-row-body">{children}</div>
    </div>
  )
}

interface QuickAddProps {
  state: QuickAddState
  groups: import('@valley/plugin-sdk/types').ValleyGroup[]
  indexEntries: IndexEntry[]
  onClose: () => void
  onAdded: () => void
}

export function QuickAdd(props: QuickAddProps): ReactElement | null {
  const item = props.state.editItem
  const contributed = item?.kind === 'sourced'
  const sourceId = contributed ? item.sourceId ?? '' : ''
  const itemId = contributed ? item.id : ''
  const close = React.useRef(props.onClose)
  close.current = props.onClose
  React.useEffect(() => {
    if (contributed) void editSourcedItem(sourceId, itemId).then(() => close.current())
  }, [contributed, sourceId, itemId])
  return contributed ? null : <QuickAddForm {...props} />
}

function QuickAddForm({ state, groups, indexEntries, onClose, onAdded }: QuickAddProps): ReactElement {
  const editing = state.editItem
  const draftKey = editing ? `${editing.sourceId ?? editing.kind}:${editing.id}` : `new:${state.kind ?? ''}:${state.date}:${state.startTime ?? ''}`
  // Which sources accept new items. Read once per mount: the tab strip must not
  // reshuffle under the user's cursor if a plugin loads mid-edit.
  const [sources] = React.useState(() => creatableSources())
  const defaultKind = state.kind ?? sources[0]?.id ?? 'event'
  // Note dates are read-only and never reach this editor — they only ever land
  // here as `undefined`, falling through to the requested kind. An edit of a
  // contributed item stays with the source that offered it.
  const [kind, setKind] = useEventField<string>(draftKey, 'kind',
    editing?.kind === 'sourced' ? editing.sourceId ?? defaultKind
      : editing?.kind === 'event' ? 'event'
      : defaultKind
  )
  const [title, setTitle] = useEventField(draftKey, 'title', editing?.title ?? '')
  const [date, setDate] = useEventField(draftKey, 'date', editing?.date ?? state.date)
  const [endDate, setEndDate] = useEventField(draftKey, 'endDate', editing?.event?.endDate ?? '')
  const [start, setStart] = useEventField(draftKey, 'start', editing?.startTime ?? state.startTime ?? '')
  const [end, setEnd] = useEventField(draftKey, 'end', editing?.endTime ?? state.endTime ?? '')
  // Always the group's **id**. The two tabs used to store an id and a name in
  // this one slot, so switching tabs left a value that resolved in neither; the
  // name is derived at submit time, where the contributed-item contract wants it.
  const [groupId, setGroupId] = useEventField(draftKey, 'groupId', () => {
    const stored = editing?.event?.groupId ?? editing?.sourced?.group ?? ''
    return groups.find((g) => g.id === stored)?.id ?? groups.find((g) => g.name === stored)?.id ?? ''
  })
  const [location, setLocation] = useEventField<EventLocation | undefined>(draftKey, 'location', editing?.event?.location ?? editing?.sourced?.location)
  const [note, setNote] = useEventField(draftKey, 'note', editing?.event?.note ?? editing?.sourced?.note ?? '')
  // Everything hanging off an event — a vault file, a web address, the note it
  // links. One block, the way the row reads them.
  const [urls, setUrls] = useEventField<string[]>(draftKey, 'urls', editing?.event?.urls ?? editing?.sourced?.urls ?? [])
  const [attachments, setAttachments] = useEventField<string[]>(draftKey, 'attachments', editing?.event?.attachments ?? editing?.sourced?.attachments ?? [])
  const [addingAttachment, setAddingAttachment] = React.useState(false)
  const [attachmentDraft, setAttachmentDraft] = React.useState('')
  const [addingUrl, setAddingUrl] = React.useState(false)
  const [urlDraft, setUrlDraft] = React.useState('')
  // Fields only a contributed item carries.
  const [priority, setPriority] = useEventField<SourcePriority>(draftKey, 'priority',
    (editing?.sourced?.priority as SourcePriority | undefined) ?? 'normal'
  )
  const [tags, setTags] = useEventField<string[]>(draftKey, 'tags', editing?.sourced?.tags ?? editing?.event?.tags ?? [])
  const [filePath, setFilePath] = useEventField(draftKey, 'filePath',
    editing?.sourced?.filePath ?? editing?.event?.filePath ?? ''
  )
  const [busy, setBusy] = useEventField(draftKey, 'busy', false)
  const [error, setError] = useEventField(draftKey, 'error', '')

  const addUrl = (raw: string): void => {
    const next = normalizeEventUrl(raw)
    // An empty commit closes the field; a duplicate is a no-op rather than an
    // error, matching the attachment picker.
    if (next && !urls.includes(next)) setUrls([...urls, next])
    setUrlDraft('')
    setAddingUrl(false)
  }

  /** Both times off ⇒ all-day. Turning it on is the only way to clear a time
   *  pair in one gesture; turning it off hands back a sensible default hour. */
  const allDay = !start && !end
  const setAllDay = (next: boolean): void => {
    if (next) {
      setStart('')
      setEnd('')
    } else {
      setStart(state.startTime ?? '09:00')
      setEnd(state.endTime ?? '10:00')
    }
  }

  const [expectedUpdatedAt] = useEventField(draftKey, 'expectedUpdatedAt', editing?.event?.updatedAt)
  const [documentRevision, setDocumentRevision] = useEventField<DocumentRevision | undefined>(draftKey, 'documentRevision', undefined)
  const documentRef = editing?.kind === 'event' && !editing.readOnly
    ? { pluginId: 'calendar', sourceId: 'events', itemId: editing.id }
    : undefined
  const cancel = async (): Promise<void> => {
    if (busy) return
    try {
      if (documentRef) await api.documents.drafts.clear(documentRef)
      eventDraft(draftKey).fields.clear()
      onClose()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason))
    }
  }

  const submit = async (): Promise<void> => {
    const trimmed = title.trim()
    if (!trimmed || eventDraft(draftKey).fields.get('busy') || editing?.readOnly) return
    setBusy(true)
    setError('')
    try {
      const now = new Date().toISOString()
      const day = date || state.date
      // A contributed item references its group by **name** — how `@valley/plugin-sdk/groups`
      // models it, and what `CalendarSourceItem.group` documents.
      const groupName = groups.find((g) => g.id === groupId)?.name
      const shared = {
        location,
        urls: urls.length > 0 ? urls : undefined,
        attachments: attachments.length > 0 ? attachments : undefined,
        filePath: filePath.trim() || undefined,
        note
      }
      const eventExtras = { ...shared, groupId: groupId || undefined, tags }
      const sourcedExtras = { ...shared, group: groupName, tags, priority }
      if (editing) {
        if (editing.kind === 'event' && editing.event) {
          if (!documentRevision) throw new Error(uiText('calendar.error.save'))
          const current = (await loadEvents()).find((event) => event.id === editing.id)
          if (!current) throw new Error(uiText('calendar.error.missing'))
          if (current.updatedAt !== expectedUpdatedAt) throw new Error(uiText('calendar.error.changed'))
          const saved = await updateEvent(editing.id, {
            ...current,
            allDay: !start && !end,
            title: trimmed,
            date: day,
            endDate: endDate || undefined,
            startTime: start || undefined,
            endTime: end || undefined,
            ...eventExtras,
            updatedAt: now
          }, expectedUpdatedAt, documentRevision)
          if (!saved) throw new Error(uiText('calendar.error.save'))
        }
      } else if (kind === 'event') {
        const saved = await appendEvent(
          newEvent(trimmed, day, {
            endDate: endDate || undefined,
            startTime: start || undefined,
            endTime: end || undefined,
            ...eventExtras
          })
        )
        if (!saved) throw new Error(uiText('calendar.error.save'))
      } else {
        const saved = await createSourcedItem(kind, day, {
          title: trimmed,
          startTime: start || undefined,
          endTime: end || undefined,
          ...sourcedExtras,
          completed: false
        })
        if (!saved) throw new Error(uiText('calendar.error.save'))
      }
      if (documentRef) await api.documents.drafts.clear(documentRef)
      eventDraft(draftKey).fields.clear()
      onAdded()
      onClose()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason))
    } finally {
      setBusy(false)
    }
  }

  const isEvent = kind === 'event'
  const kindLabel = (id: string): string =>
    id === 'event'
      ? uiText('auto.ad8919ace091')
      : api.ui.t(sources.find((s) => s.id === id)?.labelKey ?? id)
  // The host's styled controls — never a raw `<select>` or `<input type="date">`,
  // whose popups Chromium hands to the OS unthemed.
  const { SelectField, DateField, TimeField, Segmented, Toggle } = api.ui.settings

  return (
    <api.ui.Modal
      title={editing ? uiText('calendar.quickadd.editTitle', { kind: kindLabel(kind) }) : uiText('auto.61cc55aa0453')}
      bodyClassName="calendar-quickadd"
      onClose={() => void cancel()}
      footer={<>
        <button className="calendar-quickadd-cancel" type="button" disabled={busy} onClick={() => void cancel()}>{uiText('auto.77dfd2135f4d')}</button>
        {!editing?.readOnly && <button className="calendar-quickadd-save" type="button" onClick={() => void submit()} disabled={!title.trim() || busy || (!!documentRef && !documentRevision)}>
          {editing ? uiText('auto.efc007a393f6') : uiText('auto.61cc55aa0453')}
        </button>}
      </>}
    >
        {!editing && <div className="calendar-quickadd-head">
            <Segmented
              value={kind}
              onChange={setKind}
              ariaLabel={uiText('calendar.quickadd.kind')}
              options={[
                { value: 'event', label: uiText('auto.ad8919ace091') },
                ...sources.map((source) => ({ value: source.id, label: api.ui.t(source.labelKey) }))
              ]}
            />
        </div>}
        {/* The fields scroll, the actions stay put: an event with three
            attachments must not push Save off the bottom of the screen. */}
        <div className="calendar-quickadd-body hidescrollbar">
          <fieldset disabled={!!editing?.readOnly} style={{ display: 'contents' }}>
          <input
            data-modal-initial-focus="true"
            aria-label={uiText('auto.768e0c1c6957')}
            className="calendar-quickadd-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') void submit() }}
            placeholder={isEvent ? uiText('auto.0cd372226ee9') : uiText('auto.33a5a701e541')}
          />

          <Section title={uiText('calendar.quickadd.when')}>
            <Row glyph={<CalendarDays />}>
              <div className="calendar-quickadd-dates">
                <DateField
                  className="calendar-quickadd-date"
                  value={date}
                  onChange={setDate}
                  clearable={false}
                  ariaLabel={isEvent ? uiText('calendar.quickadd.startDate') : uiText('calendar.quickadd.dueDate')}
                />
                {/* A span belongs to an event: a contributed item is dated by a
                    single day, and `CalendarItemPatch` has nowhere to put a second. */}
                {isEvent && (
                  <>
                    <span className="calendar-quickadd-dash" aria-hidden="true">→</span>
                    <DateField
                      className="calendar-quickadd-date"
                      value={endDate}
                      onChange={setEndDate}
                      min={date}
                      placeholder={uiText('calendar.quickadd.endDate')}
                      ariaLabel={uiText('calendar.quickadd.endDate')}
                    />
                  </>
                )}
              </div>
            </Row>
            <Row glyph={<Clock />}>
              <div className="calendar-quickadd-times">
                <TimeField
                  value={start}
                  disabled={allDay}
                  onChange={setStart}
                  ariaLabel={uiText('auto.88d8206d586a')}
                />
                <span aria-hidden="true">–</span>
                <TimeField
                  value={end}
                  disabled={allDay}
                  onChange={setEnd}
                  ariaLabel={uiText('auto.cd7800da7f4f')}
                />
                <span className="calendar-quickadd-allday">
                  {uiText('calendar.quickadd.allDay')}
                  <Toggle checked={allDay} onChange={setAllDay} label={uiText('calendar.quickadd.allDay')} />
                </span>
              </div>
            </Row>
          </Section>

          <Section title={uiText('calendar.quickadd.details')}>
            {groups.length > 0 && (
              <Row glyph={<Tags />}>
                <SelectField
                  className="calendar-quickadd-select"
                  value={groupId}
                  onChange={setGroupId}
                  ariaLabel={uiText('auto.dbed7864623f')}
                  options={[
                    { value: '', label: uiText('auto.f6b2246c64fa') },
                    ...groups.map((g) => ({ value: g.id, label: g.name, color: g.color }))
                  ]}
                />
              </Row>
            )}
            <Row glyph={<MapPin />}>
              <LocationField value={location} onChange={setLocation} />
            </Row>
            <Row glyph={<FileText />}>
              <FilePathInput
                value={filePath}
                onChange={setFilePath}
                indexEntries={indexEntries}
              />
            </Row>
            <Row glyph={<Hash />}>
              <api.ui.TagInput value={tags} onChange={setTags} readOnly={!!editing?.readOnly} />
            </Row>
            {/* Only a contributed item has a priority; `EventRecord` has no such
                field, so the row is left out rather than shown and dropped. */}
            {!isEvent && (
              <Row glyph={<Flag />}>
                <Segmented
                  value={priority}
                  onChange={(v) => setPriority(v as SourcePriority)}
                  ariaLabel={uiText('calendar.quickadd.priority')}
                  options={SOURCE_PRIORITIES.map((p) => ({
                    value: p,
                    label: uiText(PRIORITY_LABEL_KEYS[p])
                  }))}
                />
              </Row>
            )}
          </Section>

          {/* One block for everything else hanging off the item — a vault file
              and a web address are the same thing to the person reading the
              chip, so the links sit with the files. */}
          <Section title={uiText('calendar.attachments')}>
            {attachments.map((relPath) => (
              <AttachmentCard
                key={relPath}
                relPath={relPath}
                onRemove={() => setAttachments(attachments.filter((p) => p !== relPath))}
              />
            ))}
            {urls.map((url) => (
              <div className="calendar-quickadd-url-row" key={url}>
                <button
                  className="calendar-quickadd-url"
                  type="button"
                  onClick={(event) => {
                    const relPath = parseAppOpenUrl(url)
                    if (relPath) api.workspace.openFile(relPath, undefined, { newTab: api.ui.hasModKey(event) })
                    else void api.files.openExternalUrl(url)
                  }}
                >{url}</button>
                <button
                  className="calendar-field-btn"
                  type="button"
                  title={uiText('calendar.removeUrl')}
                  aria-label={uiText('calendar.removeUrlOf', { p0: url })}
                  onClick={() => setUrls(urls.filter((u) => u !== url))}
                >
                  <X />
                </button>
              </div>
            ))}
            {addingAttachment ? (
              <FilePathInput
                value={attachmentDraft}
                placeholder={uiText('calendar.attachmentPlaceholder')}
                ariaLabel={uiText('calendar.attachmentPath')}
                onChange={(v) => {
                  setAttachmentDraft(v)
                  // The picker reports a full relPath the moment a suggestion
                  // is chosen; a half-typed query never matches an index entry.
                  if (indexEntries.some((e) => e.relPath === v)) {
                    if (!attachments.includes(v)) setAttachments([...attachments, v])
                    setAttachmentDraft('')
                    setAddingAttachment(false)
                  }
                }}
                indexEntries={indexEntries}
              />
            ) : null}
            {addingUrl ? (
              <input
                className="calendar-quickadd-input"
                value={urlDraft}
                autoFocus
                placeholder={uiText('calendar.urlPlaceholder')}
                aria-label={uiText('calendar.url')}
                onChange={(e) => setUrlDraft(e.target.value)}
                onBlur={(e) => addUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addUrl(e.currentTarget.value)
                  }
                  if (e.key === 'Escape') {
                    setUrlDraft('')
                    setAddingUrl(false)
                  }
                }}
              />
            ) : null}
            <div className="calendar-quickadd-adders">
              {!addingAttachment && (
                <button className="calendar-quickadd-add" type="button" onClick={() => setAddingAttachment(true)}>
                  <Plus /> {uiText('calendar.addAttachment')}
                </button>
              )}
              {!addingUrl && (
                <button className="calendar-quickadd-add" type="button" onClick={() => setAddingUrl(true)}>
                  <Link /> {uiText('calendar.addUrl')}
                </button>
              )}
            </div>
            <api.ui.NoteInput
              onRevisionChange={(revision) => setDocumentRevision((current) => !current || revision.expectedRevision < current.expectedRevision ? revision : current)}
              className="calendar-quickadd-note"
              value={note}
              onChange={setNote}
              context={{
                sourcePath: filePath || undefined,
                ref: documentRef
              }}
              tags={tags}
              onTagsChange={setTags}
              onSave={() => void submit()}
              onCancel={() => void cancel()}
              placeholder={uiText('auto.1a29d1bf66f5')}
              minHeight={100}
              maxHeight={340}
              readOnly={!!editing?.readOnly}
            />
          </Section>
          </fieldset>
        {error && <div role="alert">{error}</div>}
        </div>
    </api.ui.Modal>
  )
}
