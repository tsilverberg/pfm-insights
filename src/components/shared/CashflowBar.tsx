import React from 'react';
import { formatEuro } from '../../data/formatters';
import './CashflowBar.css';

interface CashflowBarProps {
  received: number;
  spent: number;
  upcoming: number;
}

const CashflowBar: React.FC<CashflowBarProps> = ({ received, spent, upcoming }) => {
  const total = received + spent + upcoming;
  const receivedPct = total > 0 ? (received / total) * 100 : 0;
  const spentPct = total > 0 ? (spent / total) * 100 : 0;
  const upcomingPct = total > 0 ? (upcoming / total) * 100 : 0;

  return (
    <div className="cashflow-bar">
      <div
        className="cashflow-bar__track"
        role="img"
        aria-label={`Cashflow: ${formatEuro(received)} received, ${formatEuro(spent)} spent, ${formatEuro(upcoming)} upcoming`}
      >
        <div
          className="cashflow-bar__segment cashflow-bar__segment--received"
          style={{ width: `${receivedPct}%` }}
        />
        <div
          className="cashflow-bar__segment cashflow-bar__segment--spent"
          style={{ width: `${spentPct}%` }}
        />
        <div
          className="cashflow-bar__segment cashflow-bar__segment--upcoming"
          style={{ width: `${upcomingPct}%` }}
        />
      </div>
      <div className="cashflow-bar__legend">
        <div className="cashflow-bar__legend-item">
          <span className="cashflow-bar__legend-label">
            <span className="cashflow-bar__dot cashflow-bar__dot--received" />
            Received
          </span>
          <span className="cashflow-bar__legend-amount">{formatEuro(received)}</span>
        </div>
        <div className="cashflow-bar__legend-item">
          <span className="cashflow-bar__legend-label">
            <span className="cashflow-bar__dot cashflow-bar__dot--spent" />
            Spent
          </span>
          <span className="cashflow-bar__legend-amount">{formatEuro(spent)}</span>
        </div>
        <div className="cashflow-bar__legend-item">
          <span className="cashflow-bar__legend-label">
            <span className="cashflow-bar__dot cashflow-bar__dot--upcoming" />
            Upcoming
          </span>
          <span className="cashflow-bar__legend-amount">{formatEuro(upcoming)}</span>
        </div>
      </div>
    </div>
  );
};

export default CashflowBar;
