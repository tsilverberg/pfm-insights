import React, { useState, useRef, useCallback } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PortfolioLineChart from '../components/charts/PortfolioLineChart';
import PortfolioListItem from '../components/shared/PortfolioListItem';
import InvestActivityItem from '../components/shared/InvestActivityItem';
import GeographyRow from '../components/shared/GeographyRow';
import NewsCard from '../components/shared/NewsCard';
import SegmentedBar from '../components/shared/SegmentedBar';
import DottedLeaderRow from '../components/shared/DottedLeaderRow';
import DotIndicator from '../components/shared/DotIndicator';
import { formatEuro, formatPercent } from '../data/formatters';
import {
  investSummary,
  investValueOverTime,
  investPortfolios,
  investAllocationByType,
  investAllocationBySector,
  investAllocationByGeography,
  investLatestActivity,
  investLatestNews,
} from '../data/mockData';
import './InvestPage.css';

ChartJS.register(ArcElement, Tooltip);

const TIME_PERIODS = ['1M', '3M', '6M', '12M', 'YTD', 'All'];

const InvestPage: React.FC = () => {
  const [activePeriod, setActivePeriod] = useState('All');
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleNewsScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = 280 + 16;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveNewsIndex(Math.min(index, investLatestNews.length - 1));
  }, []);

  const isNegative = investSummary.change < 0;

  const donutData = {
    labels: investAllocationByType.map((s) => s.label),
    datasets: [{
      data: investAllocationByType.map((s) => s.percentage),
      backgroundColor: investAllocationByType.map((s) => s.color),
      borderWidth: 0,
      cutout: '65%',
    }],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        backgroundColor: '#061223',
        titleFont: { family: 'Libre Franklin', size: 11, weight: 400 as const },
        bodyFont: { family: 'Libre Franklin', size: 12, weight: 600 as const },
        padding: 8,
        cornerRadius: 4,
        callbacks: {
          label: (ctx: { label?: string; parsed: number }) => {
            const seg = investAllocationByType[ctx.parsed !== undefined ? investAllocationByType.findIndex(s => s.label === ctx.label) : 0];
            return seg ? `${ctx.label}: ${formatEuro(seg.value)} (${formatPercent(seg.percentage)})` : '';
          },
        },
      },
      legend: { display: false },
    },
  };

  return (
    <IonPage>
      <IonContent className="page-content">
        <div style={{ paddingTop: 54 }}>
          {/* Header */}
          <div style={{ padding: '0 var(--pfm-page-padding)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 className="typo-title2-semibold" style={{ margin: 0 }}>Invest</h1>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="icon-button" aria-label="Cards">
                <span className="material-symbols-rounded">credit_card</span>
              </button>
              <button className="icon-button" aria-label="Settings">
                <span className="material-symbols-rounded">settings</span>
              </button>
            </div>
          </div>

          {/* Balance Hero */}
          <div className="invest-section">
            <div className="invest-hero">
              <div className={`invest-hero__change ${isNegative ? 'invest-hero__change--negative' : 'invest-hero__change--positive'}`}>
                <span>€{Math.abs(investSummary.change).toFixed(2)} (</span>
                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
                  {isNegative ? 'arrow_downward' : 'arrow_upward'}
                </span>
                <span>{isNegative ? '' : '+'}{investSummary.changePercent.toFixed(2)}%)</span>
              </div>
              <div className="invest-hero__total">
                € {new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(investSummary.totalValue)}
              </div>
              <div className="invest-hero__label">Total available</div>
            </div>
          </div>

          {/* Customize Dashboard Button */}
          <div className="invest-section">
            <button className="invest-customize-btn">
              <span className="material-symbols-rounded" style={{ fontSize: 24 }}>settings</span>
              Customize dashboard
            </button>
          </div>

          {/* Value Over Time */}
          <div className="invest-section">
            <h2 className="invest-section__title">Total value</h2>
            <PortfolioLineChart data={investValueOverTime[activePeriod]} />
            <div className="invest-time-pills">
              <div className="invest-time-pills__bar">
                {TIME_PERIODS.map((period) => (
                  <button
                    key={period}
                    className={`invest-time-pill ${activePeriod === period ? 'invest-time-pill--active' : ''}`}
                    onClick={() => setActivePeriod(period)}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolios */}
          <div className="invest-section">
            <h2 className="invest-section__title">Portfolios</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {investPortfolios.map((portfolio) => (
                <PortfolioListItem key={portfolio.id} portfolio={portfolio} />
              ))}
            </div>
          </div>

          {/* Allocation by Type (Donut) */}
          <div className="invest-section">
            <h2 className="invest-section__title">Total allocation by type</h2>
            <div className="invest-donut-wrapper">
              <div className="invest-donut-chart">
                <Doughnut data={donutData} options={donutOptions} />
              </div>
            </div>
            <div className="invest-allocation-legend">
              {investAllocationByType.map((seg) => (
                <div key={seg.label} className="invest-allocation-row">
                  <div className="invest-allocation-row__label">
                    <div className="invest-allocation-row__dot" style={{ backgroundColor: seg.color }} />
                    <span className="typo-callout-regular">{seg.label}</span>
                  </div>
                  <span className="typo-callout-regular">
                    {formatEuro(seg.value)} ({formatPercent(seg.percentage)})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Allocation by Sector (Stacked Bar) */}
          <div className="invest-section">
            <h2 className="invest-section__title">Total allocation by sector</h2>
            <SegmentedBar
              segments={investAllocationBySector.map((s) => ({ value: s.percentage, color: s.color }))}
            />
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {investAllocationBySector.map((seg) => (
                <DottedLeaderRow
                  key={seg.label}
                  label={seg.label}
                  value={`${formatEuro(seg.value)} (${formatPercent(seg.percentage)})`}
                  dotColor={seg.color}
                />
              ))}
            </div>
          </div>

          {/* Latest Activity */}
          <div className="invest-section">
            <h2 className="invest-section__title">Latest activity</h2>
            <div className="invest-activity-list">
              {investLatestActivity.map((activity) => (
                <InvestActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>

          {/* Allocation by Geography */}
          <div className="invest-section">
            <h2 className="invest-section__title">Allocation by geography</h2>
            <div className="invest-geography-list">
              {investAllocationByGeography.map((geo) => (
                <GeographyRow
                  key={geo.country}
                  country={geo.country}
                  flagEmoji={geo.flagEmoji}
                  value={geo.value}
                  percentage={geo.percentage}
                  color={geo.color}
                />
              ))}
            </div>
          </div>

          {/* Latest News */}
          <div className="invest-news-section">
            <h2 className="invest-section__title">Latest news</h2>
            <div
              ref={carouselRef}
              className="invest-news-carousel"
              onScroll={handleNewsScroll}
            >
              {investLatestNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <DotIndicator count={investLatestNews.length} active={activeNewsIndex} />
            </div>
          </div>

          <div style={{ height: 120 }} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default InvestPage;
