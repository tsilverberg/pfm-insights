import React from 'react';
import CoachIcon from './CoachIcon';

interface CoachMomentCardProps {
  title: string;
  body: string;
  ctaLabel?: string;
  onCta?: () => void;
  onClose?: () => void;
  isAction?: boolean;
}

const CoachMomentCard: React.FC<CoachMomentCardProps> = ({ title, body, ctaLabel, onCta, onClose, isAction }) => {
  return (
    <div className="coach-card">
      <CoachIcon size={24} className="coach-card__icon" />
      <div className="coach-card__body">
        <div className={`coach-card__title ${isAction ? 'coach-card__title--action' : ''}`}>{title}</div>
        <div className="coach-card__text">{body}</div>
        {ctaLabel && (
          <div className="coach-card__cta">
            <button className="btn-outline" onClick={() => onCta?.()}>{ctaLabel}</button>
          </div>
        )}
      </div>
      {onClose && (
        <button className="coach-card__close" onClick={onClose} aria-label="Close">
          <span className="material-symbols-rounded" aria-hidden>close</span>
        </button>
      )}
    </div>
  );
};

export default CoachMomentCard;
