import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface StackedBarChartProps {
  months: string[];
  needs: number[];
  wants: number[];
  security: number[];
  averageIncome: number;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ months, needs, wants, security, averageIncome }) => {
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Needs',
        data: needs,
        backgroundColor: '#ED5EA6', // matches --pfm-pink-base
        borderColor: '#FFFFFF', // matches --pfm-neutral-0
        borderWidth: { top: 2, bottom: 0, left: 0, right: 0 },
        barThickness: 24,
        borderRadius: 0,
        borderSkipped: false as const,
      },
      {
        label: 'Wants',
        data: wants,
        backgroundColor: '#4AB2B2', // matches --pfm-turquoise-strong
        borderColor: '#FFFFFF', // matches --pfm-neutral-0
        borderWidth: { top: 2, bottom: 2, left: 0, right: 0 },
        barThickness: 24,
        borderRadius: 0,
        borderSkipped: false as const,
      },
      {
        label: 'Security',
        data: security,
        backgroundColor: '#0A5A2B', // matches --pfm-green-strong
        borderColor: '#FFFFFF', // matches --pfm-neutral-0
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
      ctx.strokeStyle = '#CCD5DF'; // matches --pfm-border-subtle
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
        backgroundColor: '#061223', // matches --pfm-text-primary
        titleFont: { family: 'Libre Franklin', size: 11, weight: 400 as const },
        bodyFont: { family: 'Libre Franklin', size: 12, weight: 600 as const },
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
          color: '#CCD5DF', // matches --pfm-border-subtle
          drawOnChartArea: true,
          lineWidth: 1,
          drawTicks: false,
          offset: true,
        },
        border: { display: false, dash: [4, 4] },
        ticks: {
          font: { family: 'Lato', size: 12, weight: 400 as const },
          color: '#7189A7', // matches --pfm-text-tertiary
        },
      },
      y: {
        stacked: true,
        min: 0,
        max: 7000,
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
