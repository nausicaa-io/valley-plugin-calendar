import { uiText } from '../localization'
import type { CalendarRequest } from './transport'
import type { EventRecord, RemoteCalendar } from '@valley/plugin-sdk/types'

interface GraphEvent {
  id?: string
  subject?: string
  bodyPreview?: string
  isAllDay?: boolean
  isCancelled?: boolean
  location?: { displayName?: string }
  start?: { dateTime?: string }
  end?: { dateTime?: string }
  lastModifiedDateTime?: string
}

export function splitDateTime(value: string): { date: string; time?: string } {
  const date = value.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] ?? ''
  const time = value.match(/T(\d{2}:\d{2})/)?.[1]
  return { date, ...(time ? { time } : {}) }
}

export function mapMicrosoftEvent(event: GraphEvent, accountId: string, calendarId?: string): EventRecord | null {
  if (event.isCancelled || !event.start?.dateTime) return null
  const start = splitDateTime(event.start.dateTime)
  if (!start.date) return null
  const end = event.end?.dateTime ? splitDateTime(event.end.dateTime) : undefined
  const now = new Date().toISOString()
  return {
    id: `microsoft:${calendarId ? `${encodeURIComponent(accountId)}:${encodeURIComponent(calendarId)}:` : ''}${event.id ?? `${accountId}:${event.start.dateTime}`}`,
    title: (event.subject ?? '(no title)').trim(),
    date: start.date,
    startTime: event.isAllDay ? undefined : start.time,
    endTime: event.isAllDay ? undefined : end?.time,
    allDay: event.isAllDay === true,
    location: event.location?.displayName?.trim() ? { name: event.location.displayName.trim() } : undefined,
    tags: [],
    note: event.bodyPreview ?? '',
    createdAt: now,
    updatedAt: event.lastModifiedDateTime ?? now,
    source: 'microsoft',
    accountId,
    calendarId,
    readOnly: true
  }
}

async function graphPages<T>(request: CalendarRequest, firstUrl: URL, prefer?: string): Promise<T[]> {
  const items: T[] = []
  let next: string | undefined = firstUrl.href
  const seen = new Set<string>()
  while (next) {
    if (seen.size >= 100 || seen.has(next)) throw new Error(uiText('backend.pages'))
    seen.add(next)
    const url = new URL(next)
    if (url.origin !== 'https://graph.microsoft.com' || !url.pathname.startsWith('/v1.0/')) {
      throw new Error(uiText('backend.continuation'))
    }
    const response = await request(url, prefer ? { Prefer: prefer } : undefined)
    if (!response.ok) throw new Error(uiText('backend.microsoft', { status: response.status }))
    const value = await response.json() as { value?: T[]; '@odata.nextLink'?: string }
    items.push(...(value.value ?? []))
    next = value['@odata.nextLink']
  }
  return items
}

export async function listCalendars(request: CalendarRequest): Promise<RemoteCalendar[]> {
  const url = new URL('https://graph.microsoft.com/v1.0/me/calendars')
  url.searchParams.set('$select', 'id,name,isDefaultCalendar,hexColor')
  const calendars = await graphPages<{ id: string; name: string; isDefaultCalendar?: boolean; hexColor?: string }>(request, url)
  return calendars.map((calendar) => ({
    id: calendar.id,
    name: calendar.name,
    primary: calendar.isDefaultCalendar === true,
    color: calendar.hexColor
  }))
}

export async function fetchCalendar(
  request: CalendarRequest,
  accountId: string,
  timeMin: string,
  timeMax: string,
  calendarId?: string
): Promise<EventRecord[]> {
  const url = new URL(calendarId
    ? `https://graph.microsoft.com/v1.0/me/calendars/${encodeURIComponent(calendarId)}/calendarView`
    : 'https://graph.microsoft.com/v1.0/me/calendarView')
  url.searchParams.set('startDateTime', timeMin)
  url.searchParams.set('endDateTime', timeMax)
  url.searchParams.set('$top', '1000')
  url.searchParams.set('$orderby', 'start/dateTime')
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  const events = await graphPages<GraphEvent>(request, url, `outlook.timezone="${timezone}"`)
  return events.map((event) => mapMicrosoftEvent(event, accountId, calendarId)).filter((event): event is EventRecord => event !== null)
}
