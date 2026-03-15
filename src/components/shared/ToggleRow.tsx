import React from 'react';
import type { Permission } from '../../data/types';
import './ToggleRow.css';

const iconColors: Record<string, { bg: string; color: string }> = {
  description: { bg: 'var(--pfm-palette-blue-extra-soft)', color: 'var(--pfm-palette-blue-strong)' },
  payments: { bg: 'var(--pfm-palette-green-extra-soft)', color: 'var(--pfm-green-strong)' },
  credit_card: { bg: 'var(--pfm-neutral-200)', color: 'var(--pfm-text-secondary)' },
  insights: { bg: 'var(--pfm-palette-purple-extra-soft)', color: 'var(--pfm-palette-purple-strong)' },
  swap_horiz: { bg: 'var(--pfm-palette-blue-extra-soft)', color: 'var(--pfm-palette-blue-strong)' },
  schedule: { bg: 'var(--pfm-palette-orange-extra-soft)', color: 'var(--pfm-palette-orange-strong)' },
  receipt_long: { bg: 'var(--pfm-neutral-200)', color: 'var(--pfm-text-secondary)' },
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
        <span className="material-symbols-rounded" style={{ fontSize: 20 }}>{permission.icon}</span>
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
