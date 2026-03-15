import React from 'react';
import './SettingsMenuItem.css';

interface SettingsMenuItemProps {
  icon: string;
  title: string;
  description?: string;
  iconBg?: string;
  value?: string;
  danger?: boolean;
  onClick?: () => void;
}

const SettingsMenuItem: React.FC<SettingsMenuItemProps> = ({ icon, title, description, iconBg, value, danger, onClick }) => (
  <button className={`list-row settings-item${danger ? ' settings-item--danger' : ''}`} onClick={onClick}>
    <div className="list-row__icon list-row__icon--round settings-item__icon" style={iconBg ? { background: iconBg } : undefined}>
      <span className="material-symbols-rounded" style={{ fontSize: 20 }}>{icon}</span>
    </div>
    <div className="list-row__text">
      <span className="typo-callout-semibold">{title}</span>
      {description && <span className="typo-footnote color-secondary">{description}</span>}
    </div>
    {value && <span className="settings-item__value typo-subhead-regular color-tertiary">{value}</span>}
    <span className="material-symbols-rounded settings-item__chevron" style={{ fontSize: 20, color: 'var(--pfm-text-tertiary)' }}>chevron_right</span>
  </button>
);

export default SettingsMenuItem;
