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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

interface PortfolioLineChartProps {
  data: PortfolioValuePoint[];
}

const PortfolioLineChart: React.FC<PortfolioLineChartProps> = ({ data: points }) => {
  const labels = points.map((p) => p.date);
  const values = points.map((p) => p.value);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: '#061223',
        backgroundColor: 'rgba(6, 18, 35, 0.06)',
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
        backgroundColor: '#061223',
        titleFont: { family: 'Lato', size: 11, weight: 400 as const },
        bodyFont: { family: 'Lato', size: 12, weight: 600 as const },
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
          font: { family: 'Lato', size: 12, weight: 400 as const },
          color: '#3A495D',
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
    <div style={{ height: 215 }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PortfolioLineChart;
