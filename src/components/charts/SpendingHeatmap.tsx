import React from 'react';
import './SpendingHeatmap.css';

interface SpendingHeatmapProps {
  dayLabels: string[];
  weeks: (number | null)[][];
}

function getCellColor(value: number | null): { bg: string; border?: string } {
  if (value === null) return { bg: '#EBF0F5' }; // future/inactive
  if (value === -1) return { bg: '#FFFFFF', border: '1px solid #E1E8EF' }; // no data
  if (value <= 10) return { bg: '#DDF8F8' }; // excellent
  if (value <= 60) return { bg: '#B9F1F1' }; // on track
  if (value <= 120) return { bg: '#1ED2D2' }; // warning
  return { bg: '#3A8C8C' }; // over-budget
}

const SpendingHeatmap: React.FC<SpendingHeatmapProps> = ({ dayLabels, weeks }) => {
  return (
    <div className="heatmap">
      <div className="heatmap__header">
        {dayLabels.map((day) => (
          <div key={day} className="heatmap__day-label">{day}</div>
        ))}
      </div>
      <div className="heatmap__grid">
        {weeks.map((week, wi) => (
          <div key={wi} className="heatmap__row">
            {week.map((val, di) => {
              const { bg, border } = getCellColor(val);
              return (
                <div
                  key={di}
                  className="heatmap__cell"
                  style={{
                    backgroundColor: bg,
                    border: border || 'none',
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingHeatmap;
