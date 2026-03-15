import React from 'react';
import { useHaptics } from '../../hooks/useHaptics';
import './NumericKeypad.css';

interface NumericKeypadProps {
  onKey: (key: string) => void;
  onDelete: () => void;
}

const keys = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'del'],
];

const NumericKeypad: React.FC<NumericKeypadProps> = ({ onKey, onDelete }) => {
  const haptics = useHaptics();

  return (
  <div className="keypad" role="group" aria-label="Numeric keypad">
    {keys.map((row, ri) => (
      <div key={ri} className="keypad__row">
        {row.map((k) => (
          <button
            key={k}
            className={`keypad__key ${k === 'del' ? 'keypad__key--del' : ''}`}
            onClick={() => {
              haptics.light();
              k === 'del' ? onDelete() : onKey(k);
            }}
            aria-label={k === 'del' ? 'Delete' : k}
          >
            {k === 'del' ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.12c.36.53.9.88 1.59.88h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z" fill="var(--pfm-text-primary)" />
              </svg>
            ) : k === '.' ? ',' : k}
          </button>
        ))}
      </div>
    ))}
  </div>
  );
};

export default NumericKeypad;
