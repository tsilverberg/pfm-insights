const euroFormatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const euroCompactFormatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  notation: 'compact',
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const percentFormatter = new Intl.NumberFormat('nl-NL', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Format as Euro: "€1.234,56" */
export function formatCurrency(value: number): string {
  return euroFormatter.format(value).replace(/\s/g, '');
}

/** Format as compact Euro: "€1,2K" */
export function formatCurrencyCompact(value: number): string {
  return euroCompactFormatter.format(value).replace(/\s/g, '');
}

/** Format as percentage: "12,34%" */
export function formatPercent(value: number): string {
  return percentFormatter.format(value / 100);
}

/** Format as signed change: "+€96,30" or "-€96,30" */
export function formatChange(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${euroFormatter.format(value).replace(/\s/g, '')}`;
}

/** Format date relative to today */
export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

/** Format date as "Nov 15" or "Nov 15, 2024" */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

/** Format date as "November 2025" */
export function formatMonthYear(month: number, year: number): string {
  const date = new Date(year, month);
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}
