import React from 'react';
import './SubNavTabs.css';

export type SubTab = 'overview' | 'goals' | 'path';

interface SubNavTabsProps {
  active: SubTab;
  onChange: (tab: SubTab) => void;
}

const tabs: { id: SubTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'goals', label: 'Monthly goals' },
  { id: 'path', label: 'My path' },
];

const SubNavTabs: React.FC<SubNavTabsProps> = ({ active, onChange }) => {
  return (
    <nav className="sub-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`sub-nav__tab ${active === tab.id ? 'sub-nav__tab--active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          <span className="sub-nav__label">{tab.label}</span>
          <span className="sub-nav__underline" />
        </button>
      ))}
    </nav>
  );
};

export default SubNavTabs;
