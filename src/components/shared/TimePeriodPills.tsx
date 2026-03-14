import React from 'react';

interface TimePeriodPillsProps {
  options: string[];
  active: string;
  onChange: (option: string) => void;
}

const TimePeriodPills: React.FC<TimePeriodPillsProps> = ({ options, active, onChange }) => {
  return (
    <div className="time-pills">
      {options.map((option) => (
        <button
          key={option}
          className={`time-pill ${active === option ? 'time-pill--active' : ''}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default TimePeriodPills;
