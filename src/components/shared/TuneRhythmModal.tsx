import React, { useState, useRef, useCallback, useMemo } from 'react';
import { IonModal } from '@ionic/react';
import { cashflowData, nwgBreakdownData, calculateRhythmImpact } from '../../data/pfmData';
import { PILLAR_LABELS } from '../../data/constants';
import { formatEuro, formatEuroShort } from '../../data/formatters';
import type { RhythmTarget, RhythmScoreImpact } from '../../data/types';
import './TuneRhythmModal.css';

/** Small SVG score ring used in the impact preview */
const ScoreRing: React.FC<{ score: number; size?: number; projected?: boolean }> = ({
  score,
  size = 40,
  projected = false,
}) => {
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(score / 100, 1));
  const dashOffset = circumference * (1 - pct);

  // Color based on score tier
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
      <span className="tune-rhythm__score-ring-value typo-footnote">{score}</span>
    </div>
  );
};

interface TuneRhythmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (target: RhythmTarget) => void;
}

/** Inline score impact preview used on steps 2 and 3 */
const ScoreImpactPreview: React.FC<{ impact: RhythmScoreImpact; compact?: boolean }> = ({
  impact,
  compact = false,
}) => {
  if (impact.delta <= 0) return null;

  const positivePillars = impact.pillarImpacts.filter(p => p.delta > 0);

  return (
    <div className={`tune-rhythm__score-impact ${compact ? 'tune-rhythm__score-impact--compact' : ''}`}>
      <div className="tune-rhythm__score-rings">
        <ScoreRing score={impact.currentScore} />
        <span className="tune-rhythm__score-arrow material-symbols-rounded">arrow_forward</span>
        <ScoreRing score={impact.projectedScore} projected />
      </div>
      <span className="tune-rhythm__score-delta typo-callout-semibold">
        +{impact.delta} points
      </span>
      <span className="tune-rhythm__score-timeline typo-footnote color-secondary">
        in ~{impact.timelineWeeks} {impact.timelineWeeks === 1 ? 'week' : 'weeks'}
      </span>
      {!compact && positivePillars.length > 0 && (
        <div className="tune-rhythm__score-pillars">
          {positivePillars.map(p => (
            <div key={p.pillarId} className="tune-rhythm__score-pillar typo-footnote color-secondary">
              {PILLAR_LABELS[p.pillarId] ?? p.pillarId}: {p.currentScore} → {p.projectedScore} (+{p.delta})
            </div>
          ))}
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

const MICRO_ACTIONS = [
  'Review recurring subscriptions for potential savings',
  'Set up an automatic transfer on payday',
  'Create a weekly grocery budget to stay on track',
  'Move spare cash to your savings goal each Friday',
  'Aim to cook at home 4 nights this week',
  'Round up card purchases to boost your growth fund',
];

function pickActions(target: RhythmTarget): string[] {
  const actions: string[] = [];
  if (target.growth >= 30) actions.push(MICRO_ACTIONS[1]);
  if (target.needs <= 50) actions.push(MICRO_ACTIONS[2]);
  if (target.wants <= 25) actions.push(MICRO_ACTIONS[0]);
  if (target.growth >= 20 && actions.length < 3) actions.push(MICRO_ACTIONS[3]);
  if (target.wants <= 30 && actions.length < 3) actions.push(MICRO_ACTIONS[4]);
  if (actions.length < 3) actions.push(MICRO_ACTIONS[5]);
  return actions.slice(0, 3);
}

const TuneRhythmModal: React.FC<TuneRhythmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const modalRef = useRef<HTMLIonModalElement>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [target, setTarget] = useState<RhythmTarget>({ needs: 50, wants: 30, growth: 20 });
  const [selectedPreset, setSelectedPreset] = useState<string>('balanced');

  const monthlyIncome = cashflowData.received;

  const handlePresetSelect = useCallback((preset: typeof PRESETS[number]) => {
    setSelectedPreset(preset.id);
    setTarget({ ...preset.values });
  }, []);

  const handleSliderChange = useCallback((type: keyof RhythmTarget, newVal: number) => {
    setTarget((prev) => {
      const clamped = Math.max(5, Math.min(90, newVal));
      const others = Object.keys(prev).filter((k) => k !== type) as (keyof RhythmTarget)[];
      const remaining = 100 - clamped;
      const prevOtherSum = others.reduce((s, k) => s + prev[k], 0);

      if (prevOtherSum === 0) {
        return { ...prev, [type]: clamped, [others[0]]: Math.round(remaining / 2), [others[1]]: remaining - Math.round(remaining / 2) };
      }

      const result = { ...prev, [type]: clamped };
      let distributed = 0;
      others.forEach((k, i) => {
        if (i === others.length - 1) {
          result[k] = Math.max(5, remaining - distributed);
        } else {
          const share = Math.max(5, Math.round((prev[k] / prevOtherSum) * remaining));
          result[k] = share;
          distributed += share;
        }
      });

      // Ensure second other is at least 5
      if (result[others[1]] < 5) {
        result[others[1]] = 5;
        result[others[0]] = remaining - 5;
      }
      if (result[others[0]] < 5) {
        result[others[0]] = 5;
        result[others[1]] = remaining - 5;
      }

      return result;
    });
    setSelectedPreset('');
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm(target);
    // Reset for next open
    setStep(1);
    setSelectedPreset('balanced');
    setTarget({ needs: 50, wants: 30, growth: 20 });
  }, [target, onConfirm]);

  const handleDismiss = useCallback(() => {
    setStep(1);
    onClose();
  }, [onClose]);

  const annualSavings = (monthlyIncome * (target.growth / 100)) * 12;
  const actuals = nwgBreakdownData;

  // Live score-impact calculation — updates as sliders move
  const impact = useMemo(() => calculateRhythmImpact(target), [target]);

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
            aria-label="Close"
          >
            <span className="material-symbols-rounded">close</span>
          </button>
          <span className="tune-rhythm__header-title typo-callout-semibold">
            {step === 1 && 'Choose your rhythm'}
            {step === 2 && 'Adjust your split'}
            {step === 3 && 'Confirm your rhythm'}
          </span>
          <div className="tune-rhythm__step-dots">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`tune-rhythm__dot ${step === s ? 'tune-rhythm__dot--active' : step > s ? 'tune-rhythm__dot--done' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Choose Preset */}
        {step === 1 && (
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

            <button
              className="btn-raised tune-rhythm__cta"
              onClick={() => setStep(2)}
            >
              Customise
            </button>
          </div>
        )}

        {/* Step 2: Adjust Sliders */}
        {step === 2 && (
          <div className="tune-rhythm__body">
            <p className="tune-rhythm__intro typo-body-regular color-secondary">
              Drag the sliders to set your ideal split. They always add up to 100%.
            </p>

            {/* NWG bar preview */}
            <div className="tune-rhythm__bar-preview">
              <div
                className="tune-rhythm__bar-seg tune-rhythm__bar-seg--needs"
                style={{ width: `${target.needs}%` }}
              />
              <div
                className="tune-rhythm__bar-seg tune-rhythm__bar-seg--wants"
                style={{ width: `${target.wants}%` }}
              />
              <div
                className="tune-rhythm__bar-seg tune-rhythm__bar-seg--growth"
                style={{ width: `${target.growth}%` }}
              />
            </div>

            {/* Sliders */}
            {([
              { key: 'needs' as const, label: 'Needs', color: 'var(--pfm-pink-base)', actualPct: actuals.needs.percentage },
              { key: 'wants' as const, label: 'Lifestyle', color: 'var(--pfm-turquoise-strong)', actualPct: actuals.wants.percentage },
              { key: 'growth' as const, label: 'Saved', color: 'var(--pfm-status-success)', actualPct: actuals.growth.percentage },
            ]).map((item) => (
              <div key={item.key} className="tune-rhythm__slider-group">
                <div className="tune-rhythm__slider-header">
                  <span className="tune-rhythm__slider-label typo-callout-semibold">
                    <span className="tune-rhythm__slider-dot" style={{ background: item.color }} />
                    {item.label}
                  </span>
                  <span className="tune-rhythm__slider-values">
                    <span className="typo-callout-semibold">{target[item.key]}%</span>
                    <span className="typo-footnote color-tertiary">
                      {formatEuroShort(monthlyIncome * (target[item.key] / 100))}/mo
                    </span>
                  </span>
                </div>
                <input
                  type="range"
                  className="tune-rhythm__range"
                  min={5}
                  max={90}
                  value={target[item.key]}
                  onChange={(e) => handleSliderChange(item.key, parseInt(e.target.value, 10))}
                  style={{ '--slider-color': item.color } as React.CSSProperties}
                  aria-label={`${item.label} percentage`}
                />
                <div className="tune-rhythm__slider-compare typo-footnote color-tertiary">
                  Current actual: {item.actualPct}% ({formatEuroShort(monthlyIncome * (item.actualPct / 100))}/mo)
                </div>
              </div>
            ))}

            {/* Live score impact preview */}
            <ScoreImpactPreview impact={impact} compact />

            <div className="tune-rhythm__actions-row">
              <button className="tune-rhythm__back typo-callout-semibold" onClick={() => setStep(1)}>
                Back
              </button>
              <button className="btn-raised tune-rhythm__cta" onClick={() => setStep(3)}>
                Review
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className="tune-rhythm__body">
            <div className="tune-rhythm__summary-card card-bordered">
              <span className="typo-callout-semibold" style={{ marginBottom: 8, display: 'block' }}>Your new rhythm</span>
              {/* Bar */}
              <div className="tune-rhythm__bar-preview" style={{ marginBottom: 12 }}>
                <div className="tune-rhythm__bar-seg tune-rhythm__bar-seg--needs" style={{ width: `${target.needs}%` }} />
                <div className="tune-rhythm__bar-seg tune-rhythm__bar-seg--wants" style={{ width: `${target.wants}%` }} />
                <div className="tune-rhythm__bar-seg tune-rhythm__bar-seg--growth" style={{ width: `${target.growth}%` }} />
              </div>
              {/* Summary rows */}
              {([
                { label: 'Needs', pct: target.needs, color: 'var(--pfm-pink-base)' },
                { label: 'Lifestyle', pct: target.wants, color: 'var(--pfm-turquoise-strong)' },
                { label: 'Saved', pct: target.growth, color: 'var(--pfm-status-success)' },
              ]).map((row) => (
                <div key={row.label} className="tune-rhythm__summary-row">
                  <span className="tune-rhythm__slider-dot" style={{ background: row.color }} />
                  <span className="typo-callout-regular" style={{ flex: 1 }}>{row.label}</span>
                  <span className="typo-callout-semibold">{row.pct}%</span>
                  <span className="typo-footnote color-secondary" style={{ width: 80, textAlign: 'right' }}>
                    {formatEuro(monthlyIncome * (row.pct / 100))}
                  </span>
                </div>
              ))}
              <div className="tune-rhythm__annual-line typo-footnote color-secondary">
                Projected annual savings: <strong style={{ color: 'var(--pfm-status-success)' }}>{formatEuroShort(annualSavings)}</strong>
              </div>
            </div>

            {/* Score impact — the key "aha moment" */}
            <ScoreImpactPreview impact={impact} />

            <div className="tune-rhythm__micro-actions">
              <span className="typo-callout-semibold" style={{ marginBottom: 8, display: 'block' }}>
                Your micro-actions
              </span>
              {pickActions(target).map((action, i) => (
                <div key={i} className="tune-rhythm__micro-action">
                  <span className="material-symbols-rounded tune-rhythm__micro-icon">check_circle</span>
                  <span className="typo-footnote">{action}</span>
                </div>
              ))}
            </div>

            <div className="tune-rhythm__actions-row">
              <button className="tune-rhythm__back typo-callout-semibold" onClick={() => setStep(2)}>
                Back
              </button>
              <button className="btn-raised tune-rhythm__cta" onClick={handleConfirm}>
                Confirm rhythm
              </button>
            </div>
          </div>
        )}
      </div>
    </IonModal>
  );
};

export default TuneRhythmModal;
