import React, { useState, useRef, useCallback, useMemo } from 'react';
import { IonModal } from '@ionic/react';
import { cashflowData, nwgBreakdownData, calculateRhythmImpact, calculateWealthProjection } from '../../data/pfmData';
import { PILLAR_LABELS, STRESS_FREE_RATINGS } from '../../data/constants';
import { formatEuroShort } from '../../data/formatters';
import { useDisplayMode } from '../../hooks/useDisplayMode';
import type { RhythmTarget, RhythmScoreImpact, Pocket } from '../../data/types';
import './TuneRhythmModal.css';

function scoreToRating(score: number): string {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'building';
  return 'needs-attention';
}

/** Small SVG score ring used in the impact preview */
const ScoreRing: React.FC<{ score: number; size?: number; projected?: boolean; hideNumber?: boolean }> = ({
  score,
  size = 40,
  projected = false,
  hideNumber = false,
}) => {
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(score / 100, 1));
  const dashOffset = circumference * (1 - pct);

  const color =
    score >= 80
      ? 'var(--pfm-status-success)'
      : score >= 60
        ? 'var(--pfm-action-primary-bg)'
        : score >= 40
          ? 'var(--pfm-status-warning)'
          : 'var(--pfm-status-error)';

  return (
    <div className={`tune-rhythm__score-ring ${projected ? 'tune-rhythm__score-ring--projected' : ''}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--pfm-support-subtle)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      {!hideNumber && <span className="tune-rhythm__score-ring-value typo-footnote">{score}</span>}
    </div>
  );
};

interface TuneRhythmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (target: RhythmTarget) => void;
  priorities?: Pocket[];
}

/** Inline score impact preview */
const ScoreImpactPreview: React.FC<{ impact: RhythmScoreImpact; compact?: boolean }> = ({
  impact,
  compact = false,
}) => {
  const { showPoints } = useDisplayMode();
  const positivePillars = impact.pillarImpacts.filter(p => p.delta > 0);

  const currentRating = STRESS_FREE_RATINGS[scoreToRating(impact.currentScore)] || 'Building';
  const projectedRating = STRESS_FREE_RATINGS[scoreToRating(impact.projectedScore)] || 'Good';

  return (
    <div className={`tune-rhythm__score-impact ${compact ? 'tune-rhythm__score-impact--compact' : ''}`}>
      <div className="tune-rhythm__score-rings">
        <ScoreRing score={impact.currentScore} hideNumber={!showPoints} />
        <span className="tune-rhythm__score-arrow material-symbols-rounded">arrow_forward</span>
        <ScoreRing score={impact.projectedScore} projected hideNumber={!showPoints} />
      </div>
      {impact.delta > 0 ? (
        showPoints ? (
          <>
            <span className="tune-rhythm__score-delta typo-callout-semibold">
              +{impact.delta} points
            </span>
            <span className="tune-rhythm__score-timeline typo-footnote color-secondary">
              in ~{impact.timelineWeeks} {impact.timelineWeeks === 1 ? 'week' : 'weeks'}
            </span>
          </>
        ) : (
          <span className="tune-rhythm__score-delta typo-callout-semibold">
            {currentRating} → {projectedRating}
            <span className="tune-rhythm__score-timeline typo-footnote color-secondary">
              {' '}in ~{impact.timelineWeeks} {impact.timelineWeeks === 1 ? 'week' : 'weeks'}
            </span>
          </span>
        )
      ) : (
        <span className="tune-rhythm__score-delta typo-footnote color-tertiary">
          {showPoints ? 'No score change' : 'No change expected'}
        </span>
      )}
      {!compact && positivePillars.length > 0 && (
        <div className="tune-rhythm__score-pillars">
          {positivePillars.map(p => {
            const fromRating = STRESS_FREE_RATINGS[scoreToRating(p.currentScore)] || '';
            const toRating = STRESS_FREE_RATINGS[scoreToRating(p.projectedScore)] || '';
            return (
              <div key={p.pillarId} className="tune-rhythm__score-pillar typo-footnote color-secondary">
                {showPoints
                  ? `${PILLAR_LABELS[p.pillarId] ?? p.pillarId}: ${p.currentScore} → ${p.projectedScore} (+${p.delta})`
                  : `${PILLAR_LABELS[p.pillarId] ?? p.pillarId}: ${fromRating} → ${toRating}`
                }
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const PRESETS: { id: string; name: string; tagline: string; icon: string; values: RhythmTarget }[] = [
  {
    id: 'essentials',
    name: 'Essentials First',
    tagline: 'Cover your bases, build from there',
    icon: 'shield',
    values: { needs: 60, wants: 20, growth: 20 },
  },
  {
    id: 'balanced',
    name: 'Balanced',
    tagline: 'The classic 50/30/20 split',
    icon: 'balance',
    values: { needs: 50, wants: 30, growth: 20 },
  },
  {
    id: 'growth',
    name: 'Growth Mode',
    tagline: 'Maximise savings & investing',
    icon: 'trending_up',
    values: { needs: 40, wants: 20, growth: 40 },
  },
];

const TuneRhythmModal: React.FC<TuneRhythmModalProps> = ({ isOpen, onClose, onConfirm, priorities = [] }) => {
  const modalRef = useRef<HTMLIonModalElement>(null);
  const [target, setTarget] = useState<RhythmTarget>({ needs: 50, wants: 30, growth: 20 });
  const [selectedPreset, setSelectedPreset] = useState<string>('balanced');

  const monthlyIncome = cashflowData.received;

  const handlePresetSelect = useCallback((preset: typeof PRESETS[number]) => {
    setSelectedPreset(preset.id);
    setTarget({ ...preset.values });
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm(target);
    setSelectedPreset('balanced');
    setTarget({ needs: 50, wants: 30, growth: 20 });
  }, [target, onConfirm]);

  const handleDismiss = useCallback(() => {
    onClose();
  }, [onClose]);

  const actuals = nwgBreakdownData;

  const impact = useMemo(() => calculateRhythmImpact(target), [target]);

  // Wealth projection for the selected rhythm
  const wealthProjection = useMemo(() => calculateWealthProjection(target), [target]);

  // Priority funding analysis
  const monthlyGrowthBudget = monthlyIncome * (target.growth / 100);
  const totalPriorityNeeded = priorities.reduce((sum, p) => sum + (p.monthlyContribution || 0), 0);
  const fundingPct = totalPriorityNeeded > 0 ? Math.min(100, Math.round((monthlyGrowthBudget / totalPriorityNeeded) * 100)) : 100;

  return (
    <IonModal
      ref={modalRef}
      isOpen={isOpen}
      onDidDismiss={handleDismiss}
      className="tune-rhythm-modal"
      handle={false}
    >
      <div className="tune-rhythm">
        {/* Header */}
        <div className="tune-rhythm__header">
          <button
            className="tune-rhythm__close"
            onClick={handleDismiss}
            aria-label="Close without saving"
          >
            <span className="material-symbols-rounded">close</span>
          </button>
          <span className="tune-rhythm__header-title typo-callout-semibold">
            Choose your rhythm
          </span>
        </div>

        <div className="tune-rhythm__body">
            <p className="tune-rhythm__intro typo-body-regular color-secondary">
              Pick a starting point that fits your lifestyle. You can fine-tune it next.
            </p>

            <div className="tune-rhythm__presets">
              {PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className={`tune-rhythm__preset ${selectedPreset === preset.id ? 'tune-rhythm__preset--selected' : ''}`}
                  onClick={() => handlePresetSelect(preset)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handlePresetSelect(preset);
                  }}
                >
                  <div className="tune-rhythm__preset-icon">
                    <span className="material-symbols-rounded">{preset.icon}</span>
                  </div>
                  <div className="tune-rhythm__preset-info">
                    <span className="tune-rhythm__preset-name typo-callout-semibold">
                      {preset.name}
                    </span>
                    <span className="tune-rhythm__preset-tagline typo-footnote color-secondary">
                      {preset.tagline}
                    </span>
                  </div>
                  <div className="tune-rhythm__preset-split typo-footnote">
                    <span style={{ color: 'var(--pfm-pink-base)' }}>{preset.values.needs}</span>
                    <span className="color-tertiary">/</span>
                    <span style={{ color: 'var(--pfm-turquoise-strong)' }}>{preset.values.wants}</span>
                    <span className="color-tertiary">/</span>
                    <span style={{ color: 'var(--pfm-status-success)' }}>{preset.values.growth}</span>
                  </div>
                  <div className="tune-rhythm__preset-savings typo-footnote color-tertiary">
                    {formatEuroShort(monthlyIncome * (preset.values.growth / 100) * 12)}/yr saved
                  </div>
                  {selectedPreset === preset.id && (
                    <span className="tune-rhythm__preset-check material-symbols-rounded">check_circle</span>
                  )}
                </div>
              ))}
            </div>

            {/* Current vs new */}
            <div className="tune-rhythm__current-vs-new card-bordered">
              <div className="tune-rhythm__compare-row">
                <span className="typo-footnote color-tertiary">Your current</span>
                <span className="typo-footnote">
                  <span style={{ color: 'var(--pfm-pink-base)' }}>{actuals.needs.percentage}</span>
                  <span className="color-tertiary">/</span>
                  <span style={{ color: 'var(--pfm-turquoise-strong)' }}>{actuals.wants.percentage}</span>
                  <span className="color-tertiary">/</span>
                  <span style={{ color: 'var(--pfm-status-success)' }}>{actuals.growth.percentage}</span>
                  <span className="color-tertiary">%</span>
                </span>
              </div>
              <div className="tune-rhythm__compare-row">
                <span className="typo-footnote color-tertiary">This preset</span>
                <span className="typo-footnote">
                  <span style={{ color: 'var(--pfm-pink-base)' }}>{target.needs}</span>
                  <span className="color-tertiary">/</span>
                  <span style={{ color: 'var(--pfm-turquoise-strong)' }}>{target.wants}</span>
                  <span className="color-tertiary">/</span>
                  <span style={{ color: 'var(--pfm-status-success)' }}>{target.growth}</span>
                  <span className="color-tertiary">%</span>
                </span>
              </div>
            </div>

            <ScoreImpactPreview impact={impact} compact />

            {/* Priority funding section */}
            {priorities.length > 0 && (
              <div className="tune-rhythm__priorities card-bordered">
                <div className="tune-rhythm__priorities-header">
                  <span className="typo-footnote color-secondary" style={{ fontWeight: 600 }}>
                    What this means for your priorities
                  </span>
                  <span className="typo-footnote color-tertiary">
                    Saved budget: {formatEuroShort(monthlyGrowthBudget)}/mo
                  </span>
                </div>
                {priorities.map(p => {
                  const needed = p.monthlyContribution || 0;
                  const covered = needed <= monthlyGrowthBudget;
                  return (
                    <div key={p.id} className="tune-rhythm__priority-row">
                      <span className="typo-footnote">{p.name}</span>
                      <span className="typo-footnote color-tertiary">{formatEuroShort(needed)}/mo</span>
                      <span
                        className="typo-footnote"
                        style={{ color: covered ? 'var(--pfm-status-success)' : 'var(--pfm-status-warning)', fontWeight: 600 }}
                      >
                        {covered ? 'on track' : 'behind'}
                      </span>
                    </div>
                  );
                })}
                <div className="tune-rhythm__priority-summary typo-footnote">
                  <span style={{ color: fundingPct >= 100 ? 'var(--pfm-status-success)' : 'var(--pfm-status-warning)' }}>
                    {fundingPct >= 100 ? 'All priorities funded' : `Covers ${fundingPct}% of your priorities`}
                  </span>
                </div>
              </div>
            )}

            {/* Wealth projection callout */}
            {wealthProjection.lifetimeGap > 0 && (
              <div className="tune-rhythm__wealth card-bordered">
                <div className="tune-rhythm__wealth-row">
                  <span className="typo-footnote color-secondary" style={{ fontWeight: 600 }}>Wealth at 65</span>
                </div>
                <div className="tune-rhythm__wealth-row">
                  <span className="typo-footnote color-tertiary">Current path</span>
                  <span className="typo-footnote">{formatEuroShort(wealthProjection.wealthAt65Current)}</span>
                </div>
                <div className="tune-rhythm__wealth-row">
                  <span className="typo-footnote" style={{ color: 'var(--pfm-status-success)' }}>With this rhythm</span>
                  <span className="typo-callout-semibold" style={{ color: 'var(--pfm-status-success)' }}>
                    {formatEuroShort(wealthProjection.wealthAt65Rhythm)}
                  </span>
                </div>
                <div className="tune-rhythm__wealth-row">
                  <span className="typo-footnote" style={{ color: 'var(--pfm-status-success)', fontWeight: 600 }}>
                    +{formatEuroShort(wealthProjection.lifetimeGap)} difference
                  </span>
                </div>
              </div>
            )}

            <button
              className="btn-raised tune-rhythm__cta"
              onClick={handleConfirm}
            >
              Use this preset
            </button>
            <p className="typo-footnote color-tertiary tune-rhythm__hint">
              Close (&times;) to exit without saving.
            </p>
        </div>
      </div>
    </IonModal>
  );
};

export default TuneRhythmModal;
