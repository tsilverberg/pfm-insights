import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { PortfolioValuePoint } from '../../data/types';
import { formatEuro } from '../../data/formatters';
import getTokens from '../../theme/chartTokens';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

interface PortfolioLineChartProps {
  data: PortfolioValuePoint[];
}

const PortfolioLineChart: React.FC<PortfolioLineChartProps> = ({ data: points }) => {
  const t = getTokens();
  const labels = points.map((p) => p.date);
  const values = points.map((p) => p.value);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: t.textPrimary,
        backgroundColor: t.textPrimary + '0F',
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: t.bgInverted,
        titleFont: { family: t.fontFamily, size: 11, weight: 400 as const },
        bodyFont: { family: t.fontFamily, size: 12, weight: 600 as const },
        padding: 8,
        cornerRadius: 4,
        callbacks: {
          label: (ctx: { parsed: { y: number | null } }) => {
            return formatEuro(ctx.parsed.y ?? 0);
          },
        },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          font: { family: t.fontFamily, size: 12, weight: 400 as const },
          color: t.textSecondary,
          maxTicksLimit: 4,
          maxRotation: 0,
        },
      },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: { display: false },
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: 215 }}>
      <Line data={chartData} options={options} redraw />
    </div>
  );
};

export default PortfolioLineChart;
