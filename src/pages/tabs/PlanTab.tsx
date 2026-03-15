import React, { useState, useMemo } from 'react';
import SectionModule from '../../components/shared/SectionModule';
import HealthScoreMiniCard from '../../components/shared/HealthScoreMiniCard';
import TuneRhythmModal from '../../components/shared/TuneRhythmModal';
import PocketGoalCard from '../../components/shared/PocketGoalCard';
import RaisedButton from '../../components/shared/RaisedButton';
import { pocketsListData } from '../../data/mockData';
import { nwgBreakdownData, cashflowData, calculateRhythmImpact } from '../../data/pfmData';
import { formatEuroShort } from '../../data/formatters';
import { useToast } from '../../hooks/useToast';
import type { RhythmTarget } from '../../data/types';
import './PlanTab.css';

const PlanTab: React.FC = () => {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [rhythmTarget, setRhythmTarget] = useState<RhythmTarget | null>(null);

  const actuals = nwgBreakdownData;
  const monthlyIncome = cashflowData.received;

  // Score impact of the active rhythm target
  const rhythmImpact = useMemo(
    () => (rhythmTarget ? calculateRhythmImpact(rhythmTarget) : null),
    [rhythmTarget],
  );
  // Unallocated percentage (income not tracked in NWG categories)
  const allocatedPct = actuals.needs.percentage + actuals.wants.percentage + actuals.growth.percentage;
  const _unallocatedPct = 100 - allocatedPct;

  const handleConfirm = (target: RhythmTarget) => {
    setRhythmTarget(target);
    setModalOpen(false);
    showToast({ type: 'success', message: 'Rhythm set! Your targets are now active.' });
  };

  const getStatus = (actualPct: number, targetPct: number): 'on-track' | 'over' | 'under' => {
    const diff = actualPct - targetPct;
    if (Math.abs(diff) <= 3) return 'on-track';
    return diff > 0 ? 'over' : 'under';
  };

  const statusLabel = (status: 'on-track' | 'over' | 'under'): string => {
    if (status === 'on-track') return 'On track';
    if (status === 'over') return 'Over target';
    return 'Under target';
  };

  const statusColor = (status: 'on-track' | 'over' | 'under'): string => {
    if (status === 'on-track') return 'var(--pfm-status-success)';
    if (status === 'over') return 'var(--pfm-status-warning, #F5A623)';
    return 'var(--pfm-action-primary-bg)';
  };

  return (
    <div>
      {/* Section 1: Health Score Mini Card */}
      <SectionModule title="Health score">
        <HealthScoreMiniCard />
      </SectionModule>

      {/* Section 2: My Rhythm */}
      <SectionModule title="My rhythm" subtitle="Your spending and saving targets">
        {!rhythmTarget ? (
          /* Before activation */
          <div className="rhythm-card card-bordered">
            <div className="rhythm-card__actuals">
              {([
                { label: 'Needs', pct: actuals.needs.percentage, color: 'var(--pfm-pink-base)' },
                { label: 'Lifestyle', pct: actuals.wants.percentage, color: 'var(--pfm-turquoise-strong)' },
                { label: 'Saved', pct: actuals.growth.percentage, color: 'var(--pfm-status-success)' },
              ]).map((item) => (
                <div key={item.label} className="rhythm-card__actual-item">
                  <span className="rhythm-card__dot" style={{ background: item.color }} />
                  <span className="typo-footnote color-secondary">{item.label}</span>
                  <span className="typo-callout-semibold">{item.pct}%</span>
                </div>
              ))}
            </div>
            {/* NWG bar */}
            <div className="rhythm-card__bar">
              <div className="rhythm-card__bar-seg rhythm-card__bar-seg--needs" style={{ width: `${actuals.needs.percentage}%` }} />
              <div className="rhythm-card__bar-seg rhythm-card__bar-seg--wants" style={{ width: `${actuals.wants.percentage}%` }} />
              <div className="rhythm-card__bar-seg rhythm-card__bar-seg--growth" style={{ width: `${actuals.growth.percentage}%` }} />
              {_unallocatedPct > 0 && (
                <div className="rhythm-card__bar-seg rhythm-card__bar-seg--unallocated" style={{ width: `${_unallocatedPct}%` }} />
              )}
            </div>
            <p className="typo-footnote color-tertiary rhythm-card__hint">
              Based on your current month spending vs {formatEuroShort(monthlyIncome)} income
            </p>
            <button
              className="btn-raised rhythm-card__cta"
              onClick={() => setModalOpen(true)}
            >
              Set your rhythm
            </button>
          </div>
        ) : (
          /* After activation */
          <div className="rhythm-card card-bordered">
            {/* Target vs Actual comparison */}
            <div className="rhythm-card__compare">
              {([
                { label: 'Needs', actualPct: actuals.needs.percentage, targetPct: rhythmTarget.needs, color: 'var(--pfm-pink-base)' },
                { label: 'Lifestyle', actualPct: actuals.wants.percentage, targetPct: rhythmTarget.wants, color: 'var(--pfm-turquoise-strong)' },
                { label: 'Saved', actualPct: actuals.growth.percentage, targetPct: rhythmTarget.growth, color: 'var(--pfm-status-success)' },
              ]).map((item) => {
                const status = getStatus(item.actualPct, item.targetPct);
                return (
                  <div key={item.label} className="rhythm-card__compare-row">
                    <div className="rhythm-card__compare-left">
                      <span className="rhythm-card__dot" style={{ background: item.color }} />
                      <span className="typo-callout-regular">{item.label}</span>
                    </div>
                    <div className="rhythm-card__compare-values">
                      <span className="typo-callout-semibold">{item.actualPct}%</span>
                      <span className="typo-footnote color-tertiary">/ {item.targetPct}%</span>
                    </div>
                    <span
                      className="rhythm-card__status-badge typo-footnote"
                      style={{ color: statusColor(status) }}
                    >
                      {statusLabel(status)}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Dual bar: target + actual */}
            <div className="rhythm-card__dual-bars">
              <div className="rhythm-card__bar-label typo-footnote color-tertiary">Target</div>
              <div className="rhythm-card__bar">
                <div className="rhythm-card__bar-seg rhythm-card__bar-seg--needs" style={{ width: `${rhythmTarget.needs}%` }} />
                <div className="rhythm-card__bar-seg rhythm-card__bar-seg--wants" style={{ width: `${rhythmTarget.wants}%` }} />
                <div className="rhythm-card__bar-seg rhythm-card__bar-seg--growth" style={{ width: `${rhythmTarget.growth}%` }} />
              </div>
              <div className="rhythm-card__bar-label typo-footnote color-tertiary">Actual</div>
              <div className="rhythm-card__bar">
                <div className="rhythm-card__bar-seg rhythm-card__bar-seg--needs" style={{ width: `${actuals.needs.percentage}%` }} />
                <div className="rhythm-card__bar-seg rhythm-card__bar-seg--wants" style={{ width: `${actuals.wants.percentage}%` }} />
                <div className="rhythm-card__bar-seg rhythm-card__bar-seg--growth" style={{ width: `${actuals.growth.percentage}%` }} />
                {_unallocatedPct > 0 && (
                  <div className="rhythm-card__bar-seg rhythm-card__bar-seg--unallocated" style={{ width: `${_unallocatedPct}%` }} />
                )}
              </div>
            </div>
            {rhythmImpact && rhythmImpact.delta > 0 && (
              <div className="rhythm-card__score-line typo-footnote color-secondary">
                <span className="material-symbols-rounded" style={{ fontSize: 14, verticalAlign: 'middle', marginRight: 4 }}>
                  trending_up
                </span>
                Following this rhythm: {rhythmImpact.currentScore} → {rhythmImpact.projectedScore}{' '}
                (+{rhythmImpact.delta} pts in ~{rhythmImpact.timelineWeeks} {rhythmImpact.timelineWeeks === 1 ? 'week' : 'weeks'})
              </div>
            )}
            <button
              className="rhythm-card__adjust typo-callout-semibold"
              onClick={() => setModalOpen(true)}
            >
              Adjust rhythm
            </button>
          </div>
        )}
      </SectionModule>

      {/* Section 3: Savings Goals (kept as-is) */}
      <SectionModule title="Savings goals">
        <div className="plan__goals">
          {pocketsListData.map((pocket) => (
            <PocketGoalCard key={pocket.id} pocket={pocket} />
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <RaisedButton label="+ Add a goal" onClick={() => showToast({ type: 'info', message: 'Goal creator coming soon' })} />
        </div>
      </SectionModule>

      {/* Tune Rhythm Modal */}
      <TuneRhythmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default PlanTab;
