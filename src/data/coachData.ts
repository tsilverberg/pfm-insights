import type { PersonaId, CoachTab, ConversationStarter, CoachNudge, CoachStatCard, CoachMessage } from './types';

export type { CoachTab, ConversationStarter, CoachNudge, CoachStatCard, CoachMessage };

// ─── Greetings ──────────────────────────────────────────────────

type TimeOfDay = 'morning' | 'afternoon' | 'evening';

const greetings: Record<PersonaId, Record<TimeOfDay, string>> = {
  'young-adult': {
    morning: "Morning Taylor! Let's check in on your money.",
    afternoon: "Hey Taylor! Quick check-in?",
    evening: "Evening, Taylor! Let's review your day.",
  },
  family: {
    morning: "Good morning! Here's the household pulse.",
    afternoon: "Afternoon check-in — here's where the family stands.",
    evening: "Evening wrap-up for the household.",
  },
  professional: {
    morning: "Good morning, Morgan. Here's your financial brief.",
    afternoon: "Afternoon, Morgan. Quick status update.",
    evening: "Evening, Morgan. Here's your daily summary.",
  },
  senior: {
    morning: "Good morning, Margaret. Everything looks well today.",
    afternoon: "Good afternoon, Margaret. How can I help?",
    evening: "Good evening, Margaret. I'm here if you need me.",
  },
  teen: {
    morning: "Hey Alex! Let's check your money.",
    afternoon: "Yo Alex! How's the spending going?",
    evening: "Hey Alex! Let's see how today went.",
  },
};

export function getCoachGreeting(personaId: PersonaId): string {
  const hour = new Date().getHours();
  const tod: TimeOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
  return greetings[personaId]?.[tod] ?? "Hey! What can I help with?";
}

// ─── Conversation Starters ─────────────────────────────────────

export const conversationStarters: ConversationStarter[] = [
  // ── Young Adult (Taylor) ──
  { id: 'ya-h1', text: 'How am I doing this month?', tab: 'home', personaId: 'young-adult', intentTag: 'monthly-summary' },
  { id: 'ya-h2', text: 'What should I focus on?', tab: 'home', personaId: 'young-adult', intentTag: 'priorities' },
  { id: 'ya-h3', text: 'Show my needs/lifestyle/saved split', tab: 'home', personaId: 'young-adult', intentTag: 'nwg-breakdown' },
  { id: 'ya-s1', text: 'Am I on budget?', tab: 'spend', personaId: 'young-adult', intentTag: 'budget-check' },
  { id: 'ya-s2', text: "Where's my money going?", tab: 'spend', personaId: 'young-adult', intentTag: 'spend-breakdown' },
  { id: 'ya-s3', text: 'Compare me to others my age', tab: 'spend', personaId: 'young-adult', intentTag: 'benchmark' },
  { id: 'ya-p1', text: "How's my savings progress?", tab: 'plan', personaId: 'young-adult', intentTag: 'savings-progress' },
  { id: 'ya-p2', text: 'Can I afford a holiday in August?', tab: 'plan', personaId: 'young-adult', intentTag: 'afford-check' },
  { id: 'ya-p3', text: 'Explain my health score', tab: 'plan', personaId: 'young-adult', intentTag: 'health-score' },
  { id: 'ya-m1', text: 'Find me cashback offers', tab: 'more', personaId: 'young-adult', intentTag: 'cashback' },
  { id: 'ya-m2', text: 'Which subscriptions can I cut?', tab: 'more', personaId: 'young-adult', intentTag: 'sub-audit' },
  { id: 'ya-m3', text: 'How do I earn more rewards?', tab: 'more', personaId: 'young-adult', intentTag: 'rewards' },

  // ── Family (Chen) ──
  { id: 'fm-h1', text: "How's the household doing?", tab: 'home', personaId: 'family', intentTag: 'household-summary' },
  { id: 'fm-h2', text: 'Any alerts on the kids?', tab: 'home', personaId: 'family', intentTag: 'kids-alerts' },
  { id: 'fm-h3', text: 'Show our needs/lifestyle/saved', tab: 'home', personaId: 'family', intentTag: 'nwg-breakdown' },
  { id: 'fm-s1', text: 'Who spent the most this month?', tab: 'spend', personaId: 'family', intentTag: 'top-spender' },
  { id: 'fm-s2', text: 'Are we over budget as a family?', tab: 'spend', personaId: 'family', intentTag: 'family-budget' },
  { id: 'fm-s3', text: "Show me Alex's spending", tab: 'spend', personaId: 'family', intentTag: 'dependent-spend' },
  { id: 'fm-p1', text: 'Are we on track for shared goals?', tab: 'plan', personaId: 'family', intentTag: 'shared-goals' },
  { id: 'fm-p2', text: 'How much are we saving for the kids?', tab: 'plan', personaId: 'family', intentTag: 'kids-savings' },
  { id: 'fm-p3', text: 'Rebalance our budget', tab: 'plan', personaId: 'family', intentTag: 'rebalance' },
  { id: 'fm-p4', text: "What's our household health score?", tab: 'plan', personaId: 'family', intentTag: 'health-score' },
  { id: 'fm-m1', text: 'When should we overpay the mortgage?', tab: 'more', personaId: 'family', intentTag: 'mortgage' },
  { id: 'fm-m2', text: "What's the best savings plan for the kids?", tab: 'more', personaId: 'family', intentTag: 'kids-isa' },
  { id: 'fm-m3', text: 'How are irregular costs looking?', tab: 'more', personaId: 'family', intentTag: 'irregular-costs' },

  // ── Professional (Morgan) ──
  { id: 'pr-h1', text: 'Give me the executive summary', tab: 'home', personaId: 'professional', intentTag: 'exec-summary' },
  { id: 'pr-h2', text: "How's my net worth trending?", tab: 'home', personaId: 'professional', intentTag: 'net-worth' },
  { id: 'pr-h3', text: 'Show my needs/lifestyle/saved split', tab: 'home', personaId: 'professional', intentTag: 'nwg-breakdown' },
  { id: 'pr-s1', text: 'Which card should I use for fuel?', tab: 'spend', personaId: 'professional', intentTag: 'card-optimizer' },
  { id: 'pr-s2', text: 'Drill into my top categories', tab: 'spend', personaId: 'professional', intentTag: 'category-drill' },
  { id: 'pr-s3', text: 'Am I leaving cashback on the table?', tab: 'spend', personaId: 'professional', intentTag: 'missed-cashback' },
  { id: 'pr-p1', text: 'Am I on pace for all goals?', tab: 'plan', personaId: 'professional', intentTag: 'goals-pace' },
  { id: 'pr-p2', text: 'Where should I invest next?', tab: 'plan', personaId: 'professional', intentTag: 'invest-next' },
  { id: 'pr-p3', text: 'Compare ETF vs pension top-up', tab: 'plan', personaId: 'professional', intentTag: 'isa-pension' },
  { id: 'pr-p4', text: 'How can I improve my health score?', tab: 'plan', personaId: 'professional', intentTag: 'improve-score' },
  { id: 'pr-m1', text: 'Audit my subscriptions', tab: 'more', personaId: 'professional', intentTag: 'sub-audit' },
  { id: 'pr-m2', text: "How's my dormant cash?", tab: 'more', personaId: 'professional', intentTag: 'dormant-cash' },
  { id: 'pr-m3', text: 'Find tax-efficient moves', tab: 'more', personaId: 'professional', intentTag: 'tax-moves' },

  // ── Senior (Margaret) ──
  { id: 'sn-h1', text: 'Is everything okay with my money?', tab: 'home', personaId: 'senior', intentTag: 'status-check' },
  { id: 'sn-h2', text: 'What bills are coming up?', tab: 'home', personaId: 'senior', intentTag: 'upcoming-bills' },
  { id: 'sn-h3', text: 'Help me understand something', tab: 'home', personaId: 'senior', intentTag: 'explain' },
  { id: 'sn-s1', text: 'Have all my bills been paid?', tab: 'spend', personaId: 'senior', intentTag: 'bills-status' },
  { id: 'sn-s2', text: 'Is anything unusual?', tab: 'spend', personaId: 'senior', intentTag: 'anomaly-check' },
  { id: 'sn-s3', text: 'Explain this charge', tab: 'spend', personaId: 'senior', intentTag: 'explain-charge' },
  { id: 'sn-p1', text: 'I need to speak to someone', tab: 'plan', personaId: 'senior', intentTag: 'human-help' },
  { id: 'sn-p2', text: 'How do I set up a Direct Debit?', tab: 'plan', personaId: 'senior', intentTag: 'setup-dd' },
  { id: 'sn-p3', text: 'Help me find a branch', tab: 'plan', personaId: 'senior', intentTag: 'find-branch' },
  { id: 'sn-m1', text: "Is David's access set up correctly?", tab: 'more', personaId: 'senior', intentTag: 'access-check' },
  { id: 'sn-m2', text: 'Add Sarah as emergency contact', tab: 'more', personaId: 'senior', intentTag: 'add-contact' },
  { id: 'sn-m3', text: 'Review who can see my account', tab: 'more', personaId: 'senior', intentTag: 'access-review' },

  // ── Teen (Alex) ──
  { id: 'tn-h1', text: "When's my next allowance?", tab: 'home', personaId: 'teen', intentTag: 'allowance-check' },
  { id: 'tn-h2', text: 'How much have I saved?', tab: 'home', personaId: 'teen', intentTag: 'savings-check' },
  { id: 'tn-h3', text: 'Am I spending too much?', tab: 'home', personaId: 'teen', intentTag: 'spend-check' },
  { id: 'tn-s1', text: 'What did I spend this week?', tab: 'spend', personaId: 'teen', intentTag: 'weekly-spend' },
  { id: 'tn-s2', text: 'How much can I still spend?', tab: 'spend', personaId: 'teen', intentTag: 'remaining' },
  { id: 'tn-s3', text: 'Show me a budget tip', tab: 'spend', personaId: 'teen', intentTag: 'budget-tip' },
  { id: 'tn-p1', text: 'How close am I to my headset?', tab: 'plan', personaId: 'teen', intentTag: 'goal-progress' },
  { id: 'tn-p2', text: 'Help me save faster', tab: 'plan', personaId: 'teen', intentTag: 'save-tips' },
  { id: 'tn-p3', text: "What's the 50/30/20 rule?", tab: 'plan', personaId: 'teen', intentTag: 'learn-budget' },
  { id: 'tn-m1', text: 'What chores can I do?', tab: 'more', personaId: 'teen', intentTag: 'chore-list' },
  { id: 'tn-m2', text: 'How do I earn more?', tab: 'more', personaId: 'teen', intentTag: 'earn-tips' },
  { id: 'tn-m3', text: 'When can I ask for a raise?', tab: 'more', personaId: 'teen', intentTag: 'allowance-raise' },
];

// ─── Nudges ─────────────────────────────────────────────────────

export const coachNudges: CoachNudge[] = [
  {
    id: 'n1',
    insightType: 'proximity',
    title: 'Dining budget at 85%',
    body: "I noticed your dining spending is climbing — you're at €196 of €230 with 10 days left. Want me to suggest ways to finish the month on track?",
    accentColor: '#E5553B',
    priority: 2,
    tab: 'home',
    ctaLabel: "Let's fix it",
    quickReplies: ['Show budget breakdown', 'Suggest savings', 'Adjust my limit'],
  },
  {
    id: 'n2',
    insightType: 'anomaly',
    title: 'Unusual charge detected',
    body: "There's a €104.09 charge at TechStore that's higher than your typical electronics spending. Was this you?",
    accentColor: '#E5553B',
    priority: 1,
    tab: 'all',
    ctaLabel: 'Review now',
    quickReplies: ['This was me', 'Report as fraud', 'Show details'],
  },
  {
    id: 'n3',
    insightType: 'celebration',
    title: 'Savings milestone reached!',
    body: "You've saved €578 this month — that's 83% of your goal! You're building great habits.",
    accentColor: '#1BA97F',
    priority: 4,
    tab: 'plan',
    ctaLabel: 'See progress',
    quickReplies: ['Show my goals', 'Increase target', 'Keep going!'],
  },
  {
    id: 'n4',
    insightType: 'nudge',
    title: 'Idle cash opportunity',
    body: "You have €2.660 sitting idle in your current account. Moving it to a savings account could earn 4,5% — that's about €120 a year.",
    accentColor: '#F5A623',
    priority: 5,
    tab: 'home',
    ctaLabel: 'Tell me more',
    quickReplies: ['Move to savings', 'How much is safe to move?', 'Not now'],
  },
  {
    id: 'n5',
    insightType: 'irregular',
    title: 'Car insurance due soon',
    body: 'Your car insurance (€555) is due April 15 — 33 days away. Want me to help you set aside €93 per week?',
    accentColor: '#F5A623',
    priority: 3,
    tab: 'home',
    ctaLabel: 'Start saving',
    quickReplies: ['Set up auto-save', 'Remind me later', 'I have it covered'],
  },
  {
    id: 'n6',
    insightType: 'offer',
    title: '5% cashback at Albert Heijn',
    body: "Based on your grocery spending, you could earn €22 back this month with the Albert Heijn cashback offer. It's active until March 20.",
    accentColor: '#295EFF',
    priority: 5,
    tab: 'spend',
    ctaLabel: 'Activate',
    quickReplies: ['Activate offer', 'Show all offers', 'Not interested'],
  },
  {
    id: 'n7',
    insightType: 'benchmark',
    title: "You're close to the average",
    body: "People with similar income save about 18% — you're at 15%. A small tweak to your dining budget could close that gap.",
    accentColor: '#00BCD4',
    priority: 6,
    tab: 'home',
    ctaLabel: 'How to improve',
    quickReplies: ['Show me how', 'Compare more categories', 'Dismiss'],
  },
  {
    id: 'n8',
    insightType: 'nwg',
    title: 'Lifestyle creeping up',
    body: "Your Lifestyle spending is at 31% this month — slightly above the 30% target. Dining and Entertainment are the main drivers. A small trim would get you back to balance.",
    accentColor: '#FF6B35',
    priority: 3,
    tab: 'spend',
    ctaLabel: 'Rebalance',
    quickReplies: ['Show spending breakdown', 'Which categories to trim?', 'Adjust my targets'],
  },
];

// ─── Canned responses ───────────────────────────────────────────

const ts = () => new Date().toISOString();

export const cannedResponses: Record<string, CoachMessage> = {

  // ══ YOUNG ADULT (Taylor) ══

  'monthly-summary': {
    id: 'r-summary', role: 'coach', timestamp: ts(),
    text: "Here's your month at a glance:",
    statCards: [
      { label: 'Received', value: '€3.700' },
      { label: 'Spent', value: '€1.966' },
      { label: 'Savings rate', value: '15%', context: 'peers average 18%' },
      { label: 'Groceries', value: '-8%', context: 'down from last month', color: 'var(--ion-color-success)' },
    ],
    quickReplies: ['Show full breakdown', 'How do I compare?', 'Show my spending split'],
  },
  'priorities': {
    id: 'r-priorities', role: 'coach', timestamp: ts(),
    text: "Three things I'd focus on right now: 1) Your Dining budget is at 85% — tighten up for the last 10 days. 2) Your Emergency Fund is at 65% — you're close to the next milestone. 3) You have €2.660 idle cash earning almost nothing. Move some to your savings and watch it grow.",
    quickReplies: ['Help with dining budget', 'Boost emergency fund', 'Move idle cash'],
  },
  'nwg-breakdown': {
    id: 'r-nwg', role: 'coach', timestamp: ts(),
    text: "Here's your Needs/Lifestyle/Saved split this month:",
    statCards: [
      { label: 'Needs', value: '52% · €1.022', context: 'on target' },
      { label: 'Lifestyle', value: '28% · €551', context: '2% under — nice' },
      { label: 'Saved', value: '20% · €393', context: 'good discipline', color: 'var(--ion-color-success)' },
    ],
    quickReplies: ['Inspect my Needs', 'Inspect my Lifestyle', 'How does this compare to last month?'],
  },
  'health-score': {
    id: 'r-health', role: 'coach', timestamp: ts(),
    text: generateHealthScoreCoachText(74, [
      { label: 'Spending control', score: 80 },
      { label: 'Savings rate', score: 68 },
      { label: 'Debt management', score: 85 },
      { label: 'Financial buffer', score: 58 },
      { label: 'Goal progress', score: 72 },
    ]),
    quickReplies: ['How do I improve my buffer?', 'What would get me to 80?', 'View full breakdown'],
  },
  'improve-score': {
    id: 'r-improve-score', role: 'coach', timestamp: ts(),
    text: "Here are your top 3 actions to improve your health score:\n\n1. Build your financial buffer — you're at 2,3 months of expenses. Getting to 3 months would boost your buffer pillar by ~15 points. Set up a pocket with auto-funding of €175/month.\n\n2. Increase your savings rate — you're saving 15% of income. Pushing to 20% adds ~10 points. Try rounding up transactions or cutting one discretionary subscription.\n\n3. Stay on budget consistently — you've gone over in Coffee & Snacks. Keeping all categories under budget for a full month lifts your spending control pillar by ~5 points.\n\nSmall consistent changes beat big one-off efforts. Which action do you want to tackle first?",
    quickReplies: ['Build my buffer', 'Help me save more', 'View full breakdown'],
  },
  'health-score-pillar': {
    id: 'r-health-pillar', role: 'coach', timestamp: ts(),
    text: "Each pillar of your health score measures a different aspect of your financial life:\n\n- Spending control (25%) — How well you stick to budgets and avoid spending spikes\n- Savings rate (25%) — What percentage of income you save consistently\n- Debt management (20%) — Your debt-to-income ratio and payoff progress\n- Financial buffer (20%) — How many months of expenses you have in reserve\n- Goal progress (10%) — Whether your savings goals are on track\n\nTap any pillar in your score breakdown to see exactly what's driving it and specific actions to improve.",
    quickReplies: ['Show my score breakdown', 'Which pillar is weakest?', 'How is each pillar calculated?'],
  },
  'budget-check': {
    id: 'r-budget', role: 'coach', timestamp: ts(),
    text: "You've spent €1.015 of your €1.368 total budget this month — that's 74% with 10 days left.\n\nBy category:\nGroceries: €440/€580 (76%) — on track\nDining: €191/€230 (83%) — watch this one\nTransport: €139/€210 (66%) — good\nEntertainment: €56/€115 (49%) — lots of room\nShopping: €110/€175 (63%) — fine\nCoffee: €79/€58 (136%) — over budget!\n\nCoffee & Snacks is the one that's slipped. Want to adjust?",
    quickReplies: ['Show coffee spending details', 'Adjust coffee budget', 'Set up alerts for 80%'],
  },
  'spend-breakdown': {
    id: 'r-spend', role: 'coach', timestamp: ts(),
    text: "Here's where your money went this month:\n\nGroceries: €440 (22%) — your biggest category\nBills & Utilities: €359 (18%) — steady and predictable\nTransport: €191 (10%) — €52 at Shell yesterday\nDining: €168 (9%) — trending 12% higher than last month\nShopping: €110 (6%) — below budget\nEntertainment: €86 (4%) — Netflix €17,99, Spotify €10,99\n\nDining is the one to watch. You've got €39 of budget left with 10 days to go.",
    quickReplies: ['Drill into dining', 'Show me my pockets', 'Compare to February'],
  },
  'benchmark': {
    id: 'r-benchmark', role: 'coach', timestamp: ts(),
    text: "Compared to people with similar income (€3.700/mo, age 25–30):",
    statCards: [
      { label: 'Your savings rate', value: '15%', context: 'peers: 18%' },
      { label: 'Dining gap', value: '+€29/mo', context: 'your biggest gap', color: 'var(--ion-color-warning)' },
      { label: 'Transport', value: '-€17/mo', context: "you're below peers", color: 'var(--ion-color-success)' },
    ],
    quickReplies: ['Help me trim dining', 'Show all category comparisons', 'What about investments?'],
  },
  'savings-progress': {
    id: 'r-savings', role: 'coach', timestamp: ts(),
    text: "You have 3 active savings goals:\n\nEmergency Fund: €4.510/€6.940 (65%) — auto-saving €230/mo. On track for Dec 2026.\nHoliday: €925/€2.310 (40%) — auto-saving €115/mo. At this pace you'll hit target Aug 2027, not Aug 2026. Needs a boost.\nNew Laptop: €1.530/€1.735 (88%) — auto-saving €87/mo. Just €205 to go — you'll have it by May!\n\nYour Holiday fund is the one that needs attention. Want to redirect some idle cash?",
    quickReplies: ['Boost holiday fund', 'When exactly will I hit each goal?', 'Add a new goal'],
  },
  'afford-check': {
    id: 'r-afford', role: 'coach', timestamp: ts(),
    text: "Let's check. Your Holiday fund has €925 saved, and you're adding €115/mo. By August you'll have €1.500 — that's €810 short of your €2.310 target.\n\nOptions to close the gap:\n1) Boost auto-save to €278/mo (tight but doable)\n2) Move €460 from idle cash (you have €2.660 sitting there)\n3) Reduce holiday budget to €1.500 and go for a shorter trip\n\nOption 2 is the easiest — you wouldn't even feel it.",
    quickReplies: ['Move €460 from idle cash', 'Increase auto-save', 'Adjust holiday budget'],
  },
  'cashback': {
    id: 'r-cashback', role: 'coach', timestamp: ts(),
    text: "I found 3 offers based on your spending patterns:\n\n1) Albert Heijn 5% cashback — you shop there weekly. Potential: €22/mo\n2) Costa Coffee 10% — you spend €79/mo on coffee. Potential: €7,90/mo\n3) Spotify Premium free for 3 months — saves €33\n\nTotal potential savings: ~€63 over the next 3 months. The Albert Heijn one alone would cover your Netflix subscription.",
    quickReplies: ['Activate Albert Heijn offer', 'Activate all offers', 'Show me more offers'],
  },
  'sub-audit': {
    id: 'r-sub-audit', role: 'coach', timestamp: ts(),
    text: "Here's your subscription breakdown:\n\nNetflix: €17,99/mo — used daily. Good value.\nSpotify: €10,99/mo — used daily. Good value.\nGym: €34,99/mo — last visited 3 weeks ago.\n\nTotal: €63,97/mo (€768/year).\n\nThe gym is the obvious one. You're paying €35/mo and haven't gone in 3 weeks. That's €420/year you could redirect to your Holiday fund. Even pausing for 2 months would save €70.",
    quickReplies: ['Pause gym membership', 'Show annual subscription cost', 'Are there cheaper alternatives?'],
  },
  'rewards': {
    id: 'r-rewards', role: 'coach', timestamp: ts(),
    text: "You've earned €28,30 in cashback this month and €164,50 lifetime. Here's how to earn more:\n\n1) Activate the Albert Heijn 5% offer — worth €22/mo based on your grocery spend\n2) Use your linked card at Costa — 10% back on your coffee habit\n3) Refer a friend — €23 per successful referral\n\nIf you activated all available offers, you could earn an extra €30/mo — that's €360/year of free money.",
    quickReplies: ['Activate all offers', 'How does the referral work?', 'Show my cashback history'],
  },

  // ══ FAMILY (Chen) ══

  'household-summary': {
    id: 'r-household', role: 'coach', timestamp: ts(),
    text: "The Chen household is in good shape. Health score: 82/100.\n\nTotal family spending this month: €6.372\nMarcus: €3.285 (52%) — slightly above his share\nLisa: €2.555 (40%) — under budget\nAlex: €393 (6%) — teen spending on track\nEmma: €139 (2%) — all within limits\n\nAlex has 3 of 5 chores done this week. Emma completed all of hers (gold star!). Margaret's bills are mostly paid (4 of 6).",
    quickReplies: ['Show family breakdown', "Check Alex's spending", "View Margaret's bills"],
  },
  'kids-alerts': {
    id: 'r-kids-alerts', role: 'coach', timestamp: ts(),
    text: "Two things to note about the kids:\n\n1) Alex spent €14,50 at Nando's and €10,99 on Spotify today — his Food & Drink spending is trending above his usual pace. He has €52,30 left and 3 days until his next allowance.\n\n2) Emma is doing great — she completed all 4 chores this week and saved 40% of her allowance. She's at 45% towards her savings goal.\n\nNo unusual charges or safety concerns on either account.",
    quickReplies: ["Set a spending alert for Alex", "View Emma's savings", "Adjust Alex's allowance"],
  },
  'top-spender': {
    id: 'r-top-spender', role: 'coach', timestamp: ts(),
    text: "Here's the family spending leaderboard this month:\n\n1) Marcus: €3.285 — Transport (€787) and dining out (€486) are his biggest categories\n2) Lisa: €2.555 — Groceries (€1.030) and kids' activities (€393) lead her spend\n3) Alex: €393 — Food & Drink (€208) and entertainment (€110)\n4) Emma: €139 — Mostly school-related and small treats\n\nMarcus is 28% above the family average. His dining out increased 15% from last month.",
    quickReplies: ['Show Marcus vs last month', "Why is Marcus's dining up?", 'Set a family budget cap'],
  },
  'family-budget': {
    id: 'r-family-budget', role: 'coach', timestamp: ts(),
    text: "The family budget is at 82% for the month with 10 days to go — tight but manageable.\n\nNeeds: €3.586/€4.050 (89%) — Groceries and bills are the main drivers\nLifestyle: €1.943/€2.310 (84%) — Dining and entertainment across all members\nSaved: €844/€1.155 (73%) — On track for savings targets\n\nThe Needs bucket is the one to watch. Grocery spending is at 92% already. Consider meal planning for the last 10 days.",
    quickReplies: ['Help with grocery budget', 'Show per-member breakdown', 'Adjust family budget'],
  },
  'dependent-spend': {
    id: 'r-dependent-spend', role: 'coach', timestamp: ts(),
    text: "Here's Alex's spending this month (€393 total):\n\nFood & Drink: €208 (53%) — Nando's, Uber Eats, school lunches\nEntertainment: €110 (28%) — Spotify, Roblox, cinema\nTransport: €46 (12%) — mostly Uber rides\nOther: €29 (7%) — miscellaneous\n\nHis Food & Drink is the biggest category. He's spending about €14/day on average, mostly on eating out. His allowance is €12/week, so the rest is coming from birthday money (€230 received last month).",
    quickReplies: ['Set a dining limit for Alex', 'Compare to last month', "Review Alex's allowance"],
  },
  'shared-goals': {
    id: 'r-shared-goals', role: 'coach', timestamp: ts(),
    text: "The family has 3 shared goals:\n\nEmergency Fund: €9.486/€13.880 (68%) — both parents contributing €347/mo. On track for Dec 2026.\nHoliday Fund: €1.850/€4.625 (40%) — €231/mo total. At current pace: Feb 2027. Target is Aug 2026 — needs a €324/mo boost.\nKids' Education: €3.933/€23.125 (17%) — long-term, €175/mo. On pace for 2032.\n\nThe Holiday Fund is the one that needs attention. Want to redirect some family surplus?",
    quickReplies: ['Boost holiday fund', 'Show who contributes what', 'Adjust goal timeline'],
  },
  'kids-savings': {
    id: 'r-kids-savings', role: 'coach', timestamp: ts(),
    text: "Here's where the kids' savings stand:\n\nAlex (Teen):\n- Gaming headset: €75/€98 (77%) — 3 more weeks at current save rate\n- Festival ticket: €46/€175 (26%) — this one needs work. At €6/week it'll take 22 weeks.\n\nEmma (Kid):\n- Art supplies: €25/€46 (55%) — she's been saving consistently\n- Summer camp: €52/€230 (23%) — parents could top up €58 to keep motivation high\n\nBoth kids are learning good habits. Alex could speed up his headset goal by completing more chores.",
    quickReplies: ["Top up Emma's camp fund", 'Suggest more chores for Alex', 'Set up matching contributions'],
  },
  'rebalance': {
    id: 'r-rebalance', role: 'coach', timestamp: ts(),
    text: "Looking at your family budget, here's what I'd adjust:\n\nGroceries: €580 → €555 (meal planning could save €25/mo)\nDining: €462 → €405 (Marcus's dining out is the main driver — even 2 fewer meals out would do it)\nEntertainment: €230 → €210 (the kids' streaming subscriptions overlap — share accounts)\n\nThat frees up €102/mo which could go straight to the Holiday Fund gap (needs €324/mo boost). You'd close a third of the shortfall without feeling it.",
    quickReplies: ['Apply these changes', 'Show me the meal planning savings', 'Talk to Marcus about dining'],
  },
  'mortgage': {
    id: 'r-mortgage', role: 'coach', timestamp: ts(),
    text: "Your mortgage is at 3,2% fixed until Sep 2027. Here's the overpayment math:\n\nOverpaying €230/mo would save €9.700 in interest over the remaining term and knock 2 years off.\nYour lender allows up to 10% overpayment per year penalty-free (€4.160).\n\nBut here's the thing: your savings account earns 4,5%. Putting that €230/mo into savings instead would earn more than the mortgage costs. I'd recommend maxing the savings first, then overpaying the mortgage from Sep 2027 when the rate resets.",
    quickReplies: ['Start savings contributions', 'Set up mortgage overpayment', 'When does the rate reset?'],
  },
  'kids-isa': {
    id: 'r-kids-isa', role: 'coach', timestamp: ts(),
    text: "For the kids, you have two savings options:\n\nYouth Savings Account: 4,2% interest, no risk, currently holds €3.933 for education. Good for short-term goals.\nYouth Investment Account: Historically 7-10% average return, some volatility. Better for long-term (10+ years).\n\nSince the education fund target is 2032 (6 years out), a mix could work: keep €2.310 in savings for safety, move the rest to investments for growth. That could add €2.080+ over 6 years.\n\nThe annual limit is €10.400 per child.",
    quickReplies: ['Open a youth investment account', 'Keep it all in savings', 'Show me the projection'],
  },
  'irregular-costs': {
    id: 'r-irregular', role: 'coach', timestamp: ts(),
    text: "You have 3 irregular costs coming up:\n\nCar insurance: €555 — due April 15 (33 days). Sinking fund has €185 set aside.\nHome insurance: €370 — due June 1 (80 days). Sinking fund has €92.\nSchool fees: €1.388 — due September 1 (172 days). Sinking fund has €462.\n\nTotal upcoming: €2.313. Sinking fund balance: €739 (32%). You're auto-saving €93/week which puts you on track for car and home insurance, but school fees will be tight.\n\nConsider a one-off €230 top-up to the sinking fund to build buffer.",
    quickReplies: ['Top up sinking fund', 'Adjust auto-save amount', 'Show payment timeline'],
  },

  // ══ PROFESSIONAL (Morgan) ══

  'exec-summary': {
    id: 'r-exec', role: 'coach', timestamp: ts(),
    text: "March executive summary:\n\nNet income: €6.014 | Spent: €3.933 | Saved: €2.081 (35% rate)\nNet worth: €213.060 (+€2.430 this month)\n\nBudget utilization: 78% with 10 days left — on track.\nETF Portfolio: €4.890 (+€497 return, 11,3% YTD)\nSavings Account: €9.830 (4,5% AER, €330 interest)\nIdle cash: €2.660 — not working for you.\n\nAction items: Move idle cash to savings. Coffee budget exceeded (136%). Car insurance due Apr 15.",
    quickReplies: ['Move idle cash now', 'Show net worth trend', 'Fix coffee budget'],
  },
  'net-worth': {
    id: 'r-networth', role: 'coach', timestamp: ts(),
    text: "Your net worth is €213.060 — up €2.430 this month.\n\nBreakdown:\nCurrent account: €4.890\nSavings account: €9.830\nETF portfolio: €4.890 (+11,3%)\nPension (est.): €71.710\nProperty equity: €127.230\nCredit card debt: -€486\nStudent loan: -€5.019\n\nTrend: +€2.430/mo average over the last 3 months. At this pace you'll hit €230k by October. Your investment returns are the biggest driver — market exposure is working.",
    quickReplies: ['How do I accelerate to €230k?', 'Show asset allocation', 'Reduce debt faster'],
  },
  'category-drill': {
    id: 'r-category-drill', role: 'coach', timestamp: ts(),
    text: "Let's break down your top categories:\n\nGroceries (€440): Albert Heijn €254 (58%), Jumbo €110 (25%), Picnic delivery €75 (17%). The Picnic delivery orders are costing 30% more than in-store.\n\nDining (€168): 8 transactions. Avg €21/meal. Highest: restaurant €56. You eat out 2x/week.\n\nTransport (€191): Shell fuel €104 (2 fill-ups), train €52 (4 trips), Uber €35 (3 rides).\n\nEntertainment (€86): Netflix €17,99, Spotify €10,99, cinema €19, gaming €37.\n\nThe quick win: switching Picnic delivery to in-store Albert Heijn saves €23/mo.",
    quickReplies: ['Show me dining by merchant', 'Switch delivery to in-store', 'Compare categories to last month'],
  },
  'card-optimizer': {
    id: 'r-card-opt', role: 'coach', timestamp: ts(),
    text: "For fuel at Shell, use your Amex — 3x points on fuel vs. 1% cashback on your debit card.\n\nHere's your optimal card routing:\nFuel: Amex (3x points) — saves ~€37/year\nGroceries: Debit card (3% Albert Heijn) — saves ~€158/year\nDining: Amex (2x points) — saves ~€40/year\nTravel: Amex (4x points) — best return\nEverything else: Debit card (1% cashback) — catches the rest\n\nTotal optimized cashback: €495/year vs. your current €361. That's €134/year you're leaving on the table.",
    quickReplies: ['Set up card routing reminders', 'Show me the Amex benefits', 'What about foreign spending?'],
  },
  'missed-cashback': {
    id: 'r-missed-cb', role: 'coach', timestamp: ts(),
    text: "This month you missed €44 in potential cashback:\n\n€16 from using debit at Shell instead of Amex (3x points)\n€13 from 2 Albert Heijn shops without activating the 5% offer\n€9 from dining without the Amex dining benefit\n€6 from unactivated Costa 10% offer\n\nYour current cashback capture rate is 73%. If you follow the optimal card routing, you'd be at 95%. That's the difference between €361/year and €495/year.",
    quickReplies: ['Activate all offers now', 'Set up card routing alerts', 'Show me my cashback history'],
  },
  'dormant-cash': {
    id: 'r-dormant', role: 'coach', timestamp: ts(),
    text: "You have €2.660 in your current account earning 0,1% — that's €2,66/year.\n\nKeeping 1 month of expenses (€3.933) as buffer means you can safely move €960 right now. But your emergency fund is at €4.510 — if you count that as buffer, you could move more.\n\nOptions:\nMove €1.735 to savings (4,5%): earns €78/year\nMove €925 to ETF portfolio: potential 8-11% return\nSplit: €1.155 to savings + €580 to ETFs\n\nEven the conservative move turns €2,66/year into €78.",
    quickReplies: ['Move €1.735 to savings', 'Split between savings and ETFs', 'How much buffer do I really need?'],
  },
  'tax-moves': {
    id: 'r-tax', role: 'coach', timestamp: ts(),
    text: "Here are your tax-efficient opportunities this year:\n\n1) Tax-advantaged savings: €18.240 remaining of annual limit. Any growth within this wrapper is sheltered.\n\n2) Pension relief: As a higher earner, employer pension contributions are tax-efficient. €100 into your pension costs you ~€60 after tax benefit.\n\n3) Capital gains: Your ETF portfolio shelters gains in a tax-efficient wrapper. Any investments outside the wrapper have an annual exemption — check if you're using it.\n\n4) Donation deductions: Gifts to registered charities are tax-deductible in the Netherlands.\n\nDon't leave allowance on the table.",
    quickReplies: ['Max out my savings wrapper', 'Check pension contributions', 'Explore donation deductions'],
  },
  'goals-pace': {
    id: 'r-goals-pace', role: 'coach', timestamp: ts(),
    text: "Goal pace check:\n\nEmergency Fund: €4.510/€6.940 — €230/mo auto-save. Hits target: Dec 2026. ON PACE.\nHoliday: €925/€2.310 — €115/mo. Hits target: Aug 2027. BEHIND (target: Aug 2026).\nNew Laptop: €1.530/€1.735 — €87/mo. Hits target: May 2026. AHEAD.\n\nOne behind, one ahead. If you redirect the Laptop's €87/mo to Holiday after May, you'll close the gap to Oct 2026 — much closer to target. Want me to set that up?",
    quickReplies: ['Auto-redirect after laptop', 'Boost holiday now', 'Am I saving enough overall?'],
  },
  'invest-next': {
    id: 'r-invest', role: 'coach', timestamp: ts(),
    text: "Based on your profile, here are 3 investment options ranked by fit:\n\n1) ETF portfolio top-up: Your current portfolio returned 11,3%. You've used €4.890 of your annual capacity. Tax-efficient growth — no brainer.\n\n2) Pension top-up: You get tax relief as a higher earner. €100 in costs you ~€60. Your employer matches up to 5% — are you maxing that?\n\n3) Vanguard All-World ETF: Low-cost diversified fund. 0,22% fee. Good for your 10-year time horizon.\n\nThe pension match is free money. Check if you're maxing it.",
    quickReplies: ['Top up ETF portfolio', 'Check my pension match', 'Compare fund options'],
  },
  'isa-pension': {
    id: 'r-isa-pension', role: 'coach', timestamp: ts(),
    text: "ETF vs. Pension — here's the comparison for your situation:\n\nETF Portfolio: Tax-efficient growth, accessible anytime. You've used €4.890 of annual capacity. Flexible.\n\nPension: Tax relief as a higher earner. €100 contribution costs you ~€60. But locked until retirement age. Employer matches up to 5%.\n\nMy recommendation: Max your employer match first (free money), then ETFs for flexibility. Once ETFs are topped up, any surplus to pension for the tax relief.\n\nAt your income, the pension saves you ~€2.780/year in tax.",
    quickReplies: ['Check my employer match', 'Top up ETF first', 'Show me the 10-year projection'],
  },

  // ══ SENIOR (Margaret) ══

  'status-check': {
    id: 'r-status', role: 'coach', timestamp: ts(),
    text: "Everything looks well, Margaret. Your balance is €4.890,60. All your regular bills have been paid on time. There's nothing unusual in your recent activity.\n\nYour next bill — electricity — is due on March 20. The amount is €98, same as last month.\n\nDavid checked in on your account yesterday and everything looked fine to him too.",
    quickReplies: ['Show upcoming bills', "That's reassuring", 'Help with something else'],
  },
  'upcoming-bills': {
    id: 'r-upcoming-bills', role: 'coach', timestamp: ts(),
    text: "Here are your upcoming bills, Margaret:\n\nElectricity: €98 — due March 20 (7 days)\nWater: €49 — due March 28 (15 days)\nMunicipality Tax: €214 — due April 1 (19 days)\nTV subscription: €15,33 — due April 5 (23 days)\n\nAll are set up as automatic payments, so they'll be paid automatically. You have plenty in your account to cover them all.\n\nWould you like me to remind you a day before each one?",
    quickReplies: ['Set up reminders', 'Show me all my automatic payments', "That's helpful, thank you"],
  },
  'explain': {
    id: 'r-explain', role: 'coach', timestamp: ts(),
    text: "Of course, Margaret. I'm here to help you understand anything about your money.\n\nYou can ask me things like:\n- What does a particular charge on your account mean\n- How your bills and automatic payments work\n- What your balance means\n- How to send money to someone\n- What David can and can't see on your account\n\nJust tell me what's on your mind and I'll explain it clearly.",
    quickReplies: ['Explain a charge', 'How do automatic payments work?', 'What can David see?'],
  },
  'bills-status': {
    id: 'r-bills-status', role: 'coach', timestamp: ts(),
    text: "Yes, Margaret — 4 of your 6 monthly bills have been paid:\n\nPaid: Gas (€75), Phone (€32), Internet (€40), Insurance (€49)\nComing up: Electricity (€98, due Mar 20), Municipality Tax (€214, due Apr 1)\n\nAll paid bills went through on time with no issues. The remaining two will come out automatically from your account.\n\nYou have €4.890,60 in your account, which is more than enough to cover everything.",
    quickReplies: ['When is electricity due?', 'Show me all payments', "That's good to know"],
  },
  'anomaly-check': {
    id: 'r-anomaly', role: 'coach', timestamp: ts(),
    text: "I've checked your recent activity carefully, Margaret. Everything looks normal.\n\nAll charges match your usual spending patterns. No unexpected amounts, no unfamiliar merchants, and no charges from abroad.\n\nYour most recent transactions were: Albert Heijn (€37,50, groceries), Pharmacy (€9,84), and your pension (€787 received).\n\nIf you ever see something you don't recognise, just tap on the transaction and I can explain it.",
    quickReplies: ['Show me recent transactions', "That's reassuring", 'What if I see something odd?'],
  },
  'explain-charge': {
    id: 'r-explain-charge', role: 'coach', timestamp: ts(),
    text: "I'd be happy to help explain a charge, Margaret.\n\nYour most recent charges are:\n- Albert Heijn: €37,50 (2 days ago) — this was groceries\n- Pharmacy: €9,84 (3 days ago) — health items\n- Shell: €52 (last week) — petrol\n- Netflix: €17,99 (Mar 1) — your TV streaming service\n\nWhich one would you like me to explain? Or if it's a different charge, just tell me the amount and I'll find it.",
    quickReplies: ['What is Netflix?', 'Why was Albert Heijn €37,50?', 'None of these — show more'],
  },
  'human-help': {
    id: 'r-human', role: 'coach', timestamp: ts(),
    text: "Of course, Margaret. Here are your options to speak with someone:\n\nPhone: Call 0800 123 4567 (free, open 8am-8pm). Say 'speak to a person' and you'll be connected quickly.\n\nBranch: Your nearest branch is on Kalverstraat, 0,4 km away. Open Mon-Fri 9am-5pm, Sat 9am-1pm.\n\nVideo call: You can have a face-to-face video call with a banker from home. I can book one for you.\n\nDavid can also help — shall I send him a message?",
    quickReplies: ['Call the bank now', 'Book a video call', 'Message David'],
  },
  'setup-dd': {
    id: 'r-setup-dd', role: 'coach', timestamp: ts(),
    text: "Setting up an automatic payment is straightforward, Margaret. Here's how:\n\n1) You'll need the company's name and their reference number (usually on a bill or letter)\n2) Tap 'Pay a bill' on your home screen\n3) Choose 'Set up automatic payment'\n4) Enter the details and confirm\n\nAutomatic payments are safe — they come with a guarantee. If anything goes wrong, your bank will refund you immediately.\n\nWould you like me to walk you through it step by step?",
    quickReplies: ['Walk me through it', 'What is an automatic payment?', 'Can David help me set it up?'],
  },
  'find-branch': {
    id: 'r-branch', role: 'coach', timestamp: ts(),
    text: "Your nearest branch is on Kalverstraat, Margaret.\n\nAddress: 42 Kalverstraat, Amsterdam\nDistance: 0,4 km (about 8 minutes walk)\nOpen today: 9:00am - 5:00pm\n\nThey have step-free access and a seated waiting area. You don't need an appointment for general enquiries, but I can book one if you'd prefer not to wait.\n\nThe next nearest branch is on Dam Square (1,2 km).",
    quickReplies: ['Book an appointment', 'Get directions', 'Show opening hours'],
  },
  'access-check': {
    id: 'r-access', role: 'coach', timestamp: ts(),
    text: "Yes, David's access is set up correctly, Margaret.\n\nDavid (Son) has View Only access. This means he can:\n- See your balance and recent transactions\n- Check if your bills have been paid\n- View your upcoming payments\n\nHe cannot:\n- Make payments or transfers\n- Change your account settings\n- Set up new automatic payments\n\nHe last checked your account yesterday at 2:15 PM. Everything is secure.",
    quickReplies: ["Change David's access level", "That's good", 'Add another trusted person'],
  },
  'add-contact': {
    id: 'r-add-contact', role: 'coach', timestamp: ts(),
    text: "I can help you add Sarah as an emergency contact, Margaret.\n\nEmergency contacts are people the bank can reach if they can't get hold of you. They don't have access to your money or account.\n\nI'll need:\n1) Sarah's full name\n2) Her relationship to you (neighbour, friend, etc.)\n3) Her phone number\n\nYou currently have 2 emergency contacts: David (Son) and Dr. Smith. Adding Sarah would give you 3, which is a good number.",
    quickReplies: ['Add Sarah now', 'View current contacts', 'What can emergency contacts do?'],
  },
  'access-review': {
    id: 'r-access-review', role: 'coach', timestamp: ts(),
    text: "Here's who has access to your account, Margaret:\n\nTrusted people:\n- David (Son): View Only access — can see your balance and transactions\n\nEmergency contacts (can't see your account):\n- David (Son): Phone and email\n- Dr. Smith: Phone only\n\nNo one else has any access to your account. Your account is secure and no changes have been made to access settings in the last 6 months.\n\nWould you like to add or change anyone?",
    quickReplies: ['Add a trusted person', 'Remove someone', "That's fine as it is"],
  },

  // ══ TEEN (Alex) ══

  'allowance-check': {
    id: 'r-allowance', role: 'coach', timestamp: ts(),
    text: "Your next allowance of €12 arrives on Friday — 3 days away! You have €52,30 right now. At your current spending pace, you'll have about €44 by Friday before the top-up.",
    quickReplies: ['Show my spending', 'Save some for later', 'Cool, thanks!'],
  },
  'savings-check': {
    id: 'r-savings-check', role: 'coach', timestamp: ts(),
    text: "You've got two savings goals going:\n\nGaming headset: €75 saved of €98 — you're 77% there! Just €23 to go. At your current pace, about 4 more weeks.\n\nFestival ticket: €46 saved of €175 — 26% done. This one's a longer game. If you save €6/week, you'll need about 22 weeks.\n\nTip: If you complete all 5 chores this week (€14 total), you could hit the headset goal in 2 weeks instead of 4!",
    quickReplies: ['How do I speed up the headset?', 'Show my chores', 'Can I add a new goal?'],
  },
  'spend-check': {
    id: 'r-spend-ck', role: 'coach', timestamp: ts(),
    text: "Let's see... you've spent €54,58 this month. Here's the breakdown:\n\nFood & Drink: €28 (51%) — Nando's, Uber Eats, school lunches\nEntertainment: €27 (49%) — Spotify, Roblox, cinema\n\nYour allowance gives you about €48/month. So yeah, you're spending a bit more than you earn — the extra came from your birthday money.\n\nNot a disaster, but if you want your headset sooner, try keeping spending under €40 this week.",
    quickReplies: ['Challenge me to spend less!', 'Which stuff can I cut?', "That's fine for now"],
  },
  'weekly-spend': {
    id: 'r-weekly', role: 'coach', timestamp: ts(),
    text: "This week you spent €34,74:\n\nSpotify: €10,99\nNando's: €14,50\nCinema: €9,25\n\nThat's quite a lot for one week when your allowance is €12! The Nando's trip was the biggest one. Maybe next time, grab a meal deal instead? You'd save about €9.\n\nYou've got €17,56 left to last until Friday.",
    quickReplies: ['How do I make €17,56 last?', 'Show cheaper meal options', 'Worth it though!'],
  },
  'remaining': {
    id: 'r-remaining', role: 'coach', timestamp: ts(),
    text: "You have €52,30 in your account right now.\n\nBut here's the real picture:\n- Spotify renews in 12 days: -€10,99\n- Saving for headset: try to save €6 this week\n- That leaves about €35 for spending\n\nWith 3 days until your next €12 allowance, you're in good shape. If you want to hit your headset goal faster, aim to spend under €29 this week and save the rest.",
    quickReplies: ['Set a spending target', 'What if I skip Spotify?', 'I want to save more'],
  },
  'budget-tip': {
    id: 'r-budget-tip', role: 'coach', timestamp: ts(),
    text: "Here's a good one: The 24-Hour Rule.\n\nBefore buying anything over €6, wait 24 hours. If you still want it tomorrow, go for it. If you've forgotten about it, you just saved money!\n\nThis works especially well for gaming purchases and Uber Eats. Last week, that Roblox purchase (€5,79) and Uber Eats order (€9,25) might have felt different after a day.\n\nTry it this week and see how much you save. I bet it's at least €12!",
    quickReplies: ['Challenge accepted!', 'Give me another tip', 'What about the 50/30/20 rule?'],
  },
  'goal-progress': {
    id: 'r-goal-prog', role: 'coach', timestamp: ts(),
    text: "Your gaming headset goal: €75 saved of €98 — you're SO close! Just €23 to go.\n\nHere's how to get there faster:\n- Complete all remaining chores this week: +€11 (Walk dog €3, Wash car €6, Help with dinner €2)\n- Save your full allowance next week: +€12\n- That's €23 — you'd have it in 2 weeks!\n\nOr, if you skip Uber Eats once and do the car wash chore, that's €15 right there.",
    quickReplies: ['Show me the chores', 'Can I do extra chores?', 'How about the festival ticket?'],
  },
  'save-tips': {
    id: 'r-save-tips', role: 'coach', timestamp: ts(),
    text: "Here are 3 ways to save faster:\n\n1) The Chore Sprint: Do all 5 chores this week = €14. That's more than your weekly allowance!\n\n2) The Swap: Instead of Nando's (€14,50), try a meal deal (€4,05). Save €10 in one go.\n\n3) The Round-Up: Every time you spend, round up to the nearest €1 and move the difference to savings. Your last 3 purchases would have saved €1,76 automatically.\n\nWhich one sounds doable?",
    quickReplies: ['Try the chore sprint', 'Set up round-ups', 'All three!'],
  },
  'learn-budget': {
    id: 'r-learn', role: 'coach', timestamp: ts(),
    text: "The 50/30/20 rule is dead simple:\n\n50% on Needs — stuff you have to pay for (school lunch, phone bill)\n30% on Wants — fun stuff (Spotify, Nando's, cinema, games)\n20% on Savings — for your goals (headset, festival ticket)\n\nFor your €12/week allowance, that's:\nNeeds: €6 (school lunch)\nWants: €3,60 (one fun thing)\nSavings: €2,40 (straight to your goal)\n\nYou're currently spending about 60% on Wants and only 10% on Savings. Flipping that would get your headset way faster!",
    quickReplies: ['Help me do 50/30/20', 'What counts as a Need?', "That's useful!"],
  },
  'chore-list': {
    id: 'r-chores', role: 'coach', timestamp: ts(),
    text: "Here's your chore board:\n\nDone: Tidy room (€2), Homework done (€1) — nice work!\nWaiting for approval: Help with dinner (€2) — ask your parent to approve it\nAvailable: Walk the dog (€3), Wash car (€6)\n\nYou've earned €3 so far this week. If you do the dog walk and car wash, that's €9 more — total €12 this week! That's your full allowance amount again.\n\nThe car wash is the highest-paying chore. Perfect weekend job?",
    quickReplies: ['I want to do the car wash!', 'Any bonus chores?', 'When does the board reset?'],
  },
  'earn-tips': {
    id: 'r-earn', role: 'coach', timestamp: ts(),
    text: "Ways to boost your income:\n\n1) Chores: You can earn up to €14/week if you complete all 5. You're averaging €6/week — room to grow!\n\n2) Streak bonuses: Complete all chores for 4 weeks straight and your parents might unlock a bonus multiplier (1,5x rewards!).\n\n3) Savings interest: Your savings earn a small amount of interest. The more you save, the more it grows.\n\n4) Ask for a raise: If you've been consistent for 3+ months, that's a solid case for a higher allowance.\n\nYou're on a 5-day streak right now. Don't break it!",
    quickReplies: ['Show my streak', 'How do bonus multipliers work?', 'Help me ask for a raise'],
  },
  'allowance-raise': {
    id: 'r-raise', role: 'coach', timestamp: ts(),
    text: "Here's my advice on asking for a raise:\n\nYour case:\n- You've been managing your money for 3 months\n- You've completed 60% of chores on average\n- You've saved €121 total (headset + festival goals)\n\nTo make it stronger:\n- Hit 100% chore completion for 2 weeks straight\n- Show your savings goals and progress\n- Stay under your spending target\n\nOnce you've done that, you could ask for €14/week (a 17% raise). Show your parents this savings progress — it proves you're responsible!",
    quickReplies: ['Set a 2-week chore challenge', 'Show my savings progress', 'Draft a case for my parents'],
  },
};

// ─── Health Score Helpers ────────────────────────────────────────

export function generateHealthScoreCoachText(
  score: number,
  pillars: { label: string; score: number }[],
): string {
  const sorted = [...pillars].sort((a, b) => a.score - b.score);
  const lowest = sorted[0];

  let text = `Your financial health score is ${score} out of 100. Here's the breakdown:\n\n`;
  text += pillars.map(p => `${p.label}: ${p.score}/100`).join('\n');

  if (lowest) {
    text += `\n\nYour biggest opportunity is ${lowest.label} at ${lowest.score}/100. `;
    text += 'Improving this pillar will have the greatest impact on your overall score.';
  }

  return text;
}

// ─── Helpers ────────────────────────────────────────────────────

export function getStartersForTab(tab: CoachTab, personaId: PersonaId): ConversationStarter[] {
  return conversationStarters.filter(s => s.tab === tab && s.personaId === personaId);
}

export function getTopNudge(tab: CoachTab, _personaId: PersonaId): CoachNudge | null {
  const relevant = coachNudges
    .filter(n => n.tab === tab || n.tab === 'all')
    .sort((a, b) => a.priority - b.priority);
  return relevant[0] || null;
}

export function getCoachResponse(intentTag: string): CoachMessage | null {
  return cannedResponses[intentTag] || null;
}
