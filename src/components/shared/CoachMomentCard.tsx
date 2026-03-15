import React from 'react';

interface CoachMomentCardProps {
  title: string;
  body: string;
  ctaLabel?: string;
  onCta?: () => void;
  onClose?: () => void;
  isAction?: boolean;
}

/* AI icon: Material Symbol renders crisp at any size (icon font, not SVG) */
const CoachIcon: React.FC = () => (
  <span
    className="coach-card__icon material-symbols-rounded"
    aria-hidden
  >
    psychology
  </span>
);

const CoachMomentCard: React.FC<CoachMomentCardProps> = ({ title, body, ctaLabel, onCta, onClose, isAction }) => {
  return (
    <div className="coach-card">
      <CoachIcon />
      <div className="coach-card__body">
        <div className={`coach-card__title ${isAction ? 'coach-card__title--action' : ''}`}>{title}</div>
        <div className="coach-card__text">{body}</div>
        {ctaLabel && (
          <div className="coach-card__cta">
            <button className="btn-outline" onClick={onCta}>{ctaLabel}</button>
          </div>
        )}
      </div>
      {onClose && (
        <button className="coach-card__close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="currentColor" shapeRendering="geometricPrecision">
            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CoachMomentCard;
