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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

interface WealthTrajectoryChartProps {
  ages: number[];
  currentPath: number[];
  recommendedPath: number[];
}

const WealthTrajectoryChart: React.FC<WealthTrajectoryChartProps> = ({ ages, currentPath, recommendedPath }) => {
  const data = {
    labels: ages,
    datasets: [
      {
        label: 'Recommended',
        data: recommendedPath,
        borderColor: '#4AB2B2', // matches --pfm-turquoise-strong
        borderDash: [6, 4],
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
        tension: 0.3,
      },
      {
        label: 'Your path',
        data: currentPath,
        borderColor: '#4AB2B2', // matches --pfm-turquoise-strong
        backgroundColor: 'rgba(74, 178, 178, 0.15)', // --pfm-turquoise-strong at 15% opacity
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
        backgroundColor: '#061223', // matches --pfm-text-primary
        titleFont: { family: 'Libre Franklin', size: 11, weight: 400 as const },
        bodyFont: { family: 'Libre Franklin', size: 12, weight: 600 as const },
        padding: 8,
        cornerRadius: 4,
        callbacks: {
          label: (ctx: { dataset: { label?: string }; parsed: { y: number | null } }) => {
            const val = ctx.parsed.y ?? 0;
            return `${ctx.dataset.label}: €${(val / 1000).toFixed(0)}k`;
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
          color: '#7189A7', // matches --pfm-text-tertiary
          maxTicksLimit: 6,
          callback: (_val: number | string, index: number) => {
            const age = ages[index];
            if (age % 12 === 0 || index === 0 || index === ages.length - 1) return age;
            return '';
          },
        },
      },
      y: {
        min: 0,
        max: 500000,
        grid: { display: false },
        border: {
          display: true,
          color: '#CCD5DF', // matches --pfm-border-subtle
          width: 1,
        },
        ticks: {
          font: { family: 'Lato', size: 12, weight: 400 as const },
          color: '#7189A7', // matches --pfm-text-tertiary
          callback: (val: number | string) => {
            const v = Number(val);
            if (v === 0) return '€0';
            return `€${v / 1000}k`;
          },
          stepSize: 100000,
        },
      },
    },
  };

  const chartFramePlugin = {
    id: 'chartFrame',
    afterDraw(chart: ChartJS) {
      const { ctx, scales } = chart;
      const yScale = scales.y;
      const xScale = scales.x;
      if (!yScale || !xScale) return;
      const r = 6;
      ctx.save();
      ctx.strokeStyle = '#CCD5DF'; // matches --pfm-border-subtle
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(xScale.left, yScale.bottom);
      ctx.lineTo(xScale.left, yScale.top + r);
      ctx.quadraticCurveTo(xScale.left, yScale.top, xScale.left + r, yScale.top);
      ctx.lineTo(xScale.right, yScale.top);
      ctx.stroke();
      ctx.restore();
    },
  };

  return (
    <div style={{ height: 250 }}>
      <Line data={data} options={options} plugins={[chartFramePlugin]} />
    </div>
  );
};

export default WealthTrajectoryChart;
