import { React, api } from './runtime'
import type { DatasetRecord } from '@valley/plugin-sdk'
import { sanitizeNoteDateSource, type NoteDateSource } from './noteDates'

const SOURCES_DATASET = 'calendar.note_date_sources'
const sourceDataset = () => api.data.dataset(SOURCES_DATASET)

/** Read the configured sources from the durable dataset. */
export async function loadNoteDateSources(): Promise<NoteDateSource[]> {
  const records = (await sourceDataset().query({ orderBy: [{ field: 'position', direction: 'asc' }], limit: 1000 })).rows
  return records.map((record) => sanitizeNoteDateSource(
    record.definition && typeof record.definition === 'object' && !Array.isArray(record.definition)
      ? record.definition as Record<string, unknown>
      : {}
  ))
}

/** Replace the ordered source definitions. */
export async function saveNoteDateSources(next: NoteDateSource[]): Promise<void> {
  const dataset = sourceDataset()
  const existing = (await dataset.query({ limit: 1000 })).rows
  await dataset.batch([
    ...existing.map((record) => ({ operation: 'delete' as const, key: { id: typeof record.id === 'string' ? record.id : '' } })),
    ...next.map((definition, position) => ({ operation: 'upsert' as const, values: { id: definition.id, position, definition: definition as unknown as DatasetRecord } }))
  ])
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
