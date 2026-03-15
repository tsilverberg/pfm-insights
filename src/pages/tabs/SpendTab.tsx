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
import './SpendTab.css';

const SpendTab: React.FC = () => {
  const history = useHistory();
  const monthNav = useMonthNavigation();
  const { showToast } = useToast();
  const [showCoach, setShowCoach] = useState(true);

  return (
    <div>
      {/* Month Picker */}
      <div className="goals__month-picker">
        <MonthPicker month={monthNav.month} year={monthNav.year} onPrev={monthNav.goPrev} onNext={monthNav.goNext} />
      </div>

      {/* NWG Breakdown */}
      <SectionModule title="Spending breakdown">
        <NwgBreakdownBar
          needs={nwgBreakdownData.needs}
          wants={nwgBreakdownData.wants}
          growth={nwgBreakdownData.growth}
          onSegmentTap={(type) => history.push(`/insights/nwg/${type}`)}
        />
      </SectionModule>

      {/* Top Categories */}
      <SectionModule title="Top categories">
        <div className="spend__top-categories">
          {topSpendingData.map((cat) => (
            <div key={cat.id} className="spend__top-cat-row" onClick={() => history.push(`/insights/category/${cat.name}`)} style={{ cursor: 'pointer' }}>
              <span className="spend__top-cat-icon">{cat.icon}</span>
              <div className="spend__top-cat-info">
                <span className="typo-callout-regular">{cat.name}</span>
                <ProgressBar value={cat.percentage} max={100} color="var(--pfm-action-primary-bg)" height={4} />
              </div>
              <span className="typo-callout-semibold">{formatEuro(cat.amount)}</span>
              <span className="material-symbols-rounded color-tertiary" style={{ fontSize: 18 }}>chevron_right</span>
            </div>
          ))}
        </div>
      </SectionModule>

      {/* Coach Nudge */}
      {showCoach && (
        <SectionModule title="">
          <CoachMomentCard
            title="Over budget on wants"
            body="You've exceeded your wants budget by €150. Consider moving some dining expenses to next month."
            ctaLabel="Move money now"
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
