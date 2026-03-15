import React from 'react';

interface DotIndicatorProps {
  count: number;
  active: number;
}

const DotIndicator: React.FC<DotIndicatorProps> = ({ count, active }) => (
  <div
    style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}
    role="status"
    aria-label={`Page ${active + 1} of ${count}`}
  >
    {Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: i === active ? 'var(--pfm-text-primary)' : 'var(--pfm-border-subtle)',
          transition: 'background 0.2s',
        }}
      />
    ))}
  </div>
);

export default DotIndicator;
