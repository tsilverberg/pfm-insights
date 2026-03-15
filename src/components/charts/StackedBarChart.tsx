import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import getTokens from '../../theme/chartTokens';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface StackedBarChartProps {
  months: string[];
  needs: number[];
  wants: number[];
  security: number[];
  averageIncome: number;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ months, needs, wants, security, averageIncome }) => {
  const t = getTokens();
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Needs',
        data: needs,
        backgroundColor: t.needsColor,
        borderColor: t.surfaceCard,
        borderWidth: { top: 2, bottom: 0, left: 0, right: 0 },
        barThickness: 24,
        borderRadius: 0,
        borderSkipped: false as const,
      },
      {
        label: 'Wants',
        data: wants,
        backgroundColor: t.wantsColor,
        borderColor: t.surfaceCard,
        borderWidth: { top: 2, bottom: 2, left: 0, right: 0 },
        barThickness: 24,
        borderRadius: 0,
        borderSkipped: false as const,
      },
      {
        label: 'Security',
        data: security,
        backgroundColor: t.securityColor,
        borderColor: t.surfaceCard,
        borderWidth: { top: 0, bottom: 2, left: 0, right: 0 },
        barThickness: 24,
        borderRadius: { topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0 },
        borderSkipped: false as const,
      },
    ],
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

  const averageLinePlugin = {
    id: 'averageLine',
    afterDraw(chart: ChartJS) {
      const { ctx, scales } = chart;
      const yScale = scales.y;
      const xScale = scales.x;
      if (!yScale || !xScale) return;

      const yPos = yScale.getPixelForValue(averageIncome);
      ctx.save();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = t.borderSubtle;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(xScale.left, yPos);
      ctx.lineTo(xScale.right, yPos);
      ctx.stroke();
      ctx.restore();
    },
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
      },
      legend: { display: false },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: true,
          color: t.borderSubtle,
          drawOnChartArea: true,
          lineWidth: 1,
          drawTicks: false,
          offset: true,
        },
        border: { display: false, dash: [4, 4] },
        ticks: {
          font: { family: t.fontFamily, size: 12, weight: 400 as const },
          color: t.textTertiary,
        },
      },
      y: {
        stacked: true,
        min: 0,
        max: 7000,
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
          stepSize: 1000,
        },
      },
    },
  };

  return (
    <div style={{ height: 301 }}>
      <Bar data={data} options={options} plugins={[chartFramePlugin, averageLinePlugin]} />
    </div>
  );
};

export default StackedBarChart;
