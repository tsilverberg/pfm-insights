# PFM Overhaul: Product Strategy

**Author:** David Chen, VP of Product
**Date:** 15 March 2026
**Status:** Draft for Executive Review
**Version:** 1.0

---

## 1. Executive Summary

We are proposing a comprehensive overhaul of Personal Financial Management (PFM) within our mobile banking app. Today, our production app (pfm-insights) delivers a polished banking experience across 25+ screens -- Home, Invest, Explore, Cards, Transfers, Account Sharing -- but its PFM layer is shallow: a spending donut chart, basic Needs/Wants/Security budgeting, and an empty milestones page. Meanwhile, our research prototype (pfm) has validated a deep PFM engine across 24 screens, including a 5-pillar Financial Health Score, AI Coach with 60+ context-aware conversation starters, NWG (Needs/Wants/Growth) transaction taxonomy, peer benchmarking, household banking, gamification with wellness stages, and envelope budgeting.

**The opportunity:** Merge the prototype's depth into the production app's polish. The current app has the design system, component library, and user flows already in production. The prototype has the PFM intelligence, data models, and persona-driven UX that transforms a banking app into a financial wellness platform.

**Expected impact:**
- 35-50% increase in daily active engagement (based on Monzo's post-PFM-launch data)
- 20-30% increase in savings product adoption via goal-linked auto-transfers
- 15-25% reduction in customer churn through financial health score stickiness
- New revenue streams through card-linked offers, cashback, and premium coaching

**What this is NOT:** This is not a rewrite. We are porting proven prototype features into an already-shipping production app, preserving its routing architecture, design tokens, and component library.

---

## 2. User Outcomes (Jobs-to-Be-Done)

### 2.1 Young Adult (Taylor) -- "Build smart habits early"

| # | Job-to-Be-Done | Outcome |
|---|----------------|---------|
| 1 | "Help me understand where my money goes so I can stop overspending" | NWG transaction tagging shows Needs/Wants/Growth split on every transaction, making spending patterns visible without effort |
| 2 | "Make saving feel like progress, not deprivation" | Gamified wellness journey with stages (Awareness > Control > Fitness > Growth), XP, missions, and achievements turns saving into a game |
| 3 | "Tell me if I'm doing okay compared to people like me" | Peer benchmarking compares spending against cohort averages adjusted by income, household type, and spending personality |

### 2.2 Family (Chen) -- "Your household, one view"

| # | Job-to-Be-Done | Outcome |
|---|----------------|---------|
| 1 | "Give me one dashboard that shows the whole family's financial picture" | Household Health Score aggregates adult member scores; dependents card shows kids' balances, chores, and elder care status |
| 2 | "Help us save together for big family goals" | Shared goals with per-member contribution tracking, auto-save splits, and kid savings goals with progress visualization |
| 3 | "Alert me to irregular costs before they hit" | Sinking fund for predictable-but-irregular expenses (car insurance, school fees) with auto-funding and countdown |

### 2.3 Professional (Morgan) -- "Optimize every pound"

| # | Job-to-Be-Done | Outcome |
|---|----------------|---------|
| 1 | "Show me where I'm leaving money on the table" | Card optimization engine recommends which card to use per category; dormant cash alerts surface idle balances; subscription audit flags unused services |
| 2 | "Give me a single number that tells me my financial health" | 5-pillar Health Score (Spending 25%, Savings 25%, Debt 20%, Buffer 20%, Goals 10%) with drill-down, trend lines, and improvement actions |
| 3 | "Automate the boring stuff so I can focus on growth" | Envelope pockets with auto-funding, goal auto-transfers, and AI coach that proactively surfaces actionable insights |

### 2.4 Senior (Margaret) -- "Simple, clear, secure"

| # | Job-to-Be-Done | Outcome |
|---|----------------|---------|
| 1 | "Let me see my bills and balance without confusion" | Simplified view: large text, total balance front-and-center, bills list instead of budget breakdowns, three big action buttons |
| 2 | "Let my family help me manage money safely" | Trusted access with granular permissions (view balances, view transactions, make payments), emergency contacts, and caregiver card |
| 3 | "Give me a real person to talk to when I need help" | Conversational coach adapted for senior context, one-tap bank calling, branch finder, and FAQ |

### 2.5 Teen (Alex) -- "Learn money, earn money"

| # | Job-to-Be-Done | Outcome |
|---|----------------|---------|
| 1 | "Help me save for what I actually want" | Kid-friendly savings goals with visual progress (gaming headset, festival ticket), streak tracking, and NWG labeling on transactions |
| 2 | "Let me earn money by doing chores" | Chore board with status tracking, reward amounts, weekly earnings summary, and parent approval flow |
| 3 | "Show me I'm getting better with money" | Badges and achievements (First Save, Chore Champion, Budget Boss) with progress bars for unearned achievements |

---

## 3. Feature Prioritization (MoSCoW)

### Must Have (Phase 1-2 -- ships or the overhaul fails)

| Feature | Justification |
|---------|---------------|
| **Financial Health Score (5-pillar)** | Anchor metric for the entire PFM experience. Without it, we have no north star for users. Already validated in prototype with full calculation engine. |
| **NWG Transaction Taxonomy** | Every transaction tagged as Need/Want/Growth. Foundation for budgets, health score, and coaching. Current app already has N/W/S (Security) categories -- migration is straightforward. |
| **AI Coach (bottom sheet)** | Differentiator. 60 conversation starters, proactive nudges, context-aware greetings. Current app already has CoachIcon and "coming soon" toast -- the shell exists. |
| **Goal CRUD with auto-transfer** | Current app has Pockets (savings goals) but no auto-transfer, no target dates, no progress tracking beyond progress bars. Prototype adds full lifecycle. |
| **Budget categories with NWG** | Current app has category budgets (Needs/Wants/Security) but no drill-down. Prototype adds per-category detail, monthly breakdown, weekly breakdown, merchant-level inspection. |
| **Cashflow summary bar** | Income vs spending vs upcoming -- the prototype's CashflowBar gives users instant financial orientation that the current overview lacks. |
| **Health Score dashboard** | Full pillar breakdown, metrics, improvement actions, history chart. This is the "why should I open the app daily" feature. |

### Should Have (Phase 2-3 -- significant value, not blocking)

| Feature | Justification |
|---------|---------------|
| **Persona-driven UI adaptation** | 5 personas with feature flags (showHousehold, showGamification, showSimplified, etc.). Critical for scaling but can launch with a default persona first. |
| **Envelope budgeting (Pockets)** | Auto-funded spending pockets with linked cards. Current app has Pockets for savings; prototype extends them to spending allocation. |
| **Peer benchmarking** | Cohort comparison adjusted by household type, income band, and spending personality. High engagement driver but requires cohort data infrastructure. |
| **Improvement actions per pillar** | Contextual, actionable recommendations (e.g., "Reduce Coffee & Snacks spending -- you're 18 over budget"). Calculated dynamically from budget data. |
| **Monthly score history** | 6-month trend line for overall score and per-pillar scores. Shows progress over time -- key retention driver. |
| **Budget accordion view** | Income / Fixed / Recurring / Discretionary tiered view. Professional-grade budgeting UX already built in prototype. |

### Could Have (Phase 3-4 -- differentiation)

| Feature | Justification |
|---------|---------------|
| **Gamification (stages, missions, XP, achievements)** | Young adult engagement. Wellness journey with 4 stages, 10 missions, 5 achievements. High complexity, high reward for the right persona. |
| **Household banking** | Family member spending breakdown, shared budgets, dependent management (teen + senior). Requires multi-user data model. |
| **Shopping intelligence (offers, cashback)** | Card-linked offers, cashback tracking, subscription audit. Revenue opportunity but requires merchant partnerships. |
| **Card optimization engine** | "Which card should I use where?" recommendations. Professional persona feature. Requires multi-card data. |
| **Sinking fund for irregular costs** | Auto-funded reserve for predictable irregular expenses (insurance, school fees). Unique differentiator. |
| **Senior simplified mode** | Large text, reduced complexity, bill-focused view. Accessibility win but smallest persona segment. |
| **Teen/Kid mode** | Chore board, allowances, kid-friendly savings goals, parent approval flows. Requires parent-child account linking. |

### Won't Have (this release)

| Feature | Justification |
|---------|---------------|
| **Real AI/LLM integration for Coach** | Prototype uses deterministic responses (`getCoachResponse`). Real LLM integration is a separate backend workstream. Ship with curated responses first. |
| **Live merchant offers/cashback** | Requires merchant partnership infrastructure. Mock the UI, defer the backend. |
| **Multi-bank aggregation (Open Banking)** | Prototype assumes single-bank data. PSD2 integration is a platform-level effort. |
| **Voice commands / voice assistant** | Senior persona toggle exists but no implementation. Defer to post-launch. |
| **Cross-border / multi-currency PFM** | Current app is EUR-denominated; prototype is GBP. Currency handling is out of scope for the PFM layer. |

---

## 4. Phased Delivery Plan

### Phase 1: Foundation (Weeks 1-6)

**Goal:** Replace the shallow Insights page with a credible PFM hub. Users should feel the app "understands" their money.

**Scope:**
- Financial Health Score ring on Overview tab (replacing simple net wealth hero)
- NWG transaction taxonomy on all transactions (extend current `Transaction` type with `nwgType`)
- Cashflow summary bar (received / spent / upcoming)
- AI Coach bottom sheet (replacing "coming soon" toast)
- Budget drill-down by category (extend current MonthlyGoalsTab)

**User Stories:**
1. As a user, I want to see a single Financial Health Score (0-100) on my overview so I know if I'm on track.
2. As a user, I want every transaction labeled as Need, Want, or Growth so I can see where my money goes.
3. As a user, I want to tap on a budget category and see monthly trends, this month's transactions, and how I compare to my budget.
4. As a user, I want to ask the AI Coach questions about my finances and get contextual responses.
5. As a user, I want to see my monthly cashflow (income minus spending minus upcoming) at a glance.

**Acceptance Criteria:**
- Health Score calculates from real budget, pocket, goal, and account data using the 5-pillar formula
- NWG classification appears on at least transaction list items and category filters
- Coach opens as a bottom sheet with greeting, conversation starters, nudges, and chat UI
- Budget drill-down shows category detail with progress bar, monthly chart, and transaction list
- Cashflow bar shows three segments (received, spent, upcoming) with correct totals

**Dependencies:**
- `healthScoreData.ts` calculation engine ported to production
- `coachData.ts` conversation starters and nudge data ported
- Transaction type extended with `nwgType` field
- New routes: `/health-dashboard`, `/category/:name`

### Phase 2: Depth (Weeks 7-12)

**Goal:** Add the "why should I come back daily" features. Score becomes actionable, goals become smart.

**Scope:**
- Health Score dashboard (full pillar breakdown, metrics, improvement actions)
- Pillar detail pages (drill into Spending, Savings, Debt, Buffer, Goals)
- Goal CRUD with auto-transfer toggle and milestone tracking
- Pocket CRUD with auto-funding and linked card concept
- Score history (6-month trend chart)
- Improvement actions with deep-links to relevant features

**User Stories:**
1. As a user, I want to drill into each Health Score pillar and see specific metrics and actionable recommendations.
2. As a user, I want to create a savings goal with a target amount, target date, and auto-transfer that moves money automatically.
3. As a user, I want to see my Health Score trend over the last 6 months so I can see if I'm improving.
4. As a user, I want the app to tell me the single most impactful action I can take to improve my score.
5. As a user, I want to edit or delete a pocket and control whether it auto-funds from my checking account.

**Acceptance Criteria:**
- Each pillar shows score, rating, trend arrow, 3 metrics, and 2-3 improvement actions
- Goal create flow collects name, target amount, target date, auto-transfer amount, and linked account
- Score history chart renders 6 data points with overall and per-pillar lines
- Top recommendation surfaces on dashboard from lowest-scoring pillar
- Pocket detail shows allocated vs spent, linked cards count, auto-fund toggle

**Dependencies:**
- `GoalContext.tsx` and `PocketContext.tsx` state management ported
- New routes: `/pillar/:id`, `/goals/create`, `/goals/:id`, `/pockets/create`, `/pockets/:id`
- `HealthScoreContext.tsx` provider wrapping the app

### Phase 3: Differentiation (Weeks 13-20)

**Goal:** Features that no other banking app has. This is where we leapfrog Revolut and Monzo.

**Scope:**
- Persona system (5 personas with feature flags)
- Peer benchmarking with cohort profile setup
- Gamification (wellness stages, missions, XP, achievements) for young adult persona
- Household member spending breakdown for family persona
- Budget accordion view (Income / Fixed / Recurring / Discretionary)
- NWG detail pages (tap on Needs/Wants/Growth segment to see category breakdown)

**User Stories:**
1. As a young adult, I want to see a wellness journey map with stages I can progress through by completing financial missions.
2. As a family, I want to see each member's spending as a share of the household total.
3. As a user, I want to compare my spending to people with similar income and household type.
4. As a user, I want to set up my cohort profile (household type, income band, spending personality) to get relevant benchmarks.
5. As a user, I want to view my budget as an accordion by cost type (income, fixed, recurring, discretionary).

**Acceptance Criteria:**
- Persona selector persisted in context; UI adapts tab labels, visible sections, and feature availability
- Cohort profile captures 4 dimensions; benchmark card shows comparison with percentage difference
- Gamification renders 4 wellness stages, active missions with progress, XP badges, and achievements grid
- Household card shows member avatars with spending amounts and progress bars
- NWG detail page shows categories within the selected type with budget progress and transaction lists

**Dependencies:**
- `PersonaContext.tsx` and `CohortContext.tsx` ported
- `personas.ts` feature flag definitions integrated with component rendering
- New routes: `/cohort-profile`, `/nwg/:type`, `/dependents`

### Phase 4: Polish (Weeks 21-26)

**Goal:** Senior and teen personas, shopping intelligence, and production hardening.

**Scope:**
- Senior simplified mode (large text, bills-focused, trusted access)
- Teen/kid mode (chore board, allowances, kid savings goals, badges)
- Shopping intelligence (cashback offers, subscription audit, card optimization)
- Sinking fund for irregular costs
- Dormant cash alerts
- Performance optimization, accessibility audit, edge case handling

**User Stories:**
1. As a senior, I want a simplified view with large text, my total balance, and a list of bills.
2. As a teen, I want to see my chore board and earn money by completing tasks.
3. As a professional, I want the app to tell me which card to use for each spending category to maximize cashback.
4. As a family, I want to set aside money automatically for irregular costs like insurance renewals.
5. As a user, I want the app to alert me when I have idle cash that could be earning interest.

**Acceptance Criteria:**
- Senior mode renders with increased font sizes, reduced information density, and big action buttons
- Teen mode shows balance, allowance schedule, chore board with status, and kid-specific savings goals
- Card optimization shows primary/secondary card recommendation per category with estimated value
- Sinking fund shows total saved vs target with auto-fund toggle and upcoming cost list
- Dormant cash alert calculates idle amount above typical buffer and suggests ISA transfer

**Dependencies:**
- Parent-child account linking (may require backend API)
- Merchant offer partnerships (can ship with mock data initially)
- Accessibility audit tooling (axe-core, VoiceOver testing)

---

## 5. Data Model Requirements

### 5.1 Types to Port from Prototype

| Prototype Type | Current App Equivalent | Migration Strategy |
|---------------|----------------------|-------------------|
| `Transaction` (with `nwgType`, `categoryIcon`) | `Transaction` (no nwg, no icon) | **Extend**: Add `nwgType: 'need' \| 'want' \| 'growth'` and `categoryIcon: string` to existing type |
| `Budget` (with `nwgType`, `spent`, `limit`) | Implicit in `monthlyGoalsData.snapshot` | **Create**: New `Budget` interface. Current app has inline budget data; prototype has a proper Budget model |
| `Goal` (with `autoTransfer`, `autoTransferEnabled`, `targetDate`) | `Pocket` (similar but no auto-transfer) | **Extend**: Add `autoTransfer`, `autoTransferEnabled`, `targetDate` to Pocket or create parallel Goal type |
| `Pocket` (with `allocated`, `spent`, `linkedCards`, `autoFunded`) | `Pocket` (with `currentAmount`, `targetAmount`) | **Merge**: Current Pocket is savings-focused; prototype Pocket is spending-envelope-focused. Keep both concepts under unified type with `purpose: 'savings' \| 'spending'` |
| `InsightCard` (10 types) | None | **Create**: New type. Maps to CoachMomentCard in current app but much richer |
| `HouseholdMember` | `ChildAccount` (partial) | **Extend**: Current ChildAccount covers kids only. Prototype HouseholdMember covers all family members including adults |
| `WellnessStage` / `Mission` / `Achievement` | None | **Create**: New types for gamification. No current equivalent |
| `HealthScore` / `PillarScore` / `PillarMetric` | None | **Create**: Core data model for the health score system. No current equivalent |
| `CashflowSummary` | None | **Create**: Simple type (received, spent, upcoming, dateRange) |
| `CohortProfile` | None | **Create**: Psychographic profile for peer benchmarking |
| `KidAccount` / `Chore` / `SavingsGoalKid` | `ChildAccount` / `ChildAccountDetail` | **Extend**: Current child model is view-only. Prototype adds chores, allowances, kid-specific goals |
| `Dependent` (teen/kid/senior) | None | **Create**: Unified dependent type covering teens, kids, and seniors under care |

### 5.2 New Data Files to Create

| File | Contents | Source |
|------|----------|--------|
| `healthScoreData.ts` | Score calculators, pillar metrics, improvement actions, history generator | Port from prototype with EUR adaptation |
| `coachData.ts` | Conversation starters, nudges, greetings, response mappings | Port from prototype, adapt persona references |
| `personas.ts` | 5 persona definitions with feature flags | Port directly |
| `constants.ts` | Pillar weights, health tiers, NWG colors, budget thresholds | Port directly |
| `gamificationData.ts` | Wellness stages, missions, achievements | Extract from prototype's `pfmData.ts` |
| `householdData.ts` | Household members, dependents, cohort data | Extract from prototype's `pfmData.ts` |

### 5.3 Current App Types That Stay Unchanged

These types are stable and should not be modified: `Account`, `CreditCard`, `Contact`, `SettingsMenuItemData`, `QuickAction`, `CardPoints`, `Notification`, `NotificationGroup`, `Permission`, `Portfolio`, `AllocationSegment`, `GeographyAllocation`, `InvestActivity`, `NewsArticle`, `PortfolioValuePoint`, `SharingContact`, `SharedMember`, `SharingPermissionConfig`.

---

## 6. Risk Assessment

### Risk 1: Scope Creep from 5 Personas

**Severity:** High
**Probability:** High
**Description:** The prototype renders completely different UIs per persona (teen gets chore boards, senior gets large text, family gets household breakdown). Shipping 5 persona variants multiplies testing and QA surface area by 5x.
**Mitigation:** Launch Phase 1-2 with a single "default" persona (Professional/Young Adult hybrid). Add persona switching in Phase 3 behind a feature flag. Use the prototype's feature flag pattern (`persona.features.showHousehold`, etc.) to conditionally render sections rather than building 5 separate page variants.

### Risk 2: NWG Taxonomy Accuracy

**Severity:** High
**Probability:** Medium
**Description:** Every transaction must be classified as Need, Want, or Growth. The prototype uses hardcoded `nwgType` values. In production, classification must be automated (ML model or rules engine) and users must be able to override.
**Mitigation:** Phase 1 ships with a rules-based classifier (merchant category code mapping). Add manual override UI. Defer ML classifier to Phase 3. Accept 80% accuracy initially -- user corrections feed training data.

### Risk 3: Health Score Gaming / Misleading Signals

**Severity:** Medium
**Probability:** Medium
**Description:** The 5-pillar formula (Spending 25%, Savings 25%, Debt 20%, Buffer 20%, Goals 10%) could produce misleading scores. E.g., a user with no debt gets 100 on the debt pillar regardless of income. Users may game the score by creating trivial goals.
**Mitigation:** Add minimum thresholds (e.g., buffer score requires explicit emergency pocket, not just pocket surplus). Weight goals by amount, not count. Add qualitative labels alongside the number (Excellent/Good/Building/Needs Attention). Ship with disclaimer: "This score is a guide, not financial advice."

### Risk 4: Design System Divergence

**Severity:** Medium
**Probability:** High
**Description:** The prototype uses Ionic's default component library (IonCard, IonProgressBar, IonChip). The current app uses a custom design system (SectionModule, RaisedButton, CoachMomentCard, CategoryBadge, DottedLeaderRow). Porting screens verbatim would create visual inconsistency.
**Mitigation:** All prototype screens must be re-skinned using the current app's component library during porting. Create a mapping table: IonCard -> SectionModule or card-bordered div, IonProgressBar -> ProgressBar, IonChip -> CategoryBadge, etc. No Ionic-specific components in the PFM layer.

### Risk 5: Coach Expectations vs Reality

**Severity:** Medium
**Probability:** High
**Description:** The prototype's Coach uses `getCoachResponse()` with hardcoded replies. Users will expect GPT-level intelligence. If the coach feels scripted, it will damage trust.
**Mitigation:** Frame the coach as "guided insights" not "AI assistant" in V1. Use the 60 conversation starters as a curated menu (not free text). Show stat cards and quick replies to keep interactions structured. Reserve free-text chat for when LLM integration is ready (Phase 4+).

---

## 7. Success Metrics

### Phase 1: Foundation

| KPI | Target | Measurement |
|-----|--------|-------------|
| Health Score views / DAU | >40% of DAU view their score within 30 days | Analytics event on score card render |
| Coach open rate | >15% of DAU open coach sheet at least once/week | Analytics event on coach sheet open |
| NWG awareness | >60% of users can identify their top "Want" category after 2 weeks | In-app survey |
| Budget drill-down engagement | >25% of users who view budgets tap into a category | Funnel analytics |
| Session duration | +20% increase in average session length | App analytics |

### Phase 2: Depth

| KPI | Target | Measurement |
|-----|--------|-------------|
| Goal creation rate | >30% of active users create at least one goal within 60 days | Goal create event |
| Auto-transfer adoption | >50% of goals have auto-transfer enabled | Goal state audit |
| Score improvement | Average score increases by 5+ points over 90 days | Score history delta |
| Improvement action tap-through | >20% of displayed actions are tapped | Action tap events |
| Pocket creation | >20% of users create a spending pocket | Pocket create event |

### Phase 3: Differentiation

| KPI | Target | Measurement |
|-----|--------|-------------|
| Peer benchmark setup rate | >25% of eligible users complete cohort profile | Profile completion event |
| Gamification engagement | >40% of young adult users complete at least 1 mission | Mission completion event |
| Household feature adoption | >50% of family persona users view household breakdown | Household card render |
| NPS delta | +10 NPS points vs pre-overhaul baseline | Quarterly NPS survey |
| Feature flag diversity | >3 persona types represented in active user base | Persona selection analytics |

### Phase 4: Polish

| KPI | Target | Measurement |
|-----|--------|-------------|
| Accessibility score | WCAG 2.1 AA compliance | Automated + manual audit |
| Senior persona adoption | >15% of 55+ users switch to simplified mode | Persona analytics |
| Teen activation | >20% of families with teen accounts see teen using the app | Teen session analytics |
| Cashback revenue | >0.5% of total transaction volume attributed to card-linked offers | Revenue attribution |
| Churn reduction | 15% reduction in 90-day churn vs control group | Cohort analysis |

---

## 8. Implementation Recommendations

### 8.1 Port vs Rebuild Decision Matrix

| Component | Decision | Rationale |
|-----------|----------|-----------|
| `healthScoreData.ts` (calculation engine) | **Port directly** | Pure functions, no UI dependency. 700 lines of well-tested calculation logic. Change GBP references to EUR. |
| `coachData.ts` (60 starters, nudges, responses) | **Port directly** | Data file with no UI dependency. Adapt persona names and currency. |
| `personas.ts` (feature flags) | **Port directly** | Clean interface definitions. 120 lines. |
| `constants.ts` (weights, tiers, colors) | **Port directly** | Small config file. Map color variables to current design tokens. |
| `CoachSheet.tsx` (bottom sheet UI) | **Rebuild** | Current app uses custom components (SectionModule, CoachMomentCard). The interaction model (IonModal breakpoints, chat bubbles) can be reused but must be reskinned. |
| `Home.tsx` / `Spend.tsx` / `Plan.tsx` / `More.tsx` | **Do not port** | These are prototype page shells with Ionic default styling. Instead, inject prototype features into existing `OverviewTab.tsx`, `MonthlyGoalsTab.tsx`, and `MyPathTab.tsx`. |
| `HealthScoreRing` / `CashflowBar` / `NwgBar` | **Rebuild** | Build using current app's chart components (DonutChart adaptation) and design tokens. |
| `BudgetRow` / `TopSpendList` / `PeriodSwitcher` | **Rebuild** | Functional concepts are portable; UI must use current app's `CategoryListItem`, `MonthPicker`, `DottedLeaderRow`. |
| `GoalContext` / `PocketContext` / `HealthScoreContext` | **Port and adapt** | State management patterns are sound. Wire into existing app's data layer. |

### 8.2 Parallel Workstreams

**Stream A: Data Layer (1 engineer, Weeks 1-4)**
- Port type definitions and extend existing types
- Port calculation engines (healthScoreData, coachData)
- Create context providers (HealthScoreContext, GoalContext, PocketContext)
- Wire mock data; define API contract for eventual backend integration

**Stream B: Core PFM UI (2 engineers, Weeks 2-8)**
- Health Score ring component (new)
- Coach bottom sheet (new, using existing design system)
- Budget category detail page (new route)
- Cashflow summary bar (new component)
- NWG bar and filter pills (extend existing CategoryFilterPills)

**Stream C: Goal & Pocket Flows (1 engineer, Weeks 4-10)**
- Goal create/edit/detail pages
- Pocket create/edit/detail pages
- Auto-transfer toggle and configuration
- Integration with existing Pocket UI on Home page

**Stream D: Differentiation Features (2 engineers, Weeks 10-20)**
- Persona system and feature flags
- Gamification (stages, missions, achievements)
- Peer benchmarking and cohort profile
- Household member breakdown

### 8.3 Testing Strategy

- **Unit tests:** Port the prototype's existing test files (`healthScoreData.test.ts`, `coachData.test.ts`, `constants.test.ts`, `personas.test.ts`, `pfmData.test.ts`). Extend with EUR currency tests.
- **Component tests:** Every new component gets a render test and interaction test. Use React Testing Library.
- **Integration tests:** Health Score calculation from real mock data. Coach conversation flow end-to-end. Goal create -> auto-transfer -> pocket update.
- **Visual regression:** Chromatic or Percy for every new page. Compare against current app's baseline.
- **Persona matrix testing:** Each feature must be tested with all 5 personas. Use a test matrix: feature x persona = 5 test scenarios per feature.
- **Accessibility:** axe-core automated scans on every PR. Manual VoiceOver testing for senior persona.

---

## 9. Competitive Positioning

### Feature Comparison Matrix

| Feature | Us (Post-Overhaul) | Revolut | Monzo | N26 | Plaid | Cleo |
|---------|:------------------:|:-------:|:-----:|:---:|:-----:|:----:|
| Financial Health Score | Yes (5-pillar, 0-100) | No | No | No | No | Yes (simple) |
| NWG Transaction Taxonomy | Yes (Need/Want/Growth) | No | Partial (categories) | Basic categories | N/A (data layer) | Yes (roast mode) |
| AI Coach | Yes (60 starters, nudges) | No | No | No | N/A | Yes (chat-first) |
| Peer Benchmarking | Yes (cohort-adjusted) | No | Partial (avg) | No | N/A | No |
| Household Banking | Yes (family breakdown) | No | Shared tabs | Shared spaces | N/A | No |
| Gamification | Yes (stages, XP, missions) | No | No | No | N/A | Partial (streaks) |
| Envelope Budgeting | Yes (auto-funded pockets) | Vaults | Pots | Spaces | N/A | No |
| Goal Auto-Transfer | Yes | No | Yes (simple) | No | N/A | Yes (simple) |
| Senior Mode | Yes (simplified, caregiver) | No | No | No | N/A | No |
| Teen/Kid Mode | Yes (chores, allowances) | Revolut Jr (separate) | No | No | N/A | No |
| Card Optimization | Yes (per-category routing) | No | No | No | N/A | No |
| Subscription Audit | Yes | No | Partial | No | N/A | Yes |

### Where We Leapfrog

1. **vs Revolut:** They have the most polished banking app in Europe but zero PFM depth. No health score, no coaching, no peer benchmarking. We go from "me too" to "me better" on the financial wellness axis.

2. **vs Monzo:** They pioneered budgeting pots and the spending donut. We match their foundation and add health scoring, gamification, and household banking they don't have. Their audience skews young adult -- our persona system addresses all life stages.

3. **vs Cleo:** They own the AI-first PFM space with chat-driven insights. Our coach matches their conversational approach but is embedded inside a full banking app, not a standalone fintech. Users don't need to connect another app.

4. **vs N26:** Minimal PFM. Spaces (their pockets) have no auto-funding, no linked cards, no NWG taxonomy. We leapfrog completely.

5. **vs Plaid:** They power the data layer but have no consumer-facing PFM. Our health score engine, if eventually opened as an API, could compete with their Insights product while we own the end-user experience.

### Our Unique Moat

No competitor combines all five: **Health Score + AI Coach + Persona Adaptation + Household Banking + Gamification** in a single production banking app. Cleo has coaching but no banking. Revolut has banking but no coaching. Monzo has pots but no health score. We assemble the complete picture.

---

## Appendix A: Route Map (Post-Overhaul)

New routes to add to `App.tsx`:

```
/health-dashboard          -- Health Score overview with pillar cards
/pillar/:id                -- Pillar detail (spending, savings, debt, buffer, goals)
/category/:name            -- Budget category detail with trends and transactions
/nwg/:type                 -- NWG breakdown (needs, wants, growth)
/goals/create              -- Goal creation flow
/goals/:id                 -- Goal detail with progress and auto-transfer
/pockets/create            -- Pocket creation flow
/pockets/:id               -- Pocket detail (already exists, extend)
/budgets-detail            -- All budgets overview
/cohort-profile            -- Peer benchmarking profile setup
/dependents                -- Household dependents list
/dependents/:id            -- Dependent detail (teen/kid/senior)
/transaction/:id           -- Transaction detail with NWG tag
/persona-select            -- Persona selection (admin/onboarding)
```

## Appendix B: Current App Component Reuse Map

| Prototype Need | Current App Component | Adaptation |
|---------------|----------------------|------------|
| Budget progress bar | `ProgressBar` | Already supports color and height props |
| Category list | `CategoryListItem` | Add NWG badge via `CategoryBadge` |
| Month navigation | `MonthPicker` | Already supports prev/next |
| Time period filter | `TimePeriodPills` | Reuse directly |
| Coach insight cards | `CoachMomentCard` | Already supports title, body, CTA, close |
| Section containers | `SectionModule` | Already supports title, subtitle, content |
| Dotted leader rows | `DottedLeaderRow` | Reuse for pillar metrics display |
| Donut charts | `DonutChart` | Reuse for NWG pie chart and score visualization |
| Stacked bars | `StackedBarChart` | Reuse for monthly distribution |
| Raised CTA buttons | `RaisedButton` | Reuse directly |
| Success/status banners | `SuccessBanner` | Extend for warning/error variants |
| Segmented bar | `SegmentedBar` | Reuse for NWG split visualization |
| Skeleton loading | `SkeletonLoader` | Already supports chart and list variants |
