import { useState } from 'react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function useMonthNavigation(initialMonth = 10, initialYear = 2025) {
  const [monthIndex, setMonthIndex] = useState(initialMonth);
  const [year, setYear] = useState(initialYear);

  const goNext = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear(y => y + 1);
    } else {
      setMonthIndex(m => m + 1);
    }
  };

  const goPrev = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear(y => y - 1);
    } else {
      setMonthIndex(m => m - 1);
    }
  };

  return {
    month: MONTHS[monthIndex],
    year,
    goNext,
    goPrev,
  };
}
