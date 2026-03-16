import React, { useState, useMemo } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import SectionModule from '../components/shared/SectionModule';
import ProgressBar from '../components/shared/ProgressBar';
import HealthScoreRing from '../components/shared/HealthScoreRing';
import SpotlightCard from '../components/shared/SpotlightCard';
import CoachMomentCard from '../components/shared/CoachMomentCard';
import CoachSheet from '../components/shared/CoachSheet';
import TuneRhythmModal from '../components/shared/TuneRhythmModal';
import TrendLineChart from '../components/charts/TrendLineChart';
import { healthScoreData, calculateRhythmImpact, cashflowData } from '../data/pfmData';
import { coachNudges } from '../data/coachData';
import { formatEuroShort } from '../data/formatters';
import { useRhythm } from '../hooks/useRhythm';
import { useToast } from '../hooks/useToast';
import { PILLAR_WEIGHTS, PILLAR_LABELS } from '../data/constants';
import type { PillarScore, ImprovementAction, RhythmTarget } from '../data/types';
import './HealthOverviewPage.css';

const PILLAR_ICONS: Record<string, string> = {
  spending: 'shopping_cart',
  savings: 'savings',
  debt: 'credit_card',
  buffer: 'shield',
  goals: 'flag',
};

const RATING_COLORS: Record<string, string> = {
  excellent: 'var(--pfm-status-success-vivid)',
  good: 'var(--pfm-status-success-vivid)',
  building: '#F5A623',
  'needs-attention': '#E5553B',
};

const IMPACT_COLORS: Record<string, string> = {
  high: 'var(--pfm-status-success-vivid)',
  medium: '#F5A623',
  low: '#295EFF',
};

const TREND_ARROWS: Record<string, string> = {
  improving: '\u25B2',
  stable: '\u2014',
  declining: '\u25BC',
};

const TREND_COLORS: Record<string, string> = {
  improving: 'var(--pfm-status-success-vivid)',
  stable: 'var(--pfm-text-tertiary)',
  declining: '#E5553B',
};

const HealthOverviewPage: React.FC = () => {
  const history = useHistory();
  const { showToast } = useToast();
  const [showCoach, setShowCoach] = useState(true);
  const [coachOpen, setCoachOpen] = useState(false);
  const [rhythmModalOpen, setRhythmModalOpen] = useState(false);
  const { rhythmTarget, setRhythmTarget, rhythmImpact, priorities, totalMonthlyContribution } = useRhythm();
  const nudge = coachNudges.find(n => n.insightType === 'nudge');

  // Teaser impact for users without a rhythm (show what Balanced would do)
  const teaserImpact = useMemo(
    () => calculateRhythmImpact({ needs: 50, wants: 30, growth: 20 }),
    []
  );

  // Priority status counts
  const monthlyGrowthBudget = rhythmTarget
    ? cashflowData.received * (rhythmTarget.growth / 100)
    : 0;
  const onTrackCount = priorities.filter(p => (p.monthlyContribution || 0) <= monthlyGrowthBudget).length;
  const behindCount = priorities.length - onTrackCount;
  const handleBack = () => history.goBack();

  const handleRhythmConfirm = (target: RhythmTarget) => {
    setRhythmTarget(target);
    setRhythmModalOpen(false);
    showToast({ type: 'success', message: 'Rhythm set! Your targets are now active.' });
  };

  // Compute delta from history
  const historyEntries = healthScoreData.history;
  const delta =
    historyEntries.length >= 2
      ? historyEntries[historyEntries.length - 1].overall -
        historyEntries[historyEntries.length - 2].overall
      : 0;

  // Trend chart data
  const trendData = historyEntries.map((h) => ({
    label: h.month.split(' ')[0].slice(0, 3),
    value: h.overall,
  }));

  // Top 3 actions across all pillars
  const allActions: (ImprovementAction & { pillarId: string })[] = [];
  healthScoreData.pillars.forEach((pillar) => {
    pillar.actions.forEach((action) => {
      allActions.push({ ...action, pillarId: pillar.id });
    });
  });
  const topActions = allActions
    .sort((a, b) => b.estimatedPoints - a.estimatedPoints)
    .slice(0, 3);

  return (
    <IonPage>
      <ScreenHeader title="Health Score" onBackAction={handleBack} />
      <IonContent className="page-content">
        <div className="health-overview">

          {/* Section 1: Hero Score */}
          <div className="health-overview__hero">
            <HealthScoreRing
              score={healthScoreData.overall}
              rating={healthScoreData.rating}
              delta={delta}
            />
            <p
              className="health-overview__hero-label typo-body-regular"
              style={{ color: RATING_COLORS[healthScoreData.rating] || 'var(--pfm-status-success-vivid)' }}
            >
              Your financial health is{' '}
              {healthScoreData.rating.replace(/-/g, ' ')}
            </p>
            <p className="health-overview__hero-updated typo-footnote color-tertiary">
              Updated {healthScoreData.lastUpdated}
            </p>
          </div>

          {/* Coach Nudge */}
          {showCoach && nudge && (
            <div className="health-overview__coach-wrap">
              <SectionModule title="">
                <CoachMomentCard
                  title={nudge.title}
                  body={nudge.body}
                  ctaLabel={nudge.ctaLabel}
                  onCta={() => setCoachOpen(true)}
                  onClose={() => setShowCoach(false)}
                />
              </SectionModule>
            </div>
          )}

          {/* Section 2: Score Trend */}
          <SectionModule title="Score trend">
            <TrendLineChart
              data={trendData}
              lineColor="var(--pfm-action-primary-bg)"
              showValues={true}
            />
          </SectionModule>

          {/* Section 3: Pillar Breakdown */}
          <SectionModule title="Your pillars" subtitle="Tap to explore">
            <div className="health-overview__pillar-list">
              {healthScoreData.pillars.map((pillar: PillarScore) => {
                const ratingColor = RATING_COLORS[pillar.rating] || '#295EFF';
                const trendArrow = TREND_ARROWS[pillar.trend] || '\u2014';
                const trendColor = TREND_COLORS[pillar.trend] || 'var(--pfm-text-tertiary)';
                const iconName = PILLAR_ICONS[pillar.id] || 'help';
                const weightPct = Math.round(pillar.weight * 100);

                return (
                  <div
                    key={pillar.id}
                    className="health-overview__pillar-card"
                    onClick={() => history.push(`/insights/health/${pillar.id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        history.push(`/insights/health/${pillar.id}`);
                      }
                    }}
                  >
                    <div
                      className="health-overview__pillar-icon-wrap"
                      style={{ background: `${ratingColor}1A` }}
                    >
                      <span
                        className="material-symbols-rounded"
                        style={{ color: ratingColor, fontSize: 22 }}
                        aria-hidden="true"
                      >
                        {iconName}
                      </span>
                    </div>

                    <div className="health-overview__pillar-info">
                      <span className="health-overview__pillar-name typo-callout-semibold color-primary">
                        {pillar.label}
                      </span>
                      <ProgressBar
                        value={pillar.score}
                        max={100}
                        color={ratingColor}
                        height={4}
                      />
                      <div className="health-overview__pillar-meta typo-footnote">
                        <span className="color-secondary">{pillar.score}/100</span>
                        <span style={{ color: trendColor }}>
                          {trendArrow}{' '}
                          {pillar.delta > 0 ? `+${pillar.delta}` : pillar.delta}
                        </span>
                      </div>
                    </div>

                    <div className="health-overview__pillar-right">
                      <span className="health-overview__weight-badge">
                        {weightPct}%
                      </span>
                      <svg
                        width="7"
                        height="12"
                        viewBox="0 0 7 12"
                        fill="none"
                        aria-hidden="true"
                      >
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
              })}
            </div>
          </SectionModule>

          {/* Section 3b: What's Driving Your Score */}
          <SectionModule title="What's driving your score">
            <div className="health-overview__rhythm-section card-raised">
              {!rhythmTarget ? (
                /* ── No rhythm set: teaser ── */
                <>
                  <p className="health-overview__rhythm-intro typo-callout-regular color-secondary">
                    Your spending rhythm influences 50% of your health score through
                    the Spending and Savings pillars.
                  </p>

                  <div className="health-overview__score-teaser">
                    <div className="health-overview__score-teaser-row">
                      <span className="typo-callout-semibold">{teaserImpact.currentScore}</span>
                      <span className="material-symbols-rounded" style={{ fontSize: 16, color: 'var(--pfm-text-tertiary)' }}>arrow_forward</span>
                      <span className="typo-callout-semibold" style={{ color: 'var(--pfm-status-success)' }}>
                        {teaserImpact.projectedScore}
                      </span>
                      <span className="typo-footnote" style={{ color: 'var(--pfm-status-success)' }}>
                        +{teaserImpact.delta} pts in ~{teaserImpact.timelineWeeks} weeks
                      </span>
                    </div>
                    <span className="typo-footnote color-tertiary">
                      Based on a Balanced (50/30/20) rhythm
                    </span>
                  </div>

                  {priorities.length > 0 && (
                    <div className="health-overview__stat-row">
                      <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--pfm-text-secondary)' }}>flag</span>
                      <span className="typo-footnote color-secondary">
                        {priorities.length} {priorities.length === 1 ? 'priority' : 'priorities'} set — {formatEuroShort(totalMonthlyContribution)}/mo needed
                      </span>
                    </div>
                  )}

                  <button
                    className="health-overview__rhythm-cta"
                    onClick={() => setRhythmModalOpen(true)}
                  >
                    Set your rhythm
                  </button>
                </>
              ) : (
                /* ── Rhythm active ── */
                <>
                  {/* Rhythm bar */}
                  <div className="health-overview__rhythm-active-header">
                    <span className="typo-footnote color-secondary" style={{ fontWeight: 600 }}>Your rhythm</span>
                    <span className="typo-footnote">
                      <span style={{ color: 'var(--pfm-pink-base)' }}>{rhythmTarget.needs}</span>
                      <span className="color-tertiary"> / </span>
                      <span style={{ color: 'var(--pfm-turquoise-strong)' }}>{rhythmTarget.wants}</span>
                      <span className="color-tertiary"> / </span>
                      <span style={{ color: 'var(--pfm-status-success)' }}>{rhythmTarget.growth}</span>
                    </span>
                  </div>
                  <div className="health-overview__rhythm-bar">
                    <div style={{ width: `${rhythmTarget.needs}%`, background: 'var(--pfm-pink-base)', height: 8, borderRadius: 2 }} />
                    <div style={{ width: `${rhythmTarget.wants}%`, background: 'var(--pfm-turquoise-strong)', height: 8, borderRadius: 2 }} />
                    <div style={{ width: `${rhythmTarget.growth}%`, background: 'var(--pfm-status-success)', height: 8, borderRadius: 2 }} />
                  </div>

                  {/* Score projection */}
                  {rhythmImpact && rhythmImpact.delta > 0 && (
                    <div className="health-overview__stat-row">
                      <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--pfm-status-success)' }}>trending_up</span>
                      <span className="typo-footnote color-secondary">
                        Score projection: {rhythmImpact.currentScore} → {rhythmImpact.projectedScore}{' '}
                        <span style={{ color: 'var(--pfm-status-success)', fontWeight: 600 }}>
                          (+{rhythmImpact.delta} pts in ~{rhythmImpact.timelineWeeks} weeks)
                        </span>
                      </span>
                    </div>
                  )}

                  {/* Pillar impacts */}
                  {rhythmImpact && rhythmImpact.pillarImpacts
                    .filter(p => p.delta > 0)
                    .map(p => (
                      <div key={p.pillarId} className="health-overview__stat-row health-overview__stat-row--indent">
                        <span className="typo-footnote color-tertiary">
                          {PILLAR_LABELS[p.pillarId]}: {p.currentScore} → {p.projectedScore} (+{p.delta})
                        </span>
                      </div>
                    ))
                  }

                  {/* Priorities summary */}
                  {priorities.length > 0 && (
                    <div className="health-overview__stat-row">
                      <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--pfm-text-secondary)' }}>flag</span>
                      <span className="typo-footnote color-secondary">
                        {priorities.length} {priorities.length === 1 ? 'priority' : 'priorities'}
                        {onTrackCount > 0 && <> · <span style={{ color: 'var(--pfm-status-success)' }}>{onTrackCount} on track</span></>}
                        {behindCount > 0 && <> · <span style={{ color: 'var(--pfm-status-warning, #F5A623)' }}>{behindCount} behind</span></>}
                        {' '}· {formatEuroShort(totalMonthlyContribution)}/mo
                      </span>
                    </div>
                  )}

                  <button
                    className="health-overview__rhythm-cta health-overview__rhythm-cta--ghost"
                    onClick={() => history.push('/insights?tab=plan')}
                  >
                    View & adjust in Plan
                  </button>
                </>
              )}
            </div>
          </SectionModule>

          {/* Section 4: Top Actions */}
          <SectionModule title="Top recommendations">
            <div className="health-overview__actions">
              {topActions.map((action) => (
                <SpotlightCard
                  key={action.id}
                  title={action.title}
                  description={action.description}
                  impact={action.estimatedPoints}
                  icon={action.icon}
                  accentColor={IMPACT_COLORS[action.impact] || '#295EFF'}
                />
              ))}
            </div>
          </SectionModule>

          {/* Section 5: How It Works */}
          <SectionModule title="How your score works">
            <div className="health-overview__explainer card-raised">
              <p className="typo-callout-regular color-secondary">
                Your health score is a weighted average of five financial
                pillars. Each pillar is scored 0–100 based on your real
                spending, saving, and debt data. Focus on the highest-weighted
                pillars for the biggest impact.
              </p>
              <div className="health-overview__weight-rows">
                {Object.entries(PILLAR_WEIGHTS).map(([key, weight]) => (
                  <div key={key} className="health-overview__weight-row">
                    <span className="health-overview__weight-label typo-footnote color-secondary">
                      {PILLAR_LABELS[key]}
                    </span>
                    <div style={{ flex: 1 }}>
                      <ProgressBar
                        value={weight * 100}
                        max={100}
                        color="var(--pfm-action-primary-bg)"
                        height={4}
                      />
                    </div>
                    <span className="health-overview__weight-pct typo-footnote">
                      {Math.round(weight * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </SectionModule>

          <div className="bottom-spacer" />
        </div>
      </IonContent>
      <TuneRhythmModal
        isOpen={rhythmModalOpen}
        onClose={() => setRhythmModalOpen(false)}
        onConfirm={handleRhythmConfirm}
        priorities={priorities}
      />
      <CoachSheet isOpen={coachOpen} onClose={() => setCoachOpen(false)} context="/insights/health" />
    </IonPage>
  );
};

export default HealthOverviewPage;
