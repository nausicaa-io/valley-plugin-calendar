import { cleanup, fireEvent, render, waitFor, within } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { IndexEntry } from '@valley/plugin-sdk/types'
import { createMockValleyApi } from './harness'
import { initRuntime } from '../src/runtime'
import { initLocalization } from '../src/localization'
import { NoteDatesSection } from '../src/NoteDateSettings'

afterEach(cleanup)

const contact = (name: string, birthdate: string): IndexEntry => ({
  relPath: `Archive/Contacts/${name}.md`,
  title: name,
  kind: 'note',
  frontmatter: { type: 'contact', birthdate },
  mtimeMs: 0
})

/** The note-date source the development vault seeds for birthdays. */
const BIRTHDAYS_SOURCE = {
  id: 'notedate-birthdays',
  title: 'Birthdays',
  matchKey: 'type',
  matchValue: 'contact',
  dateField: 'birthdate',
  match: 'day-month',
  recurrenceLimitYears: 2,
  showCount: true,
  labelMode: 'filename',
  showFields: [],
  visible: true,
  hidden: false,
  icon: 'cake',
  color: 'palette:primary-blue'
}

async function renderSection(
  options: { noteDateSources?: Record<string, unknown>[]; indexEntries?: IndexEntry[] } = {}
): Promise<ReturnType<typeof createMockValleyApi>> {
  const mock = createMockValleyApi({
    manifest: { id: 'calendar' },
    indexEntries: options.indexEntries,
    datasets: {
      'calendar.note_date_sources': (options.noteDateSources ?? []).map((definition, position) => ({
        id: definition.id,
        position,
        definition
      }))
    }
  })
  initLocalization(mock.api)
  initRuntime(mock.api)
  render(React.createElement(NoteDatesSection))
  await waitFor(() => expect(document.querySelector('.notedate-source-row')).not.toBeNull())
  return mock
}

describe('Calendar note-date source editor', () => {
  it.each([false, true])('persists JSON-safe source definitions when title focus ends (edited: %s)', async (edited) => {
    const mock = await renderSection({ noteDateSources: [BIRTHDAYS_SOURCE] })
    const dataset = mock.api.data.dataset
    const batch = vi.fn()
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, batch: async (operations) => { batch(operations); return handle.batch(operations) } }
    }) as typeof dataset
    const title = document.querySelector<HTMLInputElement>('.notedate-source-title')!
    fireEvent.focus(title)
    if (edited) fireEvent.change(title, { target: { value: 'Field dates' } })
    fireEvent.blur(title)
    await waitFor(() => expect(batch).toHaveBeenCalledTimes(1))
    const operations = batch.mock.calls[0][0]
    expect(operations).toStrictEqual(JSON.parse(JSON.stringify(operations)))
    expect(mock.datasets.get('calendar.note_date_sources')?.[0]?.definition).toMatchObject({
      title: edited ? 'Field dates' : 'Birthdays', visible: true, hidden: false, showFields: []
    })
  })

  it('draws its colours with the same kit chips, in the same order, as the Map pin editor', async () => {
    await renderSection({ noteDateSources: [BIRTHDAYS_SOURCE] })

    const chips = document.querySelectorAll('.notedate-source-color .settings-color-swatch')
    expect(chips).toHaveLength(2)
    expect(chips[0].getAttribute('data-variant')).toBe('fill')
    expect(chips[1].getAttribute('data-variant')).toBe('ring')
    expect(chips[0].getAttribute('data-color')).toBe('palette:primary-blue')
  })

  it('marks an unset colour as unset rather than painting the fallback blue', async () => {
    await renderSection({ noteDateSources: [{ ...BIRTHDAYS_SOURCE, color: undefined }] })

    const [fill, ring] = document.querySelectorAll('.notedate-source-color .settings-color-swatch')
    // Both are optional here — unlike the Map's, where a pin must have a body
    // colour — so both start as the dashed "no colour set" chip.
    expect(fill.getAttribute('data-unset')).toBe('true')
    expect(ring.getAttribute('data-unset')).toBe('true')
  })

  it('paints the glyph swatch through custom properties, never a resolved colour', async () => {
    await renderSection({ noteDateSources: [BIRTHDAYS_SOURCE] })

    const swatch = document.querySelector('.notedate-source-swatch') as HTMLElement
    expect(swatch.style.getPropertyValue('--swatch-fill')).toBe('var(--color-primary-blue)')
    expect(swatch.style.getPropertyValue('--swatch-on')).toBe('var(--color-primary-blue-on)')
    expect(swatch.style.background).toBe('')
  })

  it('gives Hide and Delete a glyph each, as the Map pin-source row does', async () => {
    await renderSection({ noteDateSources: [BIRTHDAYS_SOURCE] })

    const actions = document.querySelector('.notedate-source-actions') as HTMLElement
    const [hide, remove] = within(actions).getAllByRole('button')
    expect(hide).toHaveTextContent('Hide')
    expect(remove).toHaveTextContent('Delete')
    for (const button of [hide, remove]) {
      expect(button.getAttribute('data-variant')).toBe('ghost')
      expect(button.getAttribute('data-size')).toBe('small')
      expect(button.querySelector('svg')).not.toBeNull()
    }
  })

  it('arms Delete before it deletes, and turns the kit button red while armed', async () => {
    await renderSection({ noteDateSources: [BIRTHDAYS_SOURCE] })

    const actions = document.querySelector('.notedate-source-actions') as HTMLElement
    const remove = within(actions).getAllByRole('button')[1]
    fireEvent.click(remove)
    await waitFor(() => expect(remove).toHaveTextContent('Confirm'))
    expect(remove.getAttribute('data-variant')).toBe('danger')
    // Still one row: the first click arms, it does not delete.
    expect(document.querySelectorAll('.notedate-source-row')).toHaveLength(1)
  })

  it('still reports what the rule finds', async () => {
    await renderSection({
      noteDateSources: [BIRTHDAYS_SOURCE],
      indexEntries: [contact('Tim Cook', '1960-11-01'), contact('Ed Catmull', '1945-03-31')]
    })

    expect(document.querySelector('.notedate-source-stats')).toHaveTextContent('2 notes match')
  })
})
