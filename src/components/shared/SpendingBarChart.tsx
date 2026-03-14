import React from 'react';
import './SpendingBarChart.css';

interface SpendingSegment {
  label: string;
  percentage: number;
  color: string;
}

interface SpendingBarChartProps {
  segments: SpendingSegment[];
}

const SpendingBarChart: React.FC<SpendingBarChartProps> = ({ segments }) => (
  <div className="spending-bar">
    <div className="spending-bar__bar">
      {segments.map((seg) => (
        <div
          key={seg.label}
          className="spending-bar__segment"
          style={{ width: `${seg.percentage}%`, background: seg.color }}
        />
      ))}
    </div>
    <div className="spending-bar__legend">
      {segments.map((seg) => (
        <div key={seg.label} className="spending-bar__legend-item">
          <div className="spending-bar__legend-dot" style={{ background: seg.color }} />
          <div>
            <span className="spending-bar__legend-pct">{seg.percentage}%</span>
            <span className="spending-bar__legend-label">{seg.label}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SpendingBarChart;
