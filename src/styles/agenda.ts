export const agendaStyles = `/* ── Agenda panel header actions ────────────────────────────────────────────── */
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

`
