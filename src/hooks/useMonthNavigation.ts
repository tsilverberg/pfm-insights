import { useState } from 'react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Available range: Oct 2025 – Mar 2026
const MIN_MONTH = 9;
const MIN_YEAR = 2025;
const MAX_MONTH = 2;
const MAX_YEAR = 2026;

function isAtMin(m: number, y: number) {
  return y < MIN_YEAR || (y === MIN_YEAR && m <= MIN_MONTH);
}

function isAtMax(m: number, y: number) {
  return y > MAX_YEAR || (y === MAX_YEAR && m >= MAX_MONTH);
}

export function useMonthNavigation(initialMonth = 2, initialYear = 2026) {
  const [monthIndex, setMonthIndex] = useState(initialMonth);
  const [year, setYear] = useState(initialYear);

  const canGoNext = !isAtMax(monthIndex, year);
  const canGoPrev = !isAtMin(monthIndex, year);

  const goNext = () => {
    if (!canGoNext) return;
    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear(y => y + 1);
    } else {
      setMonthIndex(m => m + 1);
    }
  };

  const goPrev = () => {
    if (!canGoPrev) return;
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear(y => y - 1);
    } else {
      setMonthIndex(m => m - 1);
    }
  };

  return {
    month: MONTHS[monthIndex],
    monthIndex,
    year,
    goNext,
    goPrev,
    canGoNext,
    canGoPrev,
  };
}
