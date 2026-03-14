import React from 'react';
import SectionModule from '../../components/shared/SectionModule';
import SegmentedBar from '../../components/shared/SegmentedBar';
import RaisedButton from '../../components/shared/RaisedButton';
import { financialStrategyData, milestonesData } from '../../data/mockData';
import './MyPathTab.css';

const MyPathTab: React.FC = () => {
  return (
    <div>
      {/* Financial Strategy */}
      <SectionModule title="Financial strategy" subtitle="Your personalized approach to managing money">
        <div className="card-bordered">
          {/* Piggy bank illustration */}
          <div className="path__illustration">
            <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Shadow */}
              <ellipse cx="60" cy="88" rx="35" ry="6" fill="#E1E8EF" opacity="0.5" />
              {/* Body */}
              <ellipse cx="58" cy="55" rx="32" ry="25" fill="#ED5EA6" />
              {/* Belly */}
              <ellipse cx="58" cy="58" rx="22" ry="17" fill="#F490BF" />
              {/* Head */}
              <circle cx="88" cy="48" r="14" fill="#ED5EA6" />
              {/* Snout */}
              <ellipse cx="97" cy="50" rx="7" ry="5" fill="#F490BF" />
              <circle cx="95" cy="49" r="1.5" fill="#D44E90" />
              <circle cx="99" cy="49" r="1.5" fill="#D44E90" />
              {/* Eye */}
              <circle cx="87" cy="43" r="2" fill="#061223" />
              <circle cx="87.5" cy="42.5" r="0.8" fill="white" />
              {/* Ears */}
              <path d="M80 36l-4-10 8 2z" fill="#D44E90" />
              <path d="M90 34l2-10 5 5z" fill="#D44E90" />
              {/* Front legs */}
              <rect x="40" y="70" width="8" height="14" rx="4" fill="#ED5EA6" />
              <rect x="54" y="70" width="8" height="14" rx="4" fill="#D44E90" />
              {/* Back legs */}
              <rect x="68" y="70" width="8" height="12" rx="4" fill="#ED5EA6" />
              {/* Tail */}
              <path d="M26 45c-6-2-8-8-4-12" stroke="#ED5EA6" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Coin slot */}
              <rect x="50" y="30" width="16" height="3" rx="1.5" fill="#D44E90" />
              {/* Coin */}
              <circle cx="58" cy="24" r="8" fill="#F5C542" stroke="#E5A832" strokeWidth="1.5" />
              <text x="58" y="27" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#E5A832">€</text>
            </svg>
          </div>
          <h3 className="path__strategy-name">{financialStrategyData.name}</h3>
          <p className="path__strategy-desc">{financialStrategyData.description}</p>
          <div style={{ marginTop: 16 }}>
            <SegmentedBar segments={financialStrategyData.segments} />
          </div>
          <div className="path__segment-labels">
            {financialStrategyData.segments.map((seg) => (
              <span key={seg.label} className="typo-footnote" style={{ color: 'var(--pfm-text-secondary)' }}>
                {seg.label} {seg.value}%
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <RaisedButton label="Tune my rhythm" />
        </div>
      </SectionModule>

      {/* Milestones */}
      <SectionModule title="Milestones" subtitle="Track your progress toward financial goals">
        <div className="card-bordered">
          {/* Target illustration */}
          <div className="path__illustration">
            <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Shadow */}
              <ellipse cx="55" cy="90" rx="30" ry="5" fill="#E1E8EF" opacity="0.5" />
              {/* Target stand */}
              <rect x="52" y="72" width="6" height="16" rx="2" fill="#CCD5DF" />
              <rect x="44" y="84" width="22" height="4" rx="2" fill="#CCD5DF" />
              {/* Target outer ring */}
              <circle cx="55" cy="42" r="30" fill="#E1E8EF" stroke="#CCD5DF" strokeWidth="1.5" />
              {/* Target middle ring */}
              <circle cx="55" cy="42" r="21" fill="#DDF8F8" stroke="#4AB2B2" strokeWidth="1.5" />
              {/* Target inner ring */}
              <circle cx="55" cy="42" r="12" fill="#B8E8E8" stroke="#4AB2B2" strokeWidth="1.5" />
              {/* Bullseye */}
              <circle cx="55" cy="42" r="5" fill="#4AB2B2" />
              {/* Arrow */}
              <line x1="82" y1="18" x2="58" y2="40" stroke="#061223" strokeWidth="2" strokeLinecap="round" />
              <polygon points="56,41 60,38 57,44" fill="#061223" />
              {/* Arrow feathers */}
              <line x1="82" y1="18" x2="86" y2="14" stroke="#ED5EA6" strokeWidth="2" strokeLinecap="round" />
              <line x1="82" y1="18" x2="87" y2="20" stroke="#ED5EA6" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          {milestonesData.milestones.length === 0 ? (
            <p className="path__empty-text">No milestones added yet</p>
          ) : null}
        </div>
        <div style={{ marginTop: 16 }}>
          <RaisedButton label="+ Add a milestone" />
        </div>
      </SectionModule>
    </div>
  );
};

export default MyPathTab;
