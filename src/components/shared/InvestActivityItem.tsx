import React from 'react';
import type { InvestActivity } from '../../data/types';
import { formatEuro } from '../../data/formatters';
import './InvestActivityItem.css';

interface InvestActivityItemProps {
  activity: InvestActivity;
  onClick?: () => void;
}

const typeIcons: Record<string, string> = {
  buy: 'download',
  sell: 'upload',
  dividend: 'payments',
  transfer: 'swap_horiz',
};

const InvestActivityItem: React.FC<InvestActivityItemProps> = ({ activity, onClick }) => {
  const isPositive = activity.amount > 0;

  return (
    <div className="list-row invest-activity-item" onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} style={onClick ? { cursor: 'pointer' } : undefined}>
      <div className="list-row__icon invest-activity-item__icon">
        <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--pfm-text-secondary)' }}>
          {typeIcons[activity.type] || 'bar_chart'}
        </span>
      </div>
      <div className="list-row__text">
        <span className="typo-callout-semibold">{activity.title}</span>
        <span className="typo-footnote color-tertiary">{activity.subtitle}</span>
      </div>
      <div className="invest-activity-item__right">
        <span
          className={`invest-activity-item__status invest-activity-item__status--${activity.status}`}
        >
          {activity.status === 'pending' ? 'Pending' : 'Completed'}
        </span>
        <span className={`typo-callout-semibold ${isPositive ? 'invest-activity-item__amount--positive' : ''}`}>
          {isPositive ? '+' : ''}{formatEuro(activity.amount)}
        </span>
        <span className="typo-caption1 color-tertiary">{activity.date}</span>
      </div>
    </div>
  );
};

export default InvestActivityItem;
