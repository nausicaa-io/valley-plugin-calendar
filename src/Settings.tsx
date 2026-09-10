import type { CalendarAccount, CalendarProvider } from './serviceClient'
import { calendarServices } from './serviceClient'
import { React, api } from './runtime'
import type { ReactElement } from 'react'
import type { RemoteCalendar } from '@valley/plugin-sdk/types'
import {
  DEFAULT_DAY_END_HOUR,
  DEFAULT_DAY_START_HOUR,
  HIDDEN_SOURCES_KEY,
  ITEM_CLICK_TARGET_KEY,
  useCalendarSettings,
  readCalendarSettings,
  type RemoteCalendarSetting
} from './settingsStore'
import { getRemoteStore } from './remoteSync'
import { NoteDatesSection } from './NoteDateSettings'
import { uiText } from './localization'
import { CalendarDays, ChevronRight } from './icons'
import { configureSource, useCalendarSourceProviders } from './itemSources'

function SyncedCalendarsEditor(): ReactElement {
  const settings = useCalendarSettings()
  const [connections, setConnections] = React.useState<{ accounts: CalendarAccount[]; providers: CalendarProvider[] }>({ accounts: [], providers: [] })
  const [selected, setSelected] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)
  const store = getRemoteStore()
  const status = React.useSyncExternalStore(store.subscribe, store.getStatus)
  const { Button, Row, Toggle, SelectField } = api.ui.settings
  const refresh = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await calendarServices(api).listCalendarConnections()
      if (!result.ok || !result.data) throw new Error(result.error || uiText('calendar.sync.accountsError'))
      setConnections(result.data)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : uiText('calendar.sync.accountsError'))
    } finally {
      setLoading(false)
    }
  }, [])
  React.useEffect(() => { void refresh() }, [refresh])

  const save = async (key: string, value: unknown): Promise<void> => {
    setSaving(true)
    setError(null)
    try {
      const result = await api.settings.set(key, value)
      if (!result.ok) throw new Error(result.error || uiText('calendar.sync.saveError'))
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : uiText('calendar.sync.saveError'))
    } finally {
      setSaving(false)
    }
  }
  const saveCalendar = (accountId: string, calendarId: string, patch: RemoteCalendarSetting): void => {
    const current = readCalendarSettings().remoteCalendars
    void save('remoteCalendars', { ...current, [accountId]: {
      ...current[accountId], [calendarId]: { ...current[accountId]?.[calendarId], ...patch }
    } })
  }
  const toggleAccount = (id: string, enabled: boolean): void => {
    const disabled = new Set(readCalendarSettings().disabledCalendarAccounts)
    if (enabled) disabled.delete(id)
    else disabled.add(id)
    void save('disabledCalendarAccounts', [...disabled])
  }
  const account = connections.accounts.find((item) => item.id === selected)
  const provider = connections.providers.find((item) => item.id === (account?.oauthSetupId || account?.provider || selected))
  const name = account?.displayName || account?.address || provider?.label || provider?.name || ''
  const accountReady = account?.capabilities.includes('calendar') && (!account.secretState || account.secretState === 'ok')
  const enabled = !!account && !settings.disabledCalendarAccounts.includes(account.id)
  const accountStatus = account ? status.accounts[account.id] : undefined
  const [listed, setListed] = React.useState<Record<string, RemoteCalendar[]>>({})
  const [listing, setListing] = React.useState(false)
  React.useEffect(() => {
    if (!account || !accountReady) return
    let cancelled = false
    setListing(true)
    void calendarServices(api).listCalendars(account.id).then((result) => {
      if (cancelled) return
      if (result.ok && result.data) setListed((current) => ({ ...current, [account.id]: result.data!.calendars }))
      else setError(result.error || uiText('calendar.sync.calendarsError'))
    }).catch((reason) => {
      if (!cancelled) setError(reason instanceof Error ? reason.message : uiText('calendar.sync.calendarsError'))
    }).finally(() => { if (!cancelled) setListing(false) })
    return () => { cancelled = true }
  }, [account, accountReady])
  const calendars = account ? status.calendars[account.id] ?? listed[account.id] : undefined
  const openAccounts = (): void => api.workspace.openSettings('accounts')
  const connectionState = (entry: CalendarAccount): string => {
    if (entry.secretState && entry.secretState !== 'ok') return uiText('calendar.sync.reconnect')
    if (!entry.capabilities.includes('calendar')) return uiText('calendar.sync.permission')
    return uiText(settings.disabledCalendarAccounts.includes(entry.id) ? 'calendar.overview.disabled' : 'calendar.sync.connected')
  }
  const row = (id: string, title: string, address: string | undefined, state: string): ReactElement => (
    <button key={id} type="button" className="settings-list-row calendar-account-row" onClick={() => { setSelected(id); setError(null) }}>
      <span className="settings-list-glyph"><CalendarDays /></span>
      <span className="settings-list-meta">
        <span className="settings-list-name">{title}</span>
        {address && <span className="settings-list-sub">{address}</span>}
        <span className="settings-list-sub">{state}</span>
      </span>
      <ChevronRight />
    </button>
  )
  const available = connections.providers.filter((item) => !connections.accounts.some((entry) => (entry.oauthSetupId || entry.provider) === item.id))
  return (
    <div className="calendar-sync-settings settings-listpage">
      {selected && (account || provider) ? <>
        <div className="settings-listpage-crumbs">
          <Button onClick={() => { setSelected(null); setError(null) }}>{uiText('calendar.sync.back')}</Button>
          <span className="settings-crumb-current">{name}</span>
        </div>
        <div className="calendar-account-identity">
          <span className="settings-list-glyph"><CalendarDays /></span>
          <span className="settings-list-meta"><span className="settings-list-name">{name}</span>
            {(account?.address || provider?.email) && <span className="settings-list-sub">{account?.address || provider?.email}</span>}
          </span>
          <Button onClick={openAccounts}>{uiText('calendar.sync.manage')}</Button>
        </div>
        {!accountReady ? <p className="settings-empty-text">{account ? connectionState(account) : uiText(provider?.configured ? 'calendar.sync.saved' : 'calendar.sync.setup')}</p> : account && <>
          <Row title={uiText('calendar.sync.account')} description={uiText('calendar.sync.readOnly')}>
            <Toggle checked={enabled} disabled={saving} onChange={(value) => toggleAccount(account.id, value)} label={uiText('calendar.sync.account')} />
          </Row>
          {(listing && !calendars) && <p role="status">{uiText('calendar.sync.loadingCalendars')}</p>}
          {calendars?.length === 0 && <p className="settings-empty-text">{uiText('calendar.sync.noCalendars')}</p>}
          {calendars?.map((calendar) => {
            const choice = settings.remoteCalendars[account.id]?.[calendar.id]
            const checked = choice?.enabled ?? calendar.primary
            return <div key={calendar.id} className="calendar-sync-calendar">
              <Row title={calendar.name} description={calendar.primary ? uiText('calendar.sync.primary') : undefined}>
                <Toggle checked={checked} disabled={saving || !enabled} onChange={(value) => saveCalendar(account.id, calendar.id, { enabled: value })} label={uiText('calendar.sync.select', { name: calendar.name })} />
              </Row>
              {checked && <Row title={uiText('calendar.field.groupId')}>
                <SelectField value={choice?.groupId ?? ''} disabled={saving || !enabled} onChange={(groupId) => saveCalendar(account.id, calendar.id, { groupId })}
                  options={[{ value: '', label: uiText('calendar.sync.noGroup') }, ...settings.groups.map((group) => ({ value: group.id, label: group.name, color: group.color }))]}
                  ariaLabel={uiText('calendar.sync.group', { name: calendar.name })} />
              </Row>}
            </div>
          })}
          {accountStatus?.lastSyncAt && <p className="settings-empty-text" role="status">{uiText('calendar.sync.last', {
            time: new Date(accountStatus.lastSyncAt).toLocaleString(api.ui.language()), count: accountStatus.eventCount
          })}</p>}
          <Button disabled={status.syncing || saving || !enabled} onClick={() => void store.sync()}>{uiText(status.syncing ? 'auto.221ca63005ea' : 'auto.2b7d938e6787')}</Button>
        </>}
      </> : <>
        <div className="settings-listpage-header">
          <h4 className="settings-label">{uiText('calendar.overview.accounts')}</h4>
          <Button onClick={openAccounts}>{uiText('calendar.sync.manage')}</Button>
        </div>
        <p className="settings-empty-text">{uiText('calendar.sync.description')}</p>
        {loading ? <p role="status">{uiText('calendar.sync.loadingAccounts')}</p> : <div className="settings-list">
          {connections.accounts.map((entry) => row(entry.id, entry.displayName || entry.address, entry.displayName ? entry.address : undefined, connectionState(entry)))}
          {available.map((entry) => row(entry.id, entry.label || entry.name, entry.email, uiText(entry.configured ? 'calendar.sync.savedShort' : 'calendar.sync.setupShort')))}
          {!connections.accounts.length && !available.length && <p className="settings-empty-text">{uiText('auto.7eacb0e385b4')}</p>}
        </div>}
        <div className="settings-row-actions"><Button disabled={loading || status.syncing} onClick={() => { void refresh(); void store.sync() }}>{uiText('calendar.sync.refresh')}</Button></div>
      </>}
      {(error || accountStatus?.error || status.error) && <p className="settings-path-error" role="alert">{error || accountStatus?.error || status.error}</p>}
    </div>
  )
}

function DayWindowEditor({
  dayStartHour,
  dayEndHour
}: {
  dayStartHour: number
  dayEndHour: number
}): ReactElement {
  const { NumberField, Row } = api.ui.settings
  return (
    <>
      <Row title={uiText('auto.46fbb53a9be2')} description={uiText('auto.f07b365f8502')}>
        <NumberField
          min={0}
          max={23}
          value={dayStartHour}
          onChange={() => {}}
          onCommit={(value) => {
            if (value != null) void api.settings.set('dayStartHour', value)
          }}
          ariaLabel={uiText('auto.46fbb53a9be2')}
        />
      </Row>
      <Row title={uiText('calendar.dayEndHour')} description={uiText('calendar.dayEndHourDesc')}>
        <NumberField
          min={1}
          max={24}
          value={dayEndHour}
          onChange={() => {}}
          onCommit={(value) => {
            if (value != null) void api.settings.set('dayEndHour', value)
          }}
          ariaLabel={uiText('calendar.dayEndHour')}
        />
      </Row>
      <span className="settings-empty-text">
        {uiText('auto.808d7dca8a74')}{' '}{DEFAULT_DAY_START_HOUR}:00–{DEFAULT_DAY_END_HOUR}:00.{' '}
        {uiText('calendar.dayWindowGrows')}
      </span>
    </>
  )
}

/** The shared registry lives in Appearance → Groups; every plugin that colours
 *  records by group offers the same jump rather than a fork of the editor. */
function GroupsSection(): ReactElement {
  const { Button, Row, Section } = api.ui.settings
  return (
    <Section title={uiText('calendar.settings.groups')}>
      <Row title={uiText('calendar.settings.groups')} description={uiText('calendar.settings.groupsDesc')}>
        <Button onClick={() => api.workspace.openSettings('groups')}>
          {uiText('calendar.settings.groups')}
        </Button>
      </Row>
    </Section>
  )
}

function CalendarSection(): ReactElement {
  const { dayStartHour, dayEndHour, itemClickTarget } = useCalendarSettings()
  const { Row, Section, SelectField } = api.ui.settings
  return (
    <>
      <Section>
        <Row
          title={uiText('calendar.settings.openItemsIn')}
          description={uiText('calendar.settings.openItemsInDesc')}
        >
          <SelectField
            value={itemClickTarget}
            onChange={(value) => void api.settings.set(ITEM_CLICK_TARGET_KEY, value)}
            options={[
              { value: 'owner', label: uiText('calendar.settings.openItemsOwner') },
              { value: 'agenda', label: uiText('calendar.settings.openItemsAgenda') }
            ]}
            ariaLabel={uiText('calendar.settings.openItemsIn')}
          />
        </Row>
        <DayWindowEditor dayStartHour={dayStartHour} dayEndHour={dayEndHour} />
      </Section>
      <GroupsSection />
    </>
  )
}

function SyncedCalendarsSection(): ReactElement {
  const { Section } = api.ui.settings
  return (
    <Section>
      <SyncedCalendarsEditor />
    </Section>
  )
}

function PluginsSection(): ReactElement {
  const providers = useCalendarSourceProviders()
  const { hiddenSources } = useCalendarSettings()
  const { PluginCard, Section } = api.ui.settings
  const hidden = new Set(hiddenSources)
  const setEnabled = (sourceKey: string, enabled: boolean): void => {
    const next = new Set(hidden)
    if (enabled) next.delete(sourceKey)
    else next.add(sourceKey)
    void api.settings.set(HIDDEN_SOURCES_KEY, [...next])
  }
  return (
    <Section className="calendar-plugins-settings">
      {providers.length === 0 ? (
        <span className="settings-empty-text">{uiText('calendar.plugins.empty')}</span>
      ) : (
        <div className="settings-plugin-list">
          {providers.map((provider) => {
            const identity = provider.integration
            const localized = identity?.localized?.[api.ui.language()]
            const name = localized?.name ?? identity?.name ?? provider.owner
            const enabled = !hidden.has(provider.sourceKey)
            return (
              <PluginCard
                key={provider.sourceId}
                name={name}
                version={identity?.version ?? provider.version}
                versionLabel={uiText('calendar.plugins.version')}
                author={identity?.author}
                authorLabel={uiText('calendar.plugins.by')}
                description={localized?.description ?? identity?.description}
                enabled={enabled}
                onChange={(next) => setEnabled(provider.sourceKey, next)}
                toggleLabel={uiText(enabled ? 'calendar.plugins.disable' : 'calendar.plugins.enable', { p0: name })}
                onConfigure={provider.methods.includes('configure')
                  ? () => void configureSource(provider.sourceId)
                  : undefined}
                configureLabel={uiText('calendar.plugins.configure', { p0: name })}
              />
            )
          })}
        </div>
      )}
    </Section>
  )
}

export function Settings({ section }: { section?: string }): ReactElement {
  if (section === 'dates') return <NoteDatesSection />
  if (section === 'sync') return <SyncedCalendarsSection />
  if (section === 'plugins') return <PluginsSection />
  return <CalendarSection />
}
