import React from 'react';
import type { ChildAccount } from '../../data/types';
import './ChildAccountCard.css';

interface ChildAccountCardProps {
  child: ChildAccount;
}

const ChildAccountCard: React.FC<ChildAccountCardProps> = ({ child }) => {
  const badgeClass =
    child.status === 'over-budget'
      ? 'child-card__badge--error'
      : child.status === 'needs-attention'
        ? 'child-card__badge--error'
        : 'child-card__badge--success';

  return (
    <div className="child-card">
      <div className="child-card__row">
        <img src={child.avatarUrl} alt={child.name} className="child-card__avatar" />
        <div className="child-card__info">
          <div className="child-card__top">
            <span className="child-card__name">{child.name}</span>
            <span className="child-card__balance">${child.balance.toFixed(2)}</span>
          </div>
          <div className="child-card__bottom">
            <span className="child-card__number">•••••{child.lastFour}</span>
            <span className={`child-card__badge ${badgeClass}`}>{child.statusLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildAccountCard;
