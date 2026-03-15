// Budget threshold constants — shared across pages
export const BUDGET_THRESHOLD_WARNING = 0.7;
export const BUDGET_THRESHOLD_DANGER = 0.85;

// NWG color CSS variable references
export const NWG_COLORS: Record<string, string> = {
  need: 'var(--bb-color-nwg-needs)',
  want: 'var(--bb-color-nwg-wants)',
  growth: 'var(--bb-color-nwg-growth)',
};

export const NWG_LABELS: Record<string, string> = {
  need: 'Needs',
  want: 'Lifestyle',
  growth: 'Saved',
};

// Insight type color CSS variable references
export const INSIGHT_TYPE_COLORS: Record<string, string> = {
  summary: 'var(--bb-color-primary-default)',
  anomaly: 'var(--ion-color-danger)',
  celebration: 'var(--ion-color-success)',
  offer: 'var(--bb-color-primary-default)',
  nudge: 'var(--ion-color-warning)',
  spending: 'var(--bb-color-nwg-wants)',
  irregular: 'var(--ion-color-warning)',
  proximity: 'var(--ion-color-danger)',
  pattern: 'var(--bb-color-insight-pattern)',
  benchmark: 'var(--bb-color-accent-teal)',
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
