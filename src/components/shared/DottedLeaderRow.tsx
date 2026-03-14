import React from 'react';

interface DottedLeaderRowProps {
  label: string;
  value: string;
  dotColor?: string;
  labelIcon?: React.ReactNode;
}

const DottedLeaderRow: React.FC<DottedLeaderRowProps> = ({ label, value, dotColor, labelIcon }) => {
  return (
    <div className="dotted-leader-row">
      {dotColor && <span className="dotted-leader-row__dot" style={{ backgroundColor: dotColor }} />}
      {labelIcon}
      <span className="dotted-leader-row__label">{label}</span>
      <span className="dotted-leader-row__dots" />
      <span className="dotted-leader-row__value">{value}</span>
    </div>
  );
};

export default DottedLeaderRow;
