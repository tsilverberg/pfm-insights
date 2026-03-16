import React from 'react';
import { useDisplayMode } from '../../hooks/useDisplayMode';
import { STRESS_FREE_RATINGS, STRESS_FREE_TRENDS } from '../../data/constants';
import './PillarStrip.css';

interface Pillar {
  id: string;
  label: string;
  score: number;
  rating: string;
  trend: 'up' | 'down' | 'flat';
  icon: string;
}

interface PillarStripProps {
  pillars: Pillar[];
  onPillarTap?: (id: string) => void;
}

const RATING_COLORS: Record<string, string> = {
  excellent: 'var(--pfm-status-success)',
  good: 'var(--pfm-action-primary-bg)',
  building: 'var(--pfm-status-warning)',
  'needs attention': 'var(--pfm-status-error)',
  'needs-attention': 'var(--pfm-status-error)',
};

const TREND_SYMBOLS: Record<string, string> = {
  up: '\u25B2',
  down: '\u25BC',
  flat: '\u2500',
};

const PillarStrip: React.FC<PillarStripProps> = ({ pillars, onPillarTap }) => {
  const { showPoints } = useDisplayMode();

  return (
    <div className="pillar-strip" role="list">
      {pillars.map((pillar) => {
        const tierColor = RATING_COLORS[pillar.rating.toLowerCase()] || 'var(--pfm-action-primary-bg)';
        const sfRating = STRESS_FREE_RATINGS[pillar.rating.toLowerCase()] || pillar.rating;
        const sfTrend = STRESS_FREE_TRENDS[pillar.trend] || '';
        return (
          <button
            key={pillar.id}
            className="pillar-strip__card"
            style={{ '--ps-tier-color': tierColor } as React.CSSProperties}
            onClick={() => onPillarTap?.(pillar.id)}
            role="listitem"
            aria-label={showPoints
              ? `${pillar.label}: score ${pillar.score}, trending ${pillar.trend}`
              : `${pillar.label}: ${sfRating}, ${sfTrend}`
            }
          >
            <span className="pillar-strip__icon material-symbols-rounded" aria-hidden="true">
              {pillar.icon}
            </span>
            <span className="pillar-strip__score">{showPoints ? pillar.score : sfRating}</span>
            <span className="pillar-strip__label">{pillar.label}</span>
            <span className={`pillar-strip__trend pillar-strip__trend--${pillar.trend}`}>
              {TREND_SYMBOLS[pillar.trend]}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default PillarStrip;
