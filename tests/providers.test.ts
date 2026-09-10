import { afterEach, describe, expect, it, vi } from 'vitest'
import { mapGoogleEvent, splitDateTime, listCalendars as googleCalendars, fetchCalendar as googleEvents } from '../src/backend/google'
import { mapMicrosoftEvent, listCalendars as microsoftCalendars, fetchCalendar as microsoftEvents } from '../src/backend/microsoft'

afterEach(() => vi.unstubAllGlobals())

describe('remote calendar selection', () => {
  it('lists Google calendars across pages and pulls the selected calendar across event pages', async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce(Response.json({ items: [{ id: 'primary@example.test', summary: 'Fieldwork', primary: true }], nextPageToken: 'next-list' }))
      .mockResolvedValueOnce(Response.json({ items: [{ id: 'shared/calendar', summary: 'Canopy' }] }))
      .mockResolvedValueOnce(Response.json({ items: [{ id: 'same-id', summary: 'Canopy survey', start: { date: '2026-08-31' } }], nextPageToken: 'next-events' }))
      .mockResolvedValueOnce(Response.json({ items: [{ id: 'second', summary: 'Meadow survey', start: { date: '2026-09-01' } }] }))
    vi.stubGlobal('fetch', fetcher)
    expect(await googleCalendars(fetcher)).toMatchObject([
      { id: 'primary@example.test', name: 'Fieldwork', primary: true },
      { id: 'shared/calendar', name: 'Canopy', primary: false }
    ])
    const events = await googleEvents(fetcher, 'field-account', '2026-08-01', '2026-10-01', 'shared/calendar')
    expect(events).toHaveLength(2)
    expect(events[0]).toMatchObject({ calendarId: 'shared/calendar', accountId: 'field-account', readOnly: true })
    expect(String(fetcher.mock.calls[2][0])).toContain('/calendars/shared%2Fcalendar/events')
    expect(String(fetcher.mock.calls[3][0])).toContain('pageToken=next-events')
    expect(events[0].id).not.toBe(mapGoogleEvent({ id: 'same-id', start: { date: '2026-08-31' } }, 'other-account', 'shared/calendar')?.id)
  })

  it('lists Microsoft calendars and follows event pages for a selected calendar', async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce(Response.json({ value: [{ id: 'canopy/id', name: 'Canopy', isDefaultCalendar: true }] }))
      .mockResolvedValueOnce(Response.json({ value: [{ id: 'first', subject: 'Bird survey', start: { dateTime: '2026-08-31T09:00:00' } }], '@odata.nextLink': 'https://graph.microsoft.com/v1.0/me/calendars/canopy%2Fid/calendarView?$skiptoken=next' }))
      .mockResolvedValueOnce(Response.json({ value: [{ id: 'second', subject: 'Nest survey', start: { dateTime: '2026-09-01T09:00:00' } }] }))
    vi.stubGlobal('fetch', fetcher)
    expect(await microsoftCalendars(fetcher)).toMatchObject([{ id: 'canopy/id', name: 'Canopy', primary: true }])
    expect(await microsoftEvents(fetcher, 'field-account', '2026-08-01', '2026-10-01', 'canopy/id')).toHaveLength(2)
    expect(String(fetcher.mock.calls[1][0])).toContain('/calendars/canopy%2Fid/calendarView')
    expect(fetcher.mock.calls[2][1].Prefer).toContain('outlook.timezone=')
  })

  it('never sends Microsoft credentials to an untrusted continuation URL', async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json({ value: [], '@odata.nextLink': 'https://example.test/steal' }))
    vi.stubGlobal('fetch', fetcher)
    await expect(microsoftCalendars(fetcher)).rejects.toThrow('Invalid Microsoft Graph continuation URL')
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
})

describe('splitDateTime', () => {
  it('splits a wall-clock dateTime into date + HH:MM', () => {
    expect(splitDateTime('2026-06-17T09:30:00+02:00')).toEqual({ date: '2026-06-17', time: '09:30' })
  })
  it('treats a bare date as all-day (no time)', () => {
    expect(splitDateTime('2026-06-17')).toEqual({ date: '2026-06-17', time: undefined })
  })
})

describe('mapGoogleEvent', () => {
  it('maps a timed event to a read-only EventRecord', () => {
    const ev = mapGoogleEvent(
      {
        id: 'g1',
        summary: 'Standup',
        location: 'Room 3',
        description: 'daily',
        start: { dateTime: '2026-06-17T09:30:00+02:00' },
        end: { dateTime: '2026-06-17T10:00:00+02:00' }
      },
      'acc-1'
    )
    expect(ev).toMatchObject({
      id: 'google:g1',
      title: 'Standup',
      date: '2026-06-17',
      startTime: '09:30',
      endTime: '10:00',
      allDay: false,
      location: { name: 'Room 3' },
      source: 'google',
      accountId: 'acc-1',
      readOnly: true
    })
  })

  it('maps an all-day event (no times)', () => {
    const ev = mapGoogleEvent({ id: 'g2', summary: 'Holiday', start: { date: '2026-12-25' } }, 'acc-1')
    expect(ev).toMatchObject({ allDay: true, date: '2026-12-25' })
    expect(ev?.startTime).toBeUndefined()
  })

  it('skips cancelled events', () => {
    expect(mapGoogleEvent({ id: 'g3', status: 'cancelled', start: { date: '2026-01-01' } }, 'a')).toBeNull()
  })
})

describe('mapMicrosoftEvent', () => {
  it('maps a Graph calendarView event', () => {
    const ev = mapMicrosoftEvent(
      {
        id: 'm1',
        subject: 'Review',
        bodyPreview: 'notes',
        location: { displayName: 'Teams' },
        isAllDay: false,
        start: { dateTime: '2026-06-17T14:00:00.0000000' },
        end: { dateTime: '2026-06-17T15:00:00.0000000' }
      },
      'acc-2'
    )
    expect(ev).toMatchObject({
      id: 'microsoft:m1',
      title: 'Review',
      date: '2026-06-17',
      startTime: '14:00',
      endTime: '15:00',
      location: { name: 'Teams' },
      source: 'microsoft',
      accountId: 'acc-2',
      readOnly: true
    })
  })

  it('skips cancelled events', () => {
    expect(
      mapMicrosoftEvent({ id: 'm2', isCancelled: true, start: { dateTime: '2026-01-01T00:00:00' } }, 'a')
    ).toBeNull()
  })
})
