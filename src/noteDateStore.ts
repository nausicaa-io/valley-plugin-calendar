import { React, api } from './runtime'
import type { DatasetRecord, DatasetBatchOperation } from '@valley/plugin-sdk'
import { sanitizeNoteDateSource, type NoteDateSource } from './noteDates'
import { uiText } from './localization'

const SOURCES_DATASET = 'calendar.note_date_sources'
const sourceDataset = () => api.data.dataset(SOURCES_DATASET)

async function sourceRows(): Promise<DatasetRecord[]> {
  const dataset = sourceDataset()
  const rows: DatasetRecord[] = []
  let cursor: string | undefined
  do {
    const page = await dataset.query({ orderBy: [{ field: 'position', direction: 'asc' }], limit: 1000, cursor })
    rows.push(...page.rows)
    cursor = page.cursor
  } while (cursor)
  return rows
}

/** Read the configured sources from the durable dataset. */
export async function loadNoteDateSources(): Promise<NoteDateSource[]> {
  const records = await sourceRows()
  return records.map((record) => sanitizeNoteDateSource(
    record.definition && typeof record.definition === 'object' && !Array.isArray(record.definition)
      ? record.definition as Record<string, unknown>
      : {}
  ))
}

/** Replace the ordered source definitions. */
export async function saveNoteDateSources(next: NoteDateSource[]): Promise<void> {
  const dataset = sourceDataset()
  const existing = await sourceRows()
  const retained = new Set(next.map((definition) => definition.id))
  const current = new Map(existing.map((record) => [record.id, record]))
  const changed = next.map((definition, position) => ({ id: definition.id, position, definition: definition as unknown as DatasetRecord }))
    .filter((record) => current.get(record.id)?.position !== record.position || JSON.stringify(current.get(record.id)?.definition) !== JSON.stringify(record.definition))
  const operations: DatasetBatchOperation[] = existing.filter((record) => !retained.has(String(record.id)))
    .map((record) => ({ operation: 'delete', key: { id: String(record.id) } }))
  if (changed.length) operations.push({ operation: 'upsert', values: changed })
  if (operations.length > 1000) throw new Error(uiText('calendar.error.atomicLimit'))
  if (operations.length) await dataset.batch(operations)
}

/** Subscribe a view to the sources — reloads on every save. */
export function useNoteDateSources(): NoteDateSource[] {
  const [sources, setSources] = React.useState<NoteDateSource[]>([])
  React.useEffect(() => {
    let alive = true
    const refresh = (): void => {
      void loadNoteDateSources().then((next) => {
        if (alive) setSources(next)
      })
    }
    refresh()
    const off = sourceDataset().subscribe(refresh)
    return () => {
      alive = false
      off()
    }
  }, [])
  return sources
}
