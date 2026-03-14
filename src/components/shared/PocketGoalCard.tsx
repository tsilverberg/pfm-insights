import React from 'react';
import type { Pocket } from '../../data/types';
import ProgressBar from './ProgressBar';
import './PocketGoalCard.css';

interface PocketGoalCardProps {
  pocket: Pocket;
  onClick?: () => void;
}

const PocketIcon: React.FC<{ icon: string; bg: string }> = ({ icon, bg }) => {
  const iconSvg: Record<string, React.ReactNode> = {
    car: (
      <svg width="24" height="24" viewBox="0 0 18 16" fill="currentColor">
        <path d="M15.92 1.01C15.72 0.42 15.16 0 14.5 0H3.5C2.84 0 2.29 0.42 2.08 1.01L0 7V15C0 15.55 0.45 16 1 16H2C2.55 16 3 15.55 3 15V14H15V15C15 15.55 15.45 16 16 16H17C17.55 16 18 15.55 18 15V7L15.92 1.01ZM3.85 2H14.14L15.18 5H2.81L3.85 2ZM16 12H2V7.34L2.12 7H15.89L16 7.34V12Z" />
        <path d="M4.5 11C5.32843 11 6 10.3284 6 9.5C6 8.67157 5.32843 8 4.5 8C3.67157 8 3 8.67157 3 9.5C3 10.3284 3.67157 11 4.5 11Z" />
        <path d="M13.5 11C14.3284 11 15 10.3284 15 9.5C15 8.67157 14.3284 8 13.5 8C12.6716 8 12 8.67157 12 9.5C12 10.3284 12.6716 11 13.5 11Z" />
      </svg>
    ),
    travel: (
      <svg width="24" height="24" viewBox="0 0 19 20" fill="currentColor">
        <path d="M19 14V12L11 7V1.5C11 0.67 10.33 0 9.5 0C8.67 0 8 0.67 8 1.5V7L0 12V14L8 11.5V17L6 18.5V20L9.5 19L13 20V18.5L11 17V11.5L19 14Z" />
      </svg>
    ),
    savings: (
      <svg width="24" height="24" viewBox="0 0 19 18" fill="currentColor">
        <path d="M18 4.28V2C18 0.9 17.1 0 16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V13.72C18.59 13.37 19 12.74 19 12V6C19 5.26 18.59 4.63 18 4.28ZM17 6V12H10V6H17ZM2 16V2H16V4H10C8.9 4 8 4.9 8 6V12C8 13.1 8.9 14 10 14H16V16H2Z" />
        <path d="M13 10.5C13.8284 10.5 14.5 9.82843 14.5 9C14.5 8.17157 13.8284 7.5 13 7.5C12.1716 7.5 11.5 8.17157 11.5 9C11.5 9.82843 12.1716 10.5 13 10.5Z" />
      </svg>
    ),
  };

  return (
    <div className="pocket-card__icon" style={{ background: bg }}>
      {iconSvg[icon] || iconSvg.savings}
    </div>
  );
};

const PocketGoalCard: React.FC<PocketGoalCardProps> = ({ pocket, onClick }) => {
  const pct = Math.round((pocket.currentAmount / pocket.targetAmount) * 100);
  const formatAmount = (n: number) => `$${n.toLocaleString('en-US')}`;

  return (
    <div className="pocket-card" onClick={onClick}>
      <div className="pocket-card__header">
        <div className="pocket-card__info">
          <PocketIcon icon={pocket.icon} bg={pocket.iconBg} />
          <div className="pocket-card__text">
            <div className="pocket-card__name">{pocket.name}</div>
            <div className="pocket-card__amounts">
              <span className="pocket-card__current">{formatAmount(pocket.currentAmount)}</span>
              <span className="pocket-card__separator"> / </span>
              <span className="pocket-card__target">{formatAmount(pocket.targetAmount)}</span>
            </div>
          </div>
        </div>
        <svg width="24" height="24" viewBox="0 0 7.41 12" fill="var(--pfm-text-secondary)" className="pocket-card__chevron">
          <path d="M0 10.59L4.58 6L0 1.41L1.41 0L7.41 6L1.41 12L0 10.59Z" />
        </svg>
      </div>
      <div className="pocket-card__progress">
        <ProgressBar value={pocket.currentAmount} max={pocket.targetAmount} color={pocket.progressColor} />
        <div className="pocket-card__captions">
          <span className="pocket-card__pct">{pct}% Completed</span>
          <span className="pocket-card__date">Target date {pocket.targetDate}</span>
        </div>
      </div>
    </div>
  );
};

export default PocketGoalCard;
