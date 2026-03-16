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
import getTokens from '../../theme/chartTokens';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

interface WealthTrajectoryChartProps {
  ages: number[];
  /** The main solid line — "Your path" (rhythm-adjusted when set, otherwise current) */
  currentPath: number[];
  /** The secondary dashed line — "Recommended" or "Without changes" */
  comparisonPath: number[];
  /** Label for the comparison line */
  comparisonLabel?: string;
  /** Use green accent for the main line (when rhythm is active) */
  rhythmActive?: boolean;
}

const WealthTrajectoryChart: React.FC<WealthTrajectoryChartProps> = ({
  ages,
  currentPath,
  comparisonPath,
  comparisonLabel = 'Recommended',
  rhythmActive = false,
}) => {
  const t = getTokens();
  const mainColor = rhythmActive ? '#34C759' : t.wantsColor;
  const datasets = [
    {
      label: comparisonLabel,
      data: comparisonPath,
      borderColor: t.textTertiary + '80',
      borderDash: [6, 4],
      borderWidth: 1.5,
      fill: false,
      pointRadius: 0,
      tension: 0.3,
    },
    {
      label: 'Your path',
      data: currentPath,
      borderColor: mainColor,
      backgroundColor: mainColor + '1A',
      borderWidth: 2,
      fill: true,
      pointRadius: 0,
      tension: 0.3,
    },
  ];
  const data = {
    labels: ages,
    datasets,
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
          font: { family: t.fontFamily, size: 12, weight: 400 as const },
          color: t.textTertiary,
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
        max: Math.ceil(Math.max(...comparisonPath, ...currentPath) / 100000) * 100000,
        grid: { display: false },
        border: {
          display: true,
          color: t.borderSubtle,
          width: 1,
        },
        ticks: {
          font: { family: t.fontFamily, size: 12, weight: 400 as const },
          color: t.textTertiary,
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
      ctx.strokeStyle = t.borderSubtle;
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
