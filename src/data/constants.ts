// Budget threshold constants — shared across pages
export const BUDGET_THRESHOLD_WARNING = 0.7;
export const BUDGET_THRESHOLD_DANGER = 0.85;

// NWG color CSS variable references
export const NWG_COLORS: Record<string, string> = {
  need: 'var(--pfm-pink-base)',
  want: 'var(--pfm-turquoise-strong)',
  growth: 'var(--pfm-green-strong)',
};

export const NWG_LABELS: Record<string, string> = {
  need: 'Needs',
  want: 'Lifestyle',
  growth: 'Saved',
};

// Insight type color CSS variable references
export const INSIGHT_TYPE_COLORS: Record<string, string> = {
  summary: 'var(--pfm-action-primary-bg)',
  anomaly: 'var(--ion-color-danger)',
  celebration: 'var(--ion-color-success)',
  offer: 'var(--pfm-action-primary-bg)',
  nudge: 'var(--ion-color-warning)',
  spending: 'var(--pfm-turquoise-strong)',
  irregular: 'var(--ion-color-warning)',
  proximity: 'var(--ion-color-danger)',
  pattern: 'var(--pfm-palette-purple-strong)',
  benchmark: 'var(--pfm-turquoise-extra-strong)',
};

// ─── Health Score Constants ───────────────────────────────────

export const PILLAR_WEIGHTS: Record<string, number> = {
  spending: 0.25,
  savings: 0.25,
  debt: 0.20,
  buffer: 0.20,
  goals: 0.10,
};

export const PILLAR_LABELS: Record<string, string> = {
  spending: 'Spending control',
  savings: 'Savings rate',
  debt: 'Debt management',
  buffer: 'Financial buffer',
  goals: 'Goal progress',
};

export const HEALTH_TIERS = {
  NEEDS_ATTENTION: 0,
  BUILDING: 40,
  GOOD: 60,
  EXCELLENT: 80,
} as const;
