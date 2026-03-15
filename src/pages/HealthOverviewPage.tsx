import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import SectionModule from '../components/shared/SectionModule';
import ProgressBar from '../components/shared/ProgressBar';
import HealthScoreRing from '../components/shared/HealthScoreRing';
import SpotlightCard from '../components/shared/SpotlightCard';
import TrendLineChart from '../components/charts/TrendLineChart';
import { healthScoreData } from '../data/pfmData';
import { PILLAR_WEIGHTS, PILLAR_LABELS } from '../data/constants';
import type { PillarScore, ImprovementAction } from '../data/types';
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
  good: '#295EFF',
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
  const handleBack = () => history.push('/insights');

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
              style={{ color: RATING_COLORS[healthScoreData.rating] || '#295EFF' }}
            >
              Your financial health is{' '}
              {healthScoreData.rating.replace(/-/g, ' ')}
            </p>
            <p className="health-overview__hero-updated typo-footnote color-tertiary">
              Updated {healthScoreData.lastUpdated}
            </p>
          </div>

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

          {/* Section 3b: Rhythm & Score Connection */}
          <SectionModule title="Your rhythm & your score">
            <div className="health-overview__rhythm-section card-raised">
              <p className="health-overview__rhythm-intro typo-callout-regular color-secondary">
                Your spending rhythm directly influences 50% of your health score
                through the Spending and Savings pillars.
              </p>

              <div className="health-overview__rhythm-rows">
                <div className="health-overview__rhythm-row">
                  <span className="material-symbols-rounded health-overview__rhythm-icon" aria-hidden="true">
                    shopping_cart
                  </span>
                  <div className="health-overview__rhythm-row-text">
                    <span className="typo-callout-semibold color-primary">Spending control (25%)</span>
                    <span className="typo-footnote color-secondary">
                      How well your Needs and Lifestyle spending match your targets
                    </span>
                  </div>
                </div>
                <div className="health-overview__rhythm-row">
                  <span className="material-symbols-rounded health-overview__rhythm-icon" aria-hidden="true">
                    savings
                  </span>
                  <div className="health-overview__rhythm-row-text">
                    <span className="typo-callout-semibold color-primary">Savings rate (25%)</span>
                    <span className="typo-footnote color-secondary">
                      How close your actual savings rate is to your growth target
                    </span>
                  </div>
                </div>
              </div>

              <div className="health-overview__rhythm-prompt">
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--pfm-action-primary-bg)' }} aria-hidden="true">
                  tune
                </span>
                <span className="typo-footnote color-secondary">
                  Set a spending rhythm to unlock personalised score improvement projections
                </span>
              </div>

              <button
                className="health-overview__rhythm-cta"
                onClick={() => {
                  // Navigate to Plan tab — use tab switch via Ionic router
                  const planTab = document.querySelector('ion-tab-button[tab="plan"]') as HTMLElement | null;
                  if (planTab) planTab.click();
                }}
              >
                Set your rhythm
              </button>
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
    </IonPage>
  );
};

export default HealthOverviewPage;
