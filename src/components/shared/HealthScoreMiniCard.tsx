import React from 'react';
import { useHistory } from 'react-router-dom';
import { healthScoreData } from '../../data/pfmData';
import { useDisplayMode } from '../../hooks/useDisplayMode';
import { STRESS_FREE_RATINGS } from '../../data/constants';
import './HealthScoreMiniCard.css';

const RATING_COLORS: Record<string, string> = {
  excellent: 'var(--pfm-status-success)',
  good: 'var(--pfm-action-primary-bg)',
  building: 'var(--pfm-status-warning)',
  'needs-attention': 'var(--pfm-status-error)',
};

function getRatingLabel(rating: string): string {
  return rating
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

const HealthScoreMiniCard: React.FC = () => {
  const history = useHistory();
  const { showPoints } = useDisplayMode();

  const { overall, rating, history: scoreHistory } = healthScoreData;
  const delta =
    scoreHistory.length >= 2
      ? scoreHistory[scoreHistory.length - 1].overall -
        scoreHistory[scoreHistory.length - 2].overall
      : 0;

  const strokeColor = RATING_COLORS[rating] || 'var(--pfm-action-primary-bg)';
  const ratingLabel = getRatingLabel(rating);

  // Mini ring params
  const size = 48;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(overall / 100, 1));
  const dashOffset = circumference * (1 - pct);

  return (
    <div
      className="health-mini"
      onClick={() => history.push('/insights/health')}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') history.push('/insights/health');
      }}
      aria-label={showPoints
        ? `Health Score ${overall}, ${ratingLabel}. Tap to view details.`
        : `Financial health: ${STRESS_FREE_RATINGS[rating] || ratingLabel}. Tap to view details.`
      }
    >
      <div className="health-mini__ring-wrap">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="health-mini__svg"
          aria-hidden="true"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--pfm-support-subtle)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        {showPoints && <span className="health-mini__score">{overall}</span>}
      </div>

      <div className="health-mini__text">
        <span className="health-mini__label typo-callout-semibold">
          {showPoints ? ratingLabel : (STRESS_FREE_RATINGS[rating] || ratingLabel)}
        </span>
        <span className="health-mini__sublabel typo-footnote color-secondary">
          Financial health
        </span>
      </div>

      <div className="health-mini__right">
        {showPoints ? (
          <span
            className={`health-mini__delta ${delta > 0 ? 'health-mini__delta--positive' : delta < 0 ? 'health-mini__delta--negative' : ''}`}
          >
            {delta > 0 ? `+${delta}` : delta === 0 ? '--' : `${delta}`}
          </span>
        ) : (
          <span
            className="material-symbols-rounded"
            style={{
              fontSize: 18,
              color: delta > 0 ? 'var(--pfm-change-positive)' : delta < 0 ? 'var(--pfm-change-negative)' : 'var(--pfm-text-tertiary)',
            }}
          >
            {delta > 0 ? 'trending_up' : delta < 0 ? 'trending_down' : 'trending_flat'}
          </span>
        )}
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
          <path
            d="M1 1l5 5-5 5"
            stroke="var(--pfm-text-tertiary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default HealthScoreMiniCard;
