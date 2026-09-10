/**
 * Calendar — the event planner and generic dated-item surface. Calendar owns
 * only its events; tasks and other dated records arrive through versioned
 * contracts and are mutated by their providers. The visible period and selected
 * day ride the shared time selection through `api.workspace.*TimeControl*`,
 * which also drives the dashboard timeframe takeover. The day window and
 * filters persist in plugin settings; groups come only from the app registry.
 *
 * Four views: `calendar.agenda` (left_sidebar — the chronological list),
 * `calendar.panel` (right_sidebar — the compact calendar), `calendar.page`
 * (main_workspace — month/week/year grids beside an agenda column) and
 * `calendar.settings` (the Settings → Plugins editor).
 */
import {
  CALENDAR_NAVIGATOR_V1,
  CALENDAR_PANEL_SELECTION_V1,
  AGENT_TOOL_PROVIDER_V1,
  type CalendarNavigator,
  type ValleyPluginApi,
  type ValleyPluginModule
} from '@valley/plugin-sdk'
import { initRuntime, revealCalendarItem, revealTargetStore } from './runtime'
import { injectStyles } from './styles'
import { registerCalendarCommands } from './commands'
import { registerCalendarFence } from './fence'
import { AgendaPanel } from './AgendaPanel'
import { Panel } from './Panel'
import { Page } from './Page'
import { Settings } from './Settings'
import { initLocalization } from './localization'
import { calendarAgentTools } from './agentTools'
import { startGroupUsageReporting } from './groups'
import { calendarLinkPatch } from './timeControl'
import { registerCalendarSurfaces } from './surfaces'

export function register(api: ValleyPluginApi): () => void {
  initLocalization(api)
  initRuntime(api)
  const disposeStyles = injectStyles()
  const offLinks = api.workspace.onOpenOwnLink((state) => {
    const patch = calendarLinkPatch(state)
    if (patch) api.workspace.patchTimeControl(patch)
  })

  api.registerView('calendar.agenda', AgendaPanel)
  api.registerView('calendar.panel', Panel)
  api.registerView('calendar.page', Page)
  api.registerView('calendar.settings', Settings)


  // Tell the host which groups our events are in — a group is only deletable
  // once nothing anywhere is in it.
  const offGroupUsage = startGroupUsageReporting()

  const offCommands = registerCalendarCommands(api)
  const offSurfaces = registerCalendarSurfaces(api)
  const offAgentTools = api.interop.services.provide(AGENT_TOOL_PROVIDER_V1, calendarAgentTools(api))
  const offFence = registerCalendarFence()
  const reveals = revealTargetStore()
  const navigator: CalendarNavigator = {
    id: 'calendar',
    labelKey: 'manifest.name',
    // Preserves the current view mode, per the contract — the Agenda passes a
    // view of its own because clicking a timed item there means "show me the day".
    openDate: (request) => revealCalendarItem(request)
  }
  const offNavigator = api.interop.services.provide(CALENDAR_NAVIGATOR_V1, navigator)
  api.interop.state.publish(CALENDAR_PANEL_SELECTION_V1, null)
  reveals.publish(null)

  return () => {
    offCommands()
    offSurfaces()
    offAgentTools()
    offFence()
    offNavigator()
    offGroupUsage()
    offLinks()
    disposeStyles()
    api.interop.state.publish(CALENDAR_PANEL_SELECTION_V1, null)
    reveals.publish(null)
  }
}

const plugin: ValleyPluginModule = { register }
export default plugin
