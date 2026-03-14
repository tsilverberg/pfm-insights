import React from 'react';

interface Segment {
  value: number;
  color: string;
}

interface SegmentedBarProps {
  segments: Segment[];
}

const SegmentedBar: React.FC<SegmentedBarProps> = ({ segments }) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  return (
    <div className="segmented-bar">
      {segments.map((seg, i) => (
        <div
          key={i}
          className="segmented-bar__segment"
          style={{
            width: `${(seg.value / total) * 100}%`,
            backgroundColor: seg.color,
          }}
        />
      ))}
    </div>
  );
};

export default SegmentedBar;
