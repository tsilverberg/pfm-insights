import React from 'react';
import ProgressBar from './ProgressBar';
import { formatEuro } from '../../data/formatters';
import './GeographyRow.css';

interface GeographyRowProps {
  country: string;
  flagEmoji: string;
  value: number;
  percentage: number;
  color: string;
}

const GeographyRow: React.FC<GeographyRowProps> = ({ country, flagEmoji, value, percentage, color }) => {
  return (
    <div className="geography-row">
      <div className="geography-row__top">
        <span className="geography-row__flag">{flagEmoji}</span>
        <span className="typo-callout-regular geography-row__country">{country}</span>
        <span className="typo-callout-regular" style={{ marginLeft: 'auto' }}>
          {formatEuro(value)} ({percentage}%)
        </span>
      </div>
      <ProgressBar value={percentage} max={100} color={color} height={4} />
    </div>
  );
};

export default GeographyRow;
