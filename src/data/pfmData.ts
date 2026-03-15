import type {
  PfmAccount,
  PfmTransaction,
  PfmCategory,
  Budget,
  Goal,
  PfmPocket,
  InsightCard,
  HouseholdMember,
  WellnessStage,
  Mission,
  Achievement,
  CashflowSummary,
  TopSpendCategory,
  SpendingCategory,
  SavingsBannerData,
  NwgCategoryBreakdown,
  CategoryMonthlyData,
  KidAccount,
  Chore,
  SavingsGoalKid,
  Dependent,
  CohortProfile,
  HealthScore,
  CoachNudge,
  NwgType,
  RhythmTarget,
  RhythmScoreImpact,
  PillarId,
} from './types';
import { PILLAR_WEIGHTS } from './constants';

// ─── Accounts ─────────────────────────────────────────────────

export const accounts: PfmAccount[] = [
  { id: '1', name: 'Current Account', type: 'checking', balance: 4890.60, currency: 'EUR' },
  { id: '2', name: 'Savings', type: 'savings', balance: 9830.00, currency: 'EUR' },
  { id: '3', name: 'Credit Card', type: 'credit', balance: -486.35, currency: 'EUR' },
];

// ─── Transactions ─────────────────────────────────────────────

export const recentTransactions: PfmTransaction[] = [
  { id: '1', name: 'Albert Heijn', amount: -72.10, category: 'Groceries', categoryIcon: '🛒', date: 'Today', nwgType: 'need' },
  { id: '2', name: 'Netflix', amount: -17.99, category: 'Entertainment', categoryIcon: '🎬', date: 'Today', nwgType: 'want' },
  { id: '3', name: 'Shell', amount: -52.00, category: 'Transport', categoryIcon: '🚗', date: 'Yesterday', nwgType: 'need' },
  { id: '4', name: 'Uber Eats', amount: -21.40, category: 'Dining', categoryIcon: '🍽️', date: 'Yesterday', nwgType: 'want' },
  { id: '5', name: 'Salary', amount: 3700, category: 'Income', categoryIcon: '💰', date: 'Mar 1', nwgType: 'growth' },
  { id: '6', name: 'Spotify', amount: -10.99, category: 'Entertainment', categoryIcon: '🎵', date: 'Mar 1', nwgType: 'want' },
  { id: '7', name: 'DeGiro ETF', amount: -230, category: 'Investments', categoryIcon: '📈', date: 'Mar 1', nwgType: 'growth' },
  { id: '8', name: 'Municipality Tax', amount: -214, category: 'Bills', categoryIcon: '🏛️', date: 'Mar 1', nwgType: 'need' },
];

// ─── NWG Categories (single source of truth) ────────────────

export const pfmCategories: PfmCategory[] = [
  // Needs
  { id: 'cat-1', name: 'Housing', icon: '🏠', nwgType: 'need', spent: 1450, txCount: 3 },
  { id: 'cat-2', name: 'Groceries', icon: '🛒', nwgType: 'need', spent: 620, txCount: 12 },
  { id: 'cat-3', name: 'Transport', icon: '🚗', nwgType: 'need', spent: 310, txCount: 8 },
  { id: 'cat-4', name: 'Utilities', icon: '⚡', nwgType: 'need', spent: 285, txCount: 5 },
  { id: 'cat-5', name: 'Healthcare', icon: '💊', nwgType: 'need', spent: 252, txCount: 4 },
  { id: 'cat-6', name: 'Phone & Internet', icon: '📱', nwgType: 'need', spent: 200, txCount: 2 },
  // Wants
  { id: 'cat-7', name: 'Dining', icon: '🍽️', nwgType: 'want', spent: 385, txCount: 15 },
  { id: 'cat-8', name: 'Shopping', icon: '🛍️', nwgType: 'want', spent: 275, txCount: 8 },
  { id: 'cat-9', name: 'Entertainment', icon: '🎬', nwgType: 'want', spent: 180, txCount: 6 },
  { id: 'cat-10', name: 'Travel', icon: '✈️', nwgType: 'want', spent: 300, txCount: 2 },
  { id: 'cat-11', name: 'Fitness', icon: '💪', nwgType: 'want', spent: 120, txCount: 3 },
  { id: 'cat-12', name: 'Personal care', icon: '💇', nwgType: 'want', spent: 80, txCount: 4 },
  { id: 'cat-13', name: 'Coffee & Snacks', icon: '☕', nwgType: 'want', spent: 127, txCount: 18 },
  // Growth
  { id: 'cat-14', name: 'Investments', icon: '📈', nwgType: 'growth', spent: 230, txCount: 1 },
  { id: 'cat-15', name: 'Savings', icon: '🏦', nwgType: 'growth', spent: 432, txCount: 2 },
];

// ─── Budgets (subset of categories that have spending limits) ─

export const budgets: Budget[] = [
  { id: '1', name: 'Groceries', icon: '🛒', spent: 620, limit: 700, nwgType: 'need' },
  { id: '2', name: 'Dining', icon: '🍽️', spent: 385, limit: 400, nwgType: 'want' },
  { id: '3', name: 'Transport', icon: '🚗', spent: 310, limit: 350, nwgType: 'need' },
  { id: '4', name: 'Entertainment', icon: '🎬', spent: 180, limit: 200, nwgType: 'want' },
  { id: '5', name: 'Shopping', icon: '🛍️', spent: 275, limit: 300, nwgType: 'want' },
  { id: '6', name: 'Coffee & Snacks', icon: '☕', spent: 127, limit: 100, nwgType: 'want' },
  { id: '7', name: 'Housing', icon: '🏠', spent: 1450, limit: 1500, nwgType: 'need' },
];

// ─── Goals ────────────────────────────────────────────────────

export const goals: Goal[] = [
  { id: '1', name: 'Emergency Fund', current: 4510, target: 6940, targetDate: 'Dec 2026', autoTransfer: 230, autoTransferEnabled: true },
  { id: '2', name: 'Holiday', current: 925, target: 2310, targetDate: 'Aug 2026', autoTransfer: 115, autoTransferEnabled: true },
  { id: '3', name: 'New Laptop', current: 1530, target: 1735, targetDate: 'May 2026', autoTransfer: 87, autoTransferEnabled: true },
];

// ─── Pockets ──────────────────────────────────────────────────

export const pockets: PfmPocket[] = [
  { id: '1', name: 'Daily Spending', icon: '💳', allocated: 230, spent: 98, linkedCards: 1, autoFunded: true },
  { id: '2', name: 'Bills', icon: '🏠', allocated: 1735, spent: 1422, linkedCards: 0, autoFunded: true },
  { id: '3', name: 'Groceries', icon: '🛒', allocated: 580, spent: 440, linkedCards: 2, autoFunded: true },
  { id: '4', name: 'Fun Money', icon: '🎉', allocated: 175, spent: 56, linkedCards: 1, autoFunded: false },
];

// ─── Insights ─────────────────────────────────────────────────

export const insights: InsightCard[] = [
  { id: '1', type: 'summary', title: 'Morning Financial Briefing', body: 'Your finances look healthy today. Balance is up €139 from last week.', time: '8:00 AM', accentColor: '#295EFF' },
  { id: '2', type: 'anomaly', title: 'Unusual charge detected', body: '€104.09 at TechStore — higher than your typical electronics spending.', time: '9:15 AM', accentColor: '#E5553B' },
  { id: '3', type: 'celebration', title: 'Savings milestone!', body: "You've saved €578 this month — 83% of your €694 goal.", time: '10:30 AM', accentColor: '#1BA97F' },
  { id: '4', type: 'offer', title: '5% cashback at Albert Heijn', body: 'Based on your grocery spending patterns. Valid through March 20.', time: '11:00 AM', accentColor: '#295EFF' },
  { id: '5', type: 'irregular', title: 'Car insurance due in 6 weeks', body: '€555 due Apr 15. Start setting aside €93/week?', time: '11:30 AM', accentColor: '#F5A623' },
  { id: '6', type: 'proximity', title: 'Eating out budget: 85% used', body: '€196 of €230 spent with 10 days left this month.', time: '12:00 PM', accentColor: '#E5553B' },
  { id: '7', type: 'benchmark', title: 'How you compare', body: "People with similar income save about 18% — you're at 15%. You're close!", time: '2:00 PM', accentColor: '#00BCD4' },
];

// ─── Household ────────────────────────────────────────────────

export const householdMembers: HouseholdMember[] = [
  { id: '1', name: 'Marcus', role: 'Dad', avatar: '👨', color: '#295EFF', spending: 3285, isChild: false },
  { id: '2', name: 'Lisa', role: 'Mum', avatar: '👩', color: '#79C716', spending: 2555, isChild: false },
  { id: '3', name: 'Alex', role: 'Teen', avatar: '🧑', color: '#FF6B35', spending: 393, isChild: true },
  { id: '4', name: 'Emma', role: 'Kid', avatar: '👧', color: '#A855F7', spending: 139, isChild: true },
];

// ─── Wellness Stages ──────────────────────────────────────────

export const wellnessStages: WellnessStage[] = [
  { id: '1', name: 'Awareness', status: 'completed', progress: 100, description: 'Know where your money goes' },
  { id: '2', name: 'Control', status: 'active', progress: 60, description: 'Take charge of spending' },
  { id: '3', name: 'Fitness', status: 'locked', progress: 0, description: 'Build financial muscle' },
  { id: '4', name: 'Growth', status: 'locked', progress: 0, description: 'Grow your wealth' },
];

// ─── Missions ─────────────────────────────────────────────────

export const missions: Mission[] = [
  { id: '0', name: 'Connect 2+ accounts', progress: 2, total: 2, xp: 50, category: 'awareness', stageId: '1' },
  { id: '1', name: 'View spending breakdown', progress: 1, total: 1, xp: 50, category: 'awareness', stageId: '1' },
  { id: '2', name: 'Review 3 subscriptions', progress: 2, total: 3, xp: 100, category: 'control', stageId: '2' },
  { id: '3', name: 'Stay under food budget 7 days', progress: 4, total: 7, xp: 150, category: 'control', stageId: '2' },
  { id: '4', name: 'Set up auto-savings', progress: 0, total: 1, xp: 200, category: 'autosave', stageId: '2' },
  { id: '5', name: 'Create 3 budgets', progress: 3, total: 3, xp: 150, category: 'fitness', stageId: '3' },
  { id: '6', name: 'Hit first savings goal', progress: 0, total: 1, xp: 200, category: 'fitness', stageId: '3' },
  { id: '7', name: '7-day streak', progress: 5, total: 7, xp: 100, category: 'fitness', stageId: '3' },
  { id: '8', name: 'Open investment account', progress: 1, total: 1, xp: 250, category: 'growth', stageId: '4' },
  { id: '9', name: 'First investment from €5', progress: 0, total: 1, xp: 300, category: 'growth', stageId: '4' },
];

// ─── Achievements ─────────────────────────────────────────────

export const achievements: Achievement[] = [
  { id: '1', name: 'First Budget', icon: '📊', earned: true, progress: 100 },
  { id: '2', name: '7-Day Streak', icon: '🔥', earned: true, progress: 100 },
  { id: '3', name: 'Subscription Slayer', icon: '✂️', earned: true, progress: 100 },
  { id: '4', name: 'Savings Superstar', icon: '⭐', earned: false, progress: 60 },
  { id: '5', name: 'Investment Ready', icon: '📈', earned: false, progress: 0 },
];

// ─── Cashflow ─────────────────────────────────────────────────

export const cashflowSummary: CashflowSummary = {
  received: 3700,
  spent: 1966,
  upcoming: 561,
  dateRange: '1 – 31 Mar',
};

// ─── Spending Categories ──────────────────────────────────────

export const topSpendCategories: TopSpendCategory[] = [
  { id: '1', name: 'Groceries', icon: '🛒', amount: 440, percentage: 22 },
  { id: '2', name: 'Bills', icon: '🏛️', amount: 359, percentage: 18 },
  { id: '3', name: 'Transport', icon: '🚗', amount: 191, percentage: 10 },
  { id: '4', name: 'Dining', icon: '🍽️', amount: 168, percentage: 9 },
  { id: '5', name: 'Entertainment', icon: '🎬', amount: 86, percentage: 4 },
  { id: '6', name: 'Shopping', icon: '🛍️', amount: 110, percentage: 6 },
];

export const spendingCategories: SpendingCategory[] = [
  { id: '1', name: 'Groceries', icon: '🛒', amount: 440 },
  { id: '2', name: 'Bills & Utilities', icon: '🏛️', amount: 359 },
  { id: '3', name: 'Transport', icon: '🚗', amount: 191 },
  { id: '4', name: 'Dining Out', icon: '🍽️', amount: 168 },
  { id: '5', name: 'Entertainment', icon: '🎬', amount: 86 },
];

export const savingsBanner: SavingsBannerData = {
  title: 'Set your savings priorities',
  body: "Tell us what matters most and we'll help you get there faster.",
  ctaLabel: 'Get started',
};

export const nwgSummary = { needs: 52, wants: 28, growth: 20 };

// ═══════════════════════════════════════════════════════════════
// PFM INSIGHTS — Health Score, Cashflow, NWG, Spotlight, Coach
// ═══════════════════════════════════════════════════════════════

// ─── 1. Health Score ──────────────────────────────────────────

export const healthScoreData: HealthScore = {
  overall: 74,
  rating: 'good',
  lastUpdated: '2026-03-15',
  pillars: [
    {
      id: 'spending',
      label: 'Spending',
      score: 82,
      rating: 'excellent',
      trend: 'improving',
      delta: 3,
      weight: 0.25,
      metrics: [
        { label: 'Budget adherence', value: '91%', target: '85%', status: 'ahead' },
        { label: 'Needs/Wants ratio', value: '58/42', target: '50/50', status: 'on-track' },
        { label: 'Month-over-month change', value: '-4%', status: 'ahead' },
      ],
      actions: [
        { id: 'sp-1', icon: 'restaurant', title: 'Cap dining out', description: 'Limit eating out to 2x per week to save ~€80/month.', impact: 'high', estimatedPoints: 5 },
        { id: 'sp-2', icon: 'subscriptions', title: 'Review subscriptions', description: 'You have 6 active subscriptions. Cancel any you rarely use.', impact: 'medium', estimatedPoints: 3 },
      ],
    },
    {
      id: 'savings',
      label: 'Savings',
      score: 71,
      rating: 'good',
      trend: 'stable',
      delta: 0,
      weight: 0.25,
      metrics: [
        { label: 'Savings rate', value: '15%', target: '20%', status: 'behind' },
        { label: 'Monthly contribution', value: '€432', target: '€500', status: 'behind' },
        { label: 'Goal progress', value: '65%', status: 'on-track' },
      ],
      actions: [
        { id: 'sv-1', icon: 'trending_up', title: 'Boost auto-save', description: 'Increase your automatic transfer by €50/month to hit your 20% target.', impact: 'high', estimatedPoints: 6 },
        { id: 'sv-2', icon: 'account_balance', title: 'Open a term deposit', description: 'Lock €2,000 in a 12-month deposit at 3.2% for guaranteed growth.', impact: 'medium', estimatedPoints: 4 },
        { id: 'sv-3', icon: 'savings', title: 'Round-up savings', description: 'Enable round-ups on daily purchases to save effortlessly.', impact: 'low', estimatedPoints: 2 },
      ],
    },
    {
      id: 'debt',
      label: 'Debt',
      score: 68,
      rating: 'good',
      trend: 'improving',
      delta: 5,
      weight: 0.20,
      metrics: [
        { label: 'Debt-to-income', value: '18%', target: '15%', status: 'behind' },
        { label: 'Credit utilisation', value: '24%', target: '30%', status: 'ahead' },
      ],
      actions: [
        { id: 'dt-1', icon: 'credit_card_off', title: 'Pay down credit card', description: 'Pay €200 extra this month to reduce interest charges by €14.', impact: 'high', estimatedPoints: 7 },
        { id: 'dt-2', icon: 'swap_horiz', title: 'Consolidate balances', description: 'Transfer your card balance to a 0% intro-rate card to save on interest.', impact: 'medium', estimatedPoints: 4 },
      ],
    },
    {
      id: 'buffer',
      label: 'Buffer',
      score: 65,
      rating: 'good',
      trend: 'declining',
      delta: -2,
      weight: 0.20,
      metrics: [
        { label: 'Emergency runway', value: '2.1 months', target: '3 months', status: 'behind' },
        { label: 'Buffer balance', value: '€4,510', target: '€6,940', status: 'behind' },
        { label: 'Irregular bill coverage', value: '78%', status: 'on-track' },
      ],
      actions: [
        { id: 'bf-1', icon: 'shield', title: 'Top up emergency fund', description: 'Add €150 this month to stay on track for your 3-month runway goal.', impact: 'high', estimatedPoints: 5 },
        { id: 'bf-2', icon: 'event', title: 'Plan for irregular bills', description: 'Set aside €93/week for your car insurance due in April.', impact: 'medium', estimatedPoints: 3 },
      ],
    },
    {
      id: 'goals',
      label: 'Goals',
      score: 80,
      rating: 'excellent',
      trend: 'improving',
      delta: 4,
      weight: 0.10,
      metrics: [
        { label: 'Goals on track', value: '2 of 3', status: 'on-track' },
        { label: 'Next milestone', value: 'Laptop in 8 weeks', status: 'ahead' },
      ],
      actions: [
        { id: 'gl-1', icon: 'flag', title: 'Finish laptop goal', description: 'Only €205 left — increase your transfer by €25 to finish 2 weeks early.', impact: 'high', estimatedPoints: 4 },
        { id: 'gl-2', icon: 'add_circle', title: 'Set a new goal', description: 'You have capacity to save for another goal. How about a weekend getaway?', impact: 'low', estimatedPoints: 2 },
        { id: 'gl-3', icon: 'auto_awesome', title: 'Automate holiday saving', description: 'Your holiday fund is behind schedule. Bump auto-transfer to €140/month.', impact: 'medium', estimatedPoints: 3 },
      ],
    },
  ],
  history: [
    { month: 'Oct 2025', overall: 68, pillars: { spending: 75, savings: 66, debt: 58, buffer: 67, goals: 72 } },
    { month: 'Nov 2025', overall: 69, pillars: { spending: 76, savings: 68, debt: 60, buffer: 66, goals: 73 } },
    { month: 'Dec 2025', overall: 66, pillars: { spending: 72, savings: 64, debt: 59, buffer: 64, goals: 74 } },
    { month: 'Jan 2026', overall: 70, pillars: { spending: 78, savings: 69, debt: 62, buffer: 66, goals: 76 } },
    { month: 'Feb 2026', overall: 72, pillars: { spending: 79, savings: 71, debt: 63, buffer: 67, goals: 76 } },
    { month: 'Mar 2026', overall: 74, pillars: { spending: 82, savings: 71, debt: 68, buffer: 65, goals: 80 } },
  ],
};

// ─── 2. Cashflow (Insights version) ──────────────────────────

export const cashflowData: CashflowSummary = {
  received: 6000,
  spent: 4712.50,
  upcoming: 1287.50,
  dateRange: 'March 2026',
};

// ─── 3. NWG Breakdown ────────────────────────────────────────

export const nwgBreakdownData = {
  needs: { amount: 2762.50, percentage: 46 },
  wants: { amount: 1350, percentage: 22 },
  growth: { amount: 600, percentage: 10 },
};

// ─── 4. Top Spending (Insights version) ──────────────────────

export const topSpendingData: TopSpendCategory[] = [
  { id: 'ts-1', name: 'Housing', icon: '🏠', amount: 1450, percentage: 31 },
  { id: 'ts-2', name: 'Groceries', icon: '🛒', amount: 620, percentage: 13 },
  { id: 'ts-3', name: 'Dining', icon: '🍽️', amount: 385, percentage: 8 },
  { id: 'ts-4', name: 'Transport', icon: '🚗', amount: 310, percentage: 7 },
  { id: 'ts-5', name: 'Shopping', icon: '🛍️', amount: 275, percentage: 6 },
];

// ─── 5. Spotlight Insights ───────────────────────────────────

export const spotlightInsights: InsightCard[] = [
  {
    id: 'si-1',
    type: 'celebration',
    title: 'Spending streak!',
    body: "You've stayed under budget for 3 weeks in a row. That's your longest streak this year — keep it going!",
    time: 'Today',
    accentColor: 'var(--ion-color-success)',
  },
  {
    id: 'si-2',
    type: 'nudge',
    title: 'Savings boost',
    body: 'You have €287 in spare cash this month. Transfer it to your emergency fund to hit your target 2 weeks sooner.',
    time: 'Today',
    accentColor: 'var(--ion-color-warning)',
  },
  {
    id: 'si-3',
    type: 'anomaly',
    title: 'Unusual charge',
    body: 'Your gym membership went up from €34.99 to €39.99. That adds €60/year — worth checking if your plan changed.',
    time: 'Yesterday',
    accentColor: 'var(--ion-color-danger)',
  },
  {
    id: 'si-4',
    type: 'pattern',
    title: 'Coffee habit',
    body: "You're spending €127/month on coffee — that's €1,524/year. Cutting 2 visits per week could save €55/month.",
    time: '2 days ago',
    accentColor: 'var(--bb-color-insight-pattern)',
  },
];

// ─── 6. Coach Nudges ─────────────────────────────────────────

export const coachNudges: CoachNudge[] = [
  {
    id: 'cn-1',
    insightType: 'spending',
    title: 'You spent less this week',
    body: 'Your spending is down 12% compared to last week. Nice work staying disciplined.',
    accentColor: 'var(--ion-color-success)',
    priority: 1,
    tab: 'home',
    ctaLabel: 'See breakdown',
    quickReplies: ['How does this compare to last month?', 'Where did I save the most?', 'Set a weekly target'],
  },
  {
    id: 'cn-2',
    insightType: 'savings',
    title: 'Emergency fund check-in',
    body: "You're at 65% of your emergency fund goal. A small top-up this month keeps you on track.",
    accentColor: 'var(--ion-color-warning)',
    priority: 2,
    tab: 'spend',
    ctaLabel: 'Top up now',
    quickReplies: ['How much should I add?', 'Show my savings progress', 'Remind me next week'],
  },
  {
    id: 'cn-3',
    insightType: 'goals',
    title: 'Laptop goal almost done',
    body: "Only €205 left on your laptop goal. At your current pace, you'll reach it by early May.",
    accentColor: 'var(--ion-color-primary)',
    priority: 3,
    tab: 'plan',
    ctaLabel: 'Adjust goal',
    quickReplies: ['Can I finish it sooner?', 'What if I add €50 more?', 'Show all my goals'],
  },
];

// ─── 7. Pillar Strip Data ────────────────────────────────────

const PILLAR_ICONS: Record<string, string> = {
  spending: 'shopping_cart',
  savings: 'savings',
  debt: 'credit_card',
  buffer: 'shield',
  goals: 'flag',
};

const TREND_MAP: Record<string, 'up' | 'down' | 'flat'> = {
  improving: 'up',
  declining: 'down',
  stable: 'flat',
};

export const pillarStripData = healthScoreData.pillars.map(p => ({
  id: p.id,
  label: p.label,
  score: p.score,
  rating: p.rating,
  trend: TREND_MAP[p.trend] ?? 'flat',
  icon: PILLAR_ICONS[p.id] ?? 'help',
}));

// ─── Monthly data multipliers ─────────────────────────────────

const MONTHLY_MULTIPLIERS: Record<number, number> = {
  0: 0.85,  // January
  1: 0.95,  // February
  2: 1.0,   // March (current)
};

export const AVAILABLE_MONTHS = Object.keys(MONTHLY_MULTIPLIERS).map(Number).sort((a, b) => a - b);
export const MIN_MONTH_INDEX = AVAILABLE_MONTHS[0];
export const MAX_MONTH_INDEX = AVAILABLE_MONTHS[AVAILABLE_MONTHS.length - 1];

const MONTH_DATE_RANGES = [
  '1 – 31 Jan', '1 – 28 Feb', '1 – 31 Mar', '1 – 30 Apr',
  '1 – 31 May', '1 – 30 Jun', '1 – 31 Jul', '1 – 31 Aug',
  '1 – 30 Sep', '1 – 31 Oct', '1 – 30 Nov', '1 – 31 Dec',
];

export function getMonthlyBudgets(monthIndex: number): Budget[] {
  const mult = MONTHLY_MULTIPLIERS[monthIndex] ?? 0;
  if (mult === 0) return [];
  return budgets.map(b => ({ ...b, spent: Math.round(b.spent * mult) }));
}

export function getMonthlyCategories(monthIndex: number): SpendingCategory[] {
  const mult = MONTHLY_MULTIPLIERS[monthIndex] ?? 0;
  if (mult === 0) return [];
  return spendingCategories.map(c => ({ ...c, amount: Math.round(c.amount * mult) }));
}

export function getMonthlyCashflow(monthIndex: number): CashflowSummary {
  const mult = MONTHLY_MULTIPLIERS[monthIndex] ?? 0;
  return {
    received: Math.round(cashflowSummary.received * (mult || 0)),
    spent: Math.round(cashflowSummary.spent * (mult || 0)),
    upcoming: Math.round(cashflowSummary.upcoming * (mult || 0)),
    dateRange: MONTH_DATE_RANGES[monthIndex] || '',
  };
}

// ─── Teen / Kid data ──────────────────────────────────────────

export const kidAccount: KidAccount = {
  id: 'alex-account',
  name: "Alex's Account",
  balance: 52.30,
  allowanceAmount: 12,
  allowanceFrequency: 'weekly',
  nextAllowanceDate: 'Friday',
  parentName: 'Marcus',
};

export const chores: Chore[] = [
  { id: 'c1', name: 'Tidy room', icon: '🧹', reward: 2, status: 'completed' },
  { id: 'c2', name: 'Walk the dog', icon: '🐕', reward: 3, status: 'available' },
  { id: 'c3', name: 'Wash car', icon: '🚗', reward: 6, status: 'available' },
  { id: 'c4', name: 'Help with dinner', icon: '🍳', reward: 2, status: 'pending' },
  { id: 'c5', name: 'Homework done', icon: '📚', reward: 1, status: 'completed' },
];

export const kidSavingsGoals: SavingsGoalKid[] = [
  { id: 'kg1', name: 'Gaming headset', icon: '🎧', target: 98, saved: 75, color: '#FF6B35' },
  { id: 'kg2', name: 'Festival ticket', icon: '🎵', target: 175, saved: 46, color: '#A855F7' },
];

export const teenTransactions: PfmTransaction[] = [
  { id: 't1', name: 'Spotify', amount: -10.99, category: 'Entertainment', categoryIcon: '🎵', date: 'Today', nwgType: 'want' },
  { id: 't2', name: "Nando's", amount: -14.50, category: 'Food & Drink', categoryIcon: '🍗', date: 'Today', nwgType: 'want' },
  { id: 't3', name: 'Uber Eats', amount: -9.25, category: 'Food & Drink', categoryIcon: '🍔', date: 'Yesterday', nwgType: 'want' },
  { id: 't4', name: 'Roblox', amount: -5.79, category: 'Entertainment', categoryIcon: '🎮', date: 'Yesterday', nwgType: 'want' },
  { id: 't5', name: 'School lunch', amount: -4.05, category: 'Food & Drink', categoryIcon: '🥪', date: 'Mon', nwgType: 'need' },
  { id: 't6', name: 'Cinema', amount: -9.25, category: 'Entertainment', categoryIcon: '🎬', date: 'Sun', nwgType: 'want' },
];

export const kidAchievements: Achievement[] = [
  { id: 'ka1', name: 'First Save', icon: '💰', earned: true, progress: 100 },
  { id: 'ka2', name: 'Chore Champion', icon: '⭐', earned: true, progress: 100 },
  { id: 'ka3', name: 'Budget Boss', icon: '💰', earned: true, progress: 100 },
  { id: 'ka4', name: '7-Day Streak', icon: '🔥', earned: false, progress: 71 },
  { id: 'ka5', name: 'Smart Spender', icon: '🧠', earned: false, progress: 40 },
];

export const dependents: Dependent[] = [
  {
    id: 'alex',
    name: 'Alex',
    role: 'teen',
    avatar: '🧑',
    color: '#FF6B35',
    balance: 52.30,
    allowance: 12,
    allowanceFrequency: 'weekly',
    spending: 393,
    choresCompleted: 3,
    choresTotalWeek: 5,
    savingsGoalProgress: 72,
  },
  {
    id: 'emma',
    name: 'Emma',
    role: 'kid',
    avatar: '👧',
    color: '#A855F7',
    balance: 26.05,
    allowance: 6,
    allowanceFrequency: 'weekly',
    spending: 139,
    choresCompleted: 4,
    choresTotalWeek: 4,
    savingsGoalProgress: 45,
  },
  {
    id: 'margaret',
    name: 'Margaret',
    role: 'senior',
    avatar: '👵',
    color: '#79C716',
    lastActive: 'Today, 2:15 PM',
    billsPaidThisMonth: 4,
    billsDueThisMonth: 6,
    wellbeingStatus: 'good',
    trustedContacts: 3,
    spending: 1030,
  },
];

export const monthlySpending = [
  { month: 'Oct', amount: 3297 },
  { month: 'Nov', amount: 3586 },
  { month: 'Dec', amount: 4222 },
  { month: 'Jan', amount: 3123 },
  { month: 'Feb', amount: 3413 },
  { month: 'Mar', amount: 1388 },
];

// ─── NWG + Category Inspection helpers ────────────────────────

/** Look up a PfmCategory by name */
export function getCategoryByName(name: string): PfmCategory | undefined {
  return pfmCategories.find(c => c.name === name);
}

/** Get the budget limit for a category (if one exists) */
export function getBudgetForCategory(categoryName: string): Budget | undefined {
  return budgets.find(b => b.name === categoryName);
}

/** Get all categories filtered by NWG type, enriched with budget limit + transactions */
export function getCategoriesByNwgType(nwgType: NwgType): NwgCategoryBreakdown[] {
  const filtered = pfmCategories.filter(c => c.nwgType === nwgType);
  return filtered.map(c => {
    const budget = budgets.find(b => b.name === c.name);
    return {
      id: c.id,
      name: c.name,
      icon: c.icon,
      amount: c.spent,
      limit: budget?.limit,
      nwgType: c.nwgType,
      txCount: c.txCount,
      transactions: recentTransactions.filter(tx => tx.category === c.name),
    };
  });
}

/** Get NWG totals from pfmCategories (actual spent amounts) */
export function getNwgTotals(): { needs: number; wants: number; growth: number; total: number } {
  const needs = pfmCategories.filter(c => c.nwgType === 'need').reduce((s, c) => s + c.spent, 0);
  const wants = pfmCategories.filter(c => c.nwgType === 'want').reduce((s, c) => s + c.spent, 0);
  const growth = pfmCategories.filter(c => c.nwgType === 'growth').reduce((s, c) => s + c.spent, 0);
  const total = needs + wants + growth;
  return { needs, wants, growth, total };
}

/** Derive needs/wants category list data (replaces mockData duplicates) */
export function getNwgCategoriesData(nwgType: NwgType): {
  totalSpent: number;
  categories: { icon: string; label: string; amount: number; txCount: number; category: 'needs' | 'wants' | 'security' }[];
} {
  const cats = pfmCategories.filter(c => c.nwgType === nwgType);
  const totalSpent = cats.reduce((s, c) => s + c.spent, 0);
  const categoryLabel = nwgType === 'need' ? 'needs' : nwgType === 'want' ? 'wants' : 'security';
  return {
    totalSpent,
    categories: cats.map(c => ({
      icon: c.icon,
      label: c.name,
      amount: c.spent,
      txCount: c.txCount,
      category: categoryLabel as 'needs' | 'wants' | 'security',
    })),
  };
}

/** Monthly breakdown for a specific category — simulates 6 months of data */
export function getCategoryMonthlyBreakdown(categoryName: string): CategoryMonthlyData[] {
  const cat = pfmCategories.find(c => c.name === categoryName);
  const base = cat?.spent ?? budgets.find(b => b.name === categoryName)?.spent ?? 115;
  const monthMultipliers = [
    { month: 'Oct', mult: 0.88 },
    { month: 'Nov', mult: 0.95 },
    { month: 'Dec', mult: 1.22 },
    { month: 'Jan', mult: 0.82 },
    { month: 'Feb', mult: 0.91 },
    { month: 'Mar', mult: 1.0 },
  ];
  return monthMultipliers.map(m => ({
    month: m.month,
    amount: Math.round(base * m.mult),
  }));
}

/** Weekly breakdown for a specific category — simulates 4 weeks of current month */
export function getCategoryWeeklyBreakdown(categoryName: string): { week: string; amount: number }[] {
  const cat = pfmCategories.find(c => c.name === categoryName);
  const monthTotal = cat?.spent ?? budgets.find(b => b.name === categoryName)?.spent ?? 115;
  const weekPcts = [0.28, 0.22, 0.32, 0.18];
  return weekPcts.map((pct, i) => ({
    week: `Week ${i + 1}`,
    amount: Math.round(monthTotal * pct),
  }));
}

/** Get transactions for a specific category */
export function getTransactionsForCategory(categoryName: string): PfmTransaction[] {
  return recentTransactions.filter(tx => tx.category === categoryName);
}

/** Per-member spending for a category (household view) */
export function getCategorySpendingByMember(categoryName: string): { memberId: string; amount: number }[] {
  const cat = pfmCategories.find(c => c.name === categoryName);
  const total = cat?.spent ?? budgets.find(b => b.name === categoryName)?.spent ?? 0;
  if (total <= 0) return householdMembers.map(m => ({ memberId: m.id, amount: 0 }));

  const categorySplit: Record<string, Record<string, number>> = {
    Groceries: { '1': 0.25, '2': 0.55, '3': 0.12, '4': 0.08 },
    Dining: { '1': 0.45, '2': 0.35, '3': 0.15, '4': 0.05 },
    Transport: { '1': 0.65, '2': 0.25, '3': 0.08, '4': 0.02 },
    Entertainment: { '1': 0.40, '2': 0.30, '3': 0.20, '4': 0.10 },
    Shopping: { '1': 0.35, '2': 0.40, '3': 0.15, '4': 0.10 },
    'Coffee & Snacks': { '1': 0.50, '2': 0.30, '3': 0.15, '4': 0.05 },
    Housing: { '1': 0.50, '2': 0.50, '3': 0, '4': 0 },
  };
  const split = categorySplit[categoryName];
  if (split) {
    return householdMembers.map(m => ({
      memberId: m.id,
      amount: Math.round(total * (split[m.id] ?? 1 / householdMembers.length)),
    }));
  }
  const totalHousehold = householdMembers.reduce((s, m) => s + m.spending, 0);
  return householdMembers.map(m => ({
    memberId: m.id,
    amount: totalHousehold > 0 ? Math.round(total * (m.spending / totalHousehold)) : 0,
  }));
}

// ─── Cohort / Average helpers ─────────────────────────────────

/** Personal 6-month average spend for a category */
export function getCategoryPersonalAverage(categoryName: string): number {
  const data = getCategoryMonthlyBreakdown(categoryName);
  const sum = data.reduce((s, d) => s + d.amount, 0);
  return Math.round(sum / data.length);
}

/** Look up a category for display: tries pfmCategories first, then budgets */
export function getCategoryDisplayInfo(categoryName: string): { icon: string; spent: number; limit?: number; nwgType?: NwgType } {
  const cat = pfmCategories.find(c => c.name === categoryName);
  const budget = budgets.find(b => b.name === categoryName);
  return {
    icon: cat?.icon ?? budget?.icon ?? '📊',
    spent: cat?.spent ?? budget?.spent ?? 0,
    limit: budget?.limit,
    nwgType: cat?.nwgType ?? budget?.nwgType,
  };
}

// ─── Rhythm → Health Score Engine ─────────────────────────────

/** Current NWG actuals as percentages (from nwgBreakdownData) */
const CURRENT_GROWTH_ACTUAL = 10; // nwgBreakdownData.growth.percentage
const CURRENT_NEEDS_ACTUAL = 46;
const CURRENT_WANTS_ACTUAL = 22;

/**
 * Calculate how a user's Rhythm targets would impact their Health Score.
 * Spending + Savings pillars (50% of weight) directly reflect rhythm adherence.
 */
export function calculateRhythmImpact(target: RhythmTarget): RhythmScoreImpact {
  const pillarImpacts: RhythmScoreImpact['pillarImpacts'] = [];

  // ── Spending pillar ─────────────────────────────────────────
  const spendingPillar = healthScoreData.pillars.find(p => p.id === 'spending')!;
  let spendingBonus = 0;
  // Bonus for keeping lifestyle (wants) target tight
  if (target.wants <= 25) {
    spendingBonus += Math.round((25 - target.wants) * (5 / 25)); // up to +5
    spendingBonus = Math.min(spendingBonus, 5);
  }
  // Bonus for keeping needs target reasonable
  if (target.needs <= 55) {
    spendingBonus += Math.round((55 - target.needs) * (3 / 55)); // up to +3
    spendingBonus = Math.min(spendingBonus, spendingBonus); // already capped per component
  }
  const spendingProjected = Math.min(95, spendingPillar.score + spendingBonus);
  pillarImpacts.push({
    pillarId: 'spending',
    currentScore: spendingPillar.score,
    projectedScore: spendingProjected,
    delta: spendingProjected - spendingPillar.score,
    reason: spendingBonus > 0
      ? `Lifestyle target of ${target.wants}% tightens spending discipline (+${spendingBonus} pts)`
      : 'Spending targets are in line with current behaviour',
  });

  // ── Savings pillar ──────────────────────────────────────────
  const savingsPillar = healthScoreData.pillars.find(p => p.id === 'savings')!;
  let savingsBonus = 0;
  if (target.growth > CURRENT_GROWTH_ACTUAL) {
    savingsBonus = Math.min(15, Math.round((target.growth - CURRENT_GROWTH_ACTUAL) * 1.5));
  }
  const savingsProjected = Math.min(95, savingsPillar.score + savingsBonus);
  pillarImpacts.push({
    pillarId: 'savings',
    currentScore: savingsPillar.score,
    projectedScore: savingsProjected,
    delta: savingsProjected - savingsPillar.score,
    reason: savingsBonus > 0
      ? `Growth target of ${target.growth}% vs current ${CURRENT_GROWTH_ACTUAL}% closes the savings gap (+${savingsBonus} pts)`
      : 'Savings target matches current behaviour',
  });

  // ── Debt, Buffer, Goals — indirect spillover ────────────────
  const spillover = target.growth >= 20 ? 2 : 0;
  const indirectPillars: PillarId[] = ['debt', 'buffer', 'goals'];
  for (const pillarId of indirectPillars) {
    const pillar = healthScoreData.pillars.find(p => p.id === pillarId)!;
    const projected = Math.min(95, pillar.score + spillover);
    pillarImpacts.push({
      pillarId,
      currentScore: pillar.score,
      projectedScore: projected,
      delta: projected - pillar.score,
      reason: spillover > 0
        ? `Higher savings rate accelerates ${pillar.label.toLowerCase()} improvement (+${spillover} pts)`
        : `No indirect impact on ${pillar.label.toLowerCase()} at this savings level`,
    });
  }

  // ── Overall projected score ─────────────────────────────────
  const projectedOverall = Math.round(
    pillarImpacts.reduce((sum, pi) => {
      const weight = PILLAR_WEIGHTS[pi.pillarId] ?? 0;
      return sum + pi.projectedScore * weight;
    }, 0)
  );

  const totalDelta = projectedOverall - healthScoreData.overall;

  // ── Timeline estimation ─────────────────────────────────────
  // ~4 weeks per 5 points of improvement, capped at 12
  const timelineWeeks = Math.min(12, Math.max(1, Math.round((totalDelta / 5) * 4)));

  return {
    currentScore: healthScoreData.overall,
    projectedScore: projectedOverall,
    delta: totalDelta,
    pillarImpacts,
    timelineWeeks: totalDelta > 0 ? timelineWeeks : 0,
  };
}

// ─── Rhythm-Aware Coach Nudges ────────────────────────────────

/**
 * Generate 2-3 contextual nudges based on the gap between NWG actuals and targets.
 */
export function getRhythmNudges(target: RhythmTarget): CoachNudge[] {
  const nudges: CoachNudge[] = [];
  const income = cashflowData.received; // €6,000

  // Lifestyle (wants) gap
  const wantsGap = CURRENT_WANTS_ACTUAL - target.wants;
  if (wantsGap > 0) {
    const euroGap = Math.round(income * (wantsGap / 100));
    nudges.push({
      id: 'rn-wants-gap',
      insightType: 'spending',
      title: 'Lifestyle spending above target',
      body: `Your Lifestyle spending is ${wantsGap}% above your rhythm target. Consider reducing dining or entertainment by \u20AC${euroGap} this month.`,
      accentColor: 'var(--ion-color-warning)',
      priority: 1,
      tab: 'plan',
      ctaLabel: 'See Lifestyle breakdown',
      quickReplies: ['Which categories are highest?', 'Set a weekly limit', 'Show my rhythm targets'],
    });
  }

  // Savings (growth) gap
  const growthGap = target.growth - CURRENT_GROWTH_ACTUAL;
  if (growthGap > 0) {
    const euroGap = Math.round(income * (growthGap / 100));
    nudges.push({
      id: 'rn-growth-gap',
      insightType: 'savings',
      title: 'Savings below your rhythm target',
      body: `You're saving ${growthGap}% below your Saved target. Setting up a \u20AC${euroGap} auto-transfer would close the gap.`,
      accentColor: 'var(--ion-color-primary)',
      priority: 2,
      tab: 'plan',
      ctaLabel: 'Set up auto-transfer',
      quickReplies: ['How much should I save weekly?', 'Show savings progress', 'Adjust my target'],
    });
  }

  // Needs gap
  const needsGap = CURRENT_NEEDS_ACTUAL - target.needs;
  if (needsGap > 0) {
    const euroGap = Math.round(income * (needsGap / 100));
    nudges.push({
      id: 'rn-needs-gap',
      insightType: 'spending',
      title: 'Needs spending above target',
      body: `Your Needs spending is ${needsGap}% above your rhythm target (\u20AC${euroGap}/month). Check utilities and transport for quick wins.`,
      accentColor: 'var(--ion-color-warning)',
      priority: 3,
      tab: 'plan',
      ctaLabel: 'Review Needs categories',
      quickReplies: ['Which bills can I reduce?', 'Compare to last month', 'Show my rhythm targets'],
    });
  }

  // On-track nudge (if all gaps are small)
  if (Math.abs(wantsGap) <= 3 && Math.abs(growthGap) <= 3 && Math.abs(needsGap) <= 3) {
    nudges.push({
      id: 'rn-on-track',
      insightType: 'spending',
      title: 'Great rhythm!',
      body: "You're within 3% of all targets this month. Keep up the momentum and your Health Score will climb.",
      accentColor: 'var(--ion-color-success)',
      priority: 4,
      tab: 'plan',
      ctaLabel: 'View Health Score',
      quickReplies: ['How can I improve further?', 'Show my score history', 'Set a stretch target'],
    });
  }

  return nudges;
}

const COHORT_BASE_AVERAGES: Record<string, number> = {
  Groceries: 440,
  Housing: 1350,
  Rent: 1100,
  Utilities: 168,
  Transport: 139,
  'Dining Out': 185,
  Dining: 185,
  Entertainment: 98,
  Shopping: 150,
  Subscriptions: 52,
  'Coffee & Snacks': 40,
  'Bills & Utilities': 324,
  Bills: 324,
};

/** Cohort average spend for a category, adjusted by psychographic profile */
export function getCategoryCohortAverage(categoryName: string, profile?: CohortProfile | null): number {
  const base = COHORT_BASE_AVERAGES[categoryName] ?? 115;
  let multiplier = 1;

  if (profile && profile.householdType !== null) {
    if (profile.householdType === 'family') multiplier *= 1.4;
    else if (profile.householdType === 'couple') multiplier *= 1.2;
    else if (profile.householdType === 'single') multiplier *= 0.85;

    if (profile.hasChildren && profile.childrenCount > 0) {
      multiplier *= 1 + profile.childrenCount * 0.15;
    }

    if (profile.incomeBand === 'over-100k') multiplier *= 1.3;
    else if (profile.incomeBand === '75k-100k') multiplier *= 1.15;
    else if (profile.incomeBand === 'under-25k') multiplier *= 0.7;

    if (profile.spendingPersonality === 'saver') multiplier *= 0.85;
    else if (profile.spendingPersonality === 'spender') multiplier *= 1.15;
  }

  return Math.round(base * multiplier);
}
