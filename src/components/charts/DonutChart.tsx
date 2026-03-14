import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import DottedLeaderRow from '../shared/DottedLeaderRow';
import { formatEuro } from '../../data/formatters';

ChartJS.register(ArcElement, Tooltip);

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  title?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ segments, title }) => {
  const data = {
    labels: segments.map((s) => s.label),
    datasets: [
      {
        data: segments.map((s) => s.value),
        backgroundColor: segments.map((s) => s.color),
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
        titleFont: { family: 'Libre Franklin', size: 11, weight: 400 as const },
        bodyFont: { family: 'Libre Franklin', size: 12, weight: 600 as const },
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
    <div className="card-bordered">
      {title && (
        <div style={{ marginBottom: 16 }}>
          <span className="typo-headline" style={{ color: 'var(--pfm-text-primary)' }}>{title}</span>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <div style={{ width: 146, height: 146 }}>
          <Doughnut data={data} options={options} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {segments.map((seg) => (
          <DottedLeaderRow
            key={seg.label}
            label={seg.label}
            value={formatEuro(seg.value)}
            dotColor={seg.color}
          />
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
