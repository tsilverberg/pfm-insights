import React from 'react';
import { formatEuro } from '../../data/formatters';
import './CashflowSummary.css';

interface CashflowSummaryProps {
  received: number;
  spent: number;
  upcoming: number;
}

const CashflowSummary: React.FC<CashflowSummaryProps> = ({ received, spent, upcoming }) => {
  const total = received + spent + upcoming;
  const remaining = received - spent - upcoming;

  const receivedPct = total > 0 ? (received / total) * 100 : 0;
  const spentPct = total > 0 ? (spent / total) * 100 : 0;
  const upcomingPct = total > 0 ? (upcoming / total) * 100 : 0;

  return (
    <div className="cashflow-summary">
      <div className="cashflow-summary__stats">
        <div className="cashflow-summary__stat cashflow-summary__stat--received">
          <div className="cashflow-summary__label">Received</div>
          <div className="cashflow-summary__amount">{formatEuro(received)}</div>
        </div>
        <div className="cashflow-summary__stat cashflow-summary__stat--spent">
          <div className="cashflow-summary__label">Spent</div>
          <div className="cashflow-summary__amount">{formatEuro(spent)}</div>
        </div>
        <div className="cashflow-summary__stat cashflow-summary__stat--upcoming">
          <div className="cashflow-summary__label">Upcoming</div>
          <div className="cashflow-summary__amount">{formatEuro(upcoming)}</div>
        </div>
      </div>

      <div className="cashflow-summary__bar">
        {receivedPct > 0 && (
          <div
            className="cashflow-summary__bar-segment cashflow-summary__bar-segment--received"
            style={{ width: `${receivedPct}%` }}
          />
        )}
        {spentPct > 0 && (
          <div
            className="cashflow-summary__bar-segment cashflow-summary__bar-segment--spent"
            style={{ width: `${spentPct}%` }}
          />
        )}
        {upcomingPct > 0 && (
          <div
            className="cashflow-summary__bar-segment cashflow-summary__bar-segment--upcoming"
            style={{ width: `${upcomingPct}%` }}
          />
        )}
      </div>

      <div className="cashflow-summary__remaining">
        {formatEuro(remaining)} remaining
      </div>
    </div>
  );
};

export default CashflowSummary;
