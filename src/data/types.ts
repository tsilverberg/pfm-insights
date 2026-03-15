export type NwgType = 'need' | 'want' | 'growth';

export interface Transaction {
  id: string;
  name: string;
  description?: string;
  category: string;
  amount: number;
  date: string;
  logoUrl?: string;
  initials?: string;
  isPositive?: boolean;
  nwgType?: NwgType;
}

export interface TransactionGroup {
  label: string;
  transactions: Transaction[];
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment';
  lastFour: string;
  balance: number;
  iban?: string;
  bic?: string;
}

export interface CreditCard {
  id: string;
  name: string;
  lastFour: string;
  holderName: string;
  expiry: string;
  brand: 'visa' | 'mastercard';
  gradient: [string, string];
  balance: number;
  creditLimit: number;
  payFrom: string;
  cvc: string;
  pin: string;
  cardType?: string;
  cardIcon?: string;
  cardLabel?: string;
}

export interface Pocket {
  id: string;
  name: string;
  icon: string;
  iconBg: string;
  progressColor: string;
  currentAmount: number;
  targetAmount: number;
  targetDate: string;
}

export interface Contact {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
  iban?: string;
}

export interface ChildAccount {
  id: string;
  name: string;
  avatarUrl: string;
  lastFour: string;
  balance: number;
  status: 'on-track' | 'over-budget' | 'needs-attention';
  statusLabel: string;
}

export interface SettingsMenuItemData {
  id: string;
  icon: string;
  title: string;
  description?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  variant: 'primary' | 'secondary' | 'outlined';
  route?: string;
}

export interface CardPoints {
  total: number;
  pending: number;
  redeemed: number;
  transactions: Transaction[];
}

export interface Notification {
  id: string;
  type: 'info' | 'coach' | 'warning' | 'error';
  title: string;
  description: string;
  date: string;
  read: boolean;
}

export interface NotificationGroup {
  label: string;
  notifications: Notification[];
}

export interface Permission {
  id: string;
  icon: string;
  title: string;
  description: string;
  enabled: boolean;
  subOptions?: { label: string; selected: boolean }[];
}

export interface ChildAccountDetail extends ChildAccount {
  childAge: number;
  parents: { name: string; role: string; isYou?: boolean }[];
  spendingBreakdown: { label: string; percentage: number; color: string }[];
  weeklyAllowance?: number;
}

export interface AccountSettingsSection {
  section: string;
  items: { icon: string; title: string; value?: string; iconBg?: string }[];
}

export interface MoreActionsSection {
  section: string;
  items: { icon: string; title: string; description: string; iconBg?: string; danger?: boolean; route?: string }[];
}

export interface Portfolio {
  id: string;
  name: string;
  label: string;
  value: number;
  change: number;
  changePercent: number;
  sparklineData: number[];
}

export interface AllocationSegment {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

export interface GeographyAllocation {
  country: string;
  flagEmoji: string;
  value: number;
  percentage: number;
  color: string;
}

export interface InvestActivity {
  id: string;
  type: 'buy' | 'sell' | 'dividend' | 'transfer';
  title: string;
  subtitle: string;
  status: 'pending' | 'completed';
  amount: number;
  date: string;
}

export interface NewsArticle {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

export interface PortfolioValuePoint {
  date: string;
  value: number;
}

export interface SharingContact {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
  subtitle?: string;
}

export interface SharedMember {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
  role: 'owner' | 'co-owner';
  status?: 'pending' | 'approved' | 'declined';
}

export interface SharingPermissionConfig {
  id: string;
  icon: string;
  title: string;
  description: string;
  enabled: boolean;
  hasSpendingLimit?: boolean;
  spendingLimit?: number;
}

// ─── PFM Data Layer Types ─────────────────────────────────────

export interface PfmCategory {
  id: string;
  name: string;
  icon: string;
  nwgType: NwgType;
  spent: number;
  txCount: number;
}

export interface PfmAccount {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit';
  balance: number;
  currency: string;
}

export interface Budget {
  id: string;
  name: string;
  icon: string;
  spent: number;
  limit: number;
  nwgType: NwgType;
}

export interface Goal {
  id: string;
  name: string;
  current: number;
  target: number;
  targetDate: string;
  autoTransfer: number;
  autoTransferEnabled: boolean;
}

export interface PfmPocket {
  id: string;
  name: string;
  icon: string;
  allocated: number;
  spent: number;
  linkedCards: number;
  autoFunded: boolean;
}

export interface InsightCard {
  id: string;
  type: 'summary' | 'anomaly' | 'celebration' | 'offer' | 'nudge' | 'spending' | 'irregular' | 'proximity' | 'pattern' | 'benchmark';
  title: string;
  body: string;
  time: string;
  accentColor: string;
}

export interface HouseholdMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  spending: number;
  isChild: boolean;
}

export interface WellnessStage {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'locked';
  progress: number;
  description: string;
}

export interface Mission {
  id: string;
  name: string;
  progress: number;
  total: number;
  xp: number;
  category: string;
  stageId: string;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  earned: boolean;
  progress: number;
}

export interface CashflowSummary {
  received: number;
  spent: number;
  upcoming: number;
  dateRange: string;
}

export interface TopSpendCategory {
  id: string;
  name: string;
  icon: string;
  amount: number;
  percentage: number;
}

export interface SpendingCategory {
  id: string;
  name: string;
  icon: string;
  amount: number;
}

export interface SavingsBannerData {
  title: string;
  body: string;
  ctaLabel: string;
}

export interface NwgCategoryBreakdown {
  id: string;
  name: string;
  icon: string;
  amount: number;
  limit?: number;
  nwgType: NwgType;
  txCount: number;
  transactions: PfmTransaction[];
}

export interface CategoryMonthlyData {
  month: string;
  amount: number;
}

// ─── PFM Transaction (NWG-tagged, used by pfmData) ───────────

export interface PfmTransaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  categoryIcon: string;
  date: string;
  nwgType: NwgType;
}

// ─── Teen / Kid data ─────────────────────────────────────────

export interface KidAccount {
  id: string;
  name: string;
  balance: number;
  allowanceAmount: number;
  allowanceFrequency: 'weekly' | 'monthly';
  nextAllowanceDate: string;
  parentName: string;
}

export interface Chore {
  id: string;
  name: string;
  icon: string;
  reward: number;
  status: 'available' | 'pending' | 'completed' | 'approved';
  dueDate?: string;
}

export interface SavingsGoalKid {
  id: string;
  name: string;
  icon: string;
  target: number;
  saved: number;
  color: string;
}

export interface Dependent {
  id: string;
  name: string;
  role: 'teen' | 'kid' | 'senior';
  avatar: string;
  color: string;
  balance?: number;
  allowance?: number;
  allowanceFrequency?: 'weekly' | 'monthly';
  spending?: number;
  choresCompleted?: number;
  choresTotalWeek?: number;
  savingsGoalProgress?: number;
  lastActive?: string;
  billsPaidThisMonth?: number;
  billsDueThisMonth?: number;
  wellbeingStatus?: 'good' | 'check-in' | 'alert';
  trustedContacts?: number;
}

// ─── Health Score Types ───────────────────────────────────────

export type PillarId = 'spending' | 'savings' | 'debt' | 'buffer' | 'goals';
export type Rating = 'needs-attention' | 'building' | 'good' | 'excellent';
export type Trend = 'improving' | 'stable' | 'declining';

export interface PillarMetric {
  label: string;
  value: string;
  target?: string;
  status: 'on-track' | 'behind' | 'ahead';
}

export interface ImprovementAction {
  id: string;
  icon: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  estimatedPoints: number;
  route?: string;
  intentTag?: string;
}

export interface PillarScore {
  id: PillarId;
  label: string;
  score: number;
  rating: Rating;
  weight: number;
  trend: Trend;
  delta: number;
  metrics: PillarMetric[];
  actions: ImprovementAction[];
}

export interface MonthlyScore {
  month: string;
  overall: number;
  pillars: Record<PillarId, number>;
}

export interface HealthScore {
  overall: number;
  rating: Rating;
  pillars: PillarScore[];
  history: MonthlyScore[];
  lastUpdated: string;
}

export interface MemberScore {
  name: string;
  avatar: string;
  score: number;
  delta: number;
  role: 'adult' | 'teen' | 'child';
}

export interface HouseholdHealthScore extends HealthScore {
  members: MemberScore[];
}

// ─── Rhythm Target Types ─────────────────────────────────────

export interface RhythmTarget {
  needs: number;    // percentage
  wants: number;    // percentage (lifestyle)
  growth: number;   // percentage (saved)
}

export interface RhythmScoreImpact {
  currentScore: number;
  projectedScore: number;
  delta: number;
  pillarImpacts: {
    pillarId: PillarId;
    currentScore: number;
    projectedScore: number;
    delta: number;
    reason: string;
  }[];
  timelineWeeks: number;  // estimated weeks to reach projected score
}

// ─── Cohort Types ─────────────────────────────────────────────

export interface CohortProfile {
  householdType: 'single' | 'couple' | 'family' | 'shared' | null;
  hasChildren: boolean | null;
  childrenCount: number;
  incomeBand: 'under-25k' | '25k-50k' | '50k-75k' | '75k-100k' | 'over-100k' | null;
  riskAttitude: 'cautious' | 'balanced' | 'adventurous' | null;
  financialGoals: string[];
  spendingPersonality: 'saver' | 'balanced' | 'spender' | null;
}

// ─── Coach Types ──────────────────────────────────────────────

export type CoachTab = 'home' | 'spend' | 'plan' | 'more';

export interface ConversationStarter {
  id: string;
  text: string;
  tab: CoachTab;
  personaId: PersonaId;
  intentTag: string;
}

export interface CoachNudge {
  id: string;
  insightType: string;
  title: string;
  body: string;
  accentColor: string;
  priority: number;
  tab: CoachTab | 'all';
  ctaLabel: string;
  quickReplies: string[];
}

export interface CoachStatCard {
  label: string;
  value: string;
  context?: string;
  color?: string;
}

export interface CoachMessage {
  id: string;
  role: 'user' | 'coach';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  statCards?: CoachStatCard[];
}

// ─── Persona Types ────────────────────────────────────────────

export type PersonaId = 'young-adult' | 'family' | 'professional' | 'senior' | 'teen';

export interface Persona {
  id: PersonaId;
  name: string;
  displayName: string;
  icon: string;
  tagline: string;
  journeyStage: string;
  tabLabels: { home: string; spend: string; plan: string; more: string };
  features: {
    showHousehold: boolean;
    showGamification: boolean;
    showShoppingIntel: boolean;
    showConversational: boolean;
    showSimplified: boolean;
    showPeerBenchmarks: boolean;
    showInvestments: boolean;
    showKidMode: boolean;
  };
}
