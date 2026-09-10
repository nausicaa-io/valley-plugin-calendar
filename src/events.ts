import { uiText } from './localization'
import type { DataRecord, EventRecord } from '@valley/plugin-sdk/types'
import type { DatasetRecord, DatasetTransactionOperation, DatasetWhere, NoteInputProps } from '@valley/plugin-sdk'
import { asColor, asString, asTime } from '@valley/plugin-sdk/normalize'
import { isAllowedExternalUrl, normalizeRelPathOpt, parseAppOpenUrl } from '@valley/plugin-sdk/paths'
import { api } from './runtime'
import { generateId } from './lib'

/**
 * Calendar events data layer. Local records live in Calendar's durable database,
 * which survives plugin deletion.
 * Mutations register with the core ⌘Z stack via `api.undo` and ride the host's
 * serialized, atomic dataset transaction path.
 */
const EVENTS_DATASET = 'calendar.events'
const TAGS_DATASET = 'calendar.event_tags'
const LINKS_DATASET = 'calendar.event_links'
const ATTACHMENTS_DATASET = 'calendar.event_attachments'

export function onChanged(cb: () => void): () => void {
  const off = [EVENTS_DATASET, TAGS_DATASET, LINKS_DATASET, ATTACHMENTS_DATASET]
    .map((dataset) => api.data.dataset(dataset).subscribe(cb))
  return () => off.forEach((dispose) => dispose())
}

function asBool(value: unknown): boolean {
  return value === true
}

/** Only shared safe web/app schemes and valid Valley file deep links. */
export function normalizeEventUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  return parseAppOpenUrl(trimmed) || isAllowedExternalUrl(trimmed) ? trimmed : undefined
}

function normalizeUrls(value: unknown): string[] | undefined {
  const raw = Array.isArray(value) ? value : []
  const out: string[] = []
  for (const entry of raw) {
    const url = normalizeEventUrl(entry)
    if (url && !out.includes(url)) out.push(url)
  }
  return out.length > 0 ? out : undefined
}

function normalizeAttachments(value: unknown): string[] | undefined {
  const raw = Array.isArray(value) ? value : []
  const out: string[] = []
  for (const entry of raw) {
    const relPath = normalizeRelPathOpt(entry)
    if (relPath && !out.includes(relPath)) out.push(relPath)
  }
  return out.length > 0 ? out : undefined
}

function normalizeLocation(value: unknown): EventRecord['location'] {
  if (!value || typeof value !== 'object') return undefined
  const raw = value as Record<string, unknown>
  const name = asString(raw.name).trim()
  if (!name) return undefined
  const lng = typeof raw.lng === 'number' && Number.isFinite(raw.lng) ? raw.lng : undefined
  const lat = typeof raw.lat === 'number' && Number.isFinite(raw.lat) ? raw.lat : undefined
  // Half a fix is no fix — the map would open at the equator.
  return lng !== undefined && lat !== undefined ? { name, lng, lat } : { name }
}

/**
 * The last day of a span. A same-day end is dropped rather than stored — it
 * carries nothing a single-day event does not already say — and so is a
 * backwards one: an end before its start would materialize a range the grids
 * cannot draw, and ISO dates compare correctly as strings.
 */
function normalizeEndDate(date: string, value: unknown): string | undefined {
  const end = asString(value).slice(0, 10)
  return end && date && end > date ? end : undefined
}

/** Read-only events pulled from a remote calendar use a `<provider>:` id prefix. */
function isRemoteEventId(id: string): boolean {
  return id.startsWith('google:') || id.startsWith('microsoft:')
}

export function normalizeEventRecord(record: DataRecord): EventRecord {
  const now = new Date().toISOString()
  const id = asString(record.id, `event_${Date.now().toString(36)}`)
  const createdAt = asString(record.createdAt, now)
  const startTime = asTime(record.startTime)
  const endTime = asTime(record.endTime)
  const date = asString(record.date).slice(0, 10)
  return {
    id,
    title: asString(record.title).trim(),
    date,
    endDate: normalizeEndDate(date, record.endDate),
    startTime,
    endTime,
    allDay: asBool(record.allDay) || (!startTime && !endTime),
    color: asColor(record.color),
    category: asString(record.category).trim() || undefined,
    groupId: asString(record.groupId).trim() || undefined,
    group: asString(record.group).trim() || undefined,
    location: normalizeLocation(record.location),
    urls: normalizeUrls(record.urls),
    attachments: normalizeAttachments(record.attachments),
    tags: Array.isArray(record.tags)
      ? record.tags.filter((t): t is string => typeof t === 'string' && !!t.trim()).map((t) => t.trim())
      : [],
    note: asString(record.note),
    filePath: normalizeRelPathOpt(record.filePath),
    createdAt,
    updatedAt: asString(record.updatedAt, createdAt),
    source: asString(record.source).trim() || undefined,
    accountId: asString(record.accountId).trim() || undefined,
    readOnly: asBool(record.readOnly) || undefined
  }
}

function eventRow(record: EventRecord): DatasetRecord {
  return {
    id: record.id,
    calendarId: null,
    providerId: null,
    title: record.title,
    date: record.date,
    endDate: record.endDate ?? null,
    startTime: record.startTime ?? null,
    endTime: record.endTime ?? null,
    allDay: record.allDay ?? null,
    timezone: null,
    color: record.color ?? null,
    category: record.category ?? null,
    groupId: record.groupId ?? null,
    group: record.group ?? null,
    location: record.location ?? null,
    note: record.note,
    filePath: record.filePath ?? null,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    source: record.source ?? null,
    accountId: record.accountId ?? null,
    readOnly: record.readOnly ?? null,
    recurrenceRule: null,
    recurrenceMasterId: null
  }
}

async function allRows(dataset: string, where?: DatasetWhere): Promise<DatasetRecord[]> {
  const rows: DatasetRecord[] = []
  let cursor: string | undefined
  do {
    const page = await api.data.dataset(dataset).query({ where, limit: 1000, cursor })
    rows.push(...page.rows)
    cursor = page.cursor
  } while (cursor)
  return rows
}

async function eventRelations(eventIds?: string[], includeTags = true): Promise<{
  tags: DatasetRecord[]
  links: DatasetRecord[]
  attachments: DatasetRecord[]
}> {
  const read = async (dataset: string): Promise<DatasetRecord[]> => {
    if (!eventIds) return allRows(dataset)
    const rows: DatasetRecord[] = []
    for (let offset = 0; offset < eventIds.length; offset += 100) {
      rows.push(...await allRows(dataset, { eventId: { in: eventIds.slice(offset, offset + 100) } }))
    }
    return rows
  }
  const [tags, links, attachments] = await Promise.all([
    includeTags ? read(TAGS_DATASET) : [],
    read(LINKS_DATASET),
    read(ATTACHMENTS_DATASET)
  ])
  return { tags, links, attachments }
}

function relationWrites(record: EventRecord, includeTags = true): DatasetTransactionOperation[] {
  return [
    ...(includeTags ? record.tags.map((tag) => ({ dataset: TAGS_DATASET, operation: 'insert' as const, values: { eventId: record.id, tag } })) : []),
    ...(record.urls ?? []).map((url, position) => ({ dataset: LINKS_DATASET, operation: 'insert' as const, values: { eventId: record.id, position, url } })),
    ...(record.attachments ?? []).map((path, position) => ({ dataset: ATTACHMENTS_DATASET, operation: 'insert' as const, values: { eventId: record.id, position, path } }))
  ]
}

function forWrite(record: EventRecord): EventRecord {
  return {
    ...record,
    endDate: normalizeEndDate(record.date, record.endDate),
    filePath: normalizeRelPathOpt(record.filePath),
    urls: normalizeUrls(record.urls),
    attachments: normalizeAttachments(record.attachments)
  }
}

export async function loadEvents(startDate?: string, endDate?: string): Promise<EventRecord[]> {
  const where: DatasetWhere | undefined = startDate && endDate
    ? { date: { lte: endDate }, or: [{ endDate: { gte: startDate } }, { endDate: { isNull: true }, date: { gte: startDate } }] }
    : undefined
  const raw = await allRows(EVENTS_DATASET, where)
  if (!raw.length) return []
  const relations = await eventRelations(where ? raw.map((row) => String(row.id)) : undefined)
  const byEvent = (rows: DatasetRecord[], ordered = false): Map<unknown, DatasetRecord[]> => {
    const index = new Map<unknown, DatasetRecord[]>()
    for (const row of rows) {
      const entries = index.get(row.eventId)
      if (entries) entries.push(row)
      else index.set(row.eventId, [row])
    }
    if (ordered) for (const entries of index.values()) entries.sort((a, b) => Number(a.position) - Number(b.position))
    return index
  }
  const tags = byEvent(relations.tags)
  const links = byEvent(relations.links, true)
  const attachments = byEvent(relations.attachments, true)
  return raw.map((row) => normalizeEventRecord({
    ...row,
    tags: (tags.get(row.id) ?? []).map((entry) => entry.tag),
    urls: (links.get(row.id) ?? []).map((entry) => entry.url),
    attachments: (attachments.get(row.id) ?? []).map((entry) => entry.path)
  } as DataRecord)).filter((event) => event.title && event.date)
}

// Raw record IO — no undo registration. The scoped data accessor publishes
// successful mutations to every view in this plugin session.
// The exported CRUD wraps these; the bus `calendar:add` command also uses them and
// returns a `revert`, so the command bus owns the single undo registration.
export async function rawAppend(record: EventRecord): Promise<boolean> {
  const next = forWrite(record)
  try {
    await api.data.transaction([
      { dataset: EVENTS_DATASET, operation: 'insert', values: eventRow(next) },
      ...relationWrites(next)
    ])
    return true
  } catch {
    return false
  }
}
export type DocumentRevision = Parameters<NonNullable<NoteInputProps['onRevisionChange']>>[0]

export async function rawUpdate(id: string, record: EventRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision): Promise<boolean> {
  const next = forWrite({ ...record, id })
  try {
    const ref = { pluginId: api.pluginId, sourceId: 'events', itemId: id }
    const baseline = await api.documents.read(ref)
    if (!baseline) return false
    if (expectedUpdatedAt !== undefined && (await api.data.dataset(EVENTS_DATASET).get({ id }))?.updatedAt !== expectedUpdatedAt) return false
    const relations = await eventRelations([id], false)
    const row = eventRow(next)
    delete row.id
    delete row.note
    await api.documents.update(ref, {
      expectedRevision: documentRevision?.expectedRevision ?? baseline.revision,
      vaultGeneration: documentRevision?.vaultGeneration ?? baseline.vaultGeneration,
      body: next.note,
      explicitTags: next.tags ?? [],
      operations: [
        { dataset: EVENTS_DATASET, operation: 'update', key: { id }, values: row },
        ...relations.links.map((entry) => ({ dataset: LINKS_DATASET, operation: 'delete' as const, key: { eventId: id, position: Number(entry.position) } })),
        ...relations.attachments.map((entry) => ({ dataset: ATTACHMENTS_DATASET, operation: 'delete' as const, key: { eventId: id, position: Number(entry.position) } })),
        ...relationWrites(next, false)
      ]
    })
    return true
  } catch {
    return false
  }
}
export async function rawDelete(id: string): Promise<boolean> {
  try { return (await api.data.dataset(EVENTS_DATASET).delete({ id })).affected > 0 } catch { return false }
}

export async function appendEvent(record: EventRecord): Promise<boolean> {
  if (!record.id || !record.title.trim() || !record.date) return false
  const ok = await rawAppend(record)
  if (ok) {
    api.undo.push({
      label: uiText('calendar.undo.addEvent', { title: record.title.trim() }),
      undo: async () => ({ ok: await rawDelete(record.id) }),
      redo: async () => ({ ok: await rawAppend(record) })
    })
  }
  return ok
}

export async function updateEvent(id: string, record: EventRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision): Promise<boolean> {
  if (!id || !record.title.trim()) return false
  if (isRemoteEventId(id)) return false // read-only remote event; never write back
  const prev = (await loadEvents()).find((event) => event.id === id)
  const ok = await rawUpdate(id, record, expectedUpdatedAt, documentRevision)
  if (ok && prev) {
    api.undo.push({
      label: uiText('calendar.undo.editEvent', { title: prev.title }),
      undo: async () => ({ ok: await rawUpdate(id, prev) }),
      redo: async () => ({ ok: await rawUpdate(id, record) })
    })
  }
  return ok
}

export async function deleteEvent(id: string): Promise<boolean> {
  if (isRemoteEventId(id)) return false // read-only remote event; never delete
  const prev = (await loadEvents()).find((event) => event.id === id)
  const ok = await rawDelete(id)
  if (ok && prev) {
    api.undo.push({
      label: uiText('calendar.undo.deleteEvent', { title: prev.title }),
      undo: async () => ({ ok: await rawAppend(prev) }),
      redo: async () => ({ ok: await rawDelete(id) })
    })
  }
  return ok
}

/** Build a fresh event with sane defaults. */
export function newEvent(title: string, date: string, opts?: Partial<EventRecord>): EventRecord {
  const now = new Date().toISOString()
  return {
    id: generateId('event'),
    title: title.trim(),
    date,
    tags: [],
    note: '',
    allDay: !opts?.startTime && !opts?.endTime,
    ...opts,
    createdAt: now,
    updatedAt: now
  }
}
