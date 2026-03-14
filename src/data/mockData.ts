// === OVERVIEW TAB DATA ===

export const netWealthData = {
  total: 100864.06,
  totalAssets: 125432.18,
  totalDebt: -24568.12,
};

export const monthlyDistributionData = {
  months: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: {
    needs: [3200, 2800, 3400, 3100, 2900, 3300],
    wants: [1800, 2100, 1600, 1900, 2200, 1700],
    security: [800, 900, 700, 850, 950, 800],
  },
  averageIncome: 5800,
  categories: [
    { id: 'needs', label: 'Needs', percentage: 50, color: '#ED5EA6' },
    { id: 'wants', label: 'Wants', percentage: 30, color: '#4AB2B2' },
    { id: 'security', label: 'Security', percentage: 20, color: '#0A5A2B' },
  ],
  commentary: 'Your spending is broadly on track. Wants spending was higher in November — mainly dining out.',
};

export const spendingHeatmapData = {
  month: 'November',
  year: 2025,
  dayLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  // 5 weeks of daily spending amounts, null = future/no data
  weeks: [
    [null, null, null, null, null, 15, 45],
    [8, 32, 125, 5, 78, 140, 22],
    [12, 55, 18, 95, 42, 8, 65],
    [135, 25, 48, 12, 88, 150, 35],
    [22, 68, 15, null, null, null, null],
  ] as (number | null)[][],
  legend: [
    { label: '€0–10', color: '#DDF8F8', description: 'Excellent' },
    { label: '€11–60', color: '#B9F1F1', description: 'On track' },
    { label: '€61–120', color: '#1ED2D2', description: 'Warning' },
    { label: '€121+', color: '#3A8C8C', description: 'Over-budget' },
  ],
};

export const wealthTrajectoryData = {
  ages: Array.from({ length: 49 }, (_, i) => 36 + i),
  currentPath: [
    10000, 12000, 15000, 18000, 22000, 27000, 32000, 38000, 45000, 53000,
    62000, 72000, 83000, 95000, 108000, 122000, 137000, 153000, 170000, 188000,
    207000, 227000, 248000, 270000, 293000, 317000, 330000, 335000, 338000, 340000,
    342000, 344000, 346000, 348000, 350000, 352000, 354000, 356000, 358000, 360000,
    362000, 364000, 366000, 368000, 370000, 372000, 374000, 376000, 378000,
  ],
  recommendedPath: [
    10000, 14000, 19000, 25000, 32000, 40000, 49000, 59000, 70000, 82000,
    95000, 110000, 126000, 143000, 162000, 182000, 204000, 228000, 254000, 282000,
    312000, 344000, 378000, 414000, 452000, 492000, 500000, 500000, 500000, 500000,
    500000, 500000, 500000, 500000, 500000, 500000, 500000, 500000, 500000, 500000,
    500000, 500000, 500000, 500000, 500000, 500000, 500000, 500000, 500000,
  ],
};

export const annualIncomeData = {
  total: 72000,
  segments: [
    { label: 'Salary', value: 54000, color: '#ED5EA6' },
    { label: 'Investments', value: 12600, color: '#4AB2B2' },
    { label: 'Other', value: 5400, color: '#0A5A2B' },
  ],
};

// === MONTHLY GOALS TAB DATA ===

export const monthlyGoalsData = {
  month: 'November',
  year: 2025,
  income: 6000,
  snapshot: {
    needs: { spent: 2762.50, budget: 3000, goalPercent: 50, color: '#ED5EA6' },
    wants: { spent: 1950, budget: 1800, goalPercent: 30, color: '#4AB2B2' },
    security: { spent: 600, budget: 1200, goalPercent: 20, color: '#0A5A2B' },
  },
  isOnTrack: true,
};

export const needsCategoriesData = {
  totalBudget: 3000,
  totalSpent: 2762.50,
  remaining: 237.50,
  categories: [
    { icon: '🏠', label: 'Housing', amount: 1200, txCount: 3, category: 'needs' as const },
    { icon: '🛒', label: 'Groceries', amount: 485.30, txCount: 12, category: 'needs' as const },
    { icon: '🚗', label: 'Transport', amount: 340, txCount: 8, category: 'needs' as const },
    { icon: '⚡', label: 'Utilities', amount: 285.20, txCount: 5, category: 'needs' as const },
    { icon: '💊', label: 'Healthcare', amount: 252, txCount: 4, category: 'needs' as const },
    { icon: '📱', label: 'Phone & Internet', amount: 200, txCount: 2, category: 'needs' as const },
  ],
};

export const wantsCategoriesData = {
  totalBudget: 1800,
  totalSpent: 1950,
  remaining: -150,
  categories: [
    { icon: '🍽️', label: 'Dining out', amount: 620, txCount: 15, category: 'wants' as const },
    { icon: '🛍️', label: 'Shopping', amount: 485, txCount: 8, category: 'wants' as const },
    { icon: '🎬', label: 'Entertainment', amount: 345, txCount: 6, category: 'wants' as const },
    { icon: '✈️', label: 'Travel', amount: 300, txCount: 2, category: 'wants' as const },
    { icon: '💪', label: 'Fitness', amount: 120, txCount: 3, category: 'wants' as const },
    { icon: '💇', label: 'Personal care', amount: 80, txCount: 4, category: 'wants' as const },
  ],
};

export const securityData = {
  savingsTransfer: 600,
  targetSavings: 1200,
};

export const spendCategoriesDonutData = {
  segments: [
    { label: 'Needs', value: 2762.50, color: '#ED5EA6' },
    { label: 'Wants', value: 1950, color: '#4AB2B2' },
    { label: 'Security', value: 600, color: '#0A5A2B' },
  ],
};

// === MY PATH TAB DATA ===

export const financialStrategyData = {
  name: 'Steady & Secure',
  description: 'A balanced approach focused on building stability while maintaining flexibility for life\'s opportunities.',
  segments: [
    { label: 'Needs', value: 50, color: '#ED5EA6' },
    { label: 'Wants', value: 30, color: '#4AB2B2' },
    { label: 'Security', value: 20, color: '#0A5A2B' },
  ],
};

export const milestonesData = {
  milestones: [] as { title: string; target: number; current: number }[],
};

// === TAB BAR DATA ===

export const tabBarItems = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'insights', label: 'Insights', icon: 'insights' },
  { id: 'invest', label: 'Invest', icon: 'trending_up' },
  { id: 'explore', label: 'Explore', icon: 'explore' },
];

// === HOME SCREEN DATA ===

import type { Transaction, TransactionGroup, Account, CreditCard, Pocket, ChildAccount, Contact, SettingsMenuItemData, QuickAction, CardPoints, Notification, NotificationGroup, Permission, ChildAccountDetail, AccountSettingsSection, MoreActionsSection, Portfolio, AllocationSegment, GeographyAllocation, InvestActivity, NewsArticle, PortfolioValuePoint, SharingContact, SharedMember, SharingPermissionConfig } from './types';

export const homeAccountData: Account = {
  id: 'acc-1',
  name: 'Checking',
  type: 'checking',
  lastFour: '3284',
  balance: 2864.66,
  iban: 'NL42 INGB 0123 4567 89',
  bic: 'INGBNL2A',
};

export const homeQuickActions: QuickAction[] = [
  { id: 'transfer', label: 'Transfer', icon: 'transfer', variant: 'primary', route: '/send' },
  { id: 'receive', label: 'Receive', icon: 'receive', variant: 'primary', route: '/receive' },
  { id: 'qr', label: 'QR code', icon: 'qr_code', variant: 'secondary', route: '/qr' },
  { id: 'more', label: 'More', icon: 'more', variant: 'secondary' },
];

export const homeTransactionsData: TransactionGroup[] = [
  {
    label: 'Today',
    transactions: [
      { id: 'tx-1', name: 'Amazon', category: 'Online shopping', amount: -48.11, date: 'Today', logoUrl: '/assets/icons/merchant-amazon.png' },
      { id: 'tx-2', name: 'Netflix', category: 'Online shopping', amount: -24.00, date: 'Today', logoUrl: '/assets/icons/merchant-netflix.png' },
    ],
  },
  {
    label: '15 Dec, 2025',
    transactions: [
      { id: 'tx-3', name: 'Paul Nelson', description: 'paid you', category: 'Account transfer', amount: 100.00, date: '15 Dec, 2025', initials: 'PN', isPositive: true },
      { id: 'tx-4', name: 'Starbucks', category: 'Food & Drinks', amount: -16.35, date: '15 Dec, 2025', logoUrl: '/assets/icons/merchant-starbucks.png' },
    ],
  },
];

export const homePocketsData: Pocket[] = [
  {
    id: 'pocket-1',
    name: 'New car for Elly',
    icon: 'car',
    iconBg: 'var(--pfm-palette-red-extra-soft)',
    progressColor: 'var(--pfm-palette-red-strong)',
    currentAmount: 7460,
    targetAmount: 10000,
    targetDate: 'Nov 10, 2025',
  },
  {
    id: 'pocket-2',
    name: 'Trip to Japan',
    icon: 'travel',
    iconBg: 'var(--pfm-palette-purple-extra-soft)',
    progressColor: 'var(--pfm-palette-purple-strong)',
    currentAmount: 2570,
    targetAmount: 5000,
    targetDate: 'Jan 1, 2027',
  },
];

export const homeChildAccountData: ChildAccount[] = [
  {
    id: 'child-1',
    name: 'Elly',
    avatarUrl: '/assets/icons/avatar-elly.png',
    lastFour: '8836',
    balance: 67.11,
    status: 'over-budget',
    statusLabel: 'Over budget',
  },
  {
    id: 'child-2',
    name: 'Elly',
    avatarUrl: '/assets/icons/avatar-elly.png',
    lastFour: '8836',
    balance: 67.11,
    status: 'needs-attention',
    statusLabel: 'Needs attention',
  },
];

// === CREDIT CARDS DATA ===

export const creditCardsData: CreditCard[] = [
  {
    id: 'card-1',
    name: 'Groceries',
    lastFour: '4350',
    holderName: 'John Nelson',
    expiry: '12/29',
    brand: 'mastercard',
    gradient: ['#8B3A62', '#C76B98'],
    balance: 1243.50,
    creditLimit: 5000,
    payFrom: "John's main account",
    cvc: '925',
    pin: '••••',
    cardType: 'Groceries',
    cardIcon: 'shopping_cart',
    cardLabel: 'Debit',
  },
  {
    id: 'card-2',
    name: 'First home savings',
    lastFour: '7741',
    holderName: 'John Nelson',
    expiry: '03/27',
    brand: 'mastercard',
    gradient: ['#8B6914', '#DAA520'],
    balance: 456.20,
    creditLimit: 3000,
    payFrom: "John's main account",
    cvc: '897',
    pin: '••••',
    cardType: 'First home savings',
    cardIcon: 'home',
    cardLabel: 'Debit',
  },
  {
    id: 'card-3',
    name: 'Travel',
    lastFour: '9122',
    holderName: 'John Nelson',
    expiry: '06/28',
    brand: 'visa',
    gradient: ['#1A3A5C', '#4A7AB5'],
    balance: 890.00,
    creditLimit: 4000,
    payFrom: "John's main account",
    cvc: '431',
    pin: '••••',
    cardType: 'Travel',
    cardIcon: 'flight',
    cardLabel: 'Credit',
  },
];

export const cardTransactionsData: TransactionGroup[] = [
  {
    label: 'Today',
    transactions: [
      { id: 'ctx-1', name: 'Apple Store', category: 'Electronics', amount: -299.00, date: 'Today', logoUrl: 'https://logo.clearbit.com/apple.com' },
      { id: 'ctx-2', name: 'Uber Eats', category: 'Food & Drinks', amount: -32.50, date: 'Today', logoUrl: 'https://logo.clearbit.com/ubereats.com' },
    ],
  },
  {
    label: '14 Dec, 2025',
    transactions: [
      { id: 'ctx-3', name: 'H&M', category: 'Shopping', amount: -89.95, date: '14 Dec, 2025', logoUrl: 'https://logo.clearbit.com/hm.com' },
      { id: 'ctx-4', name: 'Spotify', category: 'Subscriptions', amount: -9.99, date: '14 Dec, 2025', logoUrl: 'https://logo.clearbit.com/spotify.com' },
    ],
  },
];

export const cardPointsData: CardPoints = {
  total: 12450,
  pending: 340,
  redeemed: 5200,
  transactions: [
    { id: 'pt-1', name: 'Apple Store', category: '+150 points', amount: 150, date: 'Today', logoUrl: 'https://logo.clearbit.com/apple.com', isPositive: true },
    { id: 'pt-2', name: 'Uber Eats', category: '+16 points', amount: 16, date: 'Today', logoUrl: 'https://logo.clearbit.com/ubereats.com', isPositive: true },
    { id: 'pt-3', name: 'Cashback redemption', category: '-500 points', amount: -500, date: '12 Dec, 2025', initials: 'CB' },
  ],
};

// === ACCOUNT DETAILS DATA ===

export const accountDetailsData: Account[] = [
  {
    id: 'acc-1',
    name: 'Checking Account',
    type: 'checking',
    lastFour: '3284',
    balance: 2864.66,
    iban: 'NL60 BASE 9832 7482 33',
    bic: 'BASENL6B',
  },
  {
    id: 'acc-2',
    name: 'Savings Account',
    type: 'savings',
    lastFour: '9103',
    balance: 18450.00,
    iban: 'NL78 BASE 4521 8763 90',
    bic: 'BASENL6B',
  },
];

export const accountTransactionsData: TransactionGroup[] = [
  {
    label: 'Today',
    transactions: [
      { id: 'atx-1', name: 'Amazon', category: 'Online shopping', amount: -48.11, date: 'Today', logoUrl: '/assets/icons/merchant-amazon.png' },
      { id: 'atx-2', name: 'Netflix', category: 'Entertainment', amount: -24.00, date: 'Today', logoUrl: '/assets/icons/merchant-netflix.png' },
    ],
  },
  {
    label: '15 Dec, 2025',
    transactions: [
      { id: 'atx-3', name: 'Paul Nelson', description: 'paid you', category: 'Account transfer', amount: 200.00, date: '15 Dec, 2025', initials: 'PN', isPositive: true },
      { id: 'atx-4', name: 'Starbucks', category: 'Eating out', amount: -16.35, date: '15 Dec, 2025', logoUrl: '/assets/icons/merchant-starbucks.png' },
    ],
  },
  {
    label: '14 Dec, 2025',
    transactions: [
      { id: 'atx-5', name: 'Albert Heijn', category: 'Groceries', amount: -35.82, date: '14 Dec, 2025', logoUrl: 'https://logo.clearbit.com/ah.nl' },
      { id: 'atx-6', name: 'Spotify', category: 'Entertainment', amount: -16.35, date: '14 Dec, 2025', logoUrl: 'https://logo.clearbit.com/spotify.com' },
      { id: 'atx-7', name: 'Foot Locker', category: 'Shopping', amount: -79.90, date: '14 Dec, 2025', logoUrl: 'https://logo.clearbit.com/footlocker.com' },
    ],
  },
];

// === PROFILE DATA ===

export const profileData = {
  name: 'Thomas S.',
  email: 'thomas@example.com',
  avatarUrl: '/assets/icons/avatar-profile.jpg',
};

export const profileMenuItems: { section: string; items: SettingsMenuItemData[] }[] = [
  {
    section: 'Account',
    items: [
      { id: 'personal', icon: 'person', title: 'Personal details', description: 'Name, email, phone number' },
      { id: 'security', icon: 'shield', title: 'Security', description: 'Password, biometrics, 2FA' },
      { id: 'notifications', icon: 'notifications', title: 'Notifications', description: 'Push, email, SMS preferences' },
    ],
  },
  {
    section: 'Preferences',
    items: [
      { id: 'appearance', icon: 'palette', title: 'Appearance', description: 'Theme, language, currency' },
      { id: 'privacy', icon: 'lock', title: 'Privacy', description: 'Data sharing, analytics' },
    ],
  },
  {
    section: 'Support',
    items: [
      { id: 'help', icon: 'help', title: 'Help & Support', description: 'FAQ, contact us' },
      { id: 'about', icon: 'info', title: 'About', description: 'Version, legal, licenses' },
    ],
  },
];

// === POCKETS LIST DATA ===

export const pocketsListData: Pocket[] = [
  {
    id: 'pocket-1',
    name: 'New car for Elly',
    icon: 'car',
    iconBg: 'var(--pfm-palette-red-extra-soft)',
    progressColor: 'var(--pfm-palette-red-strong)',
    currentAmount: 7460,
    targetAmount: 10000,
    targetDate: 'Nov 10, 2025',
  },
  {
    id: 'pocket-2',
    name: 'Trip to Japan',
    icon: 'travel',
    iconBg: 'var(--pfm-palette-purple-extra-soft)',
    progressColor: 'var(--pfm-palette-purple-strong)',
    currentAmount: 2570,
    targetAmount: 5000,
    targetDate: 'Jan 1, 2027',
  },
  {
    id: 'pocket-3',
    name: 'Emergency Fund',
    icon: 'savings',
    iconBg: 'var(--pfm-palette-green-extra-soft)',
    progressColor: 'var(--pfm-palette-green-strong)',
    currentAmount: 8200,
    targetAmount: 15000,
    targetDate: 'Jun 1, 2026',
  },
];

// === PAYMENTS DATA ===

export const recentContactsData: Contact[] = [
  { id: 'c-1', name: 'Paul Nelson', initials: 'PN', iban: 'NL42 INGB 0123 4567 89' },
  { id: 'c-2', name: 'Sarah Miller', initials: 'SM', iban: 'NL78 ABNA 0987 6543 21' },
  { id: 'c-3', name: 'Mike Johnson', initials: 'MJ', iban: 'NL31 RABO 0246 8135 79' },
  { id: 'c-4', name: 'Emma Davis', initials: 'ED', iban: 'NL55 TRIO 1357 9246 80' },
];

// === MORE ACTIONS DATA ===

export const moreActionsSections: MoreActionsSection[] = [
  {
    section: 'Account',
    items: [
      { icon: 'account_details', title: 'Account details', description: 'View info, documents, and limits', iconBg: 'var(--pfm-palette-blue-extra-soft)' },
      { icon: 'statements', title: 'Statements & documents', description: 'Download statements and confirmations', iconBg: 'var(--pfm-palette-blue-extra-soft)' },
      { icon: 'card', title: 'Cards & payment methods', description: 'Manage cards linked to this account', iconBg: 'var(--pfm-palette-blue-extra-soft)' },
    ],
  },
  {
    section: 'Manage',
    items: [
      { icon: 'heart', title: 'Sharing & permissions', description: 'Invite others and manage access', iconBg: 'var(--pfm-palette-purple-extra-soft)' },
      { icon: 'block', title: 'Account limits & controls', description: 'Set spending, transfer, or withdrawal limits', iconBg: 'var(--pfm-palette-purple-extra-soft)' },
    ],
  },
  {
    section: 'Tools',
    items: [
      { icon: 'insights', title: 'Financial insights', description: 'Track spending, trends, and cash flow', iconBg: 'var(--pfm-palette-green-extra-soft)', route: '/insights' },
      { icon: 'delete', title: 'Close / archive account', description: 'Close or archive this account', danger: true },
    ],
  },
];

// === ACCOUNT SETTINGS DATA ===

export const accountSettingsSections: AccountSettingsSection[] = [
  {
    section: 'Personalisation',
    items: [
      { icon: 'personalise', title: 'Personalise bank account', iconBg: 'var(--pfm-palette-blue-extra-soft)' },
    ],
  },
  {
    section: 'Budgeting',
    items: [
      { icon: 'budget', title: 'Easy budgeting', value: 'Off', iconBg: 'var(--pfm-palette-orange-extra-soft)' },
      { icon: 'bell_badge', title: 'Refill notifications', value: 'Off', iconBg: 'var(--pfm-palette-orange-extra-soft)' },
    ],
  },
  {
    section: 'Security',
    items: [
      { icon: 'payment', title: 'Payment limits', iconBg: 'var(--pfm-palette-purple-extra-soft)' },
      { icon: 'verified', title: 'Granted access to', value: 'Off', iconBg: 'var(--pfm-palette-purple-extra-soft)' },
      { icon: 'eye', title: 'Discoverable as', value: '3 Aliases', iconBg: 'var(--pfm-palette-purple-extra-soft)' },
    ],
  },
  {
    section: 'Scheduling',
    items: [
      { icon: 'upload', title: 'Scheduled payments', iconBg: 'var(--pfm-palette-green-extra-soft)' },
      { icon: 'download', title: 'Scheduled requests', iconBg: 'var(--pfm-palette-green-extra-soft)' },
    ],
  },
  {
    section: 'Account statement',
    items: [
      { icon: 'export', title: 'Export statement', iconBg: 'var(--pfm-surface-raised)' },
      { icon: 'auto_export', title: 'Auto export statement', value: 'Off', iconBg: 'var(--pfm-surface-raised)' },
    ],
  },
];

// === NOTIFICATIONS DATA ===

export const notificationsData: NotificationGroup[] = [
  {
    label: 'Today',
    notifications: [
      { id: 'n-1', type: 'info', title: 'Best Coffee Suppliers', description: 'Paid EUR 66.700 at Best Coffee Suppliers, Amsterdam', date: 'Today', read: false },
      { id: 'n-2', type: 'coach', title: 'Just ask', description: 'Your financial plan is ready to review!', date: 'Today', read: false },
      { id: 'n-3', type: 'info', title: 'Account balance', description: 'Hi John, Everyday account balance just went below $100.00', date: 'Today', read: true },
    ],
  },
  {
    label: 'Yesterday',
    notifications: [
      { id: 'n-4', type: 'warning', title: 'Suspicious activity', description: 'Someone tried to access your account from an unknown location. Let us know it was you', date: 'Yesterday', read: true },
    ],
  },
  {
    label: '6 Feb 2026',
    notifications: [
      { id: 'n-5', type: 'info', title: 'Savings goal', description: "Congratulations, you've reached your savings goal of $2,000", date: '6 Feb 2026', read: true },
      { id: 'n-6', type: 'error', title: 'Rejected payment', description: 'Your payment to A. Smith was rejected due to insufficient funds on your checking accounts', date: '6 Feb 2026', read: true },
    ],
  },
];

// === PERMISSIONS DATA ===

export const permissionsData: Permission[] = [
  { id: 'p-1', icon: 'account_details', title: 'View balance & transactions', description: 'See all account activity and history', enabled: true },
  { id: 'p-2', icon: 'money', title: 'Spend from this account', description: "Make payments using this account's funds", enabled: true, subOptions: [{ label: 'Allow full spending', selected: true }, { label: 'Limit spending', selected: false }] },
  { id: 'p-3', icon: 'card', title: 'Manage cards', description: 'Freeze, unfreeze, or reorder', enabled: true },
  { id: 'p-4', icon: 'insights', title: 'View account insights', description: 'Review budgeting overview', enabled: true },
  { id: 'p-5', icon: 'swap', title: 'Initiate transfers', description: 'Send money to contacts/ other accounts', enabled: false },
  { id: 'p-6', icon: 'schedule', title: 'Manage scheduled payments', description: 'Edit or cancel recurring payments', enabled: false },
  { id: 'p-7', icon: 'statements', title: 'View statements & documents', description: 'Access monthly statements and files', enabled: false },
];

// === CHILD ACCOUNT DETAIL DATA ===

export const childAccountDetailData: ChildAccountDetail = {
  id: 'child-1',
  name: 'Elly',
  avatarUrl: '/assets/icons/avatar-elly.png',
  lastFour: '8836',
  balance: 67.11,
  status: 'over-budget',
  statusLabel: 'Over budget',
  childAge: 15,
  parents: [
    { name: 'You', role: 'Admin', isYou: true },
    { name: 'Co-parent', role: 'Add a co parent to Elly' },
  ],
  spendingBreakdown: [
    { label: 'Spent this week', percentage: 45, color: '#2E4E78' },
    { label: 'Remaining allowance', percentage: 15, color: '#7189A7' },
    { label: 'Top category', percentage: 40, color: '#ED5EA6' },
  ],
  weeklyAllowance: 25,
};

// === ACCOUNT SELECTOR DATA ===

export const allAccountsOverview = {
  totalBalance: 96864.15,
};

export const allAccountsData: Account[] = [
  {
    id: 'acc-1',
    name: "John's main account",
    type: 'checking',
    lastFour: '7659',
    balance: 2864.66,
    iban: 'NL60 BASE 9832 7482 33',
    bic: 'BASENL6B',
  },
  {
    id: 'acc-2',
    name: 'Savings account',
    type: 'savings',
    lastFour: '2345',
    balance: 40677.23,
    iban: 'NL78 BASE 4521 8763 90',
    bic: 'BASENL6B',
  },
  {
    id: 'acc-3',
    name: 'Shared account',
    type: 'checking',
    lastFour: '5416',
    balance: 40677.23,
    iban: 'NL55 BASE 7890 1234 56',
    bic: 'BASENL6B',
  },
];

export const allPocketsData: Pocket[] = [
  {
    id: 'pocket-1',
    name: 'New car for Elly',
    icon: 'car',
    iconBg: 'var(--pfm-palette-red-extra-soft)',
    progressColor: 'var(--pfm-palette-red-strong)',
    currentAmount: 7460,
    targetAmount: 10000,
    targetDate: 'Nov 10, 2025',
  },
  {
    id: 'pocket-2',
    name: 'Trip to Japan',
    icon: 'travel',
    iconBg: 'var(--pfm-palette-purple-extra-soft)',
    progressColor: 'var(--pfm-palette-purple-strong)',
    currentAmount: 2570,
    targetAmount: 5000,
    targetDate: 'Jan 1, 2027',
  },
  {
    id: 'pocket-3',
    name: 'First home savings',
    icon: 'savings',
    iconBg: 'var(--pfm-palette-green-extra-soft)',
    progressColor: 'var(--pfm-palette-green-strong)',
    currentAmount: 7500,
    targetAmount: 30000,
    targetDate: 'Jun 1, 2028',
  },
];

export const familyAccountsData: ChildAccount[] = [
  {
    id: 'child-1',
    name: 'Elly',
    avatarUrl: '/assets/icons/avatar-elly.png',
    lastFour: '8836',
    balance: -67.11,
    status: 'over-budget',
    statusLabel: 'Over budget',
  },
  {
    id: 'child-2',
    name: 'James',
    avatarUrl: '/assets/icons/avatar-elly.png',
    lastFour: '8762',
    balance: 30.42,
    status: 'on-track',
    statusLabel: '',
  },
];

// === DASHBOARD DATA ===

export const dashboardTotalBalance = 42864.66;

export const dashboardAccountsData: Account[] = [
  {
    id: 'acc-1',
    name: 'Checking Account',
    type: 'checking',
    lastFour: '3284',
    balance: 2864.66,
  },
  {
    id: 'acc-2',
    name: 'Savings Account',
    type: 'savings',
    lastFour: '9103',
    balance: 18450.00,
  },
];

// === INVEST DATA ===

export const investSummary = {
  totalValue: 42864.66,
  change: -96.30,
  changePercent: -0.95,
};

function generateValueOverTime(baseValue: number, points: number, volatility: number): PortfolioValuePoint[] {
  const result: PortfolioValuePoint[] = [];
  let value = baseValue;
  const now = new Date(2026, 1, 16);
  for (let i = points; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i * Math.floor(points > 60 ? 7 : 1));
    value += (Math.random() - 0.52) * volatility;
    value = Math.max(value * 0.95, value);
    result.push({ date: date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }), value: Math.round(value * 100) / 100 });
  }
  return result;
}

export const investValueOverTime: Record<string, PortfolioValuePoint[]> = {
  '1M': generateValueOverTime(43200, 30, 150),
  '3M': generateValueOverTime(42500, 90, 200),
  '6M': generateValueOverTime(41000, 60, 300),
  '12M': generateValueOverTime(38500, 52, 400),
  'YTD': generateValueOverTime(42000, 45, 180),
  'All': generateValueOverTime(30000, 104, 500),
};

export const investPortfolios: Portfolio[] = [
  {
    id: 'pf-1',
    name: 'My self trading',
    label: 'Portfolio',
    value: 2864.66,
    change: -96.30,
    changePercent: -0.95,
    sparklineData: [2900, 2950, 2880, 2920, 2860, 2890, 2870, 2840, 2865],
  },
  {
    id: 'pf-2',
    name: 'Retirement fund',
    label: 'Managed',
    value: 40000.00,
    change: 520.40,
    changePercent: 1.32,
    sparklineData: [39200, 39400, 39600, 39500, 39800, 39900, 40100, 39950, 40000],
  },
];

export const investAllocationByType: AllocationSegment[] = [
  { label: 'Cash', value: 6.18, percentage: 62.44, color: '#4AB2B2' },
  { label: 'Clean energy', value: 2.81, percentage: 28.45, color: '#B25A00' },
  { label: 'Consumer goods', value: 910.45, percentage: 9.10, color: '#0A5A2B' },
];

export const investAllocationBySector: AllocationSegment[] = [
  { label: 'Technology', value: 18200, percentage: 42, color: '#4AB2B2' },
  { label: 'Healthcare', value: 8600, percentage: 20, color: '#ED5EA6' },
  { label: 'Financials', value: 6450, percentage: 15, color: '#B25A00' },
  { label: 'Commodities', value: 5160, percentage: 12, color: '#0A5A2B' },
  { label: 'Others', value: 4454.66, percentage: 11, color: '#7189A7' },
];

export const investAllocationByGeography: GeographyAllocation[] = [
  { country: 'United States', flagEmoji: '🇺🇸', value: 21430, percentage: 50, color: '#4AB2B2' },
  { country: 'Europe', flagEmoji: '🇪🇺', value: 10716, percentage: 25, color: '#ED5EA6' },
  { country: 'Switzerland', flagEmoji: '🇨🇭', value: 4286, percentage: 10, color: '#B25A00' },
  { country: 'Japan', flagEmoji: '🇯🇵', value: 3429, percentage: 8, color: '#0A5A2B' },
  { country: 'Others', flagEmoji: '🌐', value: 3003.66, percentage: 7, color: '#7189A7' },
];

export const investLatestActivity: InvestActivity[] = [
  { id: 'ia-1', type: 'buy', title: 'Buy VWRL', subtitle: 'Vanguard FTSE All-World', status: 'completed', amount: -1080.00, date: '16 Feb 2026' },
  { id: 'ia-2', type: 'sell', title: 'Sell IWDA', subtitle: 'iShares Core MSCI World', status: 'completed', amount: 520.40, date: '14 Feb 2026' },
  { id: 'ia-3', type: 'dividend', title: 'Dividend AGGH', subtitle: 'iShares Global Aggregate', status: 'completed', amount: 12.80, date: '10 Feb 2026' },
  { id: 'ia-4', type: 'buy', title: 'Buy TSLA', subtitle: 'Tesla Inc.', status: 'pending', amount: -340.00, date: '16 Feb 2026' },
  { id: 'ia-5', type: 'transfer', title: 'Deposit', subtitle: 'From checking account', status: 'completed', amount: 500.00, date: '1 Feb 2026' },
];

export const investLatestNews: NewsArticle[] = [
  {
    id: 'news-1',
    imageUrl: '/assets/icons/news-1.jpg',
    title: 'Intelligence fabric: Orchestrating AI-driven customers journeys',
    description: 'AI agents enhance customer journeys by reacting in real-time with personalised responses.',
  },
  {
    id: 'news-2',
    imageUrl: '/assets/icons/news-2.jpg',
    title: 'Backbase AI factory: Turning AI ambition into action',
    description: 'The AI Factory helps banks move from ideas to execution with an enterprise grade AI foundation.',
  },
  {
    id: 'news-3',
    imageUrl: '/assets/icons/news-3.jpg',
    title: 'The future of wealth management in a digital world',
    description: 'How digital platforms are reshaping the way we invest and manage our portfolios.',
  },
];

// === ACCOUNT SHARING DATA ===

export const sharingCurrentMembers: SharedMember[] = [
  { id: 'sm-1', name: 'J. Wallace', avatarUrl: '/assets/icons/avatar-wallace.jpg', initials: 'JW', role: 'owner' },
];

export const sharingContacts: SharingContact[] = [
  { id: 'sc-1', name: 'J. Wallace', initials: 'JW', subtitle: undefined },
  { id: 'sc-2', name: 'George Apple', avatarUrl: '/assets/icons/avatar-george.jpg', initials: 'GA', subtitle: 'Backbase' },
  { id: 'sc-3', name: 'Andrea Ball', initials: 'AB', subtitle: 'Invite to Backbase' },
  { id: 'sc-4', name: 'Catherine Cat', avatarUrl: '/assets/icons/avatar-catherine.jpg', initials: 'CC', subtitle: 'Backbase' },
  { id: 'sc-5', name: 'Sarah Doll', avatarUrl: '/assets/icons/avatar-sarah.jpg', initials: 'SD', subtitle: 'Backbase' },
  { id: 'sc-6', name: 'Jenna Erwin', initials: 'JE', subtitle: 'Invite to Backbase' },
  { id: 'sc-7', name: 'Holly Fan', avatarUrl: '/assets/icons/avatar-holly.jpg', initials: 'HF', subtitle: 'Backbase' },
  { id: 'sc-8', name: 'Dennis Garden', initials: 'DG', subtitle: 'Invite to Backbase' },
  { id: 'sc-9', name: 'Andrew Henry', initials: 'AH', subtitle: 'Backbase' },
];

export const relationshipTypes = [
  'Spouse / Partner',
  'Parent',
  'Child',
  'Sibling',
  'Other family',
  'Business partner',
  'Other',
];

export const defaultSharingPermissions: SharingPermissionConfig[] = [
  { id: 'sp-1', icon: 'account_details', title: 'View balance & transactions', description: 'See all account activity and history', enabled: true },
  { id: 'sp-2', icon: 'money', title: 'Spend from this account', description: "Make payments using this account's funds", enabled: false, hasSpendingLimit: true, spendingLimit: 250 },
  { id: 'sp-3', icon: 'card', title: 'Manage cards', description: 'Freeze, unfreeze, or reorder', enabled: true },
  { id: 'sp-4', icon: 'insights', title: 'View account insights', description: 'Review budgeting overview', enabled: true },
  { id: 'sp-5', icon: 'swap', title: 'Initiate transfers', description: 'Send money to contacts/ other accounts', enabled: false },
  { id: 'sp-6', icon: 'schedule', title: 'Manage scheduled payments', description: 'Edit or cancel recurring payments', enabled: false },
  { id: 'sp-7', icon: 'statements', title: 'View statements & documents', description: 'Access monthly statements and files', enabled: false },
];
