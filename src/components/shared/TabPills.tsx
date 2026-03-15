import React from 'react';
import './TabPills.css';

interface TabPillsProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}

const TabPills: React.FC<TabPillsProps> = ({ options, active, onChange }) => (
  <div className="tab-pills" role="tablist">
    {options.map((option) => (
      <button
        key={option}
        className={`tab-pills__item ${active === option ? 'tab-pills__item--active' : ''}`}
        onClick={() => onChange(option)}
        role="tab"
        aria-selected={option === active}
      >
        {option}
      </button>
    ))}
  </div>
);

export default TabPills;
