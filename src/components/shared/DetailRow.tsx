import React, { useState } from 'react';
import './DetailRow.css';

interface DetailRowProps {
  label: string;
  value: string;
  maskedValue?: string;
  showToggle?: boolean;
  icon?: React.ReactNode;
  hasChevron?: boolean;
  onClick?: () => void;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, maskedValue, showToggle, icon, hasChevron, onClick }) => {
  const [revealed, setRevealed] = useState(false);
  const displayValue = showToggle && !revealed && maskedValue ? maskedValue : value;

  return (
    <div className="detail-row" onClick={onClick} {...(onClick ? { role: 'button', tabIndex: 0, onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } } : {})}>
      <span className="detail-row__label">{label}</span>
      <div className="detail-row__right">
        {icon && <span className="detail-row__icon">{icon}</span>}
        <span className="detail-row__value">{displayValue}</span>
        {showToggle && (
          <button
            className="detail-row__toggle"
            onClick={(e) => { e.stopPropagation(); setRevealed(!revealed); }}
          >
            {revealed ? 'Hide' : 'Show'}
          </button>
        )}
        {hasChevron && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="detail-row__chevron">
            <path d="M9 6l6 6-6 6" stroke="var(--pfm-text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default DetailRow;
