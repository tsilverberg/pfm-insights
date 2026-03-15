# Coach Entry Points & Conversation System — Product Specification

**Status:** Ready for implementation
**Priority:** P0 — Hero feature / Key differentiator
**Last updated:** 2026-03-15

---

## Executive Summary

The Financial Coach is the soul of this PFM app. It transforms static financial data into an active relationship — the user never feels alone with their money. Every screen should feel like the coach is aware of what the user is seeing and has something relevant to say.

The design philosophy: **Revolut's proactive intelligence meets Apple's contextual suggestions meets a trusted human advisor.**

The coach is not a chatbot. It is a proactive financial partner that:
- Appears at the right moment with the right insight
- Never nags — celebrates wins as much as it warns about risks
- Speaks in specific numbers, not generic advice
- Offers one-tap actions, not lectures
- Feels like it knows the user's financial life intimately

---

## 1. Current State Audit

### What exists today

| Component | Location | Status |
|---|---|---|
| `CoachIcon` | Shared SVG component (atom icon) | Done |
| `CoachMomentCard` | Inline card with title, body, CTA, close | Done, used in 5 pages |
| `CoachSheet` | Bottom sheet with chat UI, 4 quick actions | Done, basic |
| `coachData.ts` | Greetings, 60+ conversation starters, 10 nudges, 40+ canned responses per persona | Rich data layer |
| Header coach button | InsightsPage, ExplorePage app headers | Done, opens sheet |
| Home coach button | UserAvatarHeader | Placeholder ("coming soon" toast) |

### Gaps identified

1. **No FAB** — coach requires navigating to a specific page header button to access
2. **No contextual triggers** — coach cards are hardcoded, not responsive to user state
3. **Conversation starters not surfaced** — 60+ starters exist in data but are never rendered
4. **CoachSheet is disconnected** — sheet has its own hardcoded quick actions instead of using coachData.ts starters
5. **No celebration moments** — coach only warns, never celebrates
6. **No coach presence on Home** — the most visited screen has only a dismissible observation
7. **Coach moment cards are identical everywhere** — same "Amazon shopping" message on Home, Dashboard, and Cards
8. **No transition from nudge to conversation** — tapping a coach card CTA doesn't open the sheet with context
9. **Health score and pillar pages have no coach** — prime real estate for coach advice
10. **No persistent entry point** — coach disappears when the user dismisses an inline card

---

## 2. Coach Entry Points Map

### 2.1 Persistent Entry Points (Always Available)

#### A. Coach FAB (Floating Action Button)

**Component:** `CoachFAB`
**Position:** Bottom-right, 16px from right edge, 16px above the FloatingTabBar (or 16px from bottom on pages without tab bar)
**Size:** 52x52px
**Visual:** CoachIcon (atom) centered in a filled circle, `var(--pfm-action-primary-bg)` background, white icon, `box-shadow: 0 4px 12px rgba(0,0,0,0.15)`
**Animation:** Subtle scale pulse on first appearance (0.95 -> 1.0 -> 0.98 -> 1.0, 600ms). Gentle bounce when a new nudge is queued.
**Badge:** Red dot (8px) on top-right when unread nudge is available

**Visibility rules:**
| Screen | FAB visible | Reason |
|---|---|---|
| Home (`/home`) | Yes | Primary entry point |
| Insights (`/insights`) | No | Coach button already in AppHeader |
| Invest (`/invest`) | Yes | Coach can advise on investments |
| Explore (`/explore`) | No | Coach button already in AppHeader |
| Health Overview | Yes | Coach advice is critical here |
| Pillar Detail | Yes | Coach can explain pillar specifics |
| Cards | Yes | Coach can advise on card optimization |
| Dashboard | Yes | Aggregated view benefits from coach |
| Account Detail | Yes | Coach can comment on account activity |
| Sub-pages (Send, Transfer, etc.) | No | Transactional pages, no tab bar |

**Behavior on tap:**
1. Opens `CoachSheet` at 75% breakpoint
2. Sheet pre-populates with context-aware greeting + conversation starters relevant to the current screen
3. If there is a pending nudge for this screen, the nudge is shown as the initial coach message

**Implementation notes:**
- Render in `App.tsx` alongside `FloatingTabBar`, outside the router outlet
- Use `useLocation()` to determine visibility and context
- Z-index: above page content, below modals/sheets

#### B. Header Coach Button (Existing)

**Where:** InsightsPage AppHeader, ExplorePage AppHeader
**Behavior:** Opens CoachSheet (already implemented)
**Enhancement:** Connect to coachData.ts for tab-aware conversation starters instead of hardcoded QUICK_ACTIONS

#### C. Home Page Coach Button (Existing)

**Where:** UserAvatarHeader, top-right icon row
**Current state:** Shows "coming soon" toast
**Enhancement:** Wire to open CoachSheet with Home-context starters

---

### 2.2 Contextual Entry Points (Triggered by Financial State)

Each contextual entry point renders a `CoachMomentCard` (or a new variant) at a specific location in the page, triggered by a data condition.

#### Screen: Home Page (`/home`)

| Trigger | Card placement | Title | Body (example) | CTA | Priority |
|---|---|---|---|---|---|
| Monthly spending on pace | After Account Balance | "On track this month" | "You've spent 58% of your budget with 55% of the month gone. Keep it up!" | "See breakdown" | 5 |
| Unusual large transaction (>2x avg for merchant) | After latest transaction containing it | "Unusual charge spotted" | "Your Zara purchase of EUR 187 is 3x your average. Everything okay?" | "Review transaction" | 1 |
| Savings goal milestone (25/50/75/100%) | After Pockets section | "Holiday fund at 75%!" | "You've saved EUR 1,733 toward your EUR 2,310 holiday goal. At this pace you'll hit it by July!" | "Boost it" | 3 |
| Payday detected | Top of page, below greeting | "Payday! Here's your snapshot" | "EUR 4,200 received. After bills (EUR 1,890) and savings (EUR 500), you have EUR 1,810 for the month." | "Set up auto-save" | 2 |
| Haven't opened app in 3+ days | Top of page, below greeting | "Welcome back!" | "While you were away: 12 transactions totaling EUR 342. Nothing unusual. Your health score held steady at 74." | "Quick review" | 2 |
| End of month (last 3 days) | Top of page | "Month-end review" | "January wrap: spent EUR 2,847 (4% under budget). Saved EUR 615. Health score: 74 (+3). Nice work." | "See full review" | 1 |

#### Screen: Spend Tab (`/insights` spend)

| Trigger | Card placement | Title | Body | CTA | Priority |
|---|---|---|---|---|---|
| Category >85% of budget | After that category in Top Categories | "Dining budget at 85%" | "EUR 196 of EUR 230 with 10 days left. You averaged EUR 8/day this week on dining — that's EUR 2 above your usual." | "Show me how to fix it" | 1 |
| NWG lifestyle >30% | After NWG breakdown | "Lifestyle creeping up" | "Your Lifestyle spending is at 31% — slightly above the 30% target. Dining and Entertainment are the main drivers." | "Rebalance" | 2 |
| Spending down vs last month | After NWG breakdown | "Spending down 12%" | "You've spent EUR 1,240 so far — EUR 168 less than this point last month. Groceries down 8%, Dining down 22%." | "Keep it going" | 4 |
| Subscription overlap detected | After Top Categories | "Overlapping subscriptions" | "You're paying for both Spotify (EUR 10.99) and Apple Music (EUR 10.99). You could save EUR 132/year." | "Review subscriptions" | 3 |

#### Screen: Plan Tab (`/insights` plan)

| Trigger | Card placement | Title | Body | CTA | Priority |
|---|---|---|---|---|---|
| Goal behind pace | After that goal's PocketGoalCard | "Holiday fund behind pace" | "You need EUR 324/month more to hit your August target. Redirecting your laptop fund after May would close the gap." | "Auto-redirect" | 1 |
| Rhythm not set | After Health Score Mini Card | "Set your rhythm" | "Knowing your Needs/Lifestyle/Saved split helps me give better advice. It takes 30 seconds." | "Set it now" | 2 |
| Rhythm set, on track | After rhythm card | "Rhythm on track" | "Your Needs (48%) and Lifestyle (29%) are within targets. Your Saved rate (23%) is your best month yet!" | "How to do even better" | 4 |
| Score improved | After Health Score Mini Card | "Score up 3 points!" | "Your health score improved to 74 this month, driven by better spending control. The savings pillar is your next opportunity." | "Improve savings" | 3 |

#### Screen: Health Overview (`/insights/health`)

| Trigger | Card placement | Title | Body | CTA | Priority |
|---|---|---|---|---|---|
| Score dropped | After hero score | "Score dipped 2 points" | "Your savings rate slowed down this month — that pulled the Savings pillar from 68 to 63. A EUR 100 top-up would recover half of that." | "Top up now" | 1 |
| Lowest pillar identified | After pillar list | "Biggest opportunity: Savings" | "Your Savings pillar at 65 has the most room to grow. Improving it by 10 points would add 2.5 points to your overall score." | "Show me how" | 2 |
| All pillars above 70 | After pillar list | "All pillars above 70!" | "Every pillar of your financial health is in 'Good' territory. You're in the top 25% of users your age." | "What's next?" | 4 |

#### Screen: Pillar Detail (`/insights/health/:pillarId`)

| Trigger | Card placement | Title | Body | CTA | Priority |
|---|---|---|---|---|---|
| Pillar-specific coaching | After key metrics | Dynamic per pillar | "Your debt-to-income ratio is 12% — below the 20% threshold. Paying EUR 50 extra on your credit card this month would bring it to 10%." | "Set up extra payment" | 2 |
| Action available | After actions list | "Quick win available" | "The top action for this pillar would add +8 points. That's the single biggest score move you can make right now." | "Do it" | 1 |

#### Screen: Invest Page (`/invest`)

| Trigger | Card placement | Title | Body | CTA | Priority |
|---|---|---|---|---|---|
| Idle cash detected | After portfolio summary | "EUR 2,660 not working for you" | "Your current account has EUR 2,660 above your monthly buffer. In your savings account, that would earn EUR 78/year instead of EUR 2.66." | "Move it now" | 1 |
| Portfolio milestone | After portfolio value | "Portfolio up 11.3% YTD" | "Your ETF portfolio has grown EUR 497 this year. That's outperforming the benchmark by 2.1%." | "Rebalance check" | 3 |

#### Screen: Cards Page (`/cards`)

| Trigger | Card placement | Title | Body | CTA | Priority |
|---|---|---|---|---|---|
| Wrong card used | After transactions | "Missed EUR 16 cashback" | "You used your debit card at Shell 3 times this month. Your Amex earns 3x points on fuel — that's EUR 16 left on the table." | "Set card reminder" | 2 |
| High credit utilization | After card details | "Credit at 72%" | "Your credit card is at EUR 1,872 of EUR 2,600 limit. Keeping it under 30% (EUR 780) would improve your Debt pillar by +5 points." | "Pay down" | 1 |

---

## 3. Conversation Starters Library

Conversation starters are pre-built prompts displayed as tappable pills. They replace the need for the user to type anything. They are the primary way users start a coach interaction.

### 3.1 Organization by Context

The starters from `coachData.ts` are already organized by tab and persona. The enhancement is surfacing them in the right places.

#### Where starters appear:
1. **CoachSheet quick actions** — top 4 starters for the current screen context
2. **CoachFAB expanded state** — when FAB is long-pressed or when sheet opens
3. **Empty-state coach cards** — on pages where there's no active nudge, show 2-3 starters as a prompt
4. **Post-nudge follow-ups** — after dismissing a nudge, show 2 relevant follow-up starters

### 3.2 Starter Categories

#### Spending & Budget
| Starter | Intent Tag | Best Context |
|---|---|---|
| "How am I doing this month?" | `monthly-summary` | Home, Overview |
| "Am I on budget?" | `budget-check` | Spend tab |
| "Where's my money going?" | `spend-breakdown` | Spend tab, Home |
| "Compare me to last month" | `month-compare` | Spend tab |
| "Which categories can I trim?" | `trim-categories` | Spend tab, Plan |
| "Show my needs/lifestyle/saved split" | `nwg-breakdown` | Overview, Spend |

#### Savings & Goals
| Starter | Intent Tag | Best Context |
|---|---|---|
| "How's my savings progress?" | `savings-progress` | Plan tab |
| "Am I on track for my goals?" | `goals-pace` | Plan tab, Home |
| "Can I afford [X] in [month]?" | `afford-check` | Plan tab |
| "Where should I put extra money?" | `extra-money` | Home (post-payday) |
| "Help me set a savings target" | `set-target` | Plan tab |

#### Health Score
| Starter | Intent Tag | Best Context |
|---|---|---|
| "Explain my health score" | `health-score` | Health Overview, Plan |
| "How do I improve my score?" | `improve-score` | Health Overview |
| "What's dragging my score down?" | `score-weakness` | Health Overview |
| "Show my score trend" | `score-trend` | Health Overview |

#### Money Optimization
| Starter | Intent Tag | Best Context |
|---|---|---|
| "Am I using the right cards?" | `card-optimizer` | Cards |
| "Find me savings" | `find-savings` | Explore, Home |
| "Review my subscriptions" | `sub-audit` | Spend tab, Explore |
| "Any cashback I'm missing?" | `missed-cashback` | Cards |
| "Is my money working for me?" | `dormant-cash` | Invest, Home |

#### General / Proactive
| Starter | Intent Tag | Best Context |
|---|---|---|
| "What should I focus on?" | `priorities` | Home, Overview |
| "Give me a quick update" | `quick-update` | Home |
| "What bills are coming up?" | `upcoming-bills` | Home |
| "Celebrate a win with me" | `celebrations` | Any |

### 3.3 Dynamic Starters

Some starters should be dynamically generated based on user state:

| Condition | Dynamic Starter | Intent |
|---|---|---|
| Score changed this month | "Why did my score change by [+/-X] points?" | `score-change` |
| Goal near completion | "When will I hit my [goal name]?" | `goal-eta` |
| Category over budget | "Help me with my [category] spending" | `category-help` |
| Payday detected | "What should I do with this month's pay?" | `payday-plan` |
| Large transaction | "Tell me about my [merchant] charge" | `transaction-explain` |

---

## 4. CoachFAB Component Spec

### 4.1 Visual Design

```
┌─────────────────────────────────┐
│                                 │
│                      ┌────┐     │
│                      │ ✦  │ ← FAB (52x52, filled circle)
│                      │    │    Coach atom icon, white on primary
│                      └────┘     │
│  ┌─────────────────────────┐    │
│  │ Home  Insights  Invest  │    │ ← FloatingTabBar
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

### 4.2 States

| State | Visual | Trigger |
|---|---|---|
| Default | Primary circle + white icon | Always when visible |
| Unread nudge | + red 8px dot top-right | New nudge available for this screen |
| Pressed | Scale to 0.92, darker background | Touch down |
| Animating in | Fade + scale from 0 to 1 (300ms, ease-out) | Page mount |
| Hidden | Not rendered | Pages in hiddenPaths or where header button exists |

### 4.3 Interaction

1. **Tap** — Opens CoachSheet with context for current page
2. **Long press (300ms)** — Shows a floating tooltip with the top nudge preview (title only, 1 line). Releasing opens the sheet.
3. **Swipe up on FAB** — Opens CoachSheet directly at full height

### 4.4 Props

```typescript
interface CoachFABProps {
  // No external props needed — FAB reads context from router
}
```

### 4.5 Implementation

```
File: src/components/shared/CoachFAB.tsx
File: src/components/shared/CoachFAB.css
Rendered in: src/App.tsx (alongside FloatingTabBar)
```

The FAB manages its own state:
- Reads `useLocation()` to determine current screen context
- Calls `getTopNudge(tab, personaId)` to check for pending nudge (red dot)
- On tap, renders `CoachSheet` and passes the current context

---

## 5. Coach Conversation Flow

### 5.1 Flow: Nudge Card to Full Conversation

```
[User sees CoachMomentCard inline on page]
        │
        ├─── User taps CTA ("Let's fix it")
        │         │
        │         └─── CoachSheet opens at 75%
        │               Initial message = nudge body + expanded advice
        │               Quick replies = nudge.quickReplies
        │               Conversation starters = tab-relevant starters
        │
        ├─── User taps Close (X)
        │         │
        │         └─── Card dismissed, replaced with 2 follow-up starters:
        │               "Ask about [topic]" / "Remind me later"
        │
        └─── User ignores card
                  │
                  └─── Card persists until session ends or another nudge replaces it
```

### 5.2 Flow: FAB to Conversation

```
[User taps CoachFAB]
        │
        └─── CoachSheet opens at 75%
               │
               ├─── Greeting (time-of-day, personalized)
               │      "Afternoon, Morgan. Quick status update."
               │
               ├─── If pending nudge for this screen:
               │      Show nudge as initial coach message
               │      + quick replies from nudge
               │
               ├─── If no pending nudge:
               │      Show proactive insight (best from all nudges)
               │      "Your spending is looking good this month — 8% below this time last month."
               │
               └─── Conversation starters (pills)
                      4 pills, contextual to current screen
                      Scrollable horizontally if more than 4
```

### 5.3 Flow: Conversation Depth

```
[User taps a conversation starter or quick reply]
        │
        └─── User message appears (right-aligned bubble)
               │
               └─── Coach typing indicator (0.5s)
                      │
                      └─── Coach response appears (left-aligned bubble)
                             │
                             ├─── May include stat cards (inline data visualization):
                             │      ┌──────────────────────────┐
                             │      │  Spent this month  │  Saved  │
                             │      │    €1,240          │  €615   │
                             │      │    -8% vs last     │  +12%   │
                             │      └──────────────────────────┘
                             │
                             ├─── May include quick replies (follow-up pills)
                             │      ["Show breakdown", "Compare to last month", "Got it"]
                             │
                             └─── May include action button:
                                    [Move €1,735 to savings →]
                                    Tapping action button triggers toast/navigation
```

### 5.4 CoachSheet Enhancement Spec

The current `CoachSheet` needs these upgrades:

1. **Accept context prop** — `screenContext: 'home' | 'spend' | 'plan' | 'health' | 'invest' | 'cards' | 'general'`
2. **Use coachData.ts** — Replace hardcoded `QUICK_ACTIONS` and `COACH_RESPONSES` with `getStartersForTab()` and `getCoachResponse()`
3. **Support stat cards** — Render `CoachStatCard[]` inline in coach messages
4. **Support quick replies** — After each coach response, show contextual follow-up pills
5. **Initial message from nudge** — If opened from a nudge CTA, pre-populate with the nudge context
6. **Typing indicator** — Show 3-dot animation during the 500ms delay before coach responds

### 5.5 Enhanced CoachSheet Props

```typescript
interface CoachSheetProps {
  isOpen: boolean;
  onClose: () => void;
  screenContext?: CoachTab;           // which screen opened it
  initialNudge?: CoachNudge | null;   // pre-populate from a nudge
  personaId?: PersonaId;              // persona for starters/greeting
}
```

---

## 6. Coach Personality & Tone Guide

### 6.1 Voice Principles

| Principle | Good | Bad |
|---|---|---|
| Specific, not generic | "Your dining is at EUR 196 of EUR 230" | "You should watch your spending" |
| Actionable, not preachy | "Skip 2 dining-out meals to stay on track" | "You need to be more careful" |
| Celebrates wins | "Score up 3 points! Best month since October" | (only shows warnings) |
| Connects data points | "Your gym membership costs EUR 35/mo — last visit: 3 weeks ago" | "Consider reviewing subscriptions" |
| Conversational, not robotic | "That's a great month. Here's why..." | "Analysis complete. Results:" |
| Respects intelligence | "At 4.5% APR, EUR 1,735 earns EUR 78/year" | "Savings accounts earn interest" |

### 6.2 Tone by Moment

| Moment | Tone | Example |
|---|---|---|
| Warning / budget alert | Calm, not alarming | "Heads up — dining is at 85%. You've got EUR 34 left for 10 days." |
| Celebration | Genuinely happy | "You hit 75% on your holiday fund! At this pace, July is looking very real." |
| Score drop | Supportive, solution-focused | "Score dipped 2 points from savings pace. A EUR 100 top-up would recover half." |
| Payday | Energetic, planning-focused | "Payday! After bills and savings, you've got EUR 1,810 to work with." |
| Idle / welcome back | Warm, brief | "Welcome back! 12 transactions while you were away. Nothing unusual." |
| Complex advice | Clear, structured | Uses numbered lists, bold amounts, comparison data |

### 6.3 Coach Message Anatomy

Every coach message should follow this structure:

1. **Hook** (1 sentence) — The insight or observation
2. **Data** (1-3 data points) — Specific numbers that support it
3. **Recommendation** (1 sentence) — What to do about it
4. **Quick replies** (2-3 options) — Next steps the user can tap

Example:
> "Your Lifestyle spending is at 31% this month — slightly above the 30% target. Dining (EUR 168) and Entertainment (EUR 86) are the main drivers. Trimming EUR 23 from dining would get you back to balance."
>
> [Show spending breakdown] [Which categories to trim?] [Adjust my targets]

---

## 7. New Data Requirements

### 7.1 New Nudges to Add to `coachData.ts`

```typescript
// Celebration nudges (currently missing — critical gap)
{ id: 'n-celebrate-1', insightType: 'celebration', title: 'Best savings month!',
  body: "You saved EUR 615 this month — that's 22% of your income and your best month since you started tracking.",
  tab: 'home', ctaLabel: 'See my progress', priority: 3 }

{ id: 'n-celebrate-2', insightType: 'celebration', title: 'Goal milestone!',
  body: "Your Holiday fund just passed 75%! EUR 1,733 saved of EUR 2,310. July is looking very real.",
  tab: 'plan', ctaLabel: 'Boost it more', priority: 3 }

{ id: 'n-celebrate-3', insightType: 'celebration', title: 'Streak: 4 weeks on budget',
  body: "Four weeks in a row with all categories on budget. That consistency is what moves your score.",
  tab: 'home', ctaLabel: 'Keep it going', priority: 4 }

{ id: 'n-celebrate-4', insightType: 'celebration', title: 'Score up!',
  body: "Your health score improved 3 points to 74 this month. Spending control drove the gain. Savings is your next lever.",
  tab: 'plan', ctaLabel: 'Improve savings', priority: 3 }

// Proactive / opportunity nudges
{ id: 'n-payday', insightType: 'payday', title: 'Payday plan',
  body: "EUR 4,200 just arrived. After bills (EUR 1,890) and auto-saves (EUR 500), you have EUR 1,810 for the month. Want me to optimize the split?",
  tab: 'home', ctaLabel: 'Optimize', priority: 1 }

{ id: 'n-idle-cash', insightType: 'opportunity', title: 'Money sitting idle',
  body: "EUR 2,660 in your current account is earning almost nothing. Moving EUR 1,735 to savings would earn EUR 78/year.",
  tab: 'home', ctaLabel: 'Move it', priority: 2 }

{ id: 'n-welcome-back', insightType: 'engagement', title: 'Welcome back!',
  body: "12 transactions totaling EUR 342 since your last visit. Nothing unusual. Score held at 74.",
  tab: 'home', ctaLabel: 'Quick review', priority: 2 }

{ id: 'n-month-end', insightType: 'review', title: 'January wrap-up',
  body: "Spent EUR 2,847 (4% under budget). Saved EUR 615. Health score: 74 (+3). Your best month in 3.",
  tab: 'home', ctaLabel: 'Full review', priority: 1 }

// Card optimization
{ id: 'n-card-routing', insightType: 'optimization', title: 'Wrong card at Shell',
  body: "You used your debit card for fuel 3 times. Your Amex earns 3x points on fuel — EUR 16 left on the table.",
  tab: 'home', ctaLabel: 'Fix card routing', priority: 3 }
```

### 7.2 New Canned Responses to Add

```typescript
// Celebration responses
'celebrations': {
  id: 'r-celebrations', role: 'coach', timestamp: ts(),
  text: "Let's celebrate! Here are your wins this month:\n\n1) Spending control improved 3 points — your best since October\n2) Holiday fund hit 75% — ahead of schedule\n3) 4 consecutive weeks on budget — that's consistency\n4) Saved EUR 615 — 22% of income (target was 20%)\n\nThe trend is clear: you're getting better every month. Your financial health score at 74 puts you in the top 30% of users your age.",
  quickReplies: ['What should I focus on next?', 'Share my progress', 'How do I get to 80?'],
}

// Score change explanation
'score-change': {
  id: 'r-score-change', role: 'coach', timestamp: ts(),
  text: "Your score moved from 71 to 74 this month. Here's what drove it:\n\nSpending Control: 75 -> 78 (+3) — you stayed within Needs and Lifestyle targets\nSavings Rate: 62 -> 65 (+3) — your savings rate improved from 18% to 22%\nDebt: 85 -> 85 (steady) — credit utilization unchanged\nBuffer: 72 -> 72 (steady) — emergency fund on pace\nGoals: 68 -> 69 (+1) — holiday fund progress helped\n\nBiggest opportunity: Savings is still your lowest pillar at 65. Getting it to 75 would push your overall score to 77.",
  quickReplies: ['How do I improve savings?', 'What would get me to 80?', 'Compare to others'],
}

// Payday plan
'payday-plan': {
  id: 'r-payday', role: 'coach', timestamp: ts(),
  text: "Here's my recommended split for your EUR 4,200:\n\nBills & essentials: EUR 1,890 (auto-pay set up)\nSavings auto-transfer: EUR 500 (already scheduled)\nGoal top-ups: EUR 200 (EUR 115 Holiday + EUR 85 Laptop)\nInvestment: EUR 100 (ETF portfolio DCA)\nDiscretionary: EUR 1,510\n\nThat leaves EUR 1,510 for the month — about EUR 50/day. Your average daily spend last month was EUR 43, so you have comfortable headroom.\n\nWant me to set up the goal top-ups automatically?",
  quickReplies: ['Set up auto top-ups', 'Adjust the split', 'What about extra to savings?'],
}
```

### 7.3 Stat Card Data

The `CoachStatCard` type already exists. Add these data generators:

```typescript
// Monthly summary stat cards
export function getMonthlyStatCards(): CoachStatCard[] {
  return [
    { label: 'Spent', value: '€1,240', context: '-8% vs last month', color: 'var(--pfm-status-success)' },
    { label: 'Saved', value: '€615', context: '22% of income', color: 'var(--pfm-action-primary-bg)' },
    { label: 'Score', value: '74', context: '+3 this month', color: 'var(--pfm-status-success)' },
  ];
}

// Goal progress stat cards
export function getGoalStatCards(): CoachStatCard[] {
  return [
    { label: 'Holiday', value: '75%', context: 'On track for July' },
    { label: 'Laptop', value: '88%', context: 'Done in May' },
    { label: 'Emergency', value: '65%', context: 'On pace for Dec' },
  ];
}
```

---

## 8. Implementation Priority

### Phase 1: Foundation (Week 1) — Maximum Impact

| Task | Impact | Effort | Files |
|---|---|---|---|
| **CoachFAB component** | HIGH | Medium | New: `CoachFAB.tsx`, `CoachFAB.css`. Edit: `App.tsx` |
| **Wire CoachSheet to coachData.ts** | HIGH | Low | Edit: `CoachSheet.tsx` |
| **Wire Home coach button** | HIGH | Low | Edit: `UserAvatarHeader.tsx` |
| **Context-aware starters in CoachSheet** | HIGH | Medium | Edit: `CoachSheet.tsx` |

**Outcome:** Coach is accessible from every main screen. Conversation starters are relevant to context. The 60+ existing starters and 40+ responses are finally surfaced.

### Phase 2: Contextual Nudges (Week 2) — Intelligence

| Task | Impact | Effort | Files |
|---|---|---|---|
| **Replace hardcoded coach cards with nudge system** | HIGH | Medium | Edit: `HomePage.tsx`, `SpendTab.tsx`, `MonthlyGoalsTab.tsx`, `DashboardPage.tsx`, `CardsPage.tsx` |
| **Add celebration nudges** | HIGH | Low | Edit: `coachData.ts` |
| **Nudge-to-sheet flow** | HIGH | Medium | Edit: `CoachMomentCard.tsx`, `CoachSheet.tsx` |
| **Add typing indicator to CoachSheet** | LOW | Low | Edit: `CoachSheet.tsx`, `CoachSheet.css` |

**Outcome:** Coach cards are intelligent and contextual. Celebrations are shown. Tapping a card CTA seamlessly opens the full conversation.

### Phase 3: Rich Conversations (Week 3) — Depth

| Task | Impact | Effort | Files |
|---|---|---|---|
| **Stat cards in chat messages** | MEDIUM | Medium | Edit: `CoachSheet.tsx`, `CoachSheet.css` |
| **Quick replies after each response** | MEDIUM | Medium | Edit: `CoachSheet.tsx` |
| **Add new canned responses** (payday, celebrations, score-change) | MEDIUM | Low | Edit: `coachData.ts` |
| **Coach on Health & Pillar pages** | MEDIUM | Medium | Edit: `HealthOverviewPage.tsx`, `PillarDetailPage.tsx` |

**Outcome:** Conversations feel deep and interactive. Coach provides rich data-backed advice with one-tap follow-ups.

### Phase 4: Polish (Week 4) — Delight

| Task | Impact | Effort | Files |
|---|---|---|---|
| **FAB animation (pulse, bounce for new nudge)** | LOW | Low | Edit: `CoachFAB.css` |
| **Dynamic starters based on user state** | MEDIUM | Medium | Edit: `coachData.ts`, `CoachSheet.tsx` |
| **Coach on Invest page** | LOW | Low | Edit: `InvestPage.tsx` |
| **Long-press FAB preview** | LOW | Medium | Edit: `CoachFAB.tsx` |
| **Dismissed nudge follow-up starters** | LOW | Medium | Edit: `CoachMomentCard.tsx` |

---

## 9. Success Metrics (for Product)

| Metric | Target | Measurement |
|---|---|---|
| Coach engagement rate | >40% of sessions include coach interaction | FAB tap + header button tap + nudge CTA tap |
| Conversation depth | >2.5 messages per session | Average messages in CoachSheet per open |
| Nudge action rate | >25% of shown nudges get CTA tap | CTA taps / nudges shown |
| Coach retention | >60% of users interact with coach weekly | Weekly active coach users / WAU |
| Celebration exposure | >1 celebration per user per week | Celebration nudges shown / users |

---

## 10. Design Decision Log

| Decision | Rationale |
|---|---|
| FAB over persistent tab | Coach should feel like an advisor layer, not a navigation destination. A tab makes it feel like a separate feature. A FAB makes it feel omnipresent. |
| No full coach "page" | The bottom sheet model keeps the user in context. They see their data AND talk to the coach simultaneously. A full page would break that flow. |
| Starters over free text | For a prototype/MVP, curated starters ensure quality responses. Free text creates expectation of AI that we can't deliver yet. Starters are a design pattern (not a limitation). |
| Celebrations as first-class nudges | Most PFM tools only warn. Celebrating wins builds positive association with the app and increases return visits. |
| Context-aware starters | Showing "How's my spending?" on the Invest page feels wrong. Context-awareness is what separates a smart coach from a dumb chatbot. |
| Red dot badge, not count | A count badge implies notifications/tasks. A dot implies "I have something for you" — more conversational, less transactional. |
| 75% initial breakpoint | Leaves the page visible behind the sheet. The user can see their data while talking to the coach. Full screen would feel like leaving the app. |
