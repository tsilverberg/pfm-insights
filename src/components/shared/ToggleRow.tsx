import React from 'react';
import type { Permission } from '../../data/types';
import './ToggleRow.css';

/* Reuse icon map from SettingsMenuItem would be ideal, but to avoid circular deps we use a simple SVG lookup */
const iconSvgs: Record<string, React.ReactNode> = {
  account_details: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" /></svg>,
  money: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" /></svg>,
  card: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg>,
  insights: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" /></svg>,
  swap: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" /></svg>,
  schedule: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>,
  statements: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>,
};

interface ToggleRowProps {
  permission: Permission;
  onToggle: (id: string) => void;
  onSubOptionChange?: (permId: string, optionLabel: string) => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ permission, onToggle, onSubOptionChange }) => (
  <>
    <div className="toggle-row">
      <div className="toggle-row__icon">
        {iconSvgs[permission.icon] || iconSvgs.account_details}
      </div>
      <div className="toggle-row__text">
        <div className="toggle-row__title">{permission.title}</div>
        <div className="toggle-row__desc">{permission.description}</div>
      </div>
      <label className="toggle-row__switch">
        <input
          type="checkbox"
          checked={permission.enabled}
          onChange={() => onToggle(permission.id)}
        />
        <span className="toggle-row__slider" />
      </label>
    </div>
    {permission.enabled && permission.subOptions && (
      <div className="toggle-row__sub-options">
        {permission.subOptions.map((opt) => (
          <div
            key={opt.label}
            className="toggle-row__radio"
            onClick={() => onSubOptionChange?.(permission.id, opt.label)}
          >
            <div className={`toggle-row__radio-circle${opt.selected ? ' toggle-row__radio-circle--selected' : ''}`} />
            <span className="toggle-row__radio-label">{opt.label}</span>
          </div>
        ))}
      </div>
    )}
  </>
);

export default ToggleRow;
