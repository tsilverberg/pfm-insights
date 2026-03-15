import React from 'react';
import './SpotlightCard.css';

interface SpotlightCardProps {
  title: string;
  description: string;
  impact: number;
  icon: string;
  accentColor: string;
  onClick?: () => void;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  title,
  description,
  impact,
  icon,
  accentColor,
  onClick,
}) => {
  return (
    <button
      className="spotlight-card"
      style={{ '--spotlight-accent': accentColor } as React.CSSProperties}
      onClick={onClick}
      aria-label={`${title}. Impact: +${impact} points`}
    >
      <div className="spotlight-card__header">
        <span className="spotlight-card__icon material-symbols-rounded" aria-hidden="true">
          {icon}
        </span>
        <span className="spotlight-card__title">{title}</span>
      </div>
      <p className="spotlight-card__description">{description}</p>
      <div className="spotlight-card__footer">
        <span className="spotlight-card__impact">+{impact} pts</span>
        <span className="spotlight-card__chevron material-symbols-rounded" aria-hidden="true">
          chevron_right
        </span>
      </div>
    </button>
  );
};

export default SpotlightCard;
