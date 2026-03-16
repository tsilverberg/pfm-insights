import React from 'react';
import { formatEuroShort } from '../../data/formatters';
import './PrioritySummaryBar.css';

interface PrioritySummaryBarProps {
  totalMonthlyContribution: number;
  monthlyGrowthBudget: number;
  requiredGrowthPct: number;
  currentGrowthPct: number;
}

const PrioritySummaryBar: React.FC<PrioritySummaryBarProps> = ({
  totalMonthlyContribution,
  monthlyGrowthBudget,
  requiredGrowthPct,
  currentGrowthPct,
}) => {
  const isCovered = monthlyGrowthBudget >= totalMonthlyContribution && currentGrowthPct >= requiredGrowthPct;

  return (
    <div className="priority-summary">
      <div className="priority-summary__line1">
        <span className="typo-callout-regular color-secondary">Your priorities need </span>
        <span className="typo-callout-semibold">{formatEuroShort(totalMonthlyContribution)}/mo</span>
      </div>
      <div className="priority-summary__line2">
        {isCovered ? (
          <span className="typo-footnote priority-summary__covered">
            Allocated: {formatEuroShort(totalMonthlyContribution)} of {formatEuroShort(monthlyGrowthBudget)} Saved budget
          </span>
        ) : (
          <span className="typo-footnote priority-summary__warning">
            Your rhythm needs {requiredGrowthPct}% Saved to fund these
          </span>
        )}
      </div>
    </div>
  );
};

export default PrioritySummaryBar;
