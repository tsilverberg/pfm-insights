import React from 'react';
import { formatEuro } from '../../data/formatters';
import './NwgBreakdownBar.css';

interface NwgSegment {
  amount: number;
  percentage: number;
}

interface NwgBreakdownBarProps {
  needs: NwgSegment;
  wants: NwgSegment;
  growth: NwgSegment;
  onSegmentTap?: (type: 'need' | 'want' | 'growth') => void;
}

const NwgBreakdownBar: React.FC<NwgBreakdownBarProps> = ({ needs, wants, growth, onSegmentTap }) => {
  return (
    <div className="nwg-breakdown">
      <div
        className="nwg-breakdown__track"
        role="img"
        aria-label={`Spending split: Needs ${needs.percentage}%, Lifestyle ${wants.percentage}%, Saved ${growth.percentage}%`}
      >
        <div
          className="nwg-breakdown__segment nwg-breakdown__segment--needs"
          style={{ width: `${needs.percentage}%` }}
        />
        <div
          className="nwg-breakdown__segment nwg-breakdown__segment--wants"
          style={{ width: `${wants.percentage}%` }}
        />
        <div
          className="nwg-breakdown__segment nwg-breakdown__segment--growth"
          style={{ width: `${growth.percentage}%` }}
        />
      </div>
      <div className="nwg-breakdown__labels">
        <button
          className="nwg-breakdown__label"
          onClick={() => onSegmentTap?.('need')}
          aria-label={`Needs: ${needs.percentage}%, ${formatEuro(needs.amount)}`}
        >
          <span className="nwg-breakdown__label-header">
            <span className="nwg-breakdown__dot nwg-breakdown__dot--needs" />
            <span className="nwg-breakdown__label-name">Needs</span>
          </span>
          <span className="nwg-breakdown__label-pct">{needs.percentage}%</span>
          <span className="nwg-breakdown__label-amount">{formatEuro(needs.amount)}</span>
        </button>
        <button
          className="nwg-breakdown__label"
          onClick={() => onSegmentTap?.('want')}
          aria-label={`Lifestyle: ${wants.percentage}%, ${formatEuro(wants.amount)}`}
        >
          <span className="nwg-breakdown__label-header">
            <span className="nwg-breakdown__dot nwg-breakdown__dot--wants" />
            <span className="nwg-breakdown__label-name">Lifestyle</span>
          </span>
          <span className="nwg-breakdown__label-pct">{wants.percentage}%</span>
          <span className="nwg-breakdown__label-amount">{formatEuro(wants.amount)}</span>
        </button>
        <button
          className="nwg-breakdown__label"
          onClick={() => onSegmentTap?.('growth')}
          aria-label={`Saved: ${growth.percentage}%, ${formatEuro(growth.amount)}`}
        >
          <span className="nwg-breakdown__label-header">
            <span className="nwg-breakdown__dot nwg-breakdown__dot--growth" />
            <span className="nwg-breakdown__label-name">Saved</span>
          </span>
          <span className="nwg-breakdown__label-pct">{growth.percentage}%</span>
          <span className="nwg-breakdown__label-amount">{formatEuro(growth.amount)}</span>
        </button>
      </div>
    </div>
  );
};

export default NwgBreakdownBar;
