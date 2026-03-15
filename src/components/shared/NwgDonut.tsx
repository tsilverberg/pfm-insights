import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatEuro } from '../../data/formatters';
import './NwgDonut.css';

ChartJS.register(ArcElement, Tooltip);

interface NwgDonutProps {
  needs: { amount: number; percentage: number };
  wants: { amount: number; percentage: number };
  growth: { amount: number; percentage: number };
  onSegmentTap?: (type: 'need' | 'want' | 'growth') => void;
}

const SEGMENTS = [
  { key: 'need' as const, label: 'Needs', color: '#ED5EA6', prop: 'needs' as const },
  { key: 'want' as const, label: 'Lifestyle', color: '#1ED2D2', prop: 'wants' as const },
  { key: 'growth' as const, label: 'Saved', color: '#0A5A2B', prop: 'growth' as const },
];

const NwgDonut: React.FC<NwgDonutProps> = ({ needs, wants, growth, onSegmentTap }) => {
  const segments = { needs, wants, growth };
  const total = needs.amount + wants.amount + growth.amount;

  const data = {
    labels: SEGMENTS.map((s) => s.label),
    datasets: [
      {
        data: SEGMENTS.map((s) => segments[s.prop].amount),
        backgroundColor: SEGMENTS.map((s) => s.color),
        borderWidth: 0,
        cutout: '65%',
      },
    ],
  };

  const options = {
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
            return `${ctx.label}: ${formatEuro(ctx.parsed)}`;
          },
        },
      },
      legend: { display: false },
    },
  };

  return (
    <div className="nwg-donut">
      <div className="nwg-donut__chart-wrap">
        <Doughnut data={data} options={options} />
        <div className="nwg-donut__center">{formatEuro(total)}</div>
      </div>

      <div className="nwg-donut__legend">
        {SEGMENTS.map((seg) => {
          const item = segments[seg.prop];
          return (
            <button
              key={seg.key}
              className="nwg-donut__legend-btn"
              onClick={() => onSegmentTap?.(seg.key)}
              type="button"
            >
              <span className="nwg-donut__dot" style={{ background: seg.color }} />
              <span className="nwg-donut__label">{seg.label}</span>
              <span className="nwg-donut__leader" />
              <span className="nwg-donut__pct">{item.percentage}%</span>
              <span className="nwg-donut__amount">{formatEuro(item.amount)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NwgDonut;
