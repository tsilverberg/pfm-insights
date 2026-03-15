import React, { useRef, useEffect, useState } from 'react';
import './TrendLineChart.css';

interface TrendLineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  lineColor?: string;
  fillGradient?: boolean;
  showDots?: boolean;
  showLabels?: boolean;
  showValues?: boolean;
  highlightLast?: boolean;
  yMin?: number;
  yMax?: number;
}

const VIEWBOX_WIDTH = 320;
const PADDING_X = 20;
const PADDING_TOP = 24;
const PADDING_BOTTOM = 32;

const TrendLineChart: React.FC<TrendLineChartProps> = ({
  data,
  height = 160,
  lineColor = 'var(--pfm-action-primary-bg)',
  fillGradient = true,
  showDots = true,
  showLabels = true,
  showValues = false,
  highlightLast = true,
  yMin,
  yMax,
}) => {
  const polylineRef = useRef<SVGPolylineElement>(null);
  const [totalLength, setTotalLength] = useState(0);
  const gradientId = useRef(`trend-grad-${Math.random().toString(36).slice(2, 9)}`).current;

  useEffect(() => {
    if (polylineRef.current) {
      const len = polylineRef.current.getTotalLength();
      setTotalLength(len);
    }
  }, [data, height]);

  if (data.length === 0) return null;

  const values = data.map((d) => d.value);
  const computedMin = yMin ?? Math.min(...values);
  const computedMax = yMax ?? Math.max(...values);
  const yRange = computedMax - computedMin || 1;

  const chartTop = PADDING_TOP;
  const chartBottom = height - PADDING_BOTTOM;
  const chartHeight = chartBottom - chartTop;

  const usableWidth = VIEWBOX_WIDTH - PADDING_X * 2;
  const step = data.length > 1 ? usableWidth / (data.length - 1) : 0;

  const points = data.map((d, i) => {
    const x = PADDING_X + i * step;
    const y = chartBottom - ((d.value - computedMin) / yRange) * chartHeight;
    return { x, y, label: d.label, value: d.value };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  // Polygon for gradient fill: line points + bottom-right + bottom-left
  const polygonPoints =
    polylinePoints +
    ` ${points[points.length - 1].x},${chartBottom}` +
    ` ${points[0].x},${chartBottom}`;

  return (
    <svg
      className="trend-line-chart"
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${height}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Trend line chart"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity={0.2} />
          <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Gradient area fill */}
      {fillGradient && (
        <polygon
          className="trend-line-chart__area"
          points={polygonPoints}
          fill={`url(#${gradientId})`}
        />
      )}

      {/* Trend line */}
      <polyline
        ref={polylineRef}
        className="trend-line-chart__line"
        points={polylinePoints}
        stroke={lineColor}
        style={
          totalLength
            ? ({
                strokeDasharray: totalLength,
                strokeDashoffset: totalLength,
                '--line-length': totalLength,
              } as React.CSSProperties)
            : undefined
        }
      />

      {/* Dots */}
      {showDots &&
        points.map((p, i) => {
          const isLast = i === points.length - 1;
          const r = highlightLast && isLast ? 6 : 4;
          return (
            <circle
              key={i}
              className={`trend-line-chart__dot${highlightLast && isLast ? ' trend-line-chart__dot--highlight' : ''}`}
              cx={p.x}
              cy={p.y}
              r={r}
              fill={lineColor}
              style={{ animationDelay: `${0.4 + i * 0.08}s` }}
            />
          );
        })}

      {/* Value labels above dots */}
      {showValues &&
        points.map((p, i) => (
          <text
            key={`val-${i}`}
            className="trend-line-chart__value"
            x={p.x}
            y={p.y - 10}
            textAnchor="middle"
            style={{ animationDelay: `${0.5 + i * 0.08}s` }}
          >
            {p.value}
          </text>
        ))}

      {/* X-axis labels */}
      {showLabels &&
        points.map((p, i) => (
          <text
            key={`lbl-${i}`}
            className="trend-line-chart__label"
            x={p.x}
            y={height - 8}
            textAnchor="middle"
          >
            {p.label}
          </text>
        ))}
    </svg>
  );
};

export default TrendLineChart;
