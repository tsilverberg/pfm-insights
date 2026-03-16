import React from 'react';
import { useDisplayMode } from '../../hooks/useDisplayMode';
import { STRESS_FREE_IMPACT } from '../../data/constants';
import './SpotlightCard.css';

interface SpotlightCardProps {
  title: string;
  description: string;
  impact: number;
  icon: string;
  accentColor: string;
  rank?: number;
  impactTier?: 'high' | 'medium' | 'low';
  onClick?: () => void;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  title,
  description,
  impact,
  icon,
  accentColor,
  rank,
  impactTier,
  onClick,
}) => {
  const { showPoints } = useDisplayMode();

  const tier = impactTier || (impact >= 8 ? 'high' : impact >= 4 ? 'medium' : 'low');
  const impactLabel = showPoints
    ? `+${impact} pts`
    : rank
      ? `#${rank} · ${STRESS_FREE_IMPACT[tier]}`
      : STRESS_FREE_IMPACT[tier];

  return (
    <button
      className="spotlight-card"
      style={{ '--spotlight-accent': accentColor } as React.CSSProperties}
      onClick={onClick}
      aria-label={showPoints ? `${title}. Impact: +${impact} points` : `${title}. ${STRESS_FREE_IMPACT[tier]}`}
    >
      <div className="spotlight-card__header">
        <span className="spotlight-card__icon material-symbols-rounded" aria-hidden="true">
          {icon}
        </span>
        <span className="spotlight-card__title">{title}</span>
      </div>
      <p className="spotlight-card__description">{description}</p>
      <div className="spotlight-card__footer">
        <span className="spotlight-card__impact">{impactLabel}</span>
        <span className="spotlight-card__chevron material-symbols-rounded" aria-hidden="true">
          chevron_right
        </span>
      </div>
    </button>
  );
};

export default SpotlightCard;
