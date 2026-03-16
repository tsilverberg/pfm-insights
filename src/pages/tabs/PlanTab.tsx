import React, { useState } from 'react';
import SectionModule from '../../components/shared/SectionModule';
import HealthScoreMiniCard from '../../components/shared/HealthScoreMiniCard';
import TuneRhythmModal from '../../components/shared/TuneRhythmModal';
import PocketGoalCard from '../../components/shared/PocketGoalCard';
import PrioritySummaryBar from '../../components/shared/PrioritySummaryBar';
import AddPrioritySheet from '../../components/shared/AddPrioritySheet';
import CoachMomentCard from '../../components/shared/CoachMomentCard';
import { nwgBreakdownData, cashflowData } from '../../data/pfmData';
import { coachNudges } from '../../data/coachData';
import { formatEuroShort } from '../../data/formatters';
import { useToast } from '../../hooks/useToast';
import { useRhythm } from '../../hooks/useRhythm';
import type { RhythmTarget, Pocket } from '../../data/types';
import './PlanTab.css';

const CATEGORY_LABEL: Record<string, string> = {
  essential: 'Essential',
  milestone: 'Milestone',
  lifestyle: 'Lifestyle',
};

const PlanTab: React.FC = () => {
  const { showToast } = useToast();
  const {
    rhythmTarget, setRhythmTarget,
    priorities, addPriority, removePriority, updatePriority,
    rhythmImpact, wealthProjection,
    requiredGrowthPct, totalMonthlyContribution,
  } = useRhythm();

  const [showCoach, setShowCoach] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [editingPriority, setEditingPriority] = useState<Pocket | null>(null);
  const nudge = coachNudges.find(n => n.tab === 'plan');

  const actuals = nwgBreakdownData;
  const monthlyIncome = cashflowData.received;

  const allocatedPct = actuals.needs.percentage + actuals.wants.percentage + actuals.growth.percentage;
  const _unallocatedPct = 100 - allocatedPct;

  const monthlyGrowthBudget = rhythmTarget
    ? monthlyIncome * (rhythmTarget.growth / 100)
    : monthlyIncome * (actuals.growth.percentage / 100);

  const handleConfirm = (target: RhythmTarget) => {
    setRhythmTarget(target);
    setModalOpen(false);
    showToast({ type: 'success', message: 'Rhythm set! Your targets are now active.' });
  };

  const handleSavePriority = (p: Pocket) => {
    if (editingPriority) {
      updatePriority(p.id, p);
    } else {
      addPriority({ ...p, priority: priorities.length + 1 });
    }
    setEditingPriority(null);
    setAddSheetOpen(false);
    showToast({ type: 'success', message: editingPriority ? 'Priority updated' : 'Priority added' });
  };

  const handleDeletePriority = () => {
    if (editingPriority) {
      removePriority(editingPriority.id);
      setEditingPriority(null);
      setAddSheetOpen(false);
      showToast({ type: 'info', message: 'Priority removed' });
    }
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
      {/* Health score: mini card + My rhythm */}
      <SectionModule title="Health score">
        <div className="plan-health-section card-bordered">
          <HealthScoreMiniCard />

          <div className="plan-health-section__rhythm-block" aria-labelledby="my-rhythm-heading">
            <h3 id="my-rhythm-heading" className="plan-health-section__subheading typo-footnote color-secondary">
              My rhythm
            </h3>
            <p className="plan-health-section__rhythm-hint typo-footnote color-tertiary">
              Your spending and saving targets
            </p>

        {!rhythmTarget ? (
          <div className="rhythm-card rhythm-card--nested">
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
          <div className="rhythm-card rhythm-card--nested">
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

            {/* Wealth projection callout */}
            {wealthProjection && wealthProjection.lifetimeGap > 0 && (
              <div className="plan__wealth-callout">
                <div className="plan__wealth-callout-row">
                  <span className="material-symbols-rounded" style={{ fontSize: 16, color: 'var(--pfm-status-success)' }}>trending_up</span>
                  <span className="typo-footnote color-secondary">Wealth at 65</span>
                </div>
                <div className="plan__wealth-callout-values">
                  <span className="typo-footnote color-tertiary">
                    Current: {formatEuroShort(wealthProjection.wealthAt65Current)}
                  </span>
                  <span className="typo-footnote" style={{ color: 'var(--pfm-status-success)' }}>
                    With rhythm: {formatEuroShort(wealthProjection.wealthAt65Rhythm)}
                  </span>
                </div>
                <span className="typo-footnote" style={{ color: 'var(--pfm-status-success)', fontWeight: 600 }}>
                  +{formatEuroShort(wealthProjection.lifetimeGap)} difference
                </span>
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
          </div>
        </div>
      </SectionModule>

      {/* Coach Nudge */}
      {showCoach && nudge && (
        <SectionModule title="">
          <CoachMomentCard
            title={nudge.title}
            body={nudge.body}
            ctaLabel={nudge.ctaLabel}
            onClose={() => setShowCoach(false)}
          />
        </SectionModule>
      )}

      {/* Life Priorities */}
      <SectionModule title="Your priorities">
        <PrioritySummaryBar
          totalMonthlyContribution={totalMonthlyContribution}
          monthlyGrowthBudget={monthlyGrowthBudget}
          requiredGrowthPct={requiredGrowthPct}
          currentGrowthPct={rhythmTarget?.growth ?? actuals.growth.percentage}
        />
        <div className="plan__goals">
          {priorities
            .sort((a, b) => (a.priority || 99) - (b.priority || 99))
            .map((pocket) => (
            <PocketGoalCard
              key={pocket.id}
              pocket={pocket}
              subtitle={
                [
                  pocket.monthlyContribution ? `€${pocket.monthlyContribution}/mo` : null,
                  pocket.category ? CATEGORY_LABEL[pocket.category] : null,
                  pocket.targetDate,
                ].filter(Boolean).join(' · ')
              }
              onClick={() => {
                setEditingPriority(pocket);
                setAddSheetOpen(true);
              }}
            />
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <button
            className="btn-raised rhythm-card__cta"
            onClick={() => {
              setEditingPriority(null);
              setAddSheetOpen(true);
            }}
          >
            + Add a priority
          </button>
        </div>
      </SectionModule>

      {/* Tune Rhythm Modal */}
      <TuneRhythmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        priorities={priorities}
      />

      {/* Add/Edit Priority Sheet */}
      <AddPrioritySheet
        isOpen={addSheetOpen}
        onClose={() => { setAddSheetOpen(false); setEditingPriority(null); }}
        onSave={handleSavePriority}
        onDelete={editingPriority ? handleDeletePriority : undefined}
        editingPriority={editingPriority}
      />
    </div>
  );
};

export default PlanTab;
