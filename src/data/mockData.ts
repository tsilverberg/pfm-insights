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
    { id: 'needs', label: 'Needs', percentage: 50, color: 'var(--pfm-pink-base)' },
    { id: 'wants', label: 'Lifestyle', percentage: 30, color: 'var(--pfm-turquoise-strong)' },
    { id: 'security', label: 'Saved', percentage: 20, color: 'var(--pfm-green-strong)' },
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
    { label: '€121+', color: 'var(--pfm-turquoise-extra-strong)', description: 'Over-budget' },
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
    { label: 'Salary', value: 54000, color: 'var(--pfm-pink-base)' },
    { label: 'Investments', value: 12600, color: 'var(--pfm-turquoise-strong)' },
    { label: 'Other', value: 5400, color: 'var(--pfm-green-strong)' },
  ],
};

// === MONTHLY GOALS TAB DATA ===

export const monthlyGoalsData = {
  month: 'November',
  year: 2025,
  income: 6000,
  snapshot: {
    needs: { spent: 2762.50, budget: 3000, goalPercent: 50, color: 'var(--pfm-pink-base)' },
    wants: { spent: 1950, budget: 1800, goalPercent: 30, color: 'var(--pfm-turquoise-strong)' },
    security: { spent: 600, budget: 1200, goalPercent: 20, color: 'var(--pfm-green-strong)' },
  },
  isOnTrack: true,
};

export const securityData = {
  savingsTransfer: 600,
  targetSavings: 1200,
};

export const spendCategoriesDonutData = {
  segments: [
    { label: 'Needs', value: 2762.50, color: 'var(--pfm-pink-base)' },
    { label: 'Lifestyle', value: 1950, color: 'var(--pfm-turquoise-strong)' },
    { label: 'Saved', value: 600, color: 'var(--pfm-green-strong)' },
  ],
};

// === MY PATH TAB DATA ===

export const financialStrategyData = {
  name: 'Steady & Secure',
  description: 'A balanced approach focused on building stability while maintaining flexibility for life\'s opportunities.',
  segments: [
    { label: 'Needs', value: 50, color: 'var(--pfm-pink-base)' },
    { label: 'Wants', value: 30, color: 'var(--pfm-turquoise-strong)' },
    { label: 'Security', value: 20, color: 'var(--pfm-green-strong)' },
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

import type { Transaction, TransactionGroup, Account, CreditCard, Pocket, ChildAccount, Contact, SettingsMenuItemData, QuickAction, CardPoints, Notification, NotificationGroup, Permission, ChildAccountDetail, AccountSettingsSection, MoreActionsSection, Portfolio, AllocationSegment, GeographyAllocation, InvestActivity, NewsArticle, PortfolioValuePoint, SharingContact, SharedMember, SharingPermissionConfig, CashflowSummary, TopSpendCategory, NwgType } from './types';

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
  { id: 'transfer', label: 'Transfer', icon: 'transfer', variant: 'primary', route: '/transfer' },
  { id: 'receive', label: 'Receive', icon: 'receive', variant: 'primary', route: '/receive' },
  { id: 'qr', label: 'QR code', icon: 'qr_code', variant: 'secondary', route: '/qr' },
  { id: 'more', label: 'More', icon: 'more', variant: 'secondary', route: '/account/acc-1/more' },
];

export const homeTransactionsData: TransactionGroup[] = [
  {
    label: 'Today',
    transactions: [
      { id: 'tx-1', name: 'Amazon', category: 'Online shopping', amount: -48.11, date: 'Today', logoUrl: '/assets/icons/merchant-amazon.png', nwgType: 'want' },
      { id: 'tx-2', name: 'Netflix', category: 'Online shopping', amount: -24.00, date: 'Today', logoUrl: '/assets/icons/merchant-netflix.png', nwgType: 'want' },
    ],
  },
  {
    label: '15 Dec, 2025',
    transactions: [
      { id: 'tx-3', name: 'Paul Nelson', description: 'paid you', category: 'Account transfer', amount: 100.00, date: '15 Dec, 2025', initials: 'PN', isPositive: true, nwgType: 'growth' },
      { id: 'tx-4', name: 'Starbucks', category: 'Food & Drinks', amount: -16.35, date: '15 Dec, 2025', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
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
      { id: 'ctx-1', name: 'Apple Store', category: 'Electronics', amount: -299.00, date: 'Today', logoUrl: 'https://logo.clearbit.com/apple.com', nwgType: 'want' },
      { id: 'ctx-2', name: 'Uber Eats', category: 'Food & Drinks', amount: -32.50, date: 'Today', logoUrl: 'https://logo.clearbit.com/ubereats.com', nwgType: 'want' },
    ],
  },
  {
    label: '14 Dec, 2025',
    transactions: [
      { id: 'ctx-3', name: 'H&M', category: 'Shopping', amount: -89.95, date: '14 Dec, 2025', logoUrl: 'https://logo.clearbit.com/hm.com', nwgType: 'want' },
      { id: 'ctx-4', name: 'Spotify', category: 'Subscriptions', amount: -9.99, date: '14 Dec, 2025', logoUrl: 'https://logo.clearbit.com/spotify.com', nwgType: 'want' },
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
      { id: 'atx-1', name: 'Amazon', category: 'Online shopping', amount: -48.11, date: 'Today', logoUrl: '/assets/icons/merchant-amazon.png', nwgType: 'want' },
      { id: 'atx-2', name: 'Netflix', category: 'Entertainment', amount: -24.00, date: 'Today', logoUrl: '/assets/icons/merchant-netflix.png', nwgType: 'want' },
    ],
  },
  {
    label: '15 Dec, 2025',
    transactions: [
      { id: 'atx-3', name: 'Paul Nelson', description: 'paid you', category: 'Account transfer', amount: 200.00, date: '15 Dec, 2025', initials: 'PN', isPositive: true, nwgType: 'growth' },
      { id: 'atx-4', name: 'Starbucks', category: 'Eating out', amount: -16.35, date: '15 Dec, 2025', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
    ],
  },
  {
    label: '14 Dec, 2025',
    transactions: [
      { id: 'atx-5', name: 'Albert Heijn', category: 'Groceries', amount: -35.82, date: '14 Dec, 2025', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'atx-6', name: 'Spotify', category: 'Entertainment', amount: -16.35, date: '14 Dec, 2025', logoUrl: 'https://logo.clearbit.com/spotify.com', nwgType: 'want' },
      { id: 'atx-7', name: 'Foot Locker', category: 'Shopping', amount: -79.90, date: '14 Dec, 2025', logoUrl: 'https://logo.clearbit.com/footlocker.com', nwgType: 'want' },
    ],
  },
];

// === PROFILE DATA ===

export const profileData = {
  name: 'Thomas S.',
  email: 'thomas@example.com',
  avatarUrl: '/assets/icons/avatar-user.png',
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
    category: 'milestone',
    priority: 2,
    monthlyContribution: 200,
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
    category: 'lifestyle',
    priority: 3,
    monthlyContribution: 200,
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
    category: 'essential',
    priority: 1,
    monthlyContribution: 300,
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
    section: 'Payments',
    items: [
      { icon: 'send', title: 'Send money', description: 'Transfer money to someone', iconBg: 'var(--pfm-palette-green-extra-soft)', route: '/send' },
      { icon: 'download', title: 'Receive money', description: 'Request a payment from someone', iconBg: 'var(--pfm-palette-green-extra-soft)', route: '/receive' },
      { icon: 'qr_code_2', title: 'QR code', description: 'Scan or share a QR code', iconBg: 'var(--pfm-palette-green-extra-soft)', route: '/qr' },
    ],
  },
  {
    section: 'Account',
    items: [
      { icon: 'description', title: 'Account details', description: 'View info, documents, and limits', iconBg: 'var(--pfm-palette-blue-extra-soft)' },
      { icon: 'settings', title: 'Account settings', description: 'Personalise, notifications, and preferences', iconBg: 'var(--pfm-palette-blue-extra-soft)' },
      { icon: 'receipt_long', title: 'Statements & documents', description: 'Download statements and confirmations', iconBg: 'var(--pfm-palette-blue-extra-soft)' },
      { icon: 'credit_card', title: 'Cards & payment methods', description: 'Manage cards linked to this account', iconBg: 'var(--pfm-palette-blue-extra-soft)' },
    ],
  },
  {
    section: 'Manage',
    items: [
      { icon: 'favorite', title: 'Sharing & permissions', description: 'Invite others and manage access', iconBg: 'var(--pfm-palette-purple-extra-soft)' },
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
      { icon: 'person', title: 'Personalise bank account', iconBg: 'var(--pfm-palette-blue-extra-soft)' },
    ],
  },
  {
    section: 'Budgeting',
    items: [
      { icon: 'savings', title: 'Easy budgeting', value: 'Off', iconBg: 'var(--pfm-palette-orange-extra-soft)' },
      { icon: 'notification_important', title: 'Refill notifications', value: 'Off', iconBg: 'var(--pfm-palette-orange-extra-soft)' },
    ],
  },
  {
    section: 'Security',
    items: [
      { icon: 'payments', title: 'Payment limits', iconBg: 'var(--pfm-palette-purple-extra-soft)' },
      { icon: 'verified_user', title: 'Granted access to', value: 'Off', iconBg: 'var(--pfm-palette-purple-extra-soft)' },
      { icon: 'visibility', title: 'Discoverable as', value: '3 Aliases', iconBg: 'var(--pfm-palette-purple-extra-soft)' },
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
      { icon: 'file_download', title: 'Export statement', iconBg: 'var(--pfm-surface-raised)' },
      { icon: 'sync', title: 'Auto export statement', value: 'Off', iconBg: 'var(--pfm-surface-raised)' },
    ],
  },
];

// === NOTIFICATIONS DATA ===

export const notificationsData: NotificationGroup[] = [
  {
    label: 'Today',
    notifications: [
      { id: 'n-1', type: 'info', title: 'Best Coffee Suppliers', description: 'Paid €66.700 at Best Coffee Suppliers, Amsterdam', date: 'Today', read: false },
      { id: 'n-2', type: 'coach', title: 'Just ask', description: 'Your financial plan is ready to review!', date: 'Today', read: false },
      { id: 'n-3', type: 'info', title: 'Account balance', description: 'Hi John, Everyday account balance just went below €100,00', date: 'Today', read: true },
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
      { id: 'n-5', type: 'info', title: 'Savings goal', description: "Congratulations, you've reached your savings goal of €2.000", date: '6 Feb 2026', read: true },
      { id: 'n-6', type: 'error', title: 'Rejected payment', description: 'Your payment to A. Smith was rejected due to insufficient funds on your checking accounts', date: '6 Feb 2026', read: true },
    ],
  },
];

// === PERMISSIONS DATA ===

export const permissionsData: Permission[] = [
  { id: 'p-1', icon: 'description', title: 'View balance & transactions', description: 'See all account activity and history', enabled: true },
  { id: 'p-2', icon: 'payments', title: 'Spend from this account', description: "Make payments using this account's funds", enabled: true, subOptions: [{ label: 'Allow full spending', selected: true }, { label: 'Limit spending', selected: false }] },
  { id: 'p-3', icon: 'credit_card', title: 'Manage cards', description: 'Freeze, unfreeze, or reorder', enabled: true },
  { id: 'p-4', icon: 'insights', title: 'View account insights', description: 'Review budgeting overview', enabled: true },
  { id: 'p-5', icon: 'swap_horiz', title: 'Initiate transfers', description: 'Send money to contacts/ other accounts', enabled: false },
  { id: 'p-6', icon: 'schedule', title: 'Manage scheduled payments', description: 'Edit or cancel recurring payments', enabled: false },
  { id: 'p-7', icon: 'receipt_long', title: 'View statements & documents', description: 'Access monthly statements and files', enabled: false },
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
    { label: 'Top category', percentage: 40, color: 'var(--pfm-pink-base)' },
  ],
  weeklyAllowance: 25,
};

// === ACCOUNT SELECTOR DATA ===

export const allAccountsOverview = {
  totalBalance: 96864.15,
};

export const savingsTransactionsData: TransactionGroup[] = [
  {
    label: 'This month',
    transactions: [
      { id: 'st-1', name: 'Interest payment', amount: 42.15, category: 'Interest', date: 'Mar 12', nwgType: 'growth' as const },
      { id: 'st-2', name: 'Transfer from checking', amount: 500.00, category: 'Transfer', date: 'Mar 1', nwgType: 'growth' as const },
      { id: 'st-3', name: 'Round-up savings', amount: 23.47, category: 'Savings', date: 'Mar 5', nwgType: 'growth' as const },
    ],
  },
];

export const sharedTransactionsData: TransactionGroup[] = [
  {
    label: 'This week',
    transactions: [
      { id: 'sh-1', name: 'Albert Heijn', amount: -87.45, category: 'Groceries', date: 'Today', nwgType: 'need' as const },
      { id: 'sh-2', name: 'Vattenfall Energy', amount: -142.30, category: 'Utilities', date: 'Yesterday', nwgType: 'need' as const },
      { id: 'sh-3', name: 'IKEA', amount: -234.99, category: 'Home', date: 'Mon', nwgType: 'want' as const },
      { id: 'sh-4', name: "Elly's contribution", amount: 750.00, category: 'Transfer', date: 'Mar 1', nwgType: 'growth' as const },
    ],
  },
];

export const accountTransactionsMap: Record<string, TransactionGroup[]> = {
  'acc-1': homeTransactionsData,
  'acc-2': savingsTransactionsData,
  'acc-3': sharedTransactionsData,
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
  { label: 'Cash', value: 6.18, percentage: 62.44, color: 'var(--pfm-turquoise-strong)' },
  { label: 'Clean energy', value: 2.81, percentage: 28.45, color: '#B25A00' },
  { label: 'Consumer goods', value: 910.45, percentage: 9.10, color: 'var(--pfm-green-strong)' },
];

export const investAllocationBySector: AllocationSegment[] = [
  { label: 'Technology', value: 18200, percentage: 42, color: 'var(--pfm-turquoise-strong)' },
  { label: 'Healthcare', value: 8600, percentage: 20, color: 'var(--pfm-pink-base)' },
  { label: 'Financials', value: 6450, percentage: 15, color: '#B25A00' },
  { label: 'Commodities', value: 5160, percentage: 12, color: 'var(--pfm-green-strong)' },
  { label: 'Others', value: 4454.66, percentage: 11, color: '#7189A7' },
];

export const investAllocationByGeography: GeographyAllocation[] = [
  { country: 'United States', flagEmoji: '🇺🇸', value: 21430, percentage: 50, color: 'var(--pfm-turquoise-strong)' },
  { country: 'Europe', flagEmoji: '🇪🇺', value: 10716, percentage: 25, color: 'var(--pfm-pink-base)' },
  { country: 'Switzerland', flagEmoji: '🇨🇭', value: 4286, percentage: 10, color: '#B25A00' },
  { country: 'Japan', flagEmoji: '🇯🇵', value: 3429, percentage: 8, color: 'var(--pfm-green-strong)' },
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
    imageUrl: '/assets/icons/news-1.svg',
    title: 'Intelligence fabric: Orchestrating AI-driven customers journeys',
    description: 'AI agents enhance customer journeys by reacting in real-time with personalised responses.',
  },
  {
    id: 'news-2',
    imageUrl: '/assets/icons/news-2.svg',
    title: 'Backbase AI factory: Turning AI ambition into action',
    description: 'The AI Factory helps banks move from ideas to execution with an enterprise grade AI foundation.',
  },
  {
    id: 'news-3',
    imageUrl: '/assets/icons/news-3.svg',
    title: 'The future of wealth management in a digital world',
    description: 'How digital platforms are reshaping the way we invest and manage our portfolios.',
  },
];

// === ACCOUNT SHARING DATA ===

export const sharingCurrentMembers: SharedMember[] = [
  { id: 'sm-1', name: 'J. Wallace', avatarUrl: '/assets/icons/avatar-profile.jpg', initials: 'JW', role: 'owner' },
];

export const sharingContacts: SharingContact[] = [
  { id: 'sc-1', name: 'J. Wallace', initials: 'JW', subtitle: undefined },
  { id: 'sc-2', name: 'George Apple', initials: 'GA', subtitle: 'Backbase' },
  { id: 'sc-3', name: 'Andrea Ball', initials: 'AB', subtitle: 'Invite to Backbase' },
  { id: 'sc-4', name: 'Catherine Cat', initials: 'CC', subtitle: 'Backbase' },
  { id: 'sc-5', name: 'Sarah Doll', initials: 'SD', subtitle: 'Backbase' },
  { id: 'sc-6', name: 'Jenna Erwin', initials: 'JE', subtitle: 'Invite to Backbase' },
  { id: 'sc-7', name: 'Holly Fan', initials: 'HF', subtitle: 'Backbase' },
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
  { id: 'sp-1', icon: 'description', title: 'View balance & transactions', description: 'See all account activity and history', enabled: true },
  { id: 'sp-2', icon: 'payments', title: 'Spend from this account', description: "Make payments using this account's funds", enabled: false, hasSpendingLimit: true, spendingLimit: 250 },
  { id: 'sp-3', icon: 'credit_card', title: 'Manage cards', description: 'Freeze, unfreeze, or reorder', enabled: true },
  { id: 'sp-4', icon: 'insights', title: 'View account insights', description: 'Review budgeting overview', enabled: true },
  { id: 'sp-5', icon: 'swap_horiz', title: 'Initiate transfers', description: 'Send money to contacts/ other accounts', enabled: false },
  { id: 'sp-6', icon: 'schedule', title: 'Manage scheduled payments', description: 'Edit or cancel recurring payments', enabled: false },
  { id: 'sp-7', icon: 'receipt_long', title: 'View statements & documents', description: 'Access monthly statements and files', enabled: false },
];

// ═══════════════════════════════════════════════════════════════════
// MULTI-MONTH TRANSACTION DATA (Oct 2025 — Mar 2026)
// John van der Berg, 32, Amsterdam
// Salary: €6,000/month (net), deposited 25th
// ═══════════════════════════════════════════════════════════════════

// ─── October 2025 ───────────────────────────────────────────────

const octTransactions: TransactionGroup[] = [
  {
    label: 'Oct 31',
    transactions: [
      { id: 'oct-1', name: 'Albert Heijn', category: 'Groceries', amount: -67.42, date: 'Oct 31', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'oct-2', name: 'Coffee Company', category: 'Coffee & Snacks', amount: -5.80, date: 'Oct 31', logoUrl: '/assets/icons/merchant-coffee.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Oct 30',
    transactions: [
      { id: 'oct-3', name: 'NS Treinen', category: 'Transport', amount: -12.40, date: 'Oct 30', initials: 'NS', nwgType: 'need' },
      { id: 'oct-4', name: 'Starbucks', category: 'Coffee & Snacks', amount: -6.20, date: 'Oct 30', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
      { id: 'oct-5', name: 'Thuisbezorgd', category: 'Dining', amount: -18.90, date: 'Oct 30', initials: 'TB', nwgType: 'want' },
    ],
  },
  {
    label: 'Oct 29',
    transactions: [
      { id: 'oct-6', name: 'Jumbo', category: 'Groceries', amount: -52.18, date: 'Oct 29', initials: 'JU', nwgType: 'need' },
      { id: 'oct-7', name: 'Pathé Cinema', category: 'Entertainment', amount: -24.50, date: 'Oct 29', initials: 'PA', nwgType: 'want' },
    ],
  },
  {
    label: 'Oct 28',
    transactions: [
      { id: 'oct-8', name: 'Albert Heijn', category: 'Groceries', amount: -38.75, date: 'Oct 28', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'oct-9', name: 'Starbucks', category: 'Coffee & Snacks', amount: -4.80, date: 'Oct 28', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Oct 27',
    transactions: [
      { id: 'oct-10', name: 'Shell', category: 'Transport', amount: -45.00, date: 'Oct 27', initials: 'SH', nwgType: 'need' },
      { id: 'oct-11', name: 'Bol.com', category: 'Shopping', amount: -34.99, date: 'Oct 27', initials: 'BL', nwgType: 'want' },
    ],
  },
  {
    label: 'Oct 26',
    transactions: [
      { id: 'oct-12', name: 'Auto-save transfer', category: 'Savings', amount: -500.00, date: 'Oct 26', initials: 'SV', nwgType: 'growth' },
      { id: 'oct-13', name: 'Café de Klos', category: 'Dining', amount: -52.00, date: 'Oct 26', initials: 'CK', nwgType: 'want' },
    ],
  },
  {
    label: 'Oct 25',
    transactions: [
      { id: 'oct-14', name: 'Salary — Employer BV', description: 'Monthly salary', category: 'Income', amount: 6000.00, date: 'Oct 25', initials: 'EB', isPositive: true, nwgType: 'growth' },
      { id: 'oct-15', name: 'Birthday dinner — De Kas', category: 'Dining', amount: -185.00, date: 'Oct 25', initials: 'DK', nwgType: 'want' },
    ],
  },
  {
    label: 'Oct 23',
    transactions: [
      { id: 'oct-16', name: 'Albert Heijn', category: 'Groceries', amount: -71.30, date: 'Oct 23', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'oct-17', name: 'Coffee Company', category: 'Coffee & Snacks', amount: -5.40, date: 'Oct 23', logoUrl: '/assets/icons/merchant-coffee.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Oct 21',
    transactions: [
      { id: 'oct-18', name: 'Jumbo', category: 'Groceries', amount: -44.95, date: 'Oct 21', initials: 'JU', nwgType: 'need' },
      { id: 'oct-19', name: 'NS Treinen', category: 'Transport', amount: -15.80, date: 'Oct 21', initials: 'NS', nwgType: 'need' },
      { id: 'oct-20', name: 'Starbucks', category: 'Coffee & Snacks', amount: -5.60, date: 'Oct 21', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Oct 19',
    transactions: [
      { id: 'oct-21', name: 'Zara', category: 'Shopping', amount: -89.00, date: 'Oct 19', initials: 'ZA', nwgType: 'want' },
      { id: 'oct-22', name: 'Halloween costume — Party City', category: 'Shopping', amount: -45.00, date: 'Oct 19', initials: 'PC', nwgType: 'want' },
    ],
  },
  {
    label: 'Oct 17',
    transactions: [
      { id: 'oct-23', name: 'Albert Heijn', category: 'Groceries', amount: -55.60, date: 'Oct 17', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'oct-24', name: 'Concert — Paradiso', category: 'Entertainment', amount: -42.50, date: 'Oct 17', initials: 'PD', nwgType: 'want' },
    ],
  },
  {
    label: 'Oct 15',
    transactions: [
      { id: 'oct-25', name: 'Spotify', category: 'Subscriptions', amount: -10.99, date: 'Oct 15', logoUrl: 'https://logo.clearbit.com/spotify.com', nwgType: 'want' },
      { id: 'oct-26', name: 'Netflix', category: 'Subscriptions', amount: -15.49, date: 'Oct 15', logoUrl: '/assets/icons/merchant-netflix.png', nwgType: 'want' },
      { id: 'oct-27', name: 'Lunch — Febo', category: 'Dining', amount: -14.50, date: 'Oct 15', initials: 'FB', nwgType: 'want' },
    ],
  },
  {
    label: 'Oct 14',
    transactions: [
      { id: 'oct-28', name: 'Jumbo', category: 'Groceries', amount: -62.40, date: 'Oct 14', initials: 'JU', nwgType: 'need' },
      { id: 'oct-29', name: 'Coffee Company', category: 'Coffee & Snacks', amount: -6.10, date: 'Oct 14', logoUrl: '/assets/icons/merchant-coffee.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Oct 12',
    transactions: [
      { id: 'oct-30', name: 'Restaurant Moeders', category: 'Dining', amount: -78.00, date: 'Oct 12', initials: 'RM', nwgType: 'want' },
      { id: 'oct-31', name: 'NS Treinen', category: 'Transport', amount: -8.60, date: 'Oct 12', initials: 'NS', nwgType: 'need' },
    ],
  },
  {
    label: 'Oct 10',
    transactions: [
      { id: 'oct-32', name: 'KPN Internet', category: 'Utilities', amount: -49.99, date: 'Oct 10', initials: 'KP', nwgType: 'need' },
      { id: 'oct-33', name: 'Albert Heijn', category: 'Groceries', amount: -43.20, date: 'Oct 10', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
    ],
  },
  {
    label: 'Oct 8',
    transactions: [
      { id: 'oct-34', name: 'Starbucks', category: 'Coffee & Snacks', amount: -5.90, date: 'Oct 8', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
      { id: 'oct-35', name: 'Amazon', category: 'Shopping', amount: -29.99, date: 'Oct 8', logoUrl: '/assets/icons/merchant-amazon.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Oct 5',
    transactions: [
      { id: 'oct-36', name: 'T-Mobile', category: 'Utilities', amount: -34.99, date: 'Oct 5', initials: 'TM', nwgType: 'need' },
      { id: 'oct-37', name: 'Gym — Basic-Fit', category: 'Fitness', amount: -34.99, date: 'Oct 5', initials: 'BF', nwgType: 'want' },
      { id: 'oct-38', name: 'Jumbo', category: 'Groceries', amount: -35.80, date: 'Oct 5', initials: 'JU', nwgType: 'need' },
    ],
  },
  {
    label: 'Oct 3',
    transactions: [
      { id: 'oct-39', name: 'Vattenfall Energy', category: 'Utilities', amount: -105.00, date: 'Oct 3', initials: 'VF', nwgType: 'need' },
      { id: 'oct-40', name: 'OV-chipkaart', category: 'Transport', amount: -20.00, date: 'Oct 3', initials: 'OV', nwgType: 'need' },
    ],
  },
  {
    label: 'Oct 1',
    transactions: [
      { id: 'oct-41', name: 'Rent — Woningbouw', category: 'Housing', amount: -1450.00, date: 'Oct 1', initials: 'WB', nwgType: 'need' },
      { id: 'oct-42', name: 'Zilveren Kruis — Health insurance', category: 'Healthcare', amount: -142.00, date: 'Oct 1', initials: 'ZK', nwgType: 'need' },
      { id: 'oct-43', name: 'Albert Heijn', category: 'Groceries', amount: -82.50, date: 'Oct 1', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
    ],
  },
];

// ─── November 2025 ──────────────────────────────────────────────

const novTransactions: TransactionGroup[] = [
  {
    label: 'Nov 30',
    transactions: [
      { id: 'nov-1', name: 'Sinterklaas gifts — Bol.com', category: 'Shopping', amount: -120.00, date: 'Nov 30', initials: 'BL', nwgType: 'want' },
      { id: 'nov-2', name: 'Albert Heijn', category: 'Groceries', amount: -74.60, date: 'Nov 30', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
    ],
  },
  {
    label: 'Nov 29',
    transactions: [
      { id: 'nov-3', name: 'Black Friday — Amazon', category: 'Shopping', amount: -340.00, date: 'Nov 29', logoUrl: '/assets/icons/merchant-amazon.png', nwgType: 'want' },
      { id: 'nov-4', name: 'Black Friday — Bol.com', category: 'Shopping', amount: -89.00, date: 'Nov 29', initials: 'BL', nwgType: 'want' },
      { id: 'nov-5', name: 'Coffee Company', category: 'Coffee & Snacks', amount: -5.40, date: 'Nov 29', logoUrl: '/assets/icons/merchant-coffee.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Nov 27',
    transactions: [
      { id: 'nov-6', name: 'Jumbo', category: 'Groceries', amount: -58.90, date: 'Nov 27', initials: 'JU', nwgType: 'need' },
      { id: 'nov-7', name: 'NS Treinen', category: 'Transport', amount: -14.20, date: 'Nov 27', initials: 'NS', nwgType: 'need' },
      { id: 'nov-8', name: 'Starbucks', category: 'Coffee & Snacks', amount: -6.40, date: 'Nov 27', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Nov 26',
    transactions: [
      { id: 'nov-9', name: 'Auto-save transfer', category: 'Savings', amount: -500.00, date: 'Nov 26', initials: 'SV', nwgType: 'growth' },
    ],
  },
  {
    label: 'Nov 25',
    transactions: [
      { id: 'nov-10', name: 'Salary — Employer BV', description: 'Monthly salary', category: 'Income', amount: 6000.00, date: 'Nov 25', initials: 'EB', isPositive: true, nwgType: 'growth' },
      { id: 'nov-11', name: 'Dinner — Cannibale Royale', category: 'Dining', amount: -68.00, date: 'Nov 25', initials: 'CR', nwgType: 'want' },
    ],
  },
  {
    label: 'Nov 23',
    transactions: [
      { id: 'nov-12', name: 'Albert Heijn', category: 'Groceries', amount: -62.15, date: 'Nov 23', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'nov-13', name: 'Shell', category: 'Transport', amount: -42.00, date: 'Nov 23', initials: 'SH', nwgType: 'need' },
    ],
  },
  {
    label: 'Nov 21',
    transactions: [
      { id: 'nov-14', name: 'HEMA', category: 'Shopping', amount: -22.50, date: 'Nov 21', initials: 'HM', nwgType: 'want' },
      { id: 'nov-15', name: 'Starbucks', category: 'Coffee & Snacks', amount: -5.80, date: 'Nov 21', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
      { id: 'nov-16', name: 'Lunch — Broodje Bert', category: 'Dining', amount: -13.50, date: 'Nov 21', initials: 'BB', nwgType: 'want' },
    ],
  },
  {
    label: 'Nov 19',
    transactions: [
      { id: 'nov-17', name: 'Jumbo', category: 'Groceries', amount: -48.70, date: 'Nov 19', initials: 'JU', nwgType: 'need' },
      { id: 'nov-18', name: 'Coffee Company', category: 'Coffee & Snacks', amount: -5.60, date: 'Nov 19', logoUrl: '/assets/icons/merchant-coffee.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Nov 17',
    transactions: [
      { id: 'nov-19', name: 'Restaurant Rijks', category: 'Dining', amount: -95.00, date: 'Nov 17', initials: 'RR', nwgType: 'want' },
      { id: 'nov-20', name: 'NS Treinen', category: 'Transport', amount: -11.60, date: 'Nov 17', initials: 'NS', nwgType: 'need' },
    ],
  },
  {
    label: 'Nov 15',
    transactions: [
      { id: 'nov-21', name: 'Spotify', category: 'Subscriptions', amount: -10.99, date: 'Nov 15', logoUrl: 'https://logo.clearbit.com/spotify.com', nwgType: 'want' },
      { id: 'nov-22', name: 'Netflix', category: 'Subscriptions', amount: -15.49, date: 'Nov 15', logoUrl: '/assets/icons/merchant-netflix.png', nwgType: 'want' },
      { id: 'nov-23', name: 'Albert Heijn', category: 'Groceries', amount: -55.30, date: 'Nov 15', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
    ],
  },
  {
    label: 'Nov 13',
    transactions: [
      { id: 'nov-24', name: 'Coolblue', category: 'Shopping', amount: -149.00, date: 'Nov 13', initials: 'CB', nwgType: 'want' },
      { id: 'nov-25', name: 'Starbucks', category: 'Coffee & Snacks', amount: -4.90, date: 'Nov 13', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Nov 11',
    transactions: [
      { id: 'nov-26', name: 'Jumbo', category: 'Groceries', amount: -42.80, date: 'Nov 11', initials: 'JU', nwgType: 'need' },
      { id: 'nov-27', name: 'OV-chipkaart', category: 'Transport', amount: -20.00, date: 'Nov 11', initials: 'OV', nwgType: 'need' },
    ],
  },
  {
    label: 'Nov 10',
    transactions: [
      { id: 'nov-28', name: 'KPN Internet', category: 'Utilities', amount: -49.99, date: 'Nov 10', initials: 'KP', nwgType: 'need' },
      { id: 'nov-29', name: 'Coffee Company', category: 'Coffee & Snacks', amount: -6.00, date: 'Nov 10', logoUrl: '/assets/icons/merchant-coffee.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Nov 8',
    transactions: [
      { id: 'nov-30', name: 'Albert Heijn', category: 'Groceries', amount: -69.45, date: 'Nov 8', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'nov-31', name: 'Kruidvat', category: 'Shopping', amount: -18.90, date: 'Nov 8', initials: 'KV', nwgType: 'need' },
    ],
  },
  {
    label: 'Nov 6',
    transactions: [
      { id: 'nov-32', name: 'Dinner — Wagamama', category: 'Dining', amount: -42.00, date: 'Nov 6', initials: 'WG', nwgType: 'want' },
      { id: 'nov-33', name: 'Starbucks', category: 'Coffee & Snacks', amount: -5.20, date: 'Nov 6', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Nov 5',
    transactions: [
      { id: 'nov-34', name: 'T-Mobile', category: 'Utilities', amount: -34.99, date: 'Nov 5', initials: 'TM', nwgType: 'need' },
      { id: 'nov-35', name: 'Gym — Basic-Fit', category: 'Fitness', amount: -34.99, date: 'Nov 5', initials: 'BF', nwgType: 'want' },
    ],
  },
  {
    label: 'Nov 3',
    transactions: [
      { id: 'nov-36', name: 'Vattenfall Energy', category: 'Utilities', amount: -135.00, date: 'Nov 3', initials: 'VF', nwgType: 'need' },
      { id: 'nov-37', name: 'Jumbo', category: 'Groceries', amount: -39.20, date: 'Nov 3', initials: 'JU', nwgType: 'need' },
    ],
  },
  {
    label: 'Nov 1',
    transactions: [
      { id: 'nov-38', name: 'Rent — Woningbouw', category: 'Housing', amount: -1450.00, date: 'Nov 1', initials: 'WB', nwgType: 'need' },
      { id: 'nov-39', name: 'Zilveren Kruis — Health insurance', category: 'Healthcare', amount: -142.00, date: 'Nov 1', initials: 'ZK', nwgType: 'need' },
      { id: 'nov-40', name: 'Albert Heijn', category: 'Groceries', amount: -78.50, date: 'Nov 1', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
    ],
  },
];

// ─── December 2025 ──────────────────────────────────────────────

const decTransactions: TransactionGroup[] = [
  {
    label: 'Dec 31',
    transactions: [
      { id: 'dec-1', name: 'New Year dinner — The Duchess', category: 'Dining', amount: -175.00, date: 'Dec 31', initials: 'TD', nwgType: 'want' },
      { id: 'dec-2', name: 'Albert Heijn', category: 'Groceries', amount: -95.40, date: 'Dec 31', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
    ],
  },
  {
    label: 'Dec 29',
    transactions: [
      { id: 'dec-3', name: 'Jumbo', category: 'Groceries', amount: -68.20, date: 'Dec 29', initials: 'JU', nwgType: 'need' },
      { id: 'dec-4', name: 'Starbucks', category: 'Coffee & Snacks', amount: -6.80, date: 'Dec 29', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Dec 27',
    transactions: [
      { id: 'dec-5', name: 'Dinner — Bak Restaurant', category: 'Dining', amount: -110.00, date: 'Dec 27', initials: 'BR', nwgType: 'want' },
      { id: 'dec-6', name: 'NS Treinen', category: 'Transport', amount: -18.40, date: 'Dec 27', initials: 'NS', nwgType: 'need' },
    ],
  },
  {
    label: 'Dec 26',
    transactions: [
      { id: 'dec-7', name: 'Auto-save transfer', category: 'Savings', amount: -500.00, date: 'Dec 26', initials: 'SV', nwgType: 'growth' },
    ],
  },
  {
    label: 'Dec 25',
    transactions: [
      { id: 'dec-8', name: 'Salary — Employer BV', description: 'Monthly salary', category: 'Income', amount: 6000.00, date: 'Dec 25', initials: 'EB', isPositive: true, nwgType: 'growth' },
    ],
  },
  {
    label: 'Dec 23',
    transactions: [
      { id: 'dec-9', name: 'Christmas gifts — Bijenkorf', category: 'Shopping', amount: -220.00, date: 'Dec 23', initials: 'BK', nwgType: 'want' },
      { id: 'dec-10', name: 'Christmas gifts — Bol.com', category: 'Shopping', amount: -160.00, date: 'Dec 23', initials: 'BL', nwgType: 'want' },
      { id: 'dec-11', name: 'Albert Heijn', category: 'Groceries', amount: -85.30, date: 'Dec 23', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
    ],
  },
  {
    label: 'Dec 21',
    transactions: [
      { id: 'dec-12', name: 'Starbucks', category: 'Coffee & Snacks', amount: -7.20, date: 'Dec 21', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
      { id: 'dec-13', name: 'Lunch — Foodhallen', category: 'Dining', amount: -22.00, date: 'Dec 21', initials: 'FH', nwgType: 'want' },
    ],
  },
  {
    label: 'Dec 19',
    transactions: [
      { id: 'dec-14', name: 'KLM — Holiday flights', category: 'Travel', amount: -650.00, date: 'Dec 19', initials: 'KL', nwgType: 'want' },
      { id: 'dec-15', name: 'Coffee Company', category: 'Coffee & Snacks', amount: -5.60, date: 'Dec 19', logoUrl: '/assets/icons/merchant-coffee.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Dec 17',
    transactions: [
      { id: 'dec-16', name: 'Jumbo', category: 'Groceries', amount: -59.70, date: 'Dec 17', initials: 'JU', nwgType: 'need' },
      { id: 'dec-17', name: 'NS Treinen', category: 'Transport', amount: -12.80, date: 'Dec 17', initials: 'NS', nwgType: 'need' },
    ],
  },
  {
    label: 'Dec 15',
    transactions: [
      { id: 'dec-18', name: 'Spotify', category: 'Subscriptions', amount: -10.99, date: 'Dec 15', logoUrl: 'https://logo.clearbit.com/spotify.com', nwgType: 'want' },
      { id: 'dec-19', name: 'Netflix', category: 'Subscriptions', amount: -15.49, date: 'Dec 15', logoUrl: '/assets/icons/merchant-netflix.png', nwgType: 'want' },
      { id: 'dec-20', name: 'Dinner — Ciel Bleu', category: 'Dining', amount: -120.00, date: 'Dec 15', initials: 'CB', nwgType: 'want' },
    ],
  },
  {
    label: 'Dec 13',
    transactions: [
      { id: 'dec-21', name: 'Albert Heijn', category: 'Groceries', amount: -72.40, date: 'Dec 13', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'dec-22', name: 'Starbucks', category: 'Coffee & Snacks', amount: -5.90, date: 'Dec 13', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
      { id: 'dec-23', name: 'HEMA', category: 'Shopping', amount: -35.00, date: 'Dec 13', initials: 'HM', nwgType: 'want' },
    ],
  },
  {
    label: 'Dec 11',
    transactions: [
      { id: 'dec-24', name: 'Christmas market drinks', category: 'Dining', amount: -28.00, date: 'Dec 11', initials: 'CM', nwgType: 'want' },
      { id: 'dec-25', name: 'Shell', category: 'Transport', amount: -38.00, date: 'Dec 11', initials: 'SH', nwgType: 'need' },
    ],
  },
  {
    label: 'Dec 10',
    transactions: [
      { id: 'dec-26', name: 'KPN Internet', category: 'Utilities', amount: -49.99, date: 'Dec 10', initials: 'KP', nwgType: 'need' },
      { id: 'dec-27', name: 'Jumbo', category: 'Groceries', amount: -47.80, date: 'Dec 10', initials: 'JU', nwgType: 'need' },
    ],
  },
  {
    label: 'Dec 8',
    transactions: [
      { id: 'dec-28', name: 'Coffee Company', category: 'Coffee & Snacks', amount: -6.30, date: 'Dec 8', logoUrl: '/assets/icons/merchant-coffee.png', nwgType: 'want' },
      { id: 'dec-29', name: 'Concert — Ziggo Dome', category: 'Entertainment', amount: -65.00, date: 'Dec 8', initials: 'ZD', nwgType: 'want' },
    ],
  },
  {
    label: 'Dec 5',
    transactions: [
      { id: 'dec-30', name: 'T-Mobile', category: 'Utilities', amount: -34.99, date: 'Dec 5', initials: 'TM', nwgType: 'need' },
      { id: 'dec-31', name: 'Gym — Basic-Fit', category: 'Fitness', amount: -34.99, date: 'Dec 5', initials: 'BF', nwgType: 'want' },
      { id: 'dec-32', name: 'Albert Heijn', category: 'Groceries', amount: -63.90, date: 'Dec 5', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
    ],
  },
  {
    label: 'Dec 3',
    transactions: [
      { id: 'dec-33', name: 'Vattenfall Energy', category: 'Utilities', amount: -175.00, date: 'Dec 3', initials: 'VF', nwgType: 'need' },
      { id: 'dec-34', name: 'OV-chipkaart', category: 'Transport', amount: -20.00, date: 'Dec 3', initials: 'OV', nwgType: 'need' },
      { id: 'dec-35', name: 'Starbucks', category: 'Coffee & Snacks', amount: -5.40, date: 'Dec 3', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Dec 1',
    transactions: [
      { id: 'dec-36', name: 'Rent — Woningbouw', category: 'Housing', amount: -1450.00, date: 'Dec 1', initials: 'WB', nwgType: 'need' },
      { id: 'dec-37', name: 'Zilveren Kruis — Health insurance', category: 'Healthcare', amount: -142.00, date: 'Dec 1', initials: 'ZK', nwgType: 'need' },
      { id: 'dec-38', name: 'Jumbo', category: 'Groceries', amount: -55.40, date: 'Dec 1', initials: 'JU', nwgType: 'need' },
    ],
  },
];

// ─── January 2026 ───────────────────────────────────────────────

const janTransactions: TransactionGroup[] = [
  {
    label: 'Jan 31',
    transactions: [
      { id: 'jan-1', name: 'Albert Heijn', category: 'Groceries', amount: -58.30, date: 'Jan 31', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'jan-2', name: 'Starbucks', category: 'Coffee & Snacks', amount: -5.20, date: 'Jan 31', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Jan 29',
    transactions: [
      { id: 'jan-3', name: 'NS Treinen', category: 'Transport', amount: -14.60, date: 'Jan 29', initials: 'NS', nwgType: 'need' },
      { id: 'jan-4', name: 'Coffee Company', category: 'Coffee & Snacks', amount: -5.40, date: 'Jan 29', logoUrl: '/assets/icons/merchant-coffee.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Jan 27',
    transactions: [
      { id: 'jan-5', name: 'Jumbo', category: 'Groceries', amount: -45.80, date: 'Jan 27', initials: 'JU', nwgType: 'need' },
      { id: 'jan-6', name: 'Lunch — FEBO', category: 'Dining', amount: -12.50, date: 'Jan 27', initials: 'FB', nwgType: 'want' },
    ],
  },
  {
    label: 'Jan 26',
    transactions: [
      { id: 'jan-7', name: 'Auto-save transfer', category: 'Savings', amount: -500.00, date: 'Jan 26', initials: 'SV', nwgType: 'growth' },
    ],
  },
  {
    label: 'Jan 25',
    transactions: [
      { id: 'jan-8', name: 'Salary — Employer BV', description: 'Monthly salary', category: 'Income', amount: 6000.00, date: 'Jan 25', initials: 'EB', isPositive: true, nwgType: 'growth' },
    ],
  },
  {
    label: 'Jan 23',
    transactions: [
      { id: 'jan-9', name: 'Albert Heijn', category: 'Groceries', amount: -62.10, date: 'Jan 23', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'jan-10', name: 'Starbucks', category: 'Coffee & Snacks', amount: -4.80, date: 'Jan 23', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Jan 21',
    transactions: [
      { id: 'jan-11', name: 'Car insurance — ANWB (annual)', category: 'Insurance', amount: -420.00, date: 'Jan 21', initials: 'AW', nwgType: 'need' },
      { id: 'jan-12', name: 'Jumbo', category: 'Groceries', amount: -38.60, date: 'Jan 21', initials: 'JU', nwgType: 'need' },
    ],
  },
  {
    label: 'Jan 19',
    transactions: [
      { id: 'jan-13', name: 'Running shoes — Nike Amsterdam', category: 'Shopping', amount: -129.00, date: 'Jan 19', initials: 'NK', nwgType: 'want' },
      { id: 'jan-14', name: 'NS Treinen', category: 'Transport', amount: -11.20, date: 'Jan 19', initials: 'NS', nwgType: 'need' },
    ],
  },
  {
    label: 'Jan 17',
    transactions: [
      { id: 'jan-15', name: 'Albert Heijn', category: 'Groceries', amount: -55.40, date: 'Jan 17', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'jan-16', name: 'Coffee Company', category: 'Coffee & Snacks', amount: -5.60, date: 'Jan 17', logoUrl: '/assets/icons/merchant-coffee.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Jan 15',
    transactions: [
      { id: 'jan-17', name: 'Spotify', category: 'Subscriptions', amount: -10.99, date: 'Jan 15', logoUrl: 'https://logo.clearbit.com/spotify.com', nwgType: 'want' },
      { id: 'jan-18', name: 'Netflix', category: 'Subscriptions', amount: -15.49, date: 'Jan 15', logoUrl: '/assets/icons/merchant-netflix.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Jan 13',
    transactions: [
      { id: 'jan-19', name: 'Jumbo', category: 'Groceries', amount: -41.20, date: 'Jan 13', initials: 'JU', nwgType: 'need' },
      { id: 'jan-20', name: 'Dinner — Bakers & Roasters', category: 'Dining', amount: -38.00, date: 'Jan 13', initials: 'BR', nwgType: 'want' },
    ],
  },
  {
    label: 'Jan 11',
    transactions: [
      { id: 'jan-21', name: 'Albert Heijn', category: 'Groceries', amount: -48.90, date: 'Jan 11', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'jan-22', name: 'Starbucks', category: 'Coffee & Snacks', amount: -5.10, date: 'Jan 11', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Jan 10',
    transactions: [
      { id: 'jan-23', name: 'KPN Internet', category: 'Utilities', amount: -49.99, date: 'Jan 10', initials: 'KP', nwgType: 'need' },
      { id: 'jan-24', name: 'Shell', category: 'Transport', amount: -40.00, date: 'Jan 10', initials: 'SH', nwgType: 'need' },
    ],
  },
  {
    label: 'Jan 8',
    transactions: [
      { id: 'jan-25', name: 'Jumbo', category: 'Groceries', amount: -35.60, date: 'Jan 8', initials: 'JU', nwgType: 'need' },
      { id: 'jan-26', name: 'Coffee Company', category: 'Coffee & Snacks', amount: -5.80, date: 'Jan 8', logoUrl: '/assets/icons/merchant-coffee.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Jan 6',
    transactions: [
      { id: 'jan-27', name: 'Kruidvat', category: 'Shopping', amount: -15.90, date: 'Jan 6', initials: 'KV', nwgType: 'need' },
      { id: 'jan-28', name: 'OV-chipkaart', category: 'Transport', amount: -20.00, date: 'Jan 6', initials: 'OV', nwgType: 'need' },
    ],
  },
  {
    label: 'Jan 5',
    transactions: [
      { id: 'jan-29', name: 'T-Mobile', category: 'Utilities', amount: -34.99, date: 'Jan 5', initials: 'TM', nwgType: 'need' },
      { id: 'jan-30', name: 'Gym — Basic-Fit', description: 'Price increase from €34.99', category: 'Fitness', amount: -39.99, date: 'Jan 5', initials: 'BF', nwgType: 'want' },
    ],
  },
  {
    label: 'Jan 3',
    transactions: [
      { id: 'jan-31', name: 'Vattenfall Energy', category: 'Utilities', amount: -185.00, date: 'Jan 3', initials: 'VF', nwgType: 'need' },
      { id: 'jan-32', name: 'Albert Heijn', category: 'Groceries', amount: -72.80, date: 'Jan 3', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
    ],
  },
  {
    label: 'Jan 1',
    transactions: [
      { id: 'jan-33', name: 'Rent — Woningbouw', category: 'Housing', amount: -1450.00, date: 'Jan 1', initials: 'WB', nwgType: 'need' },
      { id: 'jan-34', name: 'Zilveren Kruis — Health insurance', category: 'Healthcare', amount: -142.00, date: 'Jan 1', initials: 'ZK', nwgType: 'need' },
    ],
  },
];

// ─── February 2026 ──────────────────────────────────────────────

const febTransactions: TransactionGroup[] = [
  {
    label: 'Feb 28',
    transactions: [
      { id: 'feb-1', name: 'Albert Heijn', category: 'Groceries', amount: -61.20, date: 'Feb 28', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'feb-2', name: 'Starbucks', category: 'Coffee & Snacks', amount: -5.40, date: 'Feb 28', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Feb 26',
    transactions: [
      { id: 'feb-3', name: 'Auto-save transfer', category: 'Savings', amount: -500.00, date: 'Feb 26', initials: 'SV', nwgType: 'growth' },
      { id: 'feb-4', name: 'NS Treinen', category: 'Transport', amount: -13.40, date: 'Feb 26', initials: 'NS', nwgType: 'need' },
    ],
  },
  {
    label: 'Feb 25',
    transactions: [
      { id: 'feb-5', name: 'Salary — Employer BV', description: 'Monthly salary', category: 'Income', amount: 6000.00, date: 'Feb 25', initials: 'EB', isPositive: true, nwgType: 'growth' },
    ],
  },
  {
    label: 'Feb 23',
    transactions: [
      { id: 'feb-6', name: 'Jumbo', category: 'Groceries', amount: -52.80, date: 'Feb 23', initials: 'JU', nwgType: 'need' },
      { id: 'feb-7', name: 'Coffee Company', category: 'Coffee & Snacks', amount: -6.20, date: 'Feb 23', logoUrl: '/assets/icons/merchant-coffee.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Feb 21',
    transactions: [
      { id: 'feb-8', name: 'Hotel Bruges — weekend trip', category: 'Travel', amount: -280.00, date: 'Feb 21', initials: 'HB', nwgType: 'want' },
      { id: 'feb-9', name: 'Restaurant Bruges', category: 'Dining', amount: -85.00, date: 'Feb 21', initials: 'RB', nwgType: 'want' },
      { id: 'feb-10', name: 'Bruges food & drinks', category: 'Dining', amount: -65.00, date: 'Feb 21', initials: 'BF', nwgType: 'want' },
    ],
  },
  {
    label: 'Feb 19',
    transactions: [
      { id: 'feb-11', name: 'Albert Heijn', category: 'Groceries', amount: -55.90, date: 'Feb 19', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'feb-12', name: 'Starbucks', category: 'Coffee & Snacks', amount: -4.90, date: 'Feb 19', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Feb 17',
    transactions: [
      { id: 'feb-13', name: 'Jumbo', category: 'Groceries', amount: -42.30, date: 'Feb 17', initials: 'JU', nwgType: 'need' },
      { id: 'feb-14', name: 'NS Treinen', category: 'Transport', amount: -11.80, date: 'Feb 17', initials: 'NS', nwgType: 'need' },
    ],
  },
  {
    label: 'Feb 15',
    transactions: [
      { id: 'feb-15', name: 'Spotify', category: 'Subscriptions', amount: -10.99, date: 'Feb 15', logoUrl: 'https://logo.clearbit.com/spotify.com', nwgType: 'want' },
      { id: 'feb-16', name: 'Netflix', category: 'Subscriptions', amount: -15.49, date: 'Feb 15', logoUrl: '/assets/icons/merchant-netflix.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Feb 14',
    transactions: [
      { id: 'feb-17', name: "Valentine's dinner — Bridges", category: 'Dining', amount: -95.00, date: 'Feb 14', initials: 'BD', nwgType: 'want' },
      { id: 'feb-18', name: 'Flowers — Bloemenmarkt', category: 'Shopping', amount: -35.00, date: 'Feb 14', initials: 'BM', nwgType: 'want' },
    ],
  },
  {
    label: 'Feb 12',
    transactions: [
      { id: 'feb-19', name: 'Albert Heijn', category: 'Groceries', amount: -48.60, date: 'Feb 12', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'feb-20', name: 'Coffee Company', category: 'Coffee & Snacks', amount: -5.80, date: 'Feb 12', logoUrl: '/assets/icons/merchant-coffee.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Feb 10',
    transactions: [
      { id: 'feb-21', name: 'KPN Internet', category: 'Utilities', amount: -49.99, date: 'Feb 10', initials: 'KP', nwgType: 'need' },
      { id: 'feb-22', name: 'Jumbo', category: 'Groceries', amount: -39.40, date: 'Feb 10', initials: 'JU', nwgType: 'need' },
    ],
  },
  {
    label: 'Feb 8',
    transactions: [
      { id: 'feb-23', name: 'Starbucks', category: 'Coffee & Snacks', amount: -5.60, date: 'Feb 8', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
      { id: 'feb-24', name: 'Pathé Cinema', category: 'Entertainment', amount: -28.00, date: 'Feb 8', initials: 'PA', nwgType: 'want' },
      { id: 'feb-25', name: 'Amazon', category: 'Shopping', amount: -42.99, date: 'Feb 8', logoUrl: '/assets/icons/merchant-amazon.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Feb 6',
    transactions: [
      { id: 'feb-26', name: 'Albert Heijn', category: 'Groceries', amount: -66.80, date: 'Feb 6', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'feb-27', name: 'OV-chipkaart', category: 'Transport', amount: -20.00, date: 'Feb 6', initials: 'OV', nwgType: 'need' },
    ],
  },
  {
    label: 'Feb 5',
    transactions: [
      { id: 'feb-28', name: 'T-Mobile', category: 'Utilities', amount: -34.99, date: 'Feb 5', initials: 'TM', nwgType: 'need' },
      { id: 'feb-29', name: 'Gym — Basic-Fit', category: 'Fitness', amount: -39.99, date: 'Feb 5', initials: 'BF', nwgType: 'want' },
    ],
  },
  {
    label: 'Feb 3',
    transactions: [
      { id: 'feb-30', name: 'Vattenfall Energy', category: 'Utilities', amount: -155.00, date: 'Feb 3', initials: 'VF', nwgType: 'need' },
      { id: 'feb-31', name: 'Shell', category: 'Transport', amount: -38.00, date: 'Feb 3', initials: 'SH', nwgType: 'need' },
    ],
  },
  {
    label: 'Feb 1',
    transactions: [
      { id: 'feb-32', name: 'Rent — Woningbouw', category: 'Housing', amount: -1450.00, date: 'Feb 1', initials: 'WB', nwgType: 'need' },
      { id: 'feb-33', name: 'Zilveren Kruis — Health insurance', category: 'Healthcare', amount: -142.00, date: 'Feb 1', initials: 'ZK', nwgType: 'need' },
      { id: 'feb-34', name: 'Jumbo', category: 'Groceries', amount: -70.50, date: 'Feb 1', initials: 'JU', nwgType: 'need' },
    ],
  },
];

// ─── March 2026 (current month — extends homeTransactionsData) ──

const marTransactions: TransactionGroup[] = [
  {
    label: 'Today',
    transactions: [
      { id: 'mar-1', name: 'Albert Heijn', category: 'Groceries', amount: -72.10, date: 'Today', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'mar-2', name: 'Starbucks', category: 'Coffee & Snacks', amount: -5.80, date: 'Today', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Yesterday',
    transactions: [
      { id: 'mar-3', name: 'NS Treinen', category: 'Transport', amount: -12.40, date: 'Yesterday', initials: 'NS', nwgType: 'need' },
      { id: 'mar-4', name: 'Lunch — Broodje Bert', category: 'Dining', amount: -14.50, date: 'Yesterday', initials: 'BB', nwgType: 'want' },
    ],
  },
  {
    label: 'Thu',
    transactions: [
      { id: 'mar-5', name: 'Jumbo', category: 'Groceries', amount: -48.30, date: 'Mar 13', initials: 'JU', nwgType: 'need' },
      { id: 'mar-6', name: 'Coffee Company', category: 'Coffee & Snacks', amount: -5.60, date: 'Mar 13', logoUrl: '/assets/icons/merchant-coffee.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Wed',
    transactions: [
      { id: 'mar-7', name: 'Albert Heijn', category: 'Groceries', amount: -38.90, date: 'Mar 12', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'mar-8', name: 'Starbucks', category: 'Coffee & Snacks', amount: -5.20, date: 'Mar 12', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Tue',
    transactions: [
      { id: 'mar-9', name: 'Shell', category: 'Transport', amount: -42.00, date: 'Mar 11', initials: 'SH', nwgType: 'need' },
      { id: 'mar-10', name: 'Dinner — Wagamama', category: 'Dining', amount: -45.00, date: 'Mar 11', initials: 'WG', nwgType: 'want' },
    ],
  },
  {
    label: 'Mon',
    transactions: [
      { id: 'mar-11', name: 'Jumbo', category: 'Groceries', amount: -55.20, date: 'Mar 10', initials: 'JU', nwgType: 'need' },
      { id: 'mar-12', name: 'Coffee Company', category: 'Coffee & Snacks', amount: -6.10, date: 'Mar 10', logoUrl: '/assets/icons/merchant-coffee.png', nwgType: 'want' },
      { id: 'mar-13', name: 'Amazon', category: 'Shopping', amount: -48.11, date: 'Mar 10', logoUrl: '/assets/icons/merchant-amazon.png', nwgType: 'want' },
    ],
  },
  {
    label: 'Mar 8',
    transactions: [
      { id: 'mar-14', name: 'Albert Heijn', category: 'Groceries', amount: -64.50, date: 'Mar 8', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
      { id: 'mar-15', name: 'Pathé Cinema', category: 'Entertainment', amount: -26.00, date: 'Mar 8', initials: 'PA', nwgType: 'want' },
    ],
  },
  {
    label: 'Mar 6',
    transactions: [
      { id: 'mar-16', name: 'Starbucks', category: 'Coffee & Snacks', amount: -5.40, date: 'Mar 6', logoUrl: '/assets/icons/merchant-starbucks.png', nwgType: 'want' },
      { id: 'mar-17', name: 'NS Treinen', category: 'Transport', amount: -14.20, date: 'Mar 6', initials: 'NS', nwgType: 'need' },
      { id: 'mar-18', name: 'Bol.com', category: 'Shopping', amount: -29.99, date: 'Mar 6', initials: 'BL', nwgType: 'want' },
    ],
  },
  {
    label: 'Mar 5',
    transactions: [
      { id: 'mar-19', name: 'T-Mobile', category: 'Utilities', amount: -34.99, date: 'Mar 5', initials: 'TM', nwgType: 'need' },
      { id: 'mar-20', name: 'Gym — Basic-Fit', category: 'Fitness', amount: -39.99, date: 'Mar 5', initials: 'BF', nwgType: 'want' },
    ],
  },
  {
    label: 'Mar 3',
    transactions: [
      { id: 'mar-21', name: 'Vattenfall Energy', category: 'Utilities', amount: -125.00, date: 'Mar 3', initials: 'VF', nwgType: 'need' },
      { id: 'mar-22', name: 'OV-chipkaart', category: 'Transport', amount: -20.00, date: 'Mar 3', initials: 'OV', nwgType: 'need' },
      { id: 'mar-23', name: 'Jumbo', category: 'Groceries', amount: -42.60, date: 'Mar 3', initials: 'JU', nwgType: 'need' },
    ],
  },
  {
    label: 'Mar 1',
    transactions: [
      { id: 'mar-24', name: 'Rent — Woningbouw', category: 'Housing', amount: -1450.00, date: 'Mar 1', initials: 'WB', nwgType: 'need' },
      { id: 'mar-25', name: 'Zilveren Kruis — Health insurance', category: 'Healthcare', amount: -142.00, date: 'Mar 1', initials: 'ZK', nwgType: 'need' },
      { id: 'mar-26', name: 'Albert Heijn', category: 'Groceries', amount: -68.40, date: 'Mar 1', logoUrl: 'https://logo.clearbit.com/ah.nl', nwgType: 'need' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════
// EXPORT: Monthly transaction data (keyed by month index)
// Month indices: 9=Oct, 10=Nov, 11=Dec, 0=Jan, 1=Feb, 2=Mar
// ═══════════════════════════════════════════════════════════════════

export const monthlyTransactionData: Record<string, TransactionGroup[]> = {
  '9': octTransactions,    // October 2025
  '10': novTransactions,   // November 2025
  '11': decTransactions,   // December 2025
  '0': janTransactions,    // January 2026
  '1': febTransactions,    // February 2026
  '2': marTransactions,    // March 2026
};

// Also keyed by month name for easy lookup
export const monthlyTransactionsByName: Record<string, TransactionGroup[]> = {
  'Oct': octTransactions,
  'Nov': novTransactions,
  'Dec': decTransactions,
  'Jan': janTransactions,
  'Feb': febTransactions,
  'Mar': marTransactions,
};

// ═══════════════════════════════════════════════════════════════════
// PER-MONTH NWG BREAKDOWN DATA
// Computed from transaction totals per month
// ═══════════════════════════════════════════════════════════════════

export const monthlyNwgData: Record<string, { needs: { amount: number; percentage: number }; wants: { amount: number; percentage: number }; growth: { amount: number; percentage: number } }> = {
  // Oct: Needs 48%, Wants 25%, Saved 12% — balanced month
  '9': {
    needs: { amount: 2297.33, percentage: 48 },
    wants: { amount: 1196.65, percentage: 25 },
    growth: { amount: 500.00, percentage: 12 },
  },
  // Nov: Needs 42%, Wants 35%, Saved 10% — Black Friday/Sinterklaas spike
  '10': {
    needs: { amount: 2321.78, percentage: 42 },
    wants: { amount: 1935.27, percentage: 35 },
    growth: { amount: 500.00, percentage: 10 },
  },
  // Dec: Needs 38%, Wants 40%, Saved 8% — holiday spending spike
  '11': {
    needs: { amount: 2244.68, percentage: 38 },
    wants: { amount: 2360.67, percentage: 40 },
    growth: { amount: 500.00, percentage: 8 },
  },
  // Jan: Needs 52%, Wants 20%, Saved 15% — post-holiday austerity + car insurance
  '0': {
    needs: { amount: 2893.48, percentage: 52 },
    wants: { amount: 1112.87, percentage: 20 },
    growth: { amount: 500.00, percentage: 15 },
  },
  // Feb: Needs 46%, Wants 28%, Saved 12% — Valentine's + Bruges trip but recovering
  '1': {
    needs: { amount: 2171.08, percentage: 46 },
    wants: { amount: 1320.36, percentage: 28 },
    growth: { amount: 500.00, percentage: 12 },
  },
  // Mar: Needs 46%, Wants 22%, Saved 10% — current month
  '2': {
    needs: { amount: 2762.50, percentage: 46 },
    wants: { amount: 1350.00, percentage: 22 },
    growth: { amount: 600.00, percentage: 10 },
  },
};

// ═══════════════════════════════════════════════════════════════════
// PER-MONTH CASHFLOW DATA
// ═══════════════════════════════════════════════════════════════════

export const monthlyCashflowData: Record<string, CashflowSummary> = {
  '9': { received: 6000, spent: 4200, upcoming: 0, dateRange: '1 – 31 Oct' },
  '10': { received: 6000, spent: 5100, upcoming: 0, dateRange: '1 – 30 Nov' },
  '11': { received: 6000, spent: 5800, upcoming: 0, dateRange: '1 – 31 Dec' },
  '0': { received: 6000, spent: 4600, upcoming: 0, dateRange: '1 – 31 Jan' },
  '1': { received: 6000, spent: 4400, upcoming: 0, dateRange: '1 – 28 Feb' },
  '2': { received: 6000, spent: 4712.50, upcoming: 1287.50, dateRange: '1 – 31 Mar' },
};

// ═══════════════════════════════════════════════════════════════════
// PER-ACCOUNT MONTHLY BALANCES (end-of-month)
// ═══════════════════════════════════════════════════════════════════

export const accountBalanceHistory: Record<string, Record<string, number>> = {
  // Checking account (acc-1): salary in, spending out, auto-save out
  'acc-1': {
    '9': 3100.00,   // Oct: 6000 in - 4200 spent - 500 saved + carry
    '10': 2600.00,  // Nov: heavy Black Friday
    '11': 1800.00,  // Dec: holiday spending drained it
    '0': 2700.00,   // Jan: austerity recovered some
    '1': 3100.00,   // Feb: steady recovery
    '2': 2864.66,   // Mar: current balance
  },
  // Savings account (acc-2): auto-save deposits accumulate
  'acc-2': {
    '9': 38177.23,  // Oct: +500 auto-save
    '10': 38677.23, // Nov: +500
    '11': 39177.23, // Dec: +500
    '0': 39677.23,  // Jan: +500
    '1': 40177.23,  // Feb: +500
    '2': 40677.23,  // Mar: current balance
  },
  // Shared account (acc-3): household expenses with Elly
  'acc-3': {
    '9': 41200.00,
    '10': 41050.00,
    '11': 40800.00,
    '0': 40950.00,
    '1': 40850.00,
    '2': 40677.23,
  },
};

// ═══════════════════════════════════════════════════════════════════
// PER-MONTH SPENDING CATEGORIES (top 5)
// ═══════════════════════════════════════════════════════════════════

export const monthlyTopSpending: Record<string, TopSpendCategory[]> = {
  // October 2025 — balanced month
  '9': [
    { id: 'oct-ts-1', name: 'Housing', icon: '\u{1F3E0}', amount: 1450, percentage: 35 },
    { id: 'oct-ts-2', name: 'Groceries', icon: '\u{1F6D2}', amount: 553, percentage: 13 },
    { id: 'oct-ts-3', name: 'Dining', icon: '\u{1F37D}\u{FE0F}', amount: 348, percentage: 8 },
    { id: 'oct-ts-4', name: 'Shopping', icon: '\u{1F6CD}\u{FE0F}', amount: 199, percentage: 5 },
    { id: 'oct-ts-5', name: 'Utilities', icon: '\u{26A1}', amount: 190, percentage: 5 },
  ],
  // November 2025 — Black Friday / Sinterklaas
  '10': [
    { id: 'nov-ts-1', name: 'Housing', icon: '\u{1F3E0}', amount: 1450, percentage: 28 },
    { id: 'nov-ts-2', name: 'Shopping', icon: '\u{1F6CD}\u{FE0F}', amount: 739, percentage: 14 },
    { id: 'nov-ts-3', name: 'Groceries', icon: '\u{1F6D2}', amount: 529, percentage: 10 },
    { id: 'nov-ts-4', name: 'Dining', icon: '\u{1F37D}\u{FE0F}', amount: 219, percentage: 4 },
    { id: 'nov-ts-5', name: 'Utilities', icon: '\u{26A1}', amount: 220, percentage: 4 },
  ],
  // December 2025 — holiday season peak
  '11': [
    { id: 'dec-ts-1', name: 'Housing', icon: '\u{1F3E0}', amount: 1450, percentage: 25 },
    { id: 'dec-ts-2', name: 'Travel', icon: '\u{2708}\u{FE0F}', amount: 650, percentage: 11 },
    { id: 'dec-ts-3', name: 'Groceries', icon: '\u{1F6D2}', amount: 548, percentage: 9 },
    { id: 'dec-ts-4', name: 'Dining', icon: '\u{1F37D}\u{FE0F}', amount: 455, percentage: 8 },
    { id: 'dec-ts-5', name: 'Shopping', icon: '\u{1F6CD}\u{FE0F}', amount: 415, percentage: 7 },
  ],
  // January 2026 — post-holiday austerity
  '0': [
    { id: 'jan-ts-1', name: 'Housing', icon: '\u{1F3E0}', amount: 1450, percentage: 32 },
    { id: 'jan-ts-2', name: 'Groceries', icon: '\u{1F6D2}', amount: 459, percentage: 10 },
    { id: 'jan-ts-3', name: 'Insurance', icon: '\u{1F6E1}\u{FE0F}', amount: 562, percentage: 12 },
    { id: 'jan-ts-4', name: 'Utilities', icon: '\u{26A1}', amount: 270, percentage: 6 },
    { id: 'jan-ts-5', name: 'Shopping', icon: '\u{1F6CD}\u{FE0F}', amount: 145, percentage: 3 },
  ],
  // February 2026 — Valentine's + Bruges trip
  '1': [
    { id: 'feb-ts-1', name: 'Housing', icon: '\u{1F3E0}', amount: 1450, percentage: 33 },
    { id: 'feb-ts-2', name: 'Groceries', icon: '\u{1F6D2}', amount: 437, percentage: 10 },
    { id: 'feb-ts-3', name: 'Travel', icon: '\u{2708}\u{FE0F}', amount: 280, percentage: 6 },
    { id: 'feb-ts-4', name: 'Dining', icon: '\u{1F37D}\u{FE0F}', amount: 245, percentage: 6 },
    { id: 'feb-ts-5', name: 'Utilities', icon: '\u{26A1}', amount: 240, percentage: 5 },
  ],
  // March 2026 — current month
  '2': [
    { id: 'mar-ts-1', name: 'Housing', icon: '\u{1F3E0}', amount: 1450, percentage: 31 },
    { id: 'mar-ts-2', name: 'Groceries', icon: '\u{1F6D2}', amount: 620, percentage: 13 },
    { id: 'mar-ts-3', name: 'Dining', icon: '\u{1F37D}\u{FE0F}', amount: 385, percentage: 8 },
    { id: 'mar-ts-4', name: 'Transport', icon: '\u{1F697}', amount: 310, percentage: 7 },
    { id: 'mar-ts-5', name: 'Shopping', icon: '\u{1F6CD}\u{FE0F}', amount: 275, percentage: 6 },
  ],
};
