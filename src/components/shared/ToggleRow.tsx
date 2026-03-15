import React from 'react';
import type { Permission } from '../../data/types';
import './ToggleRow.css';

const iconColors: Record<string, { bg: string; color: string }> = {
  description: { bg: '#DFE7FF', color: '#0047AB' },
  payments: { bg: '#E2F5EC', color: '#0A5A2B' },
  credit_card: { bg: '#E1E8EF', color: '#3A495D' },
  insights: { bg: '#E8DCF8', color: '#491091' },
  swap_horiz: { bg: '#DFE7FF', color: '#0047AB' },
  schedule: { bg: '#FDE8D0', color: '#B35C00' },
  receipt_long: { bg: '#E1E8EF', color: '#3A495D' },
};

interface ToggleRowProps {
  permission: Permission;
  onToggle: (id: string) => void;
  onSubOptionChange?: (permId: string, optionLabel: string) => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ permission, onToggle, onSubOptionChange }) => (
  <>
    <div className="toggle-row list-row">
      <div
        className="list-row__icon list-row__icon--round toggle-row__icon"
        style={{
          background: iconColors[permission.icon]?.bg || 'var(--pfm-surface-raised)',
          color: iconColors[permission.icon]?.color || 'var(--pfm-text-secondary)',
        }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>{permission.icon}</span>
      </div>
      <div className="list-row__text">
        <span className="typo-subhead-semibold">{permission.title}</span>
        <span className="typo-footnote color-secondary">{permission.description}</span>
      </div>
      <label className="toggle-row__switch">
        <input
          type="checkbox"
          checked={permission.enabled}
          onChange={() => onToggle(permission.id)}
          aria-label={permission.title}
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
