import React from 'react';
import { useDisplayMode } from '../../hooks/useDisplayMode';
import { STRESS_FREE_RATINGS } from '../../data/constants';
import './HealthScoreRing.css';

interface HealthScoreRingProps {
  score: number;
  rating: string;
  delta: number;
  onClick?: () => void;
}

const RATING_COLORS: Record<string, string> = {
  excellent: 'var(--pfm-status-success)',
  good: 'var(--pfm-action-primary-bg)',
  building: 'var(--pfm-status-warning)',
  'needs attention': 'var(--pfm-status-error)',
  'needs-attention': 'var(--pfm-status-error)',
};

function getRatingLabel(rating: string): string {
  return rating
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function getDeltaInfo(delta: number, showPoints: boolean): { text: string; direction: string } {
  if (delta > 0) return { text: showPoints ? `\u25B2 +${delta} pts` : 'Trending up', direction: 'positive' };
  if (delta < 0) return { text: showPoints ? `\u25BC ${delta} pts` : 'Needs focus', direction: 'negative' };
  return { text: showPoints ? '\u2014 0 pts' : 'Steady', direction: 'neutral' };
}

const HealthScoreRing: React.FC<HealthScoreRingProps> = ({ score, rating, delta, onClick }) => {
  const { showPoints } = useDisplayMode();
  const size = 160;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(score / 100, 1));
  const dashOffset = circumference * (1 - pct);

  const strokeColor = RATING_COLORS[rating.toLowerCase()] || 'var(--pfm-action-primary-bg)';
  const ratingLabel = getRatingLabel(rating);
  const stressFreeLabel = STRESS_FREE_RATINGS[rating.toLowerCase()] || ratingLabel;
  const deltaInfo = getDeltaInfo(delta, showPoints);

  const ariaLabel = showPoints
    ? `Financial Health Score: ${score} out of 100, rated ${ratingLabel}. ${
        delta !== 0 ? (delta > 0 ? `Up ${delta} from last month` : `Down ${Math.abs(delta)} from last month`) : 'No change from last month'
      }`
    : `Financial Health: ${stressFreeLabel}. ${deltaInfo.text}.`;

  return (
    <div
      className="health-score-ring"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    >
      <div className="health-score-ring__ring-wrap">
        <svg
          className="health-score-ring__svg"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden="true"
        >
          <circle
            className="health-score-ring__track"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className="health-score-ring__fill"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={strokeColor}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className="health-score-ring__center">
          {showPoints ? (
            <>
              <span className="health-score-ring__score">{score}</span>
              <span className="health-score-ring__rating">{ratingLabel}</span>
            </>
          ) : (
            <span className="health-score-ring__rating health-score-ring__rating--large">{stressFreeLabel}</span>
          )}
        </div>
      </div>
      <span className={`health-score-ring__delta health-score-ring__delta--${deltaInfo.direction}`}>
        {deltaInfo.text}
      </span>
    </div>
  );
};

export default HealthScoreRing;
