import { React, api } from './runtime'
import type { ValleyReadonlyState } from '@valley/plugin-sdk'

/** Subscribe a view to the host's read-only core state (selection, index, prefs). */
export function useHostState(): ValleyReadonlyState {
  return React.useSyncExternalStore(api.subscribe, api.getState, api.getState)
}
