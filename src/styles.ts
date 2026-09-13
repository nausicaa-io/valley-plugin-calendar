const CSS = `
/* ── Calendar (ported from core App.css) ───────────────────────────────── */

.calendar-view {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  height: 100%;
  color: var(--title-color);
  overflow: hidden;
}

.calendar-view.calendar-view-main,
.calendar-view.calendar-view-sidebar {
  gap: 0;
  padding: 0;
}

/* Calendar top bar — 37px content invariant (see CLAUDE.md). Full-bleed,
   sits above the padded body so the grid keeps its own inset. */
.calendar-topbar {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  flex: 0 0 auto;
  height: var(--app-bar-height);
  box-sizing: border-box;
  padding: 0 10px;
  border-bottom: 1px solid var(--border-light);
  background: var(--container-color-alt);
}
.calendar-view-main .calendar-topbar {
  display: flex;
}
.calendar-view-main .calendar-topbar-actions {
  margin-right: var(--plugin-actions-offset, 0px);
}
.calendar-topbar-leading {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  min-width: 0;
  margin-left: var(--plugin-navigation-offset, 0px);
}
.calendar-topbar h2 {
  margin: 0;
  min-width: 0;
  font-size: 0.82rem;
  font-weight: var(--font-semi-bold);
  color: var(--title-color);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.calendar-view-main .calendar-topbar h2 {
  flex: 0 1 auto;
  text-align: left;
}
.calendar-topbar-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-2, 8px);
  margin-left: auto;
  min-width: 0;
  z-index: 1;
}
.calendar-topbar .calendar-filter-actions { flex: 0 0 auto; }
.calendar-topbar .calendar-switcher-inline { flex: 0 0 auto; }
.calendar-topbar .calendar-actions { flex: 0 0 auto; }
.calendar-view-main .calendar-topbar .calendar-switcher {
  align-self: center;
  height: 24px;
}
.calendar-view-main .calendar-topbar .calendar-switcher-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: 0 8px;
  font-size: 0.72rem;
  line-height: 1;
}
.calendar-view-main .calendar-topbar .calendar-actions button {
  height: 24px;
  min-width: 24px;
  font-size: 0.7rem;
  line-height: 1;
}

.calendar-view-sidebar .calendar-topbar {
  gap: 4px;
  padding: 0 6px;
}
.calendar-view-sidebar .calendar-topbar h2 {
  flex: 0 1 auto;
  font-size: 0.72rem;
  text-align: left;
}
.calendar-view-sidebar .calendar-topbar-actions {
  gap: 2px;
}
.calendar-view-sidebar .calendar-topbar .calendar-switcher {
  gap: 0;
  height: 22px;
}
.calendar-view-sidebar .calendar-topbar .calendar-switcher-btn {
  display: flex;
  align-items: center;
  height: 22px;
  padding: 0 5px;
  border-radius: 6px;
  font-size: 0.64rem;
  line-height: 1;
}
.calendar-view-sidebar .calendar-topbar .calendar-actions {
  gap: 0;
}
.calendar-view-sidebar .calendar-topbar .calendar-actions button {
  height: 22px;
  min-width: 20px;
  padding: 0 3px;
  font-size: 0.62rem;
  line-height: 1;
}

.calendar-view-body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-6);
  overflow: hidden;
}

.calendar-view-compact .calendar-view-body {
  gap: var(--space-4);
  padding: var(--space-4) var(--space-3);
  overflow-x: visible;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.calendar-header h2 {
  flex: 1;
  margin: 0;
  color: var(--title-color);
  font-size: 1.75rem;
  line-height: 1;
  font-weight: var(--font-semi-bold);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.calendar-view-main .calendar-header h2 {
  font-size: 1.75rem;
  flex: 1;
}
.calendar-view-main .calendar-header .calendar-switcher-inline {
  flex: 0 0 auto;
}
.calendar-view-main .calendar-header .calendar-actions {
  flex: 1;
  justify-content: flex-end;
}

.calendar-header h2 span,
.calendar-topbar h2 span {
  color: var(--accent-color);
}

.calendar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.calendar-actions button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  min-width: 28px;
  padding: 0 5px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-semi-bold);
}

.calendar-actions button:hover {
  background: var(--hover-bg);
  color: var(--title-color);
}

/* Scrollable area below the view switcher — header + tabs stay pinned. */
.calendar-scroll-area {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
.calendar-view-compact .calendar-scroll-area {
  gap: var(--space-4);
}
.calendar-view-compact .calendar-scroll-area[data-view='month'] {
  overflow-x: visible;
}
/* Month/year: stage must not shrink — its content height drives the scroll-area overflow. */
.calendar-scroll-area .calendar-stage {
  flex-shrink: 0;
}
/* Week view: grid handles its own internal scroll, no external overflow. */
.calendar-scroll-area[data-view='week'] {
  overflow: hidden;
}
.calendar-scroll-area[data-view='week'] .calendar-stage {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.calendar-scroll-area[data-view='week'] .calendar-grid-wrap {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.calendar-scroll-area[data-view='week'] .calendar-weekgrid {
  flex: 1 1 auto;
}

/* Animated stage that pages between months/weeks/years. The stage clips the
   horizontal slide; the inner wrap replays the keyframe on each period change
   (it remounts via a changing React key). */
.calendar-stage {
  overflow: hidden;
}
.calendar-grid-wrap {
  animation: cal-slide-in-right 0.26s cubic-bezier(0.22, 0.61, 0.36, 1) both;
}
.calendar-grid-wrap[data-dir='-1'] {
  animation-name: cal-slide-in-left;
}
@keyframes cal-slide-in-right {
  from { transform: translateX(35%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes cal-slide-in-left {
  from { transform: translateX(-35%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .calendar-grid-wrap { animation: none; }
}

.calendar-grid {
  display: grid;
  grid-template-columns: 36px repeat(7, minmax(0, 1fr));
  row-gap: var(--space-3);
  align-items: center;
}

.calendar-view-compact .calendar-grid {
  grid-template-columns: 30px repeat(7, minmax(0, 1fr));
  column-gap: 1px;
  row-gap: var(--space-2);
}

.calendar-week-heading,
.calendar-day-heading,
.calendar-week-number {
  color: var(--text-secondary);
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
  line-height: 1;
}

.calendar-view-compact .calendar-week-heading,
.calendar-view-compact .calendar-day-heading,
.calendar-view-compact .calendar-week-number {
  font-size: 0.68rem;
}

.calendar-week-heading {
  text-align: right;
  padding-right: var(--space-3);
}

.calendar-day-heading {
  text-align: center;
  letter-spacing: 0;
}

.calendar-week-number {
  padding-right: var(--space-3);
  border: none;
  border-right: 1px solid var(--border-medium);
  background: transparent;
  font: inherit;
  text-align: right;
  cursor: pointer;
}

.calendar-week-number:hover {
  color: var(--title-color);
}

.calendar-day {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  min-width: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--title-color);
  font-size: var(--normal-font-size);
  font-weight: var(--font-medium);
}

.calendar-view-main .calendar-day {
  width: 100%;
  max-width: 64px;
  justify-self: center;
}

.calendar-day:hover {
  background: var(--hover-bg);
}

.calendar-day.outside {
  color: color-mix(in srgb, var(--text-tertiary) 45%, transparent);
}

.calendar-day.today {
  color: var(--accent-color);
}

.calendar-day.selected {
  background: color-mix(in srgb, var(--accent-color) 20%, transparent);
  color: var(--title-color);
  border-radius: 50%;
}

.calendar-day.today.selected {
  color: var(--accent-color);
}

/* View switcher (Month / Week / Year) */
.calendar-switcher {
  display: flex;
  gap: 2px;
  align-self: center;
}
.calendar-switcher-inline { flex: 0 0 auto; }

.calendar-switcher-btn {
  padding: var(--space-1) var(--space-2);
  border: none;
  border-radius: var(--radius-lg);
  background: transparent;
  color: var(--text-secondary);
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
}

.calendar-switcher-btn:hover {
  color: var(--title-color);
}

.calendar-switcher-btn.active {
  background: var(--accent-color);
  color: #fff;
  border-radius: var(--radius-lg);
}

/* Week view — single row of the 7 days */
.calendar-week-row {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: var(--space-2);
}

.calendar-week-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.calendar-week-cell .calendar-day {
  width: 100%;
  aspect-ratio: 1;
}

/* Year view — 12 mini-month grids */
.calendar-year {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--space-4);
}

.calendar-view-compact .calendar-year {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
}

.calendar-mini {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  text-align: left;
}

.calendar-mini:hover {
  background: var(--hover-bg);
}

.calendar-mini-name {
  color: var(--title-color);
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
}

.calendar-mini-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.calendar-mini-heading {
  color: var(--text-tertiary);
  font-size: 0.55rem;
  text-align: center;
  line-height: 1.4;
}

.calendar-mini-day {
  color: var(--title-color);
  font-size: 0.62rem;
  text-align: center;
  line-height: 1.4;
}

.calendar-mini-day.outside {
  color: color-mix(in srgb, var(--text-tertiary) 40%, transparent);
}

.calendar-mini-day.today {
  color: var(--accent-color);
  font-weight: var(--font-semi-bold);
}

/* Selected-day Agenda section below the compact month grid. */
.calendar-todos {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 1 auto;
  min-height: 0;
  box-sizing: border-box;
  margin-top: var(--space-3);
  margin-right: calc(-1 * var(--space-3));
  margin-left: calc(-1 * var(--space-3));
  padding: var(--space-2) 5px var(--space-4);
  border-top: 1px solid var(--border-light);
  background: transparent;
  overflow-y: auto;
}

.calendar-selected {
  margin-top: auto;
  padding-top: var(--space-3);
  color: var(--text-secondary);
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
}

/* ── Planner: month day-cells with chips ─────────────────────────────────── */
.calendar-view-main .calendar-grid {
  align-items: stretch;
  row-gap: 0;
  column-gap: 0;
  grid-auto-rows: auto;
  grid-template-rows: auto repeat(6, 1fr);
  border-right: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
}

/* Header: W cell right-border + day headings left-border extend vertical lines into header row */
.calendar-view-main .calendar-week-heading {
  border-right: 1px solid var(--border-light);
}

.calendar-view-main .calendar-day-heading {
  border-left: 1px solid var(--border-light);
  padding: 6px 0;
}

.calendar-view-main .calendar-week-number {
  border-top: 1px solid var(--border-light);
  border-right: 1px solid var(--border-light);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-top: 6px;
}

.calendar-day-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  padding: 4px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  user-select: none;
}
.calendar-view-main .calendar-day-cell {
  min-height: 78px;
  align-items: stretch;
  border-top: 1px solid var(--border-light);
  border-left: 1px solid var(--border-light);
  border-radius: 0;
  padding: 1px 1px;
}
.calendar-day-cell:hover { background: var(--hover-bg); }
.calendar-day-cell.in-range { background: color-mix(in srgb, var(--accent-color) 14%, transparent); }
.calendar-day-cell.outside .calendar-day-num {
  color: color-mix(in srgb, var(--text-tertiary) 45%, transparent);
}

.calendar-day-cell-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}
.calendar-view-compact .calendar-day-cell {
  align-items: center;
  aspect-ratio: 1;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.calendar-view-compact .calendar-day-cell-head { justify-content: center; }

.calendar-day-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: var(--normal-font-size);
  font-weight: var(--font-medium);
  color: var(--title-color);
  transition: background 0.12s ease, color 0.12s ease;
}
.calendar-day-cell.today .calendar-day-num { color: var(--accent-color); }
.calendar-day-cell.selected .calendar-day-num {
  background: color-mix(in srgb, var(--accent-color) 22%, transparent);
  color: var(--accent-color);
}

.calendar-chips {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.calendar-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  padding: 1px 6px;
  border: none;
  border-radius: 1px;
  background: color-mix(in srgb, var(--chip-color, var(--accent-color)) 20%, transparent);
  color: var(--title-color);
  font-size: 0.72rem;
  font-weight: var(--font-medium);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.calendar-chip.completed { opacity: 0.55; text-decoration: line-through; }
.calendar-chip.selected {
  background: color-mix(in srgb, var(--chip-color, var(--accent-color)) 58%, var(--container-color));
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--chip-color, var(--accent-color)) 72%, var(--title-color));
}
/* The title takes the slack and truncates; the badges keep their width, so what
   an item carries survives a long title instead of being ellipsed away. */
.calendar-chip-title { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.calendar-chip-glyph { flex: 0 0 auto; font-size: 0.85em; color: var(--chip-color, currentColor); }
.calendar-chip-time { color: var(--text-secondary); font-variant-numeric: tabular-nums; }
.calendar-chip-more { font-size: 0.68rem; color: var(--text-tertiary); padding-left: 4px; }

.calendar-day-dots { position: absolute; bottom: 3px; left: 0; right: 0; display: flex; gap: 3px; justify-content: center; }
.calendar-day-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.calendar-reveal-dot { box-shadow: 0 0 0 2px var(--container-color), 0 0 0 4px var(--accent-color); }

@keyframes calendar-reveal-pulse {
  0%, 100% {
    outline-color: transparent;
    box-shadow: 0 0 0 0 transparent;
    filter: brightness(1);
  }
  14%, 48% {
    outline-color: var(--accent-color);
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--accent-color) 24%, transparent);
    filter: brightness(1.08);
  }
  30%, 68% {
    outline-color: color-mix(in srgb, var(--accent-color) 45%, transparent);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-color) 12%, transparent);
    filter: brightness(1.02);
  }
}

@keyframes calendar-reveal-fill-pulse {
  0%, 100% { opacity: 0; }
  14%, 48% { opacity: 0.2; }
  30%, 68% { opacity: 0.08; }
}

/* The ring's corner radius is the target's own radius plus its outline-offset,
   so an offset visibly rounds it beyond the block it is marking. Zero keeps the
   ring on the border box, where it traces the shape exactly. */
.calendar-reveal-target {
  position: relative;
  z-index: 8;
  outline: 2px solid transparent;
  outline-offset: 0;
  animation: calendar-reveal-pulse 1.8s ease-out;
}
.calendar-reveal-target::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--accent-color);
  opacity: 0;
  pointer-events: none;
  animation: calendar-reveal-fill-pulse 1.8s ease-out;
}
.calendar-reveal-day { outline-offset: -3px; }

@media (prefers-reduced-motion: reduce) {
  .calendar-reveal-target {
    animation: none;
    outline-color: var(--accent-color);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-color) 20%, transparent);
  }
  .calendar-reveal-target::after {
    animation: none;
    opacity: 0.14;
  }
}

/* ── Calendar editor modal ──────────────────────────────────────────────── */
.modal-body.calendar-quickadd {
  min-height: 0;
  padding: 0;
  gap: 0;
  overflow: hidden;
}
/* The head and the actions are bands, not part of the scrolling field list —
   hence their own padding and rules rather than a gap on the container. */
.calendar-quickadd-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--border-light);
}
.calendar-quickadd-title {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-sm);
  background: var(--body-color);
  color: var(--title-color);
  font-family: var(--interface-font);
  font-size: var(--normal-font-size);
  font-weight: var(--font-medium);
}

/* ── Sections and rows ───────────────────────────────────────────────────── */
/* A titled block of fields. The label is what turns a stack of grey boxes into
   a form you can skim; the glyph column keeps every control on one left edge. */
.calendar-quickadd-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 0;
}
.calendar-quickadd-section-label {
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-semi-bold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.calendar-quickadd-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
}
.calendar-quickadd-row-glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 16px;
  color: var(--text-tertiary);
}
.calendar-quickadd-row-glyph svg { width: 14px; height: 14px; }
.calendar-quickadd-row-body { flex: 1; min-width: 0; }

.calendar-quickadd-dates { display: flex; align-items: center; gap: var(--space-2); min-width: 0; }
.calendar-quickadd-dates .calendar-quickadd-date { flex: 1; min-width: 0; }
.calendar-quickadd-dash { flex: none; color: var(--text-tertiary); font-size: var(--small-font-size); }
.calendar-quickadd-times { display: flex; align-items: center; gap: var(--space-2); }
.calendar-quickadd-times .time-field { flex: 1; min-width: 92px; }
.calendar-quickadd-allday {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-inline-start: auto;
  color: var(--text-secondary);
  font-size: var(--small-font-size);
  white-space: nowrap;
}

/* ── Actions ─────────────────────────────────────────────────────────────── */
/* These used to be the To-Do plugin's .todo-save-btn / .todo-cancel-btn. Plugin
   CSS is injected globally, so borrowing them worked right up until someone
   disabled To-Do and the popover lost its buttons. */
.calendar-quickadd-save,
.calendar-quickadd-cancel {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  padding: 0 var(--space-4);
  border-radius: var(--radius-sm);
  font: inherit;
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  cursor: pointer;
}
.calendar-quickadd-save { border: none; background: var(--accent-color); color: #fff; }
.calendar-quickadd-save:disabled { opacity: 0.5; cursor: default; }
.calendar-quickadd-cancel {
  border: 1px solid var(--border-light);
  background: transparent;
  color: var(--text-secondary);
}
.calendar-quickadd-cancel:hover { background: var(--hover-bg); color: var(--title-color); }

/* Shared SelectField: it draws the frame, this only sizes it for the compact row. */
.calendar-quickadd-select.select-field {
  width: 100%;
  min-height: 28px;
  font-size: var(--small-font-size);
}
.calendar-quickadd-input {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-sm);
  background: var(--body-color);
  color: var(--title-color);
  font-size: var(--small-font-size);
}
.calendar-quickadd-note {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-sm);
  background: var(--body-color);
  color: var(--title-color);
  font-size: var(--small-font-size);
  resize: vertical;
  font-family: inherit;
}

/* The fields scroll; the head and the actions do not. An event with three
   attachments must never push Save past the bottom of the window. */
.calendar-quickadd-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  min-height: 0;
  padding: var(--space-4);
  overflow-y: auto;
}
.calendar-quickadd-adders { display: flex; gap: var(--space-4); }
.calendar-quickadd-add {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  align-self: flex-start;
  padding: 2px 0;
  border: none;
  background: transparent;
  color: var(--accent-color);
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  cursor: pointer;
}
.calendar-quickadd-add svg { width: 12px; height: 12px; }

/* ── Tags ────────────────────────────────────────────────────────────────── */
/* Restated here rather than borrowed from the To-Do plugin's stylesheet: its
   .todo-tag-* rules only reached this popover because plugin CSS is global. */
.calendar-tag-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-1);
  min-width: 0;
}
.calendar-tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px var(--space-2);
  border-radius: var(--radius-lg);
  background: var(--accent-soft-bg);
  color: var(--accent-color);
  font-size: var(--smaller-font-size);
}
.calendar-tag-remove {
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
}
.calendar-tag-remove:hover { opacity: 1; }
.calendar-tag-remove svg { width: 10px; height: 10px; }
.calendar-tag-input {
  flex: 1;
  min-width: 80px;
  padding: 2px 0;
  border: none;
  background: transparent;
  color: var(--title-color);
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  outline: none;
}
.calendar-tag-input::placeholder { color: var(--text-tertiary); }
.calendar-quickadd-url-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
}
.calendar-quickadd-url {
  padding: 0;
  border: none;
  background: transparent;
  flex: 1;
  min-width: 0;
  color: var(--accent-color);
  font-size: var(--smaller-font-size);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  cursor: pointer;
}
/* The small round action beside a field — remove, open on the map. */
.calendar-field-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
}
.calendar-field-btn:hover { background: var(--hover-bg); color: var(--title-color); }
.calendar-field-btn svg { width: 13px; height: 13px; }

/* Location: the query field, its two actions, and the geocoder's hits below.
   Ported from the Todo detail view — a plugin may not import another plugin, so
   the class names travel with the markup and the rules are restated here. */
.calendar-location { position: relative; display: flex; flex-direction: column; gap: var(--space-2); }
.calendar-location-row { display: flex; align-items: center; gap: var(--space-2); min-width: 0; }
.calendar-location-input { flex: 1; min-width: 0; }
.calendar-location-hits {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: var(--space-1);
  list-style: none;
  border: 1px solid var(--border-medium);
  border-radius: var(--radius);
  background: var(--container-color);
}
.calendar-location-hit {
  display: flex;
  flex-direction: column;
  gap: 1px;
  width: 100%;
  padding: 5px var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: none;
  color: var(--title-color);
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}
.calendar-location-hit:hover { background: var(--hover-bg); }
.calendar-location-hit-name { color: var(--title-color); font-weight: var(--font-medium); }
.calendar-location-hit-context { color: var(--text-tertiary); font-size: var(--smaller-font-size); }

/* One attachment, as a card. Same shape as the Todo detail view's, minus the
   thumbnail column — this one lives in a 360px popover. */
.calendar-attach-card { position: relative; display: flex; align-items: stretch; }
.calendar-attach-open {
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: none;
  border-radius: var(--radius);
  background: var(--surface-color-alt);
  color: var(--text-color);
  font-family: var(--interface-font);
  text-align: left;
  cursor: pointer;
}
.calendar-attach-open:hover { background: var(--hover-bg); }
.calendar-attach-copy { display: flex; flex: 1; min-width: 0; flex-direction: column; gap: 2px; }
.calendar-attach-name {
  color: var(--title-color);
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.calendar-attach-meta { color: var(--text-secondary); font-size: var(--smaller-font-size); }
.calendar-attach-thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: var(--text-tertiary);
  font-size:0.9375rem;
}
/* Revealed on hover so a resting list of attachments is just the cards. */
.calendar-attach-remove {
  position: absolute;
  top: -6px;
  right: -6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid var(--border-medium);
  border-radius: 50%;
  background: var(--container-color);
  color: var(--text-tertiary);
  cursor: pointer;
  opacity: 0;
}
.calendar-attach-card:hover .calendar-attach-remove,
.calendar-attach-remove:focus-visible { opacity: 1; }
.calendar-attach-remove:hover { color: var(--negative-color); border-color: var(--negative-color); }
.calendar-attach-remove svg { width: 12px; height: 12px; }

/* ── Item badges ──────────────────────────────────────────────────────────
   What an item carries, drawn on the item. Tertiary and small on purpose: they
   are a hint that something is there, never a second title. */
.calendar-badges {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex: 0 0 auto;
  color: var(--text-tertiary);
}
.calendar-badges svg { width: 11px; height: 11px; }

/* A group that comes from Preferences is shared with every other plugin — the
   tag says so, because editing that row changes it everywhere. */
.calendar-group-scope {
  flex-shrink: 0;
  padding: 1px 6px;
  border-radius: var(--radius-sm);
  background: var(--surface-color-alt);
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
}

/* ── Calendar context menu ───────────────────────────────────────────────── */
.cal-ctx-backdrop {
  position: fixed;
  inset: 0;
  z-index: calc(var(--z-modal) - 1);
}
.calendar-context-menu {
  position: fixed;
  z-index: var(--z-modal);
  min-width: 160px;
  padding: var(--space-1);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--container-color);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
}
.calendar-context-menu button {
  display: flex;
  align-items: center;
  width: 100%;
  height: 28px;
  padding: 0 var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}
.calendar-context-menu button:hover { background: var(--hover-bg); color: var(--title-color); }
.calendar-context-menu button.calendar-context-menu-danger { color: var(--negative-color); }
.calendar-context-menu button.calendar-context-menu-danger:hover { background: color-mix(in srgb, var(--negative-color) 12%, transparent); color: var(--negative-color); }
.calendar-context-menu-label { display: block; padding: 4px var(--space-2) 2px; font-size: var(--small-font-size); color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
.calendar-context-menu-sep { height: 1px; margin: var(--space-1) 0; background: var(--border-light); }

/* ── Agenda panel header actions ────────────────────────────────────────────── */
.agenda-header-actions { display:inline-flex; align-items:center; gap:5px; }
.agenda-today-btn { display:inline-flex; align-items:center;
  padding:3px 8px; font-size:0.6875rem; font-weight:600; cursor:pointer; border-radius:5px;
  border:1px solid var(--accent-color); background:var(--accent-tint-bg);
  color:var(--accent-tint-text); -webkit-app-region:no-drag;
  transition:opacity 0.15s; }
.agenda-today-btn:hover { opacity:0.8; }

/* ── Agenda panel (left sidebar) ─────────────────────────────────────────── */
.calendar-agenda-panel { width: 100%; height: 100%; min-height: 0; }
.calendar-agenda-panel .panel-header { width: 100%; }
.agenda-search {
  width: auto;
  flex: none;
  margin: var(--space-2) var(--space-1);
}
.agenda-body { display: flex; flex: 1 1 auto; min-height: 0; flex-direction: column; padding: 0 5px var(--space-4); }
.agenda-section { display: flex; flex-direction: column; gap: 4px; }
.agenda-section + .agenda-section { margin-top: var(--space-3); }
.agenda-year-sep {
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--text-secondary);
  padding: var(--space-2) var(--space-2) var(--space-1);
  letter-spacing: 0.05em;
}
.agenda-day-header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding: var(--space-1) 4px;
  margin-bottom: 2px;
  border: none;
  background: var(--container-color);
  cursor: pointer;
  text-align: left;
}
.agenda-day-dow { font-size: 0.62rem; font-weight: var(--font-semi-bold); color: var(--text-secondary); letter-spacing: 0.04em; }
.agenda-day-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 5px;
  border-radius: 11px;
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--title-color);
}
.agenda-day-month { font-size: 0.68rem; font-weight: var(--font-medium); color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.03em; }
.agenda-day-header:hover .agenda-day-num { background: var(--bg-hover, rgba(0, 0, 0, 0.04)); }
.agenda-day-header.today .agenda-day-num { color: var(--accent-color); }
.agenda-day-header.selected .agenda-day-num {
  background: color-mix(in srgb, var(--accent-color) 22%, transparent);
  color: var(--accent-color);
}
.agenda-day-empty { padding: 2px 8px 4px; font-size: var(--small-font-size); color: var(--text-tertiary); }
.agenda-card {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-button) var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  text-align: left;
  cursor: pointer;
}
.agenda-card:hover,
.agenda-card:has([data-plugin-widget-hover]),
.agenda-card:focus-visible { background: var(--hover-bg); }
.agenda-card-dot { flex: 0 0 auto; width: 8px; height: 8px; border-radius: 50%; align-self: flex-start; margin-top: 4px; }
.agenda-card-body {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.agenda-card-title {
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  color: var(--title-color);
  overflow-wrap: anywhere;
}
.agenda-card-time {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: calc(var(--small-font-size) - 1px);
  font-variant-numeric: tabular-nums;
  color: var(--text-secondary);
}
.agenda-card.completed { opacity: 0.55; }
.agenda-card.completed .agenda-card-title { text-decoration: line-through; }

.agenda-card-title { display: flex; align-items: flex-start; gap: 5px; }
.agenda-card-title > .calendar-chip-glyph { align-self: flex-start; margin-top: 0.15em; }
.agenda-card-fields {
  font-size: calc(var(--small-font-size) - 1px);
  color: var(--text-tertiary, var(--text-secondary));
  overflow-wrap: anywhere;
}
.agenda-card-note {
  color: var(--text-tertiary, var(--text-secondary));
  font-size: calc(var(--small-font-size) - 1px);
  line-height: 1.35;
  overflow-wrap: anywhere;
}

/* ── Week time-grid ──────────────────────────────────────────────────────── */
.calendar-weekgrid { display: flex; flex-direction: column; min-height: 0; }
.calendar-weekgrid-allday,
.calendar-weekgrid-body {
  display: grid;
  grid-template-columns: 48px repeat(var(--week-cols, 7), minmax(0, 1fr));
}
.calendar-weekgrid-head {
  display: grid;
  grid-template-columns: 48px repeat(var(--week-cols, 7), minmax(0, 1fr));
  border-bottom: 1px solid var(--border-medium);
}
.calendar-weekgrid-headgutter { border: none; }
.calendar-weekgrid-gutter {
  color: var(--text-tertiary);
  font-size: 0.68rem;
  text-align: right;
  padding-right: var(--space-2);
}
.calendar-weekgrid-dayhead {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-2) 0;
  gap: 3px;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
}
.calendar-weekgrid-dow { font-size: 0.68rem; color: var(--text-secondary); font-weight: var(--font-semi-bold); }
.calendar-weekgrid-dom {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: var(--h3-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--title-color);
  transition: background 0.12s ease, color 0.12s ease;
}
.calendar-weekgrid-dayhead:hover .calendar-weekgrid-dom { background: var(--bg-hover, rgba(0, 0, 0, 0.04)); }
.calendar-weekgrid-dayhead.today .calendar-weekgrid-dom { color: var(--accent-color); }
.calendar-weekgrid-dayhead.selected .calendar-weekgrid-dom {
  background: color-mix(in srgb, var(--accent-color) 22%, transparent);
  color: var(--accent-color);
}

/* Compact (sidebar) week: a row of 7 day pills above the single-day grid. */
.calendar-weekgrid-daypicker {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 2px;
  padding: var(--space-1) 0 var(--space-2);
  border-bottom: 1px solid var(--border-medium);
}
.calendar-daypick {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 4px 0 2px;
  border: none;
  background: transparent;
  cursor: pointer;
}
.calendar-daypick-dow {
  font-size: 0.6rem;
  font-weight: var(--font-semi-bold);
  color: var(--text-secondary);
}
.calendar-daypick-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  color: var(--title-color);
}
.calendar-daypick.today .calendar-daypick-num { color: var(--accent-color); }
.calendar-daypick.selected .calendar-daypick-num {
  background: color-mix(in srgb, var(--accent-color) 22%, transparent);
  color: var(--accent-color);
}
.calendar-daypick-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: transparent;
}
.calendar-daypick-dot.on { background: var(--text-tertiary); }
.calendar-daypick.selected .calendar-daypick-dot.on { background: var(--accent-color); }

/* The all-day strip owns its height: as a flex item it must never be shrunk
   below its content, or the chips paint over its bottom border and into the hour
   grid. It grows with its chips and scrolls internally once it would claim a
   third of the view; the hour grid below absorbs the rest (flex: 1 1 auto). */
.calendar-weekgrid-allday {
  border-bottom: 1px solid var(--border-light);
  min-height: 24px;
  flex: 0 0 auto;
  max-height: 33vh;
  overflow-y: auto;
}
/* Compact (sidebar) week: one column, matching the single-day hour grid below —
   a chip in a seventh of a sidebar is three letters wide. */
.calendar-weekgrid-allday--compact { grid-template-columns: 30px minmax(0, 1fr); }
.calendar-weekgrid-alldaycol { display: flex; flex-direction: column; gap: 2px; padding: 2px; }
/* Chips keep their own height too — a squeezed column must scroll, not squash. */
.calendar-weekgrid-alldaycol .calendar-chip { flex: 0 0 auto; }

.calendar-weekgrid-body { position: relative; overflow-y: auto; flex: 1 1 auto; min-height: 0; }
.calendar-weekgrid-hours { display: flex; flex-direction: column; }
.calendar-weekgrid-hour {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-right: var(--space-2);
  padding-top: 2px;
  color: var(--text-tertiary);
  font-size: 0.66rem;
  font-variant-numeric: tabular-nums;
  border-top: 1px solid var(--border-light);
}
.calendar-weekgrid-col { position: relative; border-left: 1px solid var(--border-light); }
.calendar-weekgrid-cell { border-top: 1px solid var(--border-light); }

/* Horizontal geometry comes from overlap.ts, never from here: the custom
   properties default to the full column, so the create- and move-preview blocks
   — which set neither — keep painting exactly as they always did. */
.calendar-weekgrid-block {
  position: absolute;
  left: calc(var(--block-left, 0%) + 2px);
  width: calc(var(--block-width, 100%) - 4px);
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 2px 5px 2px 8px;
  border-radius: 1px;
  background: color-mix(in srgb, var(--chip-color, var(--accent-color)) 22%, var(--container-color));
  color: var(--title-color);
  font-size: 0.72rem;
  overflow: hidden;
  cursor: grab;
  user-select: none;
}
/* The colour rail is drawn, not bordered, so it keeps square corners while the
   block itself carries the 1px radius: a left border would inherit that radius
   and round the rail with it. */
.calendar-weekgrid-block::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  border-radius: 0;
  background: var(--chip-color, var(--accent-color));
}
.calendar-weekgrid-block.selected {
  background: color-mix(in srgb, var(--chip-color, var(--accent-color)) 58%, var(--container-color));
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--chip-color, var(--accent-color)) 72%, var(--title-color));
}
.calendar-weekgrid-block.selected .calendar-weekgrid-block-time { color: var(--title-color); }
.calendar-weekgrid-block.dragging { cursor: grabbing; opacity: 0.85; box-shadow: var(--shadow-md, 0 6px 16px rgba(0,0,0,0.2)); z-index: 5; }
.calendar-weekgrid-block.drag-ghost { opacity: 0.35; pointer-events: none; }
.calendar-weekgrid-block--create { opacity: 0.7; pointer-events: none; border: 1px dashed var(--chip-color, var(--accent-color)); z-index: 3; }
.calendar-weekgrid-block--ghost { opacity: 0.6; pointer-events: none; border: 1px dashed var(--chip-color, var(--accent-color)); z-index: 3; }
.calendar-weekgrid-block.completed { opacity: 0.55; text-decoration: line-through; }
.calendar-weekgrid-block-time { color: var(--text-secondary); font-variant-numeric: tabular-nums; }
.calendar-weekgrid-block-title {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  white-space: nowrap;
  font-weight: var(--font-medium);
}
.calendar-weekgrid-block-name { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.calendar-weekgrid-resize {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 6px;
  cursor: ns-resize;
}

/* ── Current-time indicator (Apple Calendar "now line") ─────────────────── */
.calendar-weekgrid-now {
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
  pointer-events: none;
  z-index: 6;
}
.calendar-weekgrid-now-time {
  position: absolute;
  left: 0;
  width: 46px;
  transform: translateY(-50%);
  text-align: center;
  font-size: 0.62rem;
  font-weight: var(--font-semi-bold);
  font-variant-numeric: tabular-nums;
  line-height: 1.4;
  color: #fff;
  background: var(--tint-red-text);
  border-radius: var(--radius-sm);
}
.calendar-weekgrid-now-line {
  position: absolute;
  left: 48px;
  right: 0;
  top: 0;
  height: 1px;
  background: var(--tint-red-text);
  opacity: 0.3;
}
.calendar-weekgrid-now-line--today {
  right: auto;
  opacity: 1;
}
.calendar-weekgrid-now-dot {
  position: absolute;
  top: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--tint-red-text);
  transform: translate(-50%, -50%);
}




/* ── Linked-file input with autocomplete (QuickAdd) ────────────────────── */

/* ── Todo: file-path input with autocomplete ─────────────────────────────── */

/* ── Header filters (groups / sources) ───────────────────────────────────── */
/* The chips are unchanged — they simply moved out of the Calendar's top bar,
   where they only fitted on a wide window and were missing from the Agenda
   entirely, into a popover behind one icon on both surfaces. */
.calendar-filter-actions { display: inline-flex; align-items: center; gap: 2px; }
.calendar-filter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary, var(--text-secondary));
  font-size:0.9375rem;
  cursor: pointer;
  -webkit-app-region: no-drag;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}
.calendar-filter-btn:hover { background: var(--hover-bg); color: var(--title-color); }
.calendar-filter-btn.active { background: var(--tree-active-bg); color: var(--accent-color); }
.calendar-filter-icon { display: inline-flex; font-size: 0.9rem; }
.calendar-filter-icon svg { width: 15px; height: 15px; }
.calendar-filter-popover {
  width: min(244px, calc(100vw - 16px));
  padding: var(--space-1);
  border-color: var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--container-color);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
}
.calendar-filter-popover-body { display: flex; flex-direction: column; }
.calendar-filter-popover-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 28px;
  padding: 0 var(--space-2) var(--space-1);
  border-bottom: 1px solid var(--border-light);
}
.calendar-filter-popover-title,
.calendar-filter-popover-all {
  padding: 2px 4px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  font: inherit;
  font-size: var(--small-font-size);
}
.calendar-filter-popover-title { color: var(--text-secondary); font-weight: var(--font-semi-bold); }
.calendar-filter-popover-title.actionable { color: var(--accent-color); cursor: pointer; }
.calendar-filter-popover-all { color: var(--text-tertiary); font-size: var(--smaller-font-size); cursor: pointer; }
.calendar-filter-popover-title.actionable:hover,
.calendar-filter-popover-all:hover { background: var(--hover-bg); color: var(--title-color); }
.calendar-filter-list {
  display: flex;
  flex-direction: column;
  padding-top: var(--space-1);
  max-height: 320px;
  overflow-y: auto;
  min-width: 148px;
}
.calendar-filter-option {
  display: flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  min-height: 28px;
  padding: 0 var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font: inherit;
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}
.calendar-filter-option:hover,
.calendar-filter-option.active { background: var(--hover-bg); color: var(--title-color); }
.calendar-filter-option.active { border-radius: 0; }
.calendar-filter-option.active.selection-run-start {
  border-top-left-radius: var(--radius-sm);
  border-top-right-radius: var(--radius-sm);
}
.calendar-filter-option.active.selection-run-end {
  border-bottom-right-radius: var(--radius-sm);
  border-bottom-left-radius: var(--radius-sm);
}
.calendar-filter-option.active:hover {
  background: color-mix(in srgb, var(--title-color) 14%, transparent);
}
.calendar-filter-option.active:has(+ .calendar-filter-option:hover),
.calendar-filter-option:hover:has(+ .calendar-filter-option.active) {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.calendar-filter-option.active + .calendar-filter-option:hover,
.calendar-filter-option:hover + .calendar-filter-option.active {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.calendar-filter-check {
  display: grid;
  place-items: center;
  width: 14px;
  height: 14px;
  flex: 0 0 14px;
  color: var(--accent-color);
  font-size: 0.75rem;
  font-weight: var(--font-semi-bold);
}
.calendar-filter-option .calendar-legend-dot { flex: 0 0 auto; width: 8px; height: 8px; }
.calendar-filter-option-glyph,
.calendar-filter-property-glyph {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
}
.calendar-filter-option-glyph { width: 14px; height: 14px; }
.calendar-filter-property-glyph { width: 1em; height: 1em; margin-right: var(--space-2); vertical-align: -0.15em; }
.calendar-filter-option-glyph svg,
.calendar-filter-property-glyph svg { width: 100%; height: 100%; }
.calendar-filter-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.calendar-filter-option-count {
  flex: 0 0 auto;
  color: var(--text-tertiary);
  font-variant-numeric: tabular-nums;
}
.calendar-filter-property-row {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
}
.calendar-filter-property-value {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-2);
}
.calendar-filter-empty {
  padding: 6px 8px;
  color: var(--text-tertiary, var(--text-secondary));
  font-size: var(--smaller-font-size);
}

/* Calendar's integration page starts with a bordered plugin card rather than a
   labeled row, so it needs its own air beneath the Settings breadcrumb. */
.calendar-sync-settings { gap: var(--space-3); }
.calendar-account-row { width: 100%; text-align: left; font: inherit; color: inherit; }
.calendar-account-row > svg { flex-shrink: 0; }
.calendar-account-identity { display: flex; align-items: center; gap: var(--space-3); padding-block: var(--space-3); border-bottom: 1px solid var(--border-light); }
.calendar-account-identity .settings-list-meta { flex: 1; min-width: 0; }
.calendar-sync-calendar { border-bottom: 1px solid var(--border-light); }
.calendar-plugins-settings {
  margin-top: var(--space-3);
}
.calendar-filter-inline-rows {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 4px 6px 6px;
  border-bottom: 1px solid var(--border-light);
}
.calendar-filter-inline-row { display: flex; flex-direction: column; min-width: 0; }
.calendar-filter-inline-head {
  display: flex;
  align-items: center;
  border-radius: var(--radius-sm);
  transition: background-color var(--duration-fast, 120ms) var(--ease-out, ease);
}
.calendar-filter-inline-head:hover { background: var(--hover-bg); }
.calendar-filter-inline-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 30px;
  padding: 4px 6px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
/* The header stays quieter than the rows it opens — section label first, its
   contents second. */
.calendar-filter-inline-head:hover .calendar-filter-inline-trigger { color: var(--text-secondary); }
.calendar-filter-inline-row.active .calendar-filter-inline-count { color: var(--accent-color); }
.calendar-filter-inline-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  color: var(--text-tertiary);
}
.calendar-filter-inline-icon svg { width: 16px; height: 16px; }
.calendar-filter-inline-title {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.calendar-filter-inline-count {
  flex: 0 0 auto;
  color: var(--text-tertiary);
  font-variant-numeric: tabular-nums;
  font-weight: 400;
}
.calendar-filter-inline-chevron {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  color: var(--text-tertiary);
  transition: transform var(--duration-fast, 120ms) var(--ease-out, ease);
}
.calendar-filter-inline-chevron.open { transform: rotate(90deg); }
.calendar-filter-inline-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
  margin-right: 4px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
}
.calendar-filter-inline-clear svg { width: 14px; height: 14px; }
.calendar-filter-inline-clear:hover { background: var(--hover-bg); color: var(--title-color); }
/* Rows sit flush under their header — no rail, no second indent level: the dot
   column alone is enough to read them as belonging to the section above. */
.calendar-filter-inline-list {
  display: flex;
  flex-direction: column;
  max-height: 260px;
  padding-bottom: 2px;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.calendar-filter-inline-option {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  min-height: 28px;
  padding: 3px 6px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
/* Dot sits in the same 18px slot the header icon uses, so every label in the
   block starts on one line. */
.calendar-filter-inline-option .calendar-legend-dot { width: 8px; height: 8px; margin: 0 5px; }
.calendar-filter-inline-option:hover { background: var(--hover-bg); color: var(--title-color); }
/* Off: hollow dot and struck-through label, so a hidden row reads as switched
   off from either the colour column or the text. */
.calendar-filter-inline-option.off { color: var(--text-tertiary); text-decoration: line-through; }
.calendar-filter-inline-option.off .calendar-legend-dot {
  background: transparent !important;
  box-shadow: inset 0 0 0 1.5px var(--text-tertiary);
}
.calendar-filter-inline-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.calendar-legend-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1, 4px);
  padding: 2px var(--space-2, 8px);
  border: 1px solid var(--border-medium);
  border-radius: 999px;
  background: var(--container-color);
  color: var(--text-secondary);
  font-size: var(--smaller-font-size);
  cursor: pointer;
}
.calendar-legend-chip:hover { color: var(--text-color); }
.calendar-legend-chip.off { opacity: 0.4; text-decoration: line-through; }
.calendar-legend-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }

/* ── Note-date source editor (Settings → Calendar → Note dates) ──────────── */
.notedate-source-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 10px 0;
  padding: 14px 16px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  background: var(--container-color-alt);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.notedate-source-row:hover { border-color: var(--border-medium); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); }
.notedate-source-head { display: flex; align-items: center; gap: 10px; }
.notedate-source-swatch {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 2px solid var(--swatch-ring, transparent);
  border-radius: var(--radius);
  background: var(--swatch-fill, var(--accent-color));
  color: var(--swatch-on, var(--accent-contrast, var(--title-color)));
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  cursor: pointer;
  transition: transform 0.12s ease;
}
.notedate-source-swatch:hover { transform: scale(1.06); }
.notedate-source-swatch.unset {
  border: 1px dashed var(--border-medium);
  background: none;
  box-shadow: none;
  color: var(--text-tertiary, var(--text-secondary));
}
.notedate-swatch-none { font-size:13px; line-height: 1; }
.notedate-glyph-picker { position: relative; flex: 0 0 auto; }
.notedate-glyph-grid {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 30;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  padding: 6px;
  border: 1px solid var(--border-medium);
  border-radius: var(--radius);
  background: var(--surface-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}
.notedate-glyph-opt {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid transparent;
  border-radius: var(--radius);
  background: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease;
}
.notedate-glyph-opt:hover { background: var(--hover-bg); color: var(--text-color); }
.notedate-glyph-opt.active { border-color: var(--accent-color); color: var(--accent-color); }
.notedate-source-title {
  flex: 1;
  min-width: 0;
  border-color: transparent;
  background: transparent;
  font-size:0.875rem;
  font-weight: var(--font-semi-bold, 600);
}
.notedate-source-title:hover { background: var(--hover-bg); }
.notedate-source-title:focus { border-color: var(--border-medium); background: var(--surface-color); }
/* Layout only — the kit's ColorField owns the chip itself, including the
   fill/ring/unset drawing. Sizing it up from the kit's default 20px is the only
   thing this surface asks of it, and the Map's pin-source row asks for the same
   26px, so the pair read as one control in both places. */
.notedate-source-color { display: flex; align-items: center; gap: 6px; flex: 0 0 auto; }
.notedate-source-color .settings-color-swatch { width: 26px; height: 26px; }
.notedate-color-wrap { position: relative; display: inline-flex; }
.notedate-color-clear {
  position: absolute;
  top: -4px;
  right: -4px;
  display: grid;
  place-items: center;
  width: 14px;
  height: 14px;
  padding: 0;
  border: 1px solid var(--border-medium);
  border-radius: 50%;
  background: var(--surface-color);
  color: var(--text-secondary);
  font-size:0.5625rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.12s ease;
}
.notedate-color-wrap:hover .notedate-color-clear { opacity: 1; }
.notedate-color-clear:hover { color: var(--text-color); }
.notedate-source-actions { display: flex; align-items: center; gap: 6px; flex: 0 0 auto; }
.notedate-source-toggle { gap: 5px; }
.notedate-source-toggle svg { width: 14px; height: 14px; }
.notedate-source-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 12px; }
.notedate-source-field { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.notedate-source-field.wide { grid-column: 1 / -1; }
.notedate-source-field > label {
  font-size:0.625rem;
  font-weight: var(--font-semi-bold, 600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary, var(--text-secondary));
}
.notedate-source-field .settings-path-input { width: 100%; }
.notedate-source-field .notedate-source-limit { max-width: 100px; }
.notedate-source-inline { display: flex; align-items: center; gap: 8px; }
.notedate-source-inline .settings-path-input { flex: 1; min-width: 0; }
.notedate-source-inline-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
  font-size:0.71875rem;
  color: var(--text-secondary);
  cursor: pointer;
}
/* What the rule currently finds — a rule matching nothing must not stay silent. */
.notedate-source-stats {
  margin: -2px 0 8px;
  font-size:0.71875rem;
  font-variant-numeric: tabular-nums;
  color: var(--text-tertiary, var(--text-secondary));
}
.notedate-source-stats.warn { color: var(--tint-red-text, #b91c1c); }

.notedate-source-show { display: flex; flex-direction: column; align-items: stretch; gap: 6px; }
.notedate-source-show-row { display: flex; align-items: center; gap: 6px; width: 100%; }
.notedate-source-show-row .settings-path-input { flex: 1; min-width: 0; }
.notedate-source-show-remove {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: var(--radius);
  background: none;
  color: var(--text-tertiary, var(--text-secondary));
  font-size:1.0625rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.12s ease, background 0.12s ease;
}
.notedate-source-show-row:hover .notedate-source-show-remove { opacity: 1; }
.notedate-source-show-remove:hover { background: var(--hover-bg); color: var(--text-color); }
.notedate-add-field { gap: 5px; align-self: flex-start; border: 1px dashed var(--border-medium); }
.notedate-add-field svg { width: 13px; height: 13px; }
.notedate-add-field:hover { border-color: var(--text-tertiary, var(--text-secondary)); }
.notedate-source-advanced-toggle {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: -2px;
  padding: 2px;
  border: none;
  background: none;
  color: var(--text-tertiary, var(--text-secondary));
  font-size:0.65625rem;
  font-weight: var(--font-semi-bold, 600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: color 0.12s ease;
}
.notedate-source-advanced-toggle:hover { color: var(--text-color); }
.notedate-caret { display: inline-block; font-size:9px; line-height: 1; transition: transform 0.15s ease; }
.notedate-caret[data-open='true'] { transform: rotate(90deg); }
.notedate-add-source {
  display: flex;
  justify-content: center;
  gap: 7px;
  width: 100%;
  margin: 14px 0 4px;
  padding: 12px;
  border: 1.5px dashed var(--border-medium);
  background: none;
}
.notedate-add-source svg { width: 16px; height: 16px; }
.notedate-add-source:hover { border-color: var(--accent-color); color: var(--accent-color); background: var(--hover-bg); }
`

const STYLE_ID = "notes-calendar-styles"

/** Inject (or refresh, on hot reload) the plugin stylesheet. */
export function injectStyles(): () => void {
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement("style")
    el.id = STYLE_ID
    document.head.appendChild(el)
  }
  el.textContent = CSS
  return () => {
    if (document.getElementById(STYLE_ID) === el) el.remove()
  }
}
