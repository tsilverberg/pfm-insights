/**
 * CSS-to-JS bridge for chart colors.
 * Chart.js cannot read CSS custom properties at render time,
 * so we resolve them once and export as plain hex values.
 *
 * For white-label theming: update tokens.css → these resolve automatically.
 */

function getCSSVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

let _cache: Record<string, string> | null = null;

function getTokens(): Record<string, string> {
  if (_cache) return _cache;
  _cache = {
    // NWG category colors
    needsColor: getCSSVar('--pfm-pink-base'),
    wantsColor: getCSSVar('--pfm-turquoise-strong'),
    securityColor: getCSSVar('--pfm-green-strong'),

    // Text
    textPrimary: getCSSVar('--pfm-text-primary'),
    textSecondary: getCSSVar('--pfm-text-secondary'),
    textTertiary: getCSSVar('--pfm-text-tertiary'),

    // Surfaces
    bgInverted: getCSSVar('--pfm-bg-inverted'),
    textInverted: getCSSVar('--pfm-text-inverted'),
    borderSubtle: getCSSVar('--pfm-border-subtle'),
    surfaceCard: getCSSVar('--pfm-surface-card'),

    // Turquoise scale (heatmap)
    turquoiseExtraSoft: getCSSVar('--pfm-turquoise-extra-soft'),
    turquoiseSoft: getCSSVar('--pfm-turquoise-soft'),
    turquoiseBase: getCSSVar('--pfm-turquoise-base'),
    turquoiseExtraStrong: getCSSVar('--pfm-turquoise-extra-strong'),

    // Action primary
    actionPrimaryBg: getCSSVar('--pfm-action-primary-bg'),

    // Font
    fontFamily: getCSSVar('--pfm-font-family') || "'Lato', sans-serif",
  };
  return _cache;
}

/** Call this if theme tokens change at runtime (e.g., brand switch) */
export function invalidateChartTokens(): void {
  _cache = null;
}

export default getTokens;
