import React, { useState, useRef, useCallback, lazy, Suspense } from 'react';
import { IonContent, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import SkeletonLoader from '../components/shared/SkeletonLoader';

const PortfolioLineChart = lazy(() => import('../components/charts/PortfolioLineChart'));
import PortfolioListItem from '../components/shared/PortfolioListItem';
import InvestActivityItem from '../components/shared/InvestActivityItem';
import GeographyRow from '../components/shared/GeographyRow';
import NewsCard from '../components/shared/NewsCard';
import SegmentedBar from '../components/shared/SegmentedBar';
import DottedLeaderRow from '../components/shared/DottedLeaderRow';
import DotIndicator from '../components/shared/DotIndicator';
import CoachIcon from '../components/shared/CoachIcon';
import CoachSheet from '../components/shared/CoachSheet';
import AnimatedNumber from '../components/shared/AnimatedNumber';
import { useToast } from '../hooks/useToast';
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
  const [coachOpen, setCoachOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const revealRef = useScrollReveal();
  const history = useHistory();
  const { showToast } = useToast();

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
        titleFont: { family: 'Lato', size: 11, weight: 400 as const },
        bodyFont: { family: 'Lato', size: 12, weight: 600 as const },
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

  const headerActions = [
    { label: 'Cards', icon: <span className="material-symbols-rounded" style={{ fontSize: 22 }}>credit_card</span>, onClick: () => history.push('/cards') },
    { label: 'Coach', icon: <CoachIcon size={22} />, onClick: () => setCoachOpen(true) },
  ];

  return (
    <IonPage>
      <AppHeader title="Invest" actions={headerActions} />
      <IonContent className="page-content">
        <IonRefresher slot="fixed" onIonRefresh={(e) => setTimeout(() => e.detail.complete(), 800)}>
          <IonRefresherContent />
        </IonRefresher>
        <div ref={revealRef}>

          {/* Balance Hero */}
          <div className="invest-section">
            <div className="invest-hero">
              <div className={`invest-hero__change ${isNegative ? 'invest-hero__change--negative' : 'invest-hero__change--positive'}`}>
                <span>€{Math.abs(investSummary.change).toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (</span>
                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
                  {isNegative ? 'arrow_downward' : 'arrow_upward'}
                </span>
                <span>{isNegative ? '' : '+'}{investSummary.changePercent.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%)</span>
              </div>
              <div className="invest-hero__total">
                <AnimatedNumber value={investSummary.totalValue} prefix="€" decimals={2} duration={1000} />
              </div>
              <div className="invest-hero__label">Total available</div>
            </div>
          </div>

          {/* Customize Dashboard Button */}
          <div className="invest-section">
            <button className="invest-customize-btn" onClick={() => showToast({ type: 'info', message: 'Dashboard customization coming soon' })}>
              <span className="material-symbols-rounded" style={{ fontSize: 24 }}>settings</span>
              Customize dashboard
            </button>
          </div>

          {/* Value Over Time */}
          <div className="invest-section">
            <h2 className="invest-section__title">Total value</h2>
            <Suspense fallback={<SkeletonLoader variant="chart" />}>
              <PortfolioLineChart data={investValueOverTime[activePeriod]} />
            </Suspense>
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
          <div className="invest-section reveal">
            <h2 className="invest-section__title">Portfolios</h2>
            <div className="flex-col" style={{ gap: 24 }}>
              {investPortfolios.map((portfolio) => (
                <PortfolioListItem key={portfolio.id} portfolio={portfolio} onClick={() => showToast({ type: 'info', message: `${portfolio.name} details coming soon` })} />
              ))}
            </div>
          </div>

          {/* Allocation by Type (Donut) */}
          <div className="invest-section reveal">
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
          <div className="invest-section reveal">
            <h2 className="invest-section__title">Total allocation by sector</h2>
            <SegmentedBar
              segments={investAllocationBySector.map((s) => ({ value: s.percentage, color: s.color }))}
            />
            <div className="flex-col gap-8 mt-16">
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
          <div className="invest-section reveal">
            <h2 className="invest-section__title">Latest activity</h2>
            <div className="invest-activity-list">
              {investLatestActivity.map((activity) => (
                <InvestActivityItem key={activity.id} activity={activity} onClick={() => showToast({ type: 'info', message: `${activity.title} details coming soon` })} />
              ))}
            </div>
          </div>

          {/* Allocation by Geography */}
          <div className="invest-section reveal">
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
                <NewsCard key={article.id} article={article} onReadMore={() => showToast({ type: 'info', message: 'Full article coming soon' })} />
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <DotIndicator count={investLatestNews.length} active={activeNewsIndex} />
            </div>
          </div>

          <div className="bottom-spacer" />
        </div>
      </IonContent>
      <CoachSheet isOpen={coachOpen} onClose={() => setCoachOpen(false)} context="/invest" />
    </IonPage>
  );
};

export default InvestPage;
