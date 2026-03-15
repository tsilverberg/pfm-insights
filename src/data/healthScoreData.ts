import type {
  Budget,
  Goal,
  PfmPocket,
  PfmAccount,
  CashflowSummary,
  PillarId,
  Rating,
  Trend,
  PillarMetric,
  ImprovementAction,
  PillarScore,
  MonthlyScore,
  HealthScore,
  MemberScore,
  HouseholdHealthScore,
} from './types';
import {
  budgets as defaultBudgets,
  goals as defaultGoals,
  pockets as defaultPockets,
  accounts as defaultAccounts,
  cashflowSummary as defaultCashflow,
} from './pfmData';
import { PILLAR_WEIGHTS, PILLAR_LABELS, HEALTH_TIERS } from './constants';
import { formatEuro } from './formatters';

// ─── Rating helpers ───────────────────────────────────────────

export function getRating(score: number): Rating {
  if (score >= HEALTH_TIERS.EXCELLENT) return 'excellent';
  if (score >= HEALTH_TIERS.GOOD) return 'good';
  if (score >= HEALTH_TIERS.BUILDING) return 'building';
  return 'needs-attention';
}

export function getRatingColor(rating: Rating): string {
  switch (rating) {
    case 'excellent': return 'var(--bb-color-feedback-success)';
    case 'good': return 'var(--bb-color-primary-default)';
    case 'building': return 'var(--bb-color-feedback-warning)';
    case 'needs-attention': return 'var(--bb-color-feedback-error)';
  }
}

export function getRatingGradient(rating: Rating): [string, string] {
  switch (rating) {
    case 'excellent': return ['#108360', '#79C716'];
    case 'good': return ['#295EFF', '#A4B1FF'];
    case 'building': return ['#F5A623', '#F7D070'];
    case 'needs-attention': return ['#E05C4D', '#F5A623'];
  }
}

// ─── Shared helpers ──────────────────────────────────────────

export function formatDelta(delta: number): { text: string; cls: string } {
  if (delta > 0) return { text: `\u25B2 +${delta}`, cls: 'positive' };
  if (delta < 0) return { text: `\u25BC ${delta}`, cls: 'negative' };
  return { text: '\u2014 0', cls: 'neutral' };
}

// ─── Pillar score calculators ─────────────────────────────────

export function calculateSpendingScore(budgetList: Budget[]): number {
  if (budgetList.length === 0) return 50;
  const ratios = budgetList.map(b => b.spent / b.limit);
  const avgRatio = ratios.reduce((s, r) => s + r, 0) / ratios.length;
  const score = Math.round(Math.max(0, Math.min(100, 100 - (avgRatio * 50))));
  return score;
}

export function calculateSavingsScore(
  pocketList: PfmPocket[],
  goalList: Goal[],
  cashflow: CashflowSummary,
): number {
  const income = cashflow.received;
  if (income <= 0) return 20;
  const totalSavedPockets = pocketList.reduce((s, p) => s + (p.allocated - p.spent), 0);
  const totalSavedGoals = goalList.reduce((s, g) => s + g.current, 0);
  const totalSaved = totalSavedPockets + totalSavedGoals;
  const savingsRate = totalSaved / income;
  const score = Math.round(Math.min(100, 20 + (savingsRate / 0.20) * 80));
  return Math.max(0, Math.min(100, score));
}

export function calculateDebtScore(accountList: PfmAccount[]): number {
  const creditAccounts = accountList.filter(a => a.type === 'credit');
  if (creditAccounts.length === 0) return 100;
  const assumedLimitPerAccount = 2300;
  const totalBalance = creditAccounts.reduce((s, a) => s + Math.abs(a.balance), 0);
  const totalLimit = creditAccounts.length * assumedLimitPerAccount;
  const utilization = totalBalance / totalLimit;
  const score = Math.round(Math.max(0, Math.min(100, (1 - utilization) * 100)));
  return score;
}

export function calculateBufferScore(pocketList: PfmPocket[]): number {
  const avgMonthlySpending = 2890;
  const emergencyKeywords = ['emergency', 'buffer', 'rainy', 'safety', 'reserve'];
  const emergencyPockets = pocketList.filter(p =>
    emergencyKeywords.some(kw => p.name.toLowerCase().includes(kw))
  );
  let bufferAmount: number;
  if (emergencyPockets.length > 0) {
    bufferAmount = emergencyPockets.reduce((s, p) => s + p.allocated, 0);
  } else {
    bufferAmount = pocketList.reduce((s, p) => s + Math.max(0, p.allocated - p.spent), 0);
  }
  const monthsCovered = bufferAmount / avgMonthlySpending;
  const score = Math.round(Math.min(100, (monthsCovered / 6) * 100));
  return Math.max(0, Math.min(100, score));
}

export function calculateGoalScore(goalList: Goal[]): number {
  if (goalList.length === 0) return 60;
  const onTrackCount = goalList.filter(g => {
    const progress = g.current / g.target;
    return progress >= 0.5;
  }).length;
  const score = Math.round((onTrackCount / goalList.length) * 100);
  return Math.max(0, Math.min(100, score));
}

// ─── Composite score ──────────────────────────────────────────

export function calculateCompositeScore(pillarScores: Record<PillarId, number>): number {
  let composite = 0;
  for (const [pillar, score] of Object.entries(pillarScores)) {
    const weight = PILLAR_WEIGHTS[pillar] ?? 0;
    composite += score * weight;
  }
  return Math.round(Math.max(0, Math.min(100, composite)));
}

// ─── Metrics generation ───────────────────────────────────────

interface MetricDataInput {
  budgets: Budget[];
  pockets: PfmPocket[];
  goals: Goal[];
  accounts: PfmAccount[];
  cashflow: CashflowSummary;
}

export function generatePillarMetrics(
  pillarId: PillarId,
  data: MetricDataInput,
): PillarMetric[] {
  switch (pillarId) {
    case 'spending': {
      const totalSpent = data.budgets.reduce((s, b) => s + b.spent, 0);
      const totalLimit = data.budgets.reduce((s, b) => s + b.limit, 0);
      const overBudget = data.budgets.filter(b => b.spent > b.limit).length;
      return [
        { label: 'Total spent', value: formatEuro(totalSpent), target: formatEuro(totalLimit), status: totalSpent <= totalLimit ? 'on-track' : 'behind' },
        { label: 'Categories on track', value: `${data.budgets.length - overBudget}/${data.budgets.length}`, status: overBudget === 0 ? 'ahead' : overBudget <= 1 ? 'on-track' : 'behind' },
        { label: 'Over budget', value: `${overBudget} categories`, status: overBudget === 0 ? 'ahead' : 'behind' },
      ];
    }
    case 'savings': {
      const income = data.cashflow.received;
      const totalSavedPockets = data.pockets.reduce((s, p) => s + Math.max(0, p.allocated - p.spent), 0);
      const totalSavedGoals = data.goals.reduce((s, g) => s + g.current, 0);
      const totalSaved = totalSavedPockets + totalSavedGoals;
      const rate = income > 0 ? Math.round((totalSaved / income) * 100) : 0;
      return [
        { label: 'Savings rate', value: `${rate}%`, target: '20%', status: rate >= 20 ? 'ahead' : rate >= 10 ? 'on-track' : 'behind' },
        { label: 'Total saved', value: formatEuro(totalSaved), status: totalSaved > 0 ? 'on-track' : 'behind' },
        { label: 'Active goals', value: `${data.goals.length}`, status: data.goals.length > 0 ? 'on-track' : 'behind' },
      ];
    }
    case 'debt': {
      const creditAccounts = data.accounts.filter(a => a.type === 'credit');
      const totalDebt = creditAccounts.reduce((s, a) => s + Math.abs(a.balance), 0);
      const utilization = creditAccounts.length > 0
        ? Math.round((totalDebt / (creditAccounts.length * 2300)) * 100)
        : 0;
      return [
        { label: 'Total debt', value: formatEuro(totalDebt), status: totalDebt === 0 ? 'ahead' : totalDebt < 1150 ? 'on-track' : 'behind' },
        { label: 'Credit utilization', value: `${utilization}%`, target: '<30%', status: utilization < 30 ? 'ahead' : utilization < 50 ? 'on-track' : 'behind' },
        { label: 'Credit accounts', value: `${creditAccounts.length}`, status: 'on-track' },
      ];
    }
    case 'buffer': {
      const avgMonthlySpending = 2890;
      const bufferAmount = data.pockets.reduce((s, p) => s + Math.max(0, p.allocated - p.spent), 0);
      const months = bufferAmount / avgMonthlySpending;
      return [
        { label: 'Buffer amount', value: formatEuro(bufferAmount), status: months >= 3 ? 'on-track' : 'behind' },
        { label: 'Months covered', value: `${months.toFixed(1)}`, target: '6 months', status: months >= 6 ? 'ahead' : months >= 3 ? 'on-track' : 'behind' },
        { label: 'Monthly essentials', value: formatEuro(avgMonthlySpending), status: 'on-track' },
      ];
    }
    case 'goals': {
      const onTrack = data.goals.filter(g => g.current / g.target >= 0.5).length;
      const totalProgress = data.goals.length > 0
        ? Math.round(data.goals.reduce((s, g) => s + (g.current / g.target) * 100, 0) / data.goals.length)
        : 0;
      return [
        { label: 'Goals on track', value: `${onTrack}/${data.goals.length}`, status: onTrack === data.goals.length ? 'ahead' : onTrack > 0 ? 'on-track' : 'behind' },
        { label: 'Average progress', value: `${totalProgress}%`, status: totalProgress >= 60 ? 'ahead' : totalProgress >= 30 ? 'on-track' : 'behind' },
        { label: 'Active goals', value: `${data.goals.length}`, status: data.goals.length >= 2 ? 'on-track' : 'behind' },
      ];
    }
  }
}

// ─── Improvement actions ──────────────────────────────────────

export function generateImprovementActions(
  pillarId: PillarId,
  data: MetricDataInput,
): ImprovementAction[] {
  switch (pillarId) {
    case 'spending': {
      const actions: ImprovementAction[] = [];
      if (data.budgets.length === 0) {
        actions.push({
          id: 'spending-set-budget',
          icon: '📊',
          title: 'Set a budget',
          description: 'Create your first budget to start tracking spending.',
          impact: 'high',
          estimatedPoints: 15,
          route: '/budgets-detail',
        });
      }
      const overBudget = data.budgets.filter(b => b.spent > b.limit);
      if (overBudget.length > 0) {
        const worst = overBudget.sort((a, b) => (b.spent / b.limit) - (a.spent / a.limit))[0];
        actions.push({
          id: 'spending-reduce-category',
          icon: '✂️',
          title: `Reduce ${worst.name} spending`,
          description: `You're ${formatEuro(Math.round(worst.spent - worst.limit))} over your ${worst.name} budget.`,
          impact: 'high',
          estimatedPoints: 10,
          route: `/category/${worst.name}`,
        });
      }
      actions.push({
        id: 'spending-review-subs',
        icon: '🔄',
        title: 'Review subscriptions',
        description: 'Check for unused subscriptions you could cancel.',
        impact: 'medium',
        estimatedPoints: 5,
        intentTag: 'review-subscriptions',
      });
      return actions;
    }
    case 'savings': {
      const actions: ImprovementAction[] = [];
      const income = data.cashflow.received;
      const totalSavedPockets = data.pockets.reduce((s, p) => s + Math.max(0, p.allocated - p.spent), 0);
      const totalSavedGoals = data.goals.reduce((s, g) => s + g.current, 0);
      const rate = income > 0 ? (totalSavedPockets + totalSavedGoals) / income : 0;
      if (rate < 0.20) {
        actions.push({
          id: 'savings-increase-rate',
          icon: '💰',
          title: 'Boost your savings rate',
          description: `You're saving ${Math.round(rate * 100)}% — aim for 20%.`,
          impact: 'high',
          estimatedPoints: 15,
          route: '/pockets/create',
        });
      }
      if (data.goals.length === 0) {
        actions.push({
          id: 'savings-create-goal',
          icon: '🎯',
          title: 'Set a savings goal',
          description: 'Goals help you save with purpose.',
          impact: 'high',
          estimatedPoints: 10,
          route: '/goals/create',
        });
      }
      actions.push({
        id: 'savings-automate',
        icon: '⚡',
        title: 'Automate your savings',
        description: 'Set up auto-transfers so you save consistently.',
        impact: 'medium',
        estimatedPoints: 8,
        intentTag: 'automate-savings',
      });
      return actions;
    }
    case 'debt': {
      const creditAccounts = data.accounts.filter(a => a.type === 'credit');
      const actions: ImprovementAction[] = [];
      if (creditAccounts.length > 0) {
        const totalDebt = creditAccounts.reduce((s, a) => s + Math.abs(a.balance), 0);
        actions.push({
          id: 'debt-pay-down',
          icon: '📉',
          title: 'Pay down credit card',
          description: `You owe ${formatEuro(totalDebt)} — paying extra saves on interest.`,
          impact: 'high',
          estimatedPoints: 12,
          intentTag: 'pay-down-debt',
        });
      }
      actions.push({
        id: 'debt-avoid-new',
        icon: '🛡️',
        title: 'Avoid new debt',
        description: 'Use pockets for planned purchases instead of credit.',
        impact: 'medium',
        estimatedPoints: 5,
        route: '/pockets/create',
      });
      return actions;
    }
    case 'buffer': {
      const actions: ImprovementAction[] = [];
      const bufferAmount = data.pockets.reduce((s, p) => s + Math.max(0, p.allocated - p.spent), 0);
      const months = bufferAmount / 2890;
      if (months < 6) {
        actions.push({
          id: 'buffer-build-emergency',
          icon: '🏦',
          title: 'Build your emergency fund',
          description: `You have ${months.toFixed(1)} months of buffer — aim for 6.`,
          impact: 'high',
          estimatedPoints: 15,
          route: '/pockets/create',
        });
      }
      actions.push({
        id: 'buffer-coach-plan',
        icon: '🤖',
        title: 'Get a buffer plan from Coach',
        description: 'Ask the coach to help you build your financial safety net.',
        impact: 'medium',
        estimatedPoints: 5,
        intentTag: 'buffer-plan',
      });
      return actions;
    }
    case 'goals': {
      const actions: ImprovementAction[] = [];
      if (data.goals.length === 0) {
        actions.push({
          id: 'goals-create-first',
          icon: '🎯',
          title: 'Create your first goal',
          description: 'Set a target and start saving towards it.',
          impact: 'high',
          estimatedPoints: 10,
          route: '/goals/create',
        });
      }
      const behindGoals = data.goals.filter(g => g.current / g.target < 0.5);
      if (behindGoals.length > 0) {
        actions.push({
          id: 'goals-catch-up',
          icon: '🚀',
          title: `Boost ${behindGoals[0].name} savings`,
          description: `${behindGoals[0].name} is behind — increase auto-transfers to catch up.`,
          impact: 'high',
          estimatedPoints: 8,
          route: '/goals/create',
        });
      }
      actions.push({
        id: 'goals-add-more',
        icon: '➕',
        title: 'Add another goal',
        description: 'More goals keep you motivated and improve your score.',
        impact: 'low',
        estimatedPoints: 3,
        route: '/goals/create',
      });
      return actions;
    }
  }
}

// ─── Monthly history ──────────────────────────────────────────

const MONTH_NAMES = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

export function generateMonthlyHistory(
  currentPillars: Record<PillarId, number>,
): MonthlyScore[] {
  const pillarIds: PillarId[] = ['spending', 'savings', 'debt', 'buffer', 'goals'];
  const history: MonthlyScore[] = [];

  let seed = 42;
  const pseudoRandom = (): number => {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed % 100) / 100;
  };

  const current: Record<PillarId, number> = { ...currentPillars };

  for (let i = 5; i >= 0; i--) {
    if (i === 5) {
      const overall = calculateCompositeScore(current);
      history.push({
        month: MONTH_NAMES[i],
        overall,
        pillars: { ...current },
      });
    } else {
      const pillars: Record<PillarId, number> = {} as Record<PillarId, number>;
      for (const pid of pillarIds) {
        const delta = Math.round((pseudoRandom() * 10) - 5);
        const prevScore = (history[0]?.pillars[pid] ?? current[pid]) - delta;
        pillars[pid] = Math.max(0, Math.min(100, prevScore));
      }
      const overall = calculateCompositeScore(pillars);
      history.unshift({
        month: MONTH_NAMES[i],
        overall,
        pillars,
      });
    }
  }

  return history;
}

// ─── Trend helpers ────────────────────────────────────────────

export function getPillarTrend(history: MonthlyScore[], pillarId: PillarId): Trend {
  if (history.length < 2) return 'stable';
  const latest = history[history.length - 1].pillars[pillarId];
  const previous = history[history.length - 2].pillars[pillarId];
  const diff = latest - previous;
  if (diff > 2) return 'improving';
  if (diff < -2) return 'declining';
  return 'stable';
}

export function getPillarDelta(history: MonthlyScore[], pillarId: PillarId): number {
  if (history.length < 2) return 0;
  const latest = history[history.length - 1].pillars[pillarId];
  const previous = history[history.length - 2].pillars[pillarId];
  return latest - previous;
}

// ─── Orchestrator ─────────────────────────────────────────────

export function buildHealthScore(
  budgetList: Budget[],
  pocketList: PfmPocket[],
  goalList: Goal[],
  accountList: PfmAccount[],
  cashflow: CashflowSummary,
): HealthScore {
  const pillarIds: PillarId[] = ['spending', 'savings', 'debt', 'buffer', 'goals'];

  const pillarScoreValues: Record<PillarId, number> = {
    spending: calculateSpendingScore(budgetList),
    savings: calculateSavingsScore(pocketList, goalList, cashflow),
    debt: calculateDebtScore(accountList),
    buffer: calculateBufferScore(pocketList),
    goals: calculateGoalScore(goalList),
  };

  const overall = calculateCompositeScore(pillarScoreValues);
  const history = generateMonthlyHistory(pillarScoreValues);

  const metricData: MetricDataInput = { budgets: budgetList, pockets: pocketList, goals: goalList, accounts: accountList, cashflow };

  const pillars: PillarScore[] = pillarIds.map(id => ({
    id,
    label: PILLAR_LABELS[id] ?? id,
    score: pillarScoreValues[id],
    rating: getRating(pillarScoreValues[id]),
    weight: PILLAR_WEIGHTS[id] ?? 0,
    trend: getPillarTrend(history, id),
    delta: getPillarDelta(history, id),
    metrics: generatePillarMetrics(id, metricData),
    actions: generateImprovementActions(id, metricData),
  }));

  return {
    overall,
    rating: getRating(overall),
    pillars,
    history,
    lastUpdated: new Date().toISOString(),
  };
}

// ─── Household score ──────────────────────────────────────────

export function buildHouseholdScore(
  memberScores: MemberScore[],
  incomeShares: number[],
): HouseholdHealthScore {
  const adults = memberScores.filter(m => m.role === 'adult');
  const adultShares = incomeShares.slice(0, adults.length);
  const totalShare = adultShares.reduce((s, sh) => s + sh, 0);

  let weightedScore = 0;
  adults.forEach((m, i) => {
    const share = totalShare > 0 ? adultShares[i] / totalShare : 1 / adults.length;
    weightedScore += m.score * share;
  });

  const overall = Math.round(weightedScore);

  const base = buildHealthScore(
    defaultBudgets,
    defaultPockets,
    defaultGoals,
    defaultAccounts,
    defaultCashflow,
  );

  return {
    ...base,
    overall,
    rating: getRating(overall),
    members: memberScores,
  };
}

// ─── Convenience export ───────────────────────────────────────

export function getDefaultHealthScore(): HealthScore {
  return buildHealthScore(
    defaultBudgets,
    defaultPockets,
    defaultGoals,
    defaultAccounts,
    defaultCashflow,
  );
}

// ─── Dashboard helpers ────────────────────────────────────────

/** Get the single most impactful improvement action across all pillars */
export function getTopRecommendation(score: HealthScore): ImprovementAction | null {
  if (score.pillars.length === 0) return null;
  const sorted = [...score.pillars].sort((a, b) => a.score - b.score);
  const weakest = sorted[0];
  const actions = weakest.actions;
  if (actions.length === 0) return null;
  const impactOrder: Record<string, number> = { high: 3, medium: 2, low: 1 };
  const ranked = [...actions].sort(
    (a, b) => (impactOrder[b.impact] ?? 0) - (impactOrder[a.impact] ?? 0),
  );
  return ranked[0];
}

/** Get spending summary for dashboard widget */
export function getSpendingSummary(): {
  totalSpent: number;
  totalBudget: number;
  budgetsOnTrack: number;
  totalBudgets: number;
  topCategories: Array<{ name: string; icon: string; spent: number; limit: number }>;
} {
  const totalSpent = defaultBudgets.reduce((s, b) => s + b.spent, 0);
  const totalBudget = defaultBudgets.reduce((s, b) => s + b.limit, 0);
  const budgetsOnTrack = defaultBudgets.filter(b => b.spent <= b.limit).length;
  const topCategories = [...defaultBudgets]
    .sort((a, b) => b.spent - a.spent)
    .slice(0, 3)
    .map(b => ({ name: b.name, icon: b.icon, spent: b.spent, limit: b.limit }));

  return {
    totalSpent,
    totalBudget,
    budgetsOnTrack,
    totalBudgets: defaultBudgets.length,
    topCategories,
  };
}

/** Get savings summary for dashboard widget */
export function getSavingsSummary(): {
  savingsRate: number;
  targetRate: number;
  monthlySaved: number;
  monthlyIncome: number;
} {
  const monthlyIncome = defaultCashflow.received;
  if (monthlyIncome <= 0) {
    return { savingsRate: 0, targetRate: 20, monthlySaved: 0, monthlyIncome: 0 };
  }
  const totalSavedPockets = defaultPockets.reduce((s, p) => s + Math.max(0, p.allocated - p.spent), 0);
  const monthlySaved = totalSavedPockets;
  const savingsRate = Math.round((monthlySaved / monthlyIncome) * 100);

  return {
    savingsRate: Math.max(0, Math.min(100, savingsRate)),
    targetRate: 20,
    monthlySaved: Math.max(0, monthlySaved),
    monthlyIncome,
  };
}

/** Get debt summary for dashboard widget */
export function getDebtSummary(): {
  totalDebt: number;
  creditLimit: number;
  utilization: number;
  bufferMonths: number;
  targetBufferMonths: number;
} {
  const creditAccounts = defaultAccounts.filter(a => a.type === 'credit');
  const totalDebt = creditAccounts.reduce((s, a) => s + Math.abs(a.balance), 0);
  const assumedLimitPerAccount = 2300;
  const creditLimit = creditAccounts.length * assumedLimitPerAccount;
  const utilization = creditLimit > 0
    ? Math.round((totalDebt / creditLimit) * 100)
    : 0;

  const savingsBalance = defaultAccounts
    .filter(a => a.type === 'savings')
    .reduce((s, a) => s + a.balance, 0);
  const pocketSurplus = defaultPockets.reduce(
    (s, p) => s + Math.max(0, p.allocated - p.spent), 0,
  );
  const totalBuffer = savingsBalance + pocketSurplus;
  const monthlySpending = defaultCashflow.spent > 0 ? defaultCashflow.spent : 2890;
  const bufferMonths = Math.round((totalBuffer / monthlySpending) * 10) / 10;

  return {
    totalDebt,
    creditLimit,
    utilization: Math.max(0, Math.min(100, utilization)),
    bufferMonths,
    targetBufferMonths: 6,
  };
}
