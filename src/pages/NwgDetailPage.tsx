import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import ProgressBar from '../components/shared/ProgressBar';
import SectionModule from '../components/shared/SectionModule';
import { getCategoriesByNwgType, getNwgTotals } from '../data/pfmData';
import { formatEuro } from '../data/formatters';
import { NWG_COLORS, NWG_LABELS, BUDGET_THRESHOLD_DANGER } from '../data/constants';
import type { NwgType } from '../data/types';
import './NwgDetailPage.css';

const NWG_RAW_COLORS: Record<string, string> = {
  need: 'var(--pfm-pink-base)',
  want: 'var(--pfm-turquoise-extra-strong)',
  growth: 'var(--pfm-green-strong)',
};

const NWG_ICON_BG: Record<string, string> = {
  need: 'rgba(237, 94, 166, 0.10)',
  want: 'rgba(58, 140, 140, 0.10)',
  growth: 'rgba(10, 90, 43, 0.10)',
};

const NwgDetailPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const history = useHistory();

  const nwgType = type as NwgType;
  const title = NWG_LABELS[nwgType] || 'Details';
  const color = NWG_RAW_COLORS[nwgType] || '#666';
  const iconBg = NWG_ICON_BG[nwgType] || 'rgba(0,0,0,0.06)';

  const totals = getNwgTotals();
  const typeAmountMap: Record<string, number> = {
    need: totals.needs,
    want: totals.wants,
    growth: totals.growth,
  };
  const typeAmount = typeAmountMap[nwgType] || 0;
  const percentage = totals.total > 0 ? Math.round((typeAmount / totals.total) * 100) : 0;

  const categories = getCategoriesByNwgType(nwgType);
  const totalCategorySpend = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <IonPage>
      <ScreenHeader title={title} onBackAction={() => history.push('/insights')} />
      <IonContent className="page-content">
        <div className="nwg-detail">

          {/* Summary Card */}
          <div className="nwg-detail__summary">
            <div className="nwg-detail__summary-amount">{formatEuro(typeAmount)}</div>
            <div className="nwg-detail__summary-label">
              {percentage}% of total spending
            </div>
            <div className="nwg-detail__summary-bar">
              <ProgressBar value={percentage} max={100} color={color} height={4} />
            </div>
          </div>

          {/* Category List */}
          <SectionModule title="Categories">
            <div className="nwg-detail__category-list">
              {categories.map((cat) => {
                const hasBudget = cat.limit != null && cat.limit > 0;
                const ratio = hasBudget ? cat.amount / cat.limit! : 0;
                const isOverBudget = hasBudget && ratio >= BUDGET_THRESHOLD_DANGER;
                const txCount = cat.txCount;

                return (
                  <div
                    key={cat.id}
                    className="nwg-detail__category-row"
                    onClick={() => history.push(`/insights/category/${cat.name}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        history.push(`/insights/category/${cat.name}`);
                      }
                    }}
                  >
                    <div
                      className="nwg-detail__category-icon"
                      style={{ background: iconBg }}
                    >
                      {cat.icon}
                    </div>

                    <div className="nwg-detail__category-info">
                      <div className="nwg-detail__category-name-row">
                        <span className="nwg-detail__category-name">{cat.name}</span>
                        {isOverBudget && (
                          <span className="nwg-detail__warning">Over budget</span>
                        )}
                      </div>

                      {hasBudget ? (
                        <>
                          <div className="nwg-detail__category-progress">
                            <ProgressBar
                              value={cat.amount}
                              max={cat.limit!}
                              color={isOverBudget ? '#E5553B' : color}
                              height={4}
                            />
                          </div>
                          <div className="nwg-detail__category-meta">
                            <span>
                              {formatEuro(cat.amount)} of {formatEuro(cat.limit!)}
                            </span>
                            <span className="nwg-detail__category-tx-count">
                              {txCount} transaction{txCount !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="nwg-detail__category-meta">
                          <span>{formatEuro(cat.amount)} spent</span>
                          <span className="nwg-detail__category-tx-count">
                            {txCount} transaction{txCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="nwg-detail__category-amount">
                      <span className="nwg-detail__category-amount-value">
                        {formatEuro(cat.amount)}
                      </span>
                      <svg
                        className="nwg-detail__chevron"
                        width="7"
                        height="12"
                        viewBox="0 0 7 12"
                        fill="none"
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

          {/* Total Row */}
          <div className="nwg-detail__total-row">
            <span className="nwg-detail__total-label">Total</span>
            <span className="nwg-detail__total-amount">{formatEuro(totalCategorySpend)}</span>
          </div>

          <div className="bottom-spacer" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NwgDetailPage;
