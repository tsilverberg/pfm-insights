const numberFormatter = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatterNoDecimals = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatEuro(value: number): string {
  return `€${numberFormatter.format(value)}`;
}

export function formatEuroShort(value: number): string {
  return `€${numberFormatterNoDecimals.format(value)}`;
}

export function formatEuroK(value: number): string {
  if (value >= 1000) {
    return `€${Math.round(value / 1000)}k`;
  }
  return formatEuroShort(value);
}

export function formatPercent(value: number): string {
  return `${value}%`;
}
