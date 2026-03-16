import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import SectionModule from '../components/shared/SectionModule';
import HealthScoreRing from '../components/shared/HealthScoreRing';
import TrendLineChart from '../components/charts/TrendLineChart';
import { healthScoreData, nwgBreakdownData, cashflowData } from '../data/pfmData';
import { PILLAR_WEIGHTS, STRESS_FREE_RATINGS, STRESS_FREE_IMPACT, STRESS_FREE_TRENDS } from '../data/constants';
import { useDisplayMode } from '../hooks/useDisplayMode';
import type { PillarId } from '../data/types';
import './PillarDetailPage.css';

const RATING_COLORS: Record<string, string> = {
  excellent: 'var(--pfm-status-success-vivid)',
  good: 'var(--pfm-status-success-vivid)',
  building: '#F5A623',
  'needs-attention': '#E5553B',
};

const STATUS_COLORS: Record<string, string> = {
  ahead: 'var(--pfm-status-success-vivid)',
  'on-track': '#295EFF',
  behind: '#F5A623',
};

const IMPACT_FILL_COUNT: Record<string, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

const PILLAR_EXPLAINERS: Record<string, { description: string; factors: string[] }> = {
  spending: {
    description: 'Measures how well you stick to your budgets and control daily spending.',
    factors: ['Budget adherence across all categories', 'Adherence to your Needs/Lifestyle rhythm targets', 'Month-over-month spending changes'],
  },
  savings: {
    description: 'Tracks your savings rate and progress toward your financial goals.',
    factors: ['Savings rate vs. your rhythm\'s Saved target', 'Monthly contribution consistency', 'Goal completion progress'],
  },
  debt: {
    description: 'Evaluates your debt levels relative to income and credit limits.',
    factors: ['Debt-to-income ratio', 'Credit card utilisation', 'Payment consistency'],
  },
  buffer: {
    description: 'Assesses your financial safety net for unexpected expenses.',
    factors: ['Emergency fund runway (months of expenses)', 'Buffer balance vs. target', 'Irregular bill coverage'],
  },
  goals: {
    description: 'Reflects progress on your savings goals and financial milestones.',
    factors: ['Number of goals on track', 'Overall goal completion rate', 'Auto-transfer coverage'],
  },
};

const PillarDetailPage: React.FC = () => {
  const { pillarId } = useParams<{ pillarId: string }>();
  const history = useHistory();
  const { showPoints } = useDisplayMode();
  const handleBack = () => history.goBack();
  const pillar = healthScoreData.pillars.find(p => p.id === pillarId);
  const pillarHistory = healthScoreData.history.map(h => ({
    label: h.month.split(' ')[0],
    value: h.pillars[pillarId as PillarId],
  }));

  if (!pillar) {
    return (
      <IonPage>
        <ScreenHeader title="Pillar" showBack onBackAction={handleBack} />
        <IonContent className="page-content">
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--pfm-text-secondary)' }}>
            Pillar not found.
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const ratingColor = RATING_COLORS[pillar.rating] || 'var(--pfm-status-success-vivid)';
  const weight = PILLAR_WEIGHTS[pillar.id] ?? pillar.weight;
  const explainer = PILLAR_EXPLAINERS[pillar.id];

  const trendLabelPoints = pillar.trend === 'improving' ? 'Improving' : pillar.trend === 'declining' ? 'Declining' : 'Stable';
  const trendLabel = showPoints ? trendLabelPoints : (STRESS_FREE_TRENDS[pillar.trend] || trendLabelPoints);
  const trendArrow = pillar.trend === 'improving' ? 'trending_up' : pillar.trend === 'declining' ? 'trending_down' : 'trending_flat';

  return (
    <IonPage>
      <ScreenHeader title={pillar.label} showBack onBackAction={handleBack} />
      <IonContent className="page-content" fullscreen>
        <div style={{ paddingTop: 16 }}>

          {/* Section 1: Hero */}
          <div className="pillar-detail__hero">
            <HealthScoreRing score={pillar.score} rating={pillar.rating} delta={pillar.delta} />
            <div className={`pillar-detail__trend-badge pillar-detail__trend-badge--${pillar.trend}`}>
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>{trendArrow}</span>
              {trendLabel}
            </div>
          </div>

          {/* Section 2: Key Metrics */}
          <SectionModule title="Key metrics">
            <div className="pillar-detail__metrics">
              {pillar.metrics.map((metric, i) => (
                <div className="pillar-detail__metric-row" key={i}>
                  <div className="pillar-detail__metric-left">
                    <span className="pillar-detail__metric-label">{metric.label}</span>
                  </div>
                  <div className="pillar-detail__metric-value-row">
                    <span className="pillar-detail__metric-value">
                      {metric.value}
                      {metric.target && (
                        <span className="pillar-detail__metric-target"> of {metric.target}</span>
                      )}
                    </span>
                    <span
                      className="pillar-detail__status-dot"
                      style={{ backgroundColor: STATUS_COLORS[metric.status] || '#295EFF' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionModule>

          {/* Rhythm Impact — Spending pillar */}
          {pillarId === 'spending' && (
            <SectionModule title="Rhythm impact">
              <div
                className="pillar-detail__rhythm-card card-raised"
                style={{ borderLeftColor: ratingColor }}
              >
                <p className="pillar-detail__rhythm-title">How your rhythm affects this pillar</p>
                <p className="pillar-detail__rhythm-desc">
                  This pillar tracks how closely your actual spending matches your Needs/Lifestyle
                  targets. Keeping your Lifestyle spending at or below your rhythm target directly
                  improves this score.
                </p>

                <div className="pillar-detail__rhythm-actuals">
                  <span className="pillar-detail__rhythm-actuals-label">Current:</span>
                  <span>Needs {nwgBreakdownData.needs.percentage}%</span>
                  <span className="pillar-detail__rhythm-separator">|</span>
                  <span>Lifestyle {nwgBreakdownData.wants.percentage}%</span>
                </div>

                <div className="pillar-detail__rhythm-bars">
                  {/* Needs bar */}
                  <div className="pillar-detail__rhythm-bar-group">
                    <span className="pillar-detail__rhythm-bar-label">Needs</span>
                    <div className="pillar-detail__rhythm-bar-track">
                      <div
                        className="pillar-detail__rhythm-bar-fill pillar-detail__rhythm-bar-fill--actual"
                        style={{ width: `${nwgBreakdownData.needs.percentage}%` }}
                      />
                    </div>
                    <span className="pillar-detail__rhythm-bar-value">{nwgBreakdownData.needs.percentage}%</span>
                  </div>
                  {/* Lifestyle bar */}
                  <div className="pillar-detail__rhythm-bar-group">
                    <span className="pillar-detail__rhythm-bar-label">Lifestyle</span>
                    <div className="pillar-detail__rhythm-bar-track">
                      <div
                        className="pillar-detail__rhythm-bar-fill pillar-detail__rhythm-bar-fill--actual"
                        style={{ width: `${nwgBreakdownData.wants.percentage}%` }}
                      />
                    </div>
                    <span className="pillar-detail__rhythm-bar-value">{nwgBreakdownData.wants.percentage}%</span>
                  </div>
                </div>

                <p className="pillar-detail__rhythm-cta-hint typo-footnote color-tertiary">
                  Set a spending rhythm to see your targets here
                </p>
              </div>
            </SectionModule>
          )}

          {/* Rhythm Impact — Savings pillar */}
          {pillarId === 'savings' && (
            <SectionModule title="Rhythm impact">
              <div
                className="pillar-detail__rhythm-card card-raised"
                style={{ borderLeftColor: ratingColor }}
              >
                <p className="pillar-detail__rhythm-title">How your rhythm affects this pillar</p>
                <p className="pillar-detail__rhythm-desc">
                  This pillar measures your savings rate against your growth target. Increasing
                  your Saved percentage in your rhythm directly boosts this score.
                </p>

                <div className="pillar-detail__rhythm-actuals">
                  <span className="pillar-detail__rhythm-actuals-label">Current savings rate:</span>
                  <span>
                    {cashflowData.received > 0
                      ? `${Math.round((nwgBreakdownData.growth.amount / cashflowData.received) * 100)}% of income`
                      : '—'}
                  </span>
                </div>

                <p className="pillar-detail__rhythm-cta-hint typo-footnote color-tertiary">
                  {showPoints
                    ? 'Set a spending rhythm to see how closing the gap could add up to +15 points'
                    : 'Set a spending rhythm to see how closing the gap could improve your rating'}
                </p>
              </div>
            </SectionModule>
          )}

          {/* Section 3: 6-Month Trend */}
          <SectionModule title="6-month trend">
            <TrendLineChart
              data={pillarHistory}
              lineColor={ratingColor}
              showValues
            />
          </SectionModule>

          {/* Section 4: Actions to Improve */}
          <SectionModule title="Actions to improve">
            {pillar.actions.map(action => {
              const fillCount = IMPACT_FILL_COUNT[action.impact] ?? 1;
              const impactColor = action.impact === 'high' ? 'var(--pfm-status-success-vivid)' : action.impact === 'medium' ? 'var(--pfm-status-warning)' : 'var(--pfm-palette-blue-strong)';

              return (
                <div className="pillar-detail__action-card card-bordered" key={action.id}>
                  <div className="pillar-detail__action-icon">
                    <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--pfm-text-secondary)' }}>
                      {action.icon}
                    </span>
                  </div>
                  <div className="pillar-detail__action-info">
                    <span className="pillar-detail__action-title">{action.title}</span>
                    <span className="pillar-detail__action-desc">{action.description}</span>
                  </div>
                  <div className="pillar-detail__action-right">
                    <span
                      className={`pillar-detail__impact-badge pillar-detail__impact-badge--${action.impact}`}
                    >
                      {showPoints ? `+${action.estimatedPoints} pts` : STRESS_FREE_IMPACT[action.impact] || action.impact}
                    </span>
                    <div className="pillar-detail__impact-dots">
                      {[0, 1, 2].map(dotIdx => (
                        <span
                          key={dotIdx}
                          className="pillar-detail__impact-dot"
                          style={{
                            backgroundColor: dotIdx < fillCount ? impactColor : 'var(--pfm-divider-default)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </SectionModule>

          {/* Section 5: How This is Calculated */}
          {explainer && (
            <SectionModule title="How this is calculated">
              <div className="pillar-detail__calc card-raised">
                <p className="pillar-detail__calc-desc">{explainer.description}</p>
                {showPoints && (
                  <p className="pillar-detail__calc-weight">
                    Weight: {Math.round(weight * 100)}% of your overall score
                  </p>
                )}
                <div className="pillar-detail__factors">
                  <span className="pillar-detail__factors-label">Factors:</span>
                  {explainer.factors.map((factor, i) => (
                    <div className="pillar-detail__factor" key={i}>
                      <span className="pillar-detail__factor-dot" />
                      <span>{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionModule>
          )}

          <div className="bottom-spacer" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PillarDetailPage;
