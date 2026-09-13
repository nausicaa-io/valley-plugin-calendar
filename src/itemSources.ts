import type {
  CalendarItemAction,
  CalendarItemPatch,
  CalendarSourceItem,
  CalendarItemSourceIntegration,
  InteropServiceProvider
} from '@valley/plugin-sdk'
import {
  CALENDAR_ITEM_SOURCE_REVISION_V1,
  CALENDAR_ITEM_SOURCE_V1,
  CALENDAR_ITEM_ACTION_EDIT,
  type CalendarItemSource
} from '@valley/plugin-sdk'
import { React, api } from './runtime'
import { providerSourceKey } from './settingsStore'
import { uiText } from './localization'
import { createReloadQueue } from './reloadQueue'

export interface SourcedItem {
  sourceId: string
  sourceOwner: string
  labelKey: string
  item: CalendarSourceItem
  editable: boolean
}

export interface CalendarSourceProvider {
  sourceId: string
  sourceKey: string
  owner: string
  version: string
  methods: readonly string[]
  integration?: CalendarItemSourceIntegration
}

type SourceProvider = InteropServiceProvider<CalendarItemSource>

function sources(): readonly SourceProvider[] {
  return api.interop.services.providers(CALENDAR_ITEM_SOURCE_V1)
}

function isIntegration(value: unknown): value is CalendarItemSourceIntegration {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const integration = value as Partial<CalendarItemSourceIntegration>
  return typeof integration.name === 'string' && typeof integration.version === 'string'
}

export function sourceDescriptors(): CalendarSourceProvider[] {
  return sources().map((source) => ({
    sourceId: source.providerId,
    sourceKey: providerSourceKey(source.owner),
    owner: source.owner,
    version: source.version,
    methods: source.methods,
    integration: isIntegration(source.metadata) ? source.metadata : undefined
  }))
}

export function useCalendarSourceProviders(): CalendarSourceProvider[] {
  const [providers, setProviders] = React.useState<CalendarSourceProvider[]>(sourceDescriptors)
  React.useEffect(() => {
    const refresh = () => setProviders(sourceDescriptors())
    const off = api.interop.services.subscribe(CALENDAR_ITEM_SOURCE_V1, refresh)
    refresh()
    return off
  }, [])
  return providers
}

function sourceById(sourceId: string): SourceProvider | null {
  return sources().find((source) => source.providerId === sourceId) ?? null
}

function isSourceItem(value: unknown): value is CalendarSourceItem {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const item = value as Partial<CalendarSourceItem>
  return typeof item.id === 'string' && typeof item.title === 'string' && typeof item.date === 'string'
}

export function listSourcedItems(strict = false): Promise<SourcedItem[]> {
  const reads = api.runtime.getOrCreate('calendar.sourceReads', () => new Map<boolean, Promise<SourcedItem[]>>())
  let pending = reads.get(strict)
  if (!pending) {
    pending = readSourcedItems(strict).finally(() => { reads.delete(strict) })
    reads.set(strict, pending)
  }
  return pending
}

async function readSourcedItems(strict: boolean): Promise<SourcedItem[]> {
  const lists = await Promise.all(sources().map(async (source) => {
    const result = await source.invoke('list')
    if (!result.ok || !Array.isArray(result.value)) {
      if (strict) throw new Error(result.ok ? `Calendar provider "${source.owner}" returned invalid items.` : result.error.message)
      if (!result.ok) console.error(`[calendar] item source "${source.owner}" failed: ${result.error.message}`)
      return []
    }
    return result.value.filter(isSourceItem).map((item) => ({
      sourceId: source.providerId,
      sourceOwner: source.owner,
      labelKey: `plugin.${source.owner}.name`,
      item,
      editable: !item.readOnly && (source.methods.includes('update') || source.methods.includes('remove'))
    }))
  }))
  return lists.flat()
}

export function useSourcedItems(): { items: SourcedItem[]; reload: () => void } {
  const [items, setItems] = React.useState<SourcedItem[]>([])
  const queue = React.useRef<ReturnType<typeof createReloadQueue<SourcedItem[]>> | null>(null)
  const reload = React.useCallback(() => { void queue.current?.reload() }, [])
  React.useEffect(() => {
    const current = createReloadQueue(listSourcedItems, setItems, (error) => console.error('[calendar] item sources reload failed', error))
    queue.current = current
    const offSources = api.interop.services.subscribe(CALENDAR_ITEM_SOURCE_V1, reload)
    const offRevisions = api.interop.state.subscribe(CALENDAR_ITEM_SOURCE_REVISION_V1, reload)
    reload()
    return () => {
      current.dispose()
      if (queue.current === current) queue.current = null
      offSources()
      offRevisions()
    }
  }, [reload])
  return { items, reload }
}

async function invokeBoolean(
  sourceId: string,
  method: keyof CalendarItemSource & string,
  args: readonly unknown[]
): Promise<boolean> {
  const source = sourceById(sourceId)
  if (!source?.methods.includes(method)) return false
  const result = await source.invoke(method, args)
  return result.ok && result.value === true
}

export function updateSourcedItem(
  sourceId: string,
  itemId: string,
  patch: CalendarItemPatch
): Promise<boolean> {
  return invokeBoolean(sourceId, 'update', [itemId, patch])
}

export function removeSourcedItem(sourceId: string, itemId: string): Promise<boolean> {
  return invokeBoolean(sourceId, 'remove', [itemId])
}

export function createSourcedItem(
  sourceId: string,
  date: string,
  patch: CalendarItemPatch
): Promise<boolean> {
  return invokeBoolean(sourceId, 'create', [date, patch])
}

export async function openSourcedItem(sourceId: string, itemId: string): Promise<boolean> {
  const source = sourceById(sourceId)
  if (!source?.methods.includes('open')) return false
  const result = await source.invoke('open', [itemId])
  return result.ok
}

function isItemAction(value: unknown): value is CalendarItemAction {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const action = value as Partial<CalendarItemAction>
  return typeof action.id === 'string' && typeof action.label === 'string'
}

/**
 * The provider's own menu entries for one item. An older provider has no
 * `actions` method at all, so an empty list is the normal answer, not a failure
 * — the surface still renders whatever it offers on its own.
 */
export async function sourcedItemActions(sourceId: string, itemId: string): Promise<CalendarItemAction[]> {
  const source = sourceById(sourceId)
  if (!source?.methods.includes('actions')) return []
  const result = await source.invoke('actions', [itemId])
  if (!result.ok) {
    console.error(`[calendar] item source "${source.owner}" failed: ${result.error.message}`)
    return []
  }
  return Array.isArray(result.value) ? result.value.filter(isItemAction) : []
}

export function runSourcedItemAction(sourceId: string, itemId: string, actionId: string): Promise<boolean> {
  return invokeBoolean(sourceId, 'runAction', [itemId, actionId])
}

export async function editSourcedItem(sourceId: string, itemId: string): Promise<void> {
  if (await runSourcedItemAction(sourceId, itemId, CALENDAR_ITEM_ACTION_EDIT)) return
  await api.ui.confirm({
    title: uiText('calendar.editor.unavailable'),
    message: uiText('calendar.editor.retry'),
    actions: [{ label: uiText('calendar.editor.close'), value: 'close' }]
  })
}

export function creatableSources(): { id: string; labelKey: string }[] {
  return sources()
    .filter((source) => source.methods.includes('create'))
    .map((source) => ({ id: source.providerId, labelKey: `plugin.${source.owner}.name` }))
}

export async function configureSource(sourceId: string): Promise<boolean> {
  const source = sourceById(sourceId)
  if (!source?.methods.includes('configure')) return false
  const result = await source.invoke('configure')
  return result.ok
}
