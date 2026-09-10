import { uiText } from '../localization'
import type { CalendarRequest } from './transport'
import type { EventRecord, RemoteCalendar } from '@valley/plugin-sdk/types'

interface GoogleEvent {
  id?: string
  status?: string
  summary?: string
  description?: string
  location?: string
  start?: { date?: string; dateTime?: string }
  end?: { date?: string; dateTime?: string }
  updated?: string
}

export function splitDateTime(value: string): { date: string; time?: string } {
  const date = value.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] ?? ''
  const time = value.match(/T(\d{2}:\d{2})/)?.[1]
  return { date, ...(time ? { time } : {}) }
}

export function mapGoogleEvent(event: GoogleEvent, accountId: string, calendarId?: string): EventRecord | null {
  if (event.status === 'cancelled') return null
  const startRaw = event.start?.dateTime ?? event.start?.date
  if (!startRaw) return null
  const start = splitDateTime(startRaw)
  if (!start.date) return null
  const allDay = !event.start?.dateTime
  const end = event.end?.dateTime ? splitDateTime(event.end.dateTime) : undefined
  const now = new Date().toISOString()
  return {
    id: `google:${calendarId ? `${encodeURIComponent(accountId)}:${encodeURIComponent(calendarId)}:` : ''}${event.id ?? `${accountId}:${startRaw}`}`,
    title: (event.summary ?? '(no title)').trim(),
    date: start.date,
    startTime: allDay ? undefined : start.time,
    endTime: allDay ? undefined : end?.time,
    allDay,
    location: event.location?.trim() ? { name: event.location.trim() } : undefined,
    tags: [],
    note: event.description ?? '',
    createdAt: now,
    updatedAt: event.updated ?? now,
    source: 'google',
    accountId,
    calendarId,
    readOnly: true
  }
}

export async function listCalendars(request: CalendarRequest): Promise<RemoteCalendar[]> {
  const url = new URL('https://www.googleapis.com/calendar/v3/users/me/calendarList')
  url.searchParams.set('maxResults', '250')
  url.searchParams.set('minAccessRole', 'reader')
  url.searchParams.set('showHidden', 'true')
  const calendars: RemoteCalendar[] = []
  let pageToken: string | undefined
  const seen = new Set<string>()
  do {
    if (seen.size >= 100 || pageToken && seen.has(pageToken)) throw new Error(uiText('backend.pages'))
    seen.add(pageToken ?? '')
    if (pageToken) url.searchParams.set('pageToken', pageToken)
    const response = await request(url)
    if (!response.ok) throw new Error(uiText('backend.googleList', { status: response.status }))
    const value = await response.json() as {
      items?: { id: string; summary?: string; summaryOverride?: string; primary?: boolean; backgroundColor?: string }[]
      nextPageToken?: string
    }
    calendars.push(...(value.items ?? []).map((calendar) => ({
      id: calendar.id,
      name: calendar.summaryOverride || calendar.summary || calendar.id,
      primary: calendar.primary === true,
      color: calendar.backgroundColor
    })))
    pageToken = value.nextPageToken
  } while (pageToken)
  return calendars
}

export async function fetchCalendar(
  request: CalendarRequest,
  accountId: string,
  timeMin: string,
  timeMax: string,
  calendarId = 'primary'
): Promise<EventRecord[]> {
  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`)
  url.searchParams.set('timeMin', timeMin)
  url.searchParams.set('timeMax', timeMax)
  url.searchParams.set('singleEvents', 'true')
  url.searchParams.set('orderBy', 'startTime')
  url.searchParams.set('maxResults', '2500')
  const events: EventRecord[] = []
  let pageToken: string | undefined
  const seen = new Set<string>()
  do {
    if (seen.size >= 100 || pageToken && seen.has(pageToken)) throw new Error(uiText('backend.pages'))
    seen.add(pageToken ?? '')
    if (pageToken) url.searchParams.set('pageToken', pageToken)
    const response = await request(url)
    if (!response.ok) throw new Error(uiText('backend.googleFetch', { status: response.status }))
    const value = await response.json() as { items?: GoogleEvent[]; nextPageToken?: string }
    events.push(...(value.items ?? []).map((event) => mapGoogleEvent(event, accountId, calendarId)).filter((event): event is EventRecord => event !== null))
    pageToken = value.nextPageToken
  } while (pageToken)
  return events
}
