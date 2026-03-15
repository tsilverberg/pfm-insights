import React from 'react';

interface MonthPickerProps {
  month: string;
  year: number;
  onPrev?: () => void;
  onNext?: () => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ month, year, onPrev, onNext }) => {
  return (
    <div className="month-picker">
      <button
        className="month-picker__btn"
        onClick={onPrev}
        aria-label="Previous month"
        disabled={!onPrev}
        style={!onPrev ? { opacity: 0.3 } : undefined}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 12L6 8l4-4" />
        </svg>
      </button>
      <span className="month-picker__label">{month} {year}</span>
      <button
        className="month-picker__btn"
        onClick={onNext}
        aria-label="Next month"
        disabled={!onNext}
        style={!onNext ? { opacity: 0.3 } : undefined}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4l4 4-4 4" />
        </svg>
      </button>
    </div>
  );
};

export default MonthPicker;
