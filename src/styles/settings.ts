export const integrationStyles = `/* Calendar's integration page starts with a bordered plugin card rather than a
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
`

export const noteDateStyles = `/* ── Note-date source editor (Settings → Calendar → Note dates) ──────────── */
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
