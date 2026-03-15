import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SectionModule from '../../components/shared/SectionModule';
import MonthPicker from '../../components/shared/MonthPicker';
import ProgressBar from '../../components/shared/ProgressBar';
import CoachMomentCard from '../../components/shared/CoachMomentCard';
import NwgBreakdownBar from '../../components/shared/NwgBreakdownBar';
import { useMonthNavigation } from '../../hooks/useMonthNavigation';
import { useToast } from '../../hooks/useToast';
import { formatEuro } from '../../data/formatters';
import { nwgBreakdownData, topSpendingData } from '../../data/pfmData';
import { monthlyNwgData, monthlyTopSpending } from '../../data/mockData';
import { coachNudges } from '../../data/coachData';
import './SpendTab.css';

const SpendTab: React.FC = () => {
  const history = useHistory();
  const monthNav = useMonthNavigation();
  const { showToast } = useToast();
  const [showCoach, setShowCoach] = useState(true);

  const nudge = coachNudges.find(n => n.tab === 'spend');
  const monthKey = String(monthNav.monthIndex);
  const nwg = monthlyNwgData[monthKey] || nwgBreakdownData;
  const topCats = monthlyTopSpending[monthKey] || topSpendingData;

  return (
    <div>
      {/* Month Picker */}
      <div className="goals__month-picker">
        <MonthPicker month={monthNav.month} year={monthNav.year} onPrev={monthNav.canGoPrev ? monthNav.goPrev : undefined} onNext={monthNav.canGoNext ? monthNav.goNext : undefined} />
      </div>

      {/* NWG Breakdown */}
      <SectionModule title="Spending breakdown">
        <NwgBreakdownBar
          needs={nwg.needs}
          wants={nwg.wants}
          growth={nwg.growth}
          onSegmentTap={(type) => history.push(`/insights/nwg/${type}`)}
        />
      </SectionModule>

      {/* Top Categories */}
      <SectionModule title="Top categories">
        <div className="spend__top-categories">
          {topCats.map((cat) => (
            <div key={cat.id} className="spend__top-cat-row" onClick={() => history.push(`/insights/category/${cat.name}`)} style={{ cursor: 'pointer' }}>
              <span className="spend__top-cat-icon">{cat.icon}</span>
              <div className="spend__top-cat-info">
                <span className="typo-callout-regular">{cat.name}</span>
                <ProgressBar value={cat.percentage} max={100} color="var(--pfm-action-primary-bg)" height={4} />
              </div>
              <span className="typo-callout-semibold">{formatEuro(cat.amount)}</span>
              <span className="material-symbols-rounded color-tertiary" style={{ fontSize: 20 }}>chevron_right</span>
            </div>
          ))}
        </div>
      </SectionModule>

      {/* Coach Nudge */}
      {showCoach && nudge && (
        <SectionModule title="">
          <CoachMomentCard
            title={nudge.title}
            body={nudge.body}
            ctaLabel={nudge.ctaLabel}
            onCta={() => showToast({ type: 'info', message: 'Transfer feature coming soon' })}
            isAction
            onClose={() => setShowCoach(false)}
          />
        </SectionModule>
      )}
    </div>
  );
};

export default SpendTab;
