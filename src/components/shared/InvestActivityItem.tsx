import React from 'react';
import type { InvestActivity } from '../../data/types';
import { formatEuro } from '../../data/formatters';
import './InvestActivityItem.css';

interface InvestActivityItemProps {
  activity: InvestActivity;
}

const typeIcons: Record<string, string> = {
  buy: '📥',
  sell: '📤',
  dividend: '💰',
  transfer: '🔄',
};

const InvestActivityItem: React.FC<InvestActivityItemProps> = ({ activity }) => {
  const isPositive = activity.amount > 0;

  return (
    <div className="invest-activity-item">
      <div className="invest-activity-item__icon">
        {typeIcons[activity.type] || '📊'}
      </div>
      <div className="invest-activity-item__info">
        <span className="typo-callout-semibold">{activity.title}</span>
        <span className="typo-footnote" style={{ color: 'var(--pfm-text-tertiary)' }}>{activity.subtitle}</span>
      </div>
      <div className="invest-activity-item__right">
        <span
          className={`invest-activity-item__status invest-activity-item__status--${activity.status}`}
        >
          {activity.status === 'pending' ? 'Pending' : 'Completed'}
        </span>
        <span className="typo-callout-semibold" style={{ color: isPositive ? '#0A5A2B' : 'var(--pfm-text-primary)' }}>
          {isPositive ? '+' : ''}{formatEuro(activity.amount)}
        </span>
        <span className="typo-caption1" style={{ color: 'var(--pfm-text-tertiary)' }}>{activity.date}</span>
      </div>
    </div>
  );
};

export default InvestActivityItem;
