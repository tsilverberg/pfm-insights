import React from 'react';
import './SpendingHeatmap.css';
import getTokens from '../../theme/chartTokens';

interface SpendingHeatmapProps {
  dayLabels: string[];
  weeks: (number | null)[][];
}

function getCellColor(value: number | null): { bg: string; border?: string } {
  const t = getTokens();
  if (value === null) return { bg: '#EBF0F5' }; // future/inactive
  if (value === -1) return { bg: '#FFFFFF', border: '1px solid #E1E8EF' }; // no data
  if (value <= 10) return { bg: t.turquoiseExtraSoft }; // excellent
  if (value <= 60) return { bg: t.turquoiseSoft }; // on track
  if (value <= 120) return { bg: t.turquoiseBase }; // warning
  return { bg: t.turquoiseExtraStrong }; // over-budget
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
