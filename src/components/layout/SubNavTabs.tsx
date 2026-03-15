import React from 'react';
import './SubNavTabs.css';

export type SubTab = 'overview' | 'spend' | 'plan' | 'wealth';

interface SubNavTabsProps {
  active: SubTab;
  onChange: (tab: SubTab) => void;
}

const tabs: { id: SubTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'spend', label: 'Spend' },
  { id: 'plan', label: 'Plan' },
  { id: 'wealth', label: 'Wealth' },
];

const SubNavTabs: React.FC<SubNavTabsProps> = ({ active, onChange }) => {
  return (
    <nav className="sub-nav" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`sub-nav__tab ${active === tab.id ? 'sub-nav__tab--active' : ''}`}
          onClick={() => onChange(tab.id)}
          role="tab"
          aria-selected={active === tab.id}
        >
          <span className="sub-nav__label">{tab.label}</span>
          <span className="sub-nav__underline" />
        </button>
      ))}
    </nav>
  );
};

export default SubNavTabs;
