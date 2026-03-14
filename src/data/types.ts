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
