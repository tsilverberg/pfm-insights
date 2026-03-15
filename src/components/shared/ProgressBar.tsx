import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  color: string;
  height?: 4 | 12;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, color, height = 4 }) => {
  const pct = Math.min((value / max) * 100, 100);
  const percentage = Math.round((value / max) * 100);
  return (
    <div
      className={`progress-bar ${height === 12 ? 'progress-bar--thick' : 'progress-bar--thin'}`}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="progress-bar__fill"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
};

export default ProgressBar;
