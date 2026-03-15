# PFM Overhaul: UX Analysis & Merger Strategy

**Author:** Elena Vasquez, Principal UX Designer
**Date:** 15 March 2026
**Status:** Draft for review

---

## Executive Summary

The current pfm-insights app has a polished design language (custom tokens, floating tab bar, card-on-grey layouts) but a shallow PFM experience limited to three tabs: Overview (net wealth + charts), Monthly Goals (NWG category budgets), and My Path (financial strategy + milestones placeholder). The prototype delivers a deep PFM engine with 24 screens, 5-pillar health scoring, AI coaching, NWG taxonomy, persona adaptation, gamification, envelope budgeting, household banking, and peer benchmarking -- but uses BDS (Backbase Design System) tokens and a different visual language.

The merger strategy is: **prototype depth, pfm-insights skin.** We transplant the prototype's PFM engine, data models, and interaction patterns into the current app's visual system, reusing existing shared components where possible and building new ones only where the prototype introduces novel interaction patterns.

---

## 1. Design Language Reconciliation

### 1.1 Token Mapping

The prototype uses BDS CSS variables (`--bb-color-*`); the current app uses custom PFM tokens (`--pfm-*`). Below is the translation layer needed.

| Prototype Token (BDS) | Current App Token (PFM) | Notes |
|---|---|---|
| `--bb-color-primary-default` | `--pfm-action-primary-bg` (#3A495D) | Primary action surfaces |
| `--bb-color-feedback-success` | `--pfm-status-success` (#0A5A2B) | Health score "excellent" |
| `--bb-color-feedback-warning` | `--pfm-status-warning` (#B25A00) | Health score "building" |
| `--bb-color-feedback-error` | `--pfm-status-error` (#E01700) | Health score "needs-attention" |
| `--bb-color-nwg-needs` | `--pfm-pink-base` (#ED5EA6) | Needs category color |
| `--bb-color-nwg-wants` | `--pfm-turquoise-strong` (#4AB2B2) | Wants category color |
| `--bb-color-nwg-growth` | `--pfm-green-strong` (#0A5A2B) | Growth/Security color |
| `--bb-color-border-subtle` | `--pfm-divider-default` (#E1E8EF) | Dividers and borders |
| `--bb-color-accent-teal` | `--pfm-turquoise-base` (#1ED2D2) | Benchmark accent |
| `--bb-color-insight-pattern` | `--pfm-palette-purple-strong` (#491091) | Pattern insight cards |

**New tokens required:**
- `--pfm-health-excellent-gradient`: linear-gradient(135deg, #0A5A2B, #2E8B57) -- maps to prototype's `['#108360', '#79C716']`
- `--pfm-health-good-gradient`: linear-gradient(135deg, #3A495D, #7189A7)
- `--pfm-health-building-gradient`: linear-gradient(135deg, #B25A00, #E5A832)
- `--pfm-health-attention-gradient`: linear-gradient(135deg, #E01700, #B25A00)
- `--pfm-xp-badge`: #FFD700 (gamification accent)
- `--pfm-coach-accent`: #491091 (purple, reuses palette-purple-strong)

### 1.2 Patterns That Translate Directly

| Pattern | Current App | Action |
|---|---|---|
| Card-based layout | `SectionModule`, `card-bordered`, `card-raised` | Reuse as-is. Prototype's `IonCard` cards map to `SectionModule`. |
| Progress bars | `ProgressBar` component (value/max/color/height) | Reuse. Replace prototype's `IonProgressBar`. |
| Category list items | `CategoryListItem` (icon, label, amount, txCount) | Reuse for budget rows. |
| Category badges | `CategoryBadge` | Reuse for NWG tier labels. |
| Month navigation | `MonthPicker` + `useMonthNavigation` hook | Reuse. Maps to prototype's `PeriodSwitcher`. |
| Time period pills | `TimePeriodPills` | Reuse for score history period selection. |
| Dotted leader rows | `DottedLeaderRow` | Reuse for pillar metric displays. |
| Segmented bar | `SegmentedBar` | Reuse for NWG bar visualization. |
| Bottom sheet | `BottomSheet` (IonModal with breakpoints) | Extend for Coach. |
| Floating tab bar | `FloatingTabBar` | Keep as primary nav. Insights sub-nav handles PFM depth. |

### 1.3 Patterns That Need Adaptation

| Prototype Pattern | Adaptation Strategy |
|---|---|
| `HealthScoreRing` (BDS ProgressRing) | Build new `HealthScoreRing` using SVG ring with PFM gradient tokens. Reuse score/rating/delta logic from prototype data layer. |
| `NwgBar` (tappable segments) | Adapt current `SegmentedBar` to add tap-to-navigate per segment. Add amount labels below. |
| `CoachSheet` (IonModal + chat) | Extend existing `BottomSheet` with chat UI. Add greeting, starters grid, message bubbles, quick replies, input field. |
| `BudgetRow` (progress + threshold colors) | Enhance existing `CategoryListItem` with inline progress bar and threshold coloring. |
| `PillarStrip` (horizontal pillar cards) | New component. Horizontal scroll of mini pillar score cards. Use `card-raised` styling. |
| `SpotlightCard` (top recommendation) | New component. Accent-bordered card with action description and impact badge. Styled as `CoachMomentCard` variant. |
| Budget accordion (Income/Fixed/Recurring/Discretionary) | New interaction. Use existing `SectionModule` with collapsible sections. |
| Wellness journey stages | New component. Vertical timeline with stage cards, progress, missions. |
| Achievements grid | New component. Grid of badge items with earned/locked states. |

### 1.4 Typography Alignment

The current app uses a clear type scale (`typo-title3`, `typo-body-regular`, `typo-callout-semibold`, `typo-footnote`, etc.). The prototype uses Ionic defaults. All prototype text must be mapped to the existing type scale:

- Prototype section headers -> `typo-title3` (20px/600)
- Prototype card titles -> `typo-callout-semibold` (15px/600)
- Prototype body text -> `typo-body-regular` (16px/400)
- Prototype captions -> `typo-footnote` (13px/400)
- Health score large number -> New class `typo-hero-number` (48px/700)

---

## 2. Information Architecture

### 2.1 Current IA

```
Home
Insights
  |-- Overview (net wealth, distributions, heatmap, trajectory, income donut)
  |-- Monthly Goals (NWG budgets, category lists, spend donut)
  |-- My Path (financial strategy, milestones placeholder)
Invest
Explore
```

### 2.2 Proposed Merged IA

The Insights tab becomes the PFM hub. The current 3 sub-tabs expand to 4, absorbing the prototype's depth while keeping the existing app's navigation model intact. Critically, the FloatingTabBar stays as-is (Home, Insights, Invest, Explore) -- all PFM depth lives within the Insights section.

```
Home (unchanged -- existing home page)
Insights
  |-- Overview (ENHANCED)
  |   |-- Health Score hero ring (NEW -- from prototype)
  |   |-- Pillar strip (NEW -- tappable horizontal scroll)
  |   |-- Spotlight recommendation card (NEW)
  |   |-- Net wealth summary (EXISTING -- kept)
  |   |-- NWG bar (ENHANCED -- tappable segments)
  |   |-- Cashflow bar (NEW -- from prototype)
  |   |-- Coach insight card + secondary nudges (NEW)
  |
  |-- Spend (REPLACES Monthly Goals)
  |   |-- Month picker (EXISTING)
  |   |-- Monthly snapshot (NWG budget bars) (EXISTING -- enhanced)
  |   |-- Budget accordion (Income / Fixed / Recurring / Discretionary) (NEW)
  |   |-- Category list with drill-down (EXISTING -- enhanced)
  |   |-- Peer benchmark card (NEW -- gated by feature flag)
  |   |-- Spending heatmap (EXISTING -- moved from old Overview)
  |   |-- Monthly trend bars (NEW)
  |
  |-- Plan (REPLACES My Path)
  |   |-- Wellness journey stages (NEW -- gamification)
  |   |-- Active missions with XP (NEW)
  |   |-- Savings goals with CRUD + auto-save toggles (NEW)
  |   |-- Financial strategy (EXISTING -- enhanced with recovery timeline)
  |   |-- Milestones (EXISTING -- now functional)
  |   |-- Achievements grid (NEW)
  |
  |-- Wealth (NEW TAB)
  |   |-- Wealth trajectory chart (MOVED from old Overview)
  |   |-- Annual income breakdown donut (MOVED from old Overview)
  |   |-- Savings rate widget (NEW)
  |   |-- Debt & buffer widget (NEW)
  |   |-- Score history chart (NEW)

Sub-pages (pushed onto nav stack from Insights):
  /insights/health-dashboard     -- Full health dashboard (from prototype)
  /insights/health-score/:pillar -- Pillar detail with metrics + actions
  /insights/category/:name       -- Category drill-down (transactions, trends, cohort avg)
  /insights/nwg/:type            -- NWG type breakdown (needs/wants/growth)
  /insights/goals/:id            -- Goal detail with edit/delete
  /insights/goals/create         -- Goal creation flow
  /insights/budgets-detail       -- Full budget management
  /insights/coach                -- Full-screen coach (alternate entry point)
```

### 2.3 Route Structure

| Route | Component | Source |
|---|---|---|
| `/insights` | `InsightsPage` (shell) | Existing, modified |
| `/insights/health-dashboard` | `HealthDashboardPage` | New (from prototype) |
| `/insights/health-score/:pillarId` | `PillarDetailPage` | New (from prototype) |
| `/insights/category/:name` | `CategoryDetailPage` | New (from prototype) |
| `/insights/nwg/:type` | `NwgDetailPage` | New (from prototype) |
| `/insights/goals/:id` | `GoalDetailPage` | New (from prototype) |
| `/insights/goals/create` | `GoalCreatePage` | New (from prototype) |
| `/insights/budgets-detail` | `BudgetsDetailPage` | New (from prototype) |

### 2.4 Sub-Nav Tab Change

The `SubNavTabs` component currently supports 3 tabs: `overview | goals | path`. It needs to be updated to support 4 tabs: `overview | spend | plan | wealth`.

| Old Tab | New Tab | Rationale |
|---|---|---|
| Overview | Overview | Same name, expanded content |
| Monthly Goals | Spend | "Spend" is more action-oriented and matches prototype naming |
| My Path | Plan | "Plan" is broader, encompasses goals + journey + strategy |
| (none) | Wealth | New tab for long-term financial picture |

---

## 3. Screen-by-Screen UX Specification

### 3.1 Overview Tab (Enhanced)

**Purpose:** Give users an at-a-glance financial health picture with a clear single action to take.

**User goal:** "How am I doing financially, and what should I do next?"

**Content blocks (priority order):**

1. **Health Score Ring** -- Circular progress ring showing composite score (0-100) with rating label ("Excellent", "Good", "Building", "Needs Attention") and month-over-month delta. Tapping navigates to `/insights/health-dashboard`.
   - *From prototype:* `HealthScoreRing` + `healthScoreData.ts` scoring engine
   - *Styled with:* PFM health gradient tokens, `typo-hero-number` for score

2. **Pillar Strip** -- Horizontal scrollable row of 5 mini-cards (Spending, Savings, Debt, Buffer, Goals). Each shows pillar score, trend arrow, and rating color. Tapping any card navigates to `/insights/health-score/:pillarId`.
   - *From prototype:* `PillarStrip` component + pillar score calculators
   - *Styled with:* `card-raised` pattern, compact layout

3. **Spotlight Recommendation** -- Single most impactful action card. Shows title, description, estimated score impact (+N pts). Tapping routes to the relevant action page.
   - *From prototype:* `SpotlightCard` + `getTopRecommendation()`
   - *Styled as:* Variant of existing `CoachMomentCard` with action accent

4. **Net Wealth Summary** -- Hero amount with expand/collapse detail (total assets, total debt). Existing component, moved down from position 1 to position 4.
   - *Carried over from:* Current `OverviewTab` net wealth section

5. **NWG Bar** -- "Where your money goes" segmented bar with Needs/Wants/Growth breakdown. Each segment is tappable, navigating to `/insights/nwg/:type`.
   - *From prototype:* `NwgBar` interaction pattern
   - *Styled with:* Enhanced `SegmentedBar` + tap targets + amount labels

6. **Cashflow Bar** -- Received / Spent / Upcoming summary with stacked bar.
   - *From prototype:* `CashflowBar` component
   - *New build* using PFM tokens

7. **Coach Insight Card** -- Featured AI nudge with accent stripe, body text, and "Explore" CTA. Below it, a horizontal scroll of 2 secondary mini-nudges. Tapping opens CoachSheet.
   - *From prototype:* Coach nudge card pattern from `Home.tsx`
   - *Styled as:* `CoachMomentCard` with enhanced accent stripe

**Interactions:**
- Pull-to-refresh updates all scores
- Health ring tap -> push `/insights/health-dashboard`
- Pillar card tap -> push `/insights/health-score/:id`
- NWG segment tap -> push `/insights/nwg/:type`
- Coach card tap -> open CoachSheet bottom sheet
- Net wealth expand/collapse is inline toggle (existing pattern)

### 3.2 Spend Tab (Replaces Monthly Goals)

**Purpose:** Detailed monthly spending view with budget tracking and category drill-down.

**User goal:** "Am I on budget this month, and where is my money going?"

**Content blocks (priority order):**

1. **Month Picker** -- Existing `MonthPicker` component at top.

2. **Monthly Snapshot** -- Three NWG budget bars (Needs/Wants/Security) with spent vs budget, percentage of income. On-track banner when all within limits.
   - *Carried over from:* Current `MonthlyGoalsTab` snapshot section
   - *Enhanced with:* Threshold coloring from prototype (`BUDGET_THRESHOLD_WARNING` at 70%, `BUDGET_THRESHOLD_DANGER` at 85%)

3. **View Toggle** -- "By date" / "Budget view" toggle pills.
   - *From prototype:* `Spend.tsx` view toggle
   - *Styled with:* Existing `TabPills` component

4. **Budget Accordion** (Budget view) -- Collapsible sections: Income, Fixed costs, Recurring, Discretionary. Each item shows icon + name + amount. Tapping an item navigates to `/insights/category/:name`.
   - *From prototype:* Budget accordion in `Spend.tsx`
   - *New build* using `SectionModule` with collapsible behavior

5. **Category Lists** (By date view) -- NWG-grouped category lists with `CategoryListItem` components. Each category is tappable for drill-down.
   - *Carried over from:* Current `MonthlyGoalsTab` needs/wants/security sections
   - *Enhanced with:* Inline progress bars, threshold colors, edit category buttons

6. **Spending Heatmap** -- Calendar heatmap showing daily spending intensity.
   - *Moved from:* Current `OverviewTab` spending health section
   - *No changes needed*

7. **Monthly Trend** -- Simple bar chart showing 6-month spending trend.
   - *From prototype:* Monthly trend bars in `Spend.tsx`
   - *Styled with:* PFM chart colors

8. **Peer Benchmark Card** -- Comparison to similar households. Shows cohort average spend and percentage difference. If no profile set up, shows setup CTA linking to cohort profile flow.
   - *From prototype:* Benchmark card in `Spend.tsx` + `getCategoryCohortAverage()` + `CohortContext`
   - *Feature-flagged:* Only shown when `showPeerBenchmarks` is true (young-adult, professional personas)

9. **Spend Categories Donut** -- Carried over from current tab.

**Interactions:**
- Month picker prev/next navigates months (bounded by available data)
- View toggle switches between accordion and list views
- Category tap -> push `/insights/category/:name`
- "Edit categories" button opens budget editor (toast placeholder initially)
- Coach moment cards appear contextually when over-budget

### 3.3 Plan Tab (Replaces My Path)

**Purpose:** Long-term financial planning, goal management, and gamified progression.

**User goal:** "What am I working toward, and how do I level up?"

**Content blocks (priority order):**

1. **Wellness Journey Map** -- Vertical timeline of 4 stages (Awareness, Control, Fitness, Growth). Active stage shows progress bar and top 2 mission previews. Completed stages show checkmark. Locked stages show lock icon.
   - *From prototype:* Journey stages in `Plan.tsx` + `wellnessStages` + `missions` data
   - *New build* using PFM card styles and existing `ProgressBar`

2. **Active Missions** -- Cards for current-stage missions showing name, progress bar, and XP badge. Tapping opens either a relevant page or the Coach.
   - *From prototype:* Mission cards in `Plan.tsx`
   - *New build* with `card-bordered` styling

3. **Savings Goals** -- Goal cards with progress bars, amount saved/target, target date, auto-save toggle. Plus "Add new goal" CTA.
   - *From prototype:* Goal cards in `Plan.tsx` + `GoalContext` + goal CRUD pages
   - *New build* (partially maps to existing patterns but adds auto-save toggles)

4. **Financial Strategy** -- Carried over from current `MyPathTab`. Piggy bank illustration, strategy name, NWG allocation bar, "Tune my rhythm" CTA.
   - *Carried over from:* Current `MyPathTab` financial strategy section
   - *Enhanced with:* Recovery timeline from prototype (emotional scaffolding for savings behavior change)

5. **Milestones** -- Now functional (currently just a placeholder). Shows milestone list with progress.
   - *Carried over from:* Current `MyPathTab` milestones section
   - *Enhanced with:* Actual milestone data and edit/add functionality

6. **Achievements Grid** -- Grid of badge items with earned/locked states and progress bars.
   - *From prototype:* Achievements in `Plan.tsx` and `More.tsx`
   - *Feature-flagged:* Only shown when `showGamification` is true

**Interactions:**
- Journey stage progress updates as missions are completed
- Mission tap -> routes to relevant page or opens Coach
- Goal tap -> push `/insights/goals/:id`
- "Add new goal" -> push `/insights/goals/create`
- Auto-save toggle triggers confirmation toast
- "Tune my rhythm" -> strategy editor (future)

### 3.4 Wealth Tab (New)

**Purpose:** Long-term financial picture -- wealth trajectory, savings rate, debt health.

**User goal:** "Am I building wealth over time?"

**Content blocks (priority order):**

1. **Wealth Trajectory Chart** -- Projected vs recommended wealth growth over time.
   - *Moved from:* Current `OverviewTab` wealth trajectory section
   - *No changes needed*

2. **Savings Rate Widget** -- Current savings rate percentage, target rate (20%), monthly saved amount. Mini progress ring.
   - *From prototype:* `getSavingsSummary()` in `healthScoreData.ts`
   - *Styled as:* `card-bordered` with `ProgressBar`

3. **Debt & Buffer Widget** -- Two-section card. Top: total debt, credit utilization percentage. Bottom: buffer months covered vs 6-month target.
   - *From prototype:* `DebtBufferWidget` + `getDebtSummary()`
   - *New build* using PFM tokens

4. **Annual Income Breakdown** -- Donut chart of income sources.
   - *Moved from:* Current `OverviewTab` annual income section
   - *No changes needed*

5. **Score History Chart** -- 6-month line chart of overall health score with area fill.
   - *From prototype:* `ScoreHistoryChart` + `generateMonthlyHistory()`
   - *New build* using existing chart pattern (dark line, subtle fill from Figma fidelity patterns)

6. **Coach CTA** -- "Ask Coach about my wealth" button. Opens CoachSheet.

### 3.5 Health Dashboard (Sub-page)

**Purpose:** Deep-dive into the 4-pillar health scoring system.

**User goal:** "What specifically affects my financial health score, and how can I improve it?"

**Content blocks (priority order):**

1. **Hero Score Ring** -- Large (160px) health score ring with delta badge.
2. **Pillar Strip** -- Same component as Overview, but tapping navigates to pillar detail.
3. **Spotlight Card** -- Top recommendation.
4. **Spending Snapshot** -- Mini spending pillar card with score and rating.
5. **Savings & Goals Widget** -- Savings rate + top 2 goals.
6. **Debt & Buffer Widget** -- Debt utilization + buffer months.
7. **Score History Chart** -- 6-month trend with monthly labels.
8. **Coach CTA** -- "Ask Coach about my score."
9. **Family Scoreboard** (household persona only) -- Member avatars with individual scores and deltas.

*Entirely from prototype:* `HealthDashboard.tsx`. Reskinned to PFM visual language.

### 3.6 Pillar Detail (Sub-page)

**Purpose:** Deep-dive into a single pillar (Spending, Savings, Debt, Buffer, Goals).

**Content blocks:**
1. Pillar score ring with delta
2. Metrics list (3 key metrics with on-track/behind/ahead status)
3. Improvement actions (ordered by impact, with estimated point gain)
4. History chart filtered to this pillar
5. Coach CTA for pillar-specific advice

*From prototype:* `PillarDetail.tsx` + `ScoreDetail.tsx`. Data from `generatePillarMetrics()` and `generateImprovementActions()`.

### 3.7 Category Detail (Sub-page)

**Purpose:** Transaction-level view of a spending category.

**Content blocks:**
1. Category header with icon, name, spent/limit
2. Monthly trend mini-chart (6 months)
3. Weekly breakdown bars (4 weeks)
4. Transaction list for this category
5. Personal average vs cohort average comparison (if peer benchmarks enabled)
6. Household member split (if household persona)

*From prototype:* `CategoryDetail.tsx`. Data from `getCategoryMonthlyBreakdown()`, `getCategoryWeeklyBreakdown()`, `getCategoryCohortAverage()`, `getCategorySpendingByMember()`.

### 3.8 Goal Detail + Goal Create (Sub-pages)

**Purpose:** View/edit a savings goal; create a new one.

**Content blocks (detail):**
1. Goal name and icon
2. Progress ring or bar (current/target)
3. Target date
4. Auto-transfer toggle with amount
5. Transaction history for this goal
6. Edit/delete actions

**Content blocks (create):**
1. Goal name input
2. Target amount input
3. Target date picker
4. Auto-transfer setup
5. Save button

*From prototype:* `GoalDetail.tsx` + `GoalCreate.tsx` + `GoalContext`.

---

## 4. Persona Adaptation Strategy

### 4.1 Persona Model

The prototype defines 5 personas with feature flags. In the merged app, personas should modify the Insights section content without changing the app shell (FloatingTabBar, Home, Invest, Explore remain universal).

| Persona | ID | Key Insight Adaptations |
|---|---|---|
| Young Adult | `young-adult` | Full gamification (journey, missions, XP, achievements). Peer benchmarks. NWG coaching focused on habit building. Coach tone is casual/encouraging. |
| Family | `family` | Household view on spending (member breakdown). Shared goals with contributor splits. Dependents management. Kids' savings section. No gamification. |
| Professional | `professional` | Investment gateway in Wealth tab. Card optimization suggestions. Subscription audit. Dormant cash alerts. Peer benchmarks. Gamification (missions, no journey stages). |
| Senior | `senior` | Simplified view. Fewer metrics, larger text, bigger touch targets. Bills-focused spend view. Help-oriented Plan tab (call bank, find branch, FAQs). Caregiver access management. |
| Teen | `teen` | Kid-friendly language. Weekly (not monthly) budget view. Chore board in Plan. Savings goals with fun icons. Simplified health score. No debt/buffer pillars. |

### 4.2 What Is Persona-Gated vs Universal

**Universal (all personas see):**
- Health Score ring on Overview (adapts size/complexity but always present)
- NWG bar (universal financial literacy tool)
- Savings goals (universal -- everyone has goals)
- Coach (universal -- tone adapts per persona)
- Monthly snapshot (universal -- NWG budget tracking)
- Wealth trajectory (universal)
- Category drill-down (universal)

**Persona-gated features:**

| Feature | Gating Flag | Shown For |
|---|---|---|
| Gamification (journey, missions, XP, achievements) | `showGamification` | young-adult, professional, teen |
| Household member spending breakdown | `showHousehold` | family |
| Peer benchmarks | `showPeerBenchmarks` | young-adult, professional |
| Simplified UI (larger text, fewer metrics) | `showSimplified` | senior |
| Kid mode (chores, weekly budgets, allowance) | `showKidMode` | teen |
| Investment gateway | `showInvestments` | family, professional, senior |
| Shopping intelligence (offers, cashback) | `showShoppingIntel` | young-adult, family, professional |

### 4.3 Sub-Nav Tab Labels Per Persona

The prototype adapts tab labels per persona. In the merged app, only the Insights sub-nav labels should adapt:

| Persona | Tab 1 | Tab 2 | Tab 3 | Tab 4 |
|---|---|---|---|---|
| Young Adult | Overview | Spend | Save | Wealth |
| Family | Overview | Family | Budget | Wealth |
| Professional | Overview | Spend | Goals | Wealth |
| Senior | Overview | Bills | Help | (hidden) |
| Teen | Overview | My Money | Goals | (hidden) |

### 4.4 Implementation Approach

Introduce a `PersonaContext` provider at the app root (from prototype). Each Insights sub-tab reads the persona to conditionally render gated sections. This is purely additive -- existing non-PFM pages remain unaffected.

```
// Pseudocode for persona-aware tab content
const SpendTab = () => {
  const { persona } = usePersona();
  return (
    <>
      <MonthPicker />
      <MonthlySnapshot />
      {persona.features.showHousehold && <HouseholdMemberBreakdown />}
      {!persona.features.showSimplified && <BudgetAccordion />}
      <CategoryList />
      {persona.features.showPeerBenchmarks && <PeerBenchmarkCard />}
      {persona.features.showSimplified && <SimplifiedBillsList />}
    </>
  );
};
```

---

## 5. Component Mapping

### 5.1 Direct Reuse (Existing pfm-insights components)

| Existing Component | Used For |
|---|---|
| `SectionModule` | All section containers in all tabs |
| `ProgressBar` | Budget bars, goal progress, mission progress, pillar progress |
| `CategoryListItem` | Budget category rows in Spend tab |
| `CategoryBadge` | NWG tier labels ("Needs", "Wants", "Growth") |
| `CategoryFilterPills` | NWG type filter on Overview |
| `MonthPicker` + `useMonthNavigation` | Month navigation in Spend tab |
| `TimePeriodPills` | Time period selection on charts |
| `DottedLeaderRow` | Pillar metric displays, chart legends |
| `SegmentedBar` | Financial strategy bar, NWG allocation bar |
| `BottomSheet` | Base for CoachSheet extension |
| `CoachMomentCard` | Coach nudge cards, spotlight recommendations |
| `RaisedButton` | Secondary CTAs throughout |
| `SuccessBanner` | On-track spending confirmation |
| `AnimatedNumber` | Net wealth display, score animations |
| `SkeletonLoader` | Loading states for new sections |
| `DonutChart` | Income breakdown, spend categories |
| `WealthTrajectoryChart` | Wealth tab trajectory |
| `SpendingHeatmap` | Spend tab heatmap |
| `StackedBarChart` | Monthly distribution (enhanced for trend) |
| `AppHeader` | Page header for Insights and sub-pages |
| `SubNavTabs` | Modified to support 4 tabs |
| `FloatingTabBar` | Unchanged |
| `SearchBar` | Transaction search in category detail |
| `TabPills` | View toggle (By date / Budget view) |

### 5.2 New Components to Build

| Component | Description | Prototype Source |
|---|---|---|
| `HealthScoreRing` | SVG ring with score, rating label, delta. Uses PFM gradient tokens. | `HealthScoreRing.tsx` + `ProgressRing.tsx` |
| `PillarStrip` | Horizontal scrollable row of 5 pillar mini-cards. | `PillarStrip.tsx` |
| `SpotlightCard` | Action recommendation card with impact badge. | `SpotlightCard.tsx` |
| `CashflowBar` | Received/Spent/Upcoming stacked bar with labels. | `CashflowBar.tsx` |
| `NwgBarEnhanced` | Tappable segmented bar with amount labels and navigation. | `NwgBar.tsx` (enhanced) |
| `BudgetAccordion` | Collapsible tier sections (Income/Fixed/Recurring/Discretionary). | `Spend.tsx` accordion section |
| `BudgetRow` | Budget item with icon, name, progress bar, threshold coloring. | `BudgetRow.tsx` |
| `JourneyMap` | Vertical timeline with stage cards, progress, mission previews. | `Plan.tsx` journey section |
| `MissionCard` | Mission name, progress bar, XP badge. | `Plan.tsx` mission section |
| `AchievementGrid` | Grid of badge items with earned/locked states. | `Plan.tsx` + `More.tsx` achievements |
| `GoalCard` | Goal with progress, amount, target date, auto-save toggle. | `Plan.tsx` goal cards |
| `SavingsRateWidget` | Savings rate percentage with mini progress ring. | `healthScoreData.ts` summary |
| `DebtBufferWidget` | Two-section card: debt utilization + buffer months. | `DebtBufferWidget.tsx` |
| `ScoreHistoryChart` | 6-month line chart with area fill for score trend. | `ScoreHistoryChart.tsx` |
| `PeerBenchmarkCard` | Cohort comparison card with setup CTA variant. | `Spend.tsx` benchmark section |
| `CoachSheet` | Extended BottomSheet with greeting, starters, chat, input. | `CoachSheet.tsx` |
| `SpendingSnapshot` | Mini spending pillar card for health dashboard. | `SpendingSnapshot.tsx` |
| `SavingsGoalsWidget` | Savings score + top goals for health dashboard. | `SavingsGoalsWidget.tsx` |
| `RecoveryTimeline` | Horizontal node timeline for savings behavior scaffolding. | `Plan.tsx` recovery section |

### 5.3 Components That Get Merged

| Action | Details |
|---|---|
| Extend `SubNavTabs` | Add 4th tab support. Add persona-aware label mapping. |
| Extend `BottomSheet` -> `CoachSheet` | Add chat state, greeting, starters grid, message bubbles, quick reply buttons, text input with send. Keep existing breakpoints [0, 0.5, 0.85] but add 0.95 for full-screen chat. |
| Extend `CoachMomentCard` -> `SpotlightCard` variant | Add impact badge (+N pts), accent color from pillar rating, onTap navigation. |
| Enhance `SegmentedBar` -> `NwgBarEnhanced` | Make segments tappable. Add label row with amounts. Add navigation on tap. |

---

## 6. Coach Integration

### 6.1 Entry Points

The AI Coach is accessible from multiple surfaces:

| Entry Point | Location | Behavior |
|---|---|---|
| Header icon | `AppHeader` actions array | Opens CoachSheet at 0.65 breakpoint with greeting + starters for current tab |
| Coach insight card | Overview tab | Opens CoachSheet pre-seeded with the tapped nudge's conversation |
| Mini nudge cards | Overview tab secondary carousel | Opens CoachSheet pre-seeded with that nudge |
| Spotlight card | Overview tab | Some spotlight actions route to Coach (e.g., "Ask Coach about buffer plan") |
| Mission card tap | Plan tab | Opens CoachSheet with mission-relevant conversation |
| "Ask Coach about my score" | Health Dashboard | Opens CoachSheet with health-score intent |
| Coach CTA | Wealth tab | Opens CoachSheet with wealth-focused intent |

### 6.2 CoachSheet Behavior

The CoachSheet is a global singleton managed at the `InsightsPage` shell level. It receives:
- `isOpen: boolean`
- `currentTab: CoachTab` -- determines which conversation starters to show
- `initialNudgeId?: string` -- pre-seeds from a nudge tap
- `initialIntentTag?: string` -- auto-triggers a conversation from a starter chip

**States:**
1. **Home state** (default) -- Greeting, proactive nudge card, conversation starter grid
2. **Chat state** -- Message bubbles (user + coach), quick reply buttons, free-text input

**Breakpoints:** [0, 0.25, 0.65, 0.95]
- 0.25: Collapsed peek showing just the greeting
- 0.65: Default open with starters visible
- 0.95: Full chat mode when conversation is active

### 6.3 Persona-Adapted Coach

The coach's greeting, conversation starters, and nudge content are all persona-specific (from `coachData.ts`). The existing `CoachIcon` in the header already exists -- it just needs to trigger the new `CoachSheet` instead of showing a "coming soon" toast.

### 6.4 Coach Data Architecture

Bring over from prototype:
- `coachData.ts` -- Greetings, starters, nudges, responses, all persona-keyed
- `CoachTab` type -- Maps to Insights sub-tabs
- `getCoachGreeting()`, `getStartersForTab()`, `getTopNudge()`, `getCoachResponse()` -- All helper functions

Token replacements needed in coach nudge accent colors:
- `#295EFF` -> `var(--pfm-palette-blue-strong)` (#0047AB)
- `#E5553B` -> `var(--pfm-status-error)` (#E01700)
- `#1BA97F` -> `var(--pfm-status-success)` (#0A5A2B)
- `#F5A623` -> `var(--pfm-status-warning)` (#B25A00)
- `#00BCD4` -> `var(--pfm-turquoise-base)` (#1ED2D2)

---

## 7. Critical UX Decisions

### Decision 1: Keep Floating Tab Bar or Switch to Standard Ionic Tabs?

**Recommendation: Keep FloatingTabBar.**

The current app's floating pill tab bar is a strong brand differentiator. The prototype uses standard Ionic `IonTabBar` which is visually plain. The FloatingTabBar already handles 4 top-level destinations (Home, Insights, Invest, Explore) and hides correctly on sub-pages. All PFM depth lives within the Insights section via `SubNavTabs`, so there is no conflict.

### Decision 2: 3 vs 4 Sub-Tabs in Insights?

**Recommendation: 4 sub-tabs (Overview, Spend, Plan, Wealth).**

Three tabs forces too much onto the Overview, making it a scrolling mega-page. The current Overview already has 4 sections (wealth, distribution, heatmap, trajectory); adding health score, pillar strip, cashflow, and coach nudges would make it overwhelming. Splitting long-term wealth content into its own tab gives each tab a focused purpose. For senior/teen personas, the 4th tab is hidden to keep the UI simple.

### Decision 3: Health Score Prominence -- Hero Position or Card?

**Recommendation: Hero position on Overview tab.**

The health score is the prototype's north-star metric. Placing it as the first thing users see when opening Insights creates a strong "how am I doing?" anchor. It replaces the current net wealth hero (which moves to position 4). The score ring is visually compelling and invites interaction. This is the single biggest differentiation from other banking apps.

### Decision 4: Persona Selection -- Explicit or Inferred?

**Recommendation: Inferred with manual override.**

Do not show a persona picker in the main app. Instead, infer the persona from account data (joint account + dependents = family; age 16-18 = teen; 65+ = senior; single account < 25 = young-adult; else professional). Provide a manual override in Profile settings for edge cases. The prototype's `PersonaSelect` page is useful for demos but should not ship in production.

### Decision 5: Gamification -- All Personas or Young Adults Only?

**Recommendation: Young adults and teens get full gamification. Professionals get missions only (no journey map or XP). Family and senior skip gamification entirely.**

Gamification (XP, badges, streaks) resonates strongly with younger users but can feel patronizing for families managing real financial pressure or seniors who want clarity over engagement mechanics. Missions (discrete tasks like "Review 3 subscriptions") work for professionals as productivity nudges without the game wrapper.

### Decision 6: Peer Benchmarks -- Opt-In or Default?

**Recommendation: Opt-in via cohort profile setup.**

Peer comparison is psychologically powerful but can cause anxiety if users are underperforming. Following the prototype's pattern, show a CTA card ("Set up your profile to compare with similar households") that links to a brief profile questionnaire (household type, income band, children count, spending personality). Only after completing this flow do benchmark cards appear. This respects user agency and avoids GDPR concerns about automatic profiling.

### Decision 7: Coach as Bottom Sheet or Full Page?

**Recommendation: Bottom sheet with 4 breakpoints.**

The bottom sheet model (from the prototype's `CoachSheet`) is superior to a full page because it maintains context. Users can see their financial data behind the coach sheet, swipe down to collapse it, and swipe up for full chat. A full page would disconnect the coach from the data it's discussing. The existing `BottomSheet` component already uses `IonModal` with breakpoints -- the Coach extension adds more breakpoints and chat state.

### Decision 8: NWG Taxonomy -- "Needs/Wants/Growth" or "Needs/Wants/Security"?

**Recommendation: Use "Needs / Wants / Growth" as primary labels, with "Security" as a secondary label for savings/insurance-specific contexts.**

The current app uses "Security" for the third category (green, savings transfers). The prototype uses "Growth" (which includes investments and savings). "Growth" is more aspirational and forward-looking, which aligns better with the health score and wealth trajectory narrative. However, "Security" is more accurate for emergency fund and insurance contexts. Solution: use "Growth" in the NWG bar and overview, but allow "Security" as a display variant in the budget accordion's fixed costs section.

---

## Appendix A: Data Layer Migration

The following data modules need to be brought over from the prototype and adapted to use Euro (not GBP) formatting:

| Module | Key Exports | Adaptation |
|---|---|---|
| `pfmData.ts` | Account, Transaction, Budget, Goal, Pocket, InsightCard, HouseholdMember, WellnessStage, Mission, Achievement types + mock data + helper functions | Change currency from GBP to EUR. Integrate with existing `mockData.ts` where data overlaps. |
| `healthScoreData.ts` | Pillar score calculators, composite score, rating helpers, history generation, dashboard summaries | Bring as-is. Token colors need PFM mapping. |
| `coachData.ts` | Greetings, starters, nudges, responses | Bring as-is. Accent colors need PFM token mapping. |
| `personas.ts` | Persona definitions + feature flags | Bring as-is. Add to app root context. |
| `constants.ts` | Pillar weights, health tiers, NWG colors, budget thresholds | Merge with existing constants. Map BDS color references to PFM tokens. |
| `CohortContext.ts` | Cohort profile for peer benchmarks | Bring as-is. |
| `GoalContext.ts` | Goal state management + CRUD | Bring as-is. |
| `PocketContext.ts` | Pocket/envelope state management | Bring as-is. |
| `HealthScoreContext.ts` | Health score + household score state | Bring as-is. |

## Appendix B: Migration Priority

**Phase 1 -- Foundation (Week 1-2):**
- PersonaContext, HealthScoreContext at app root
- HealthScoreRing component
- Extend SubNavTabs to 4 tabs
- Health score hero + pillar strip on Overview
- CoachSheet (extend BottomSheet)
- Wire Coach icon in header to open CoachSheet

**Phase 2 -- Spend Depth (Week 3-4):**
- Budget accordion
- View toggle (by date / budget)
- Category detail sub-page
- NWG detail sub-page
- Peer benchmark card (feature-flagged)
- Monthly trend bars

**Phase 3 -- Plan Depth (Week 5-6):**
- Goal CRUD (create, detail, edit, delete)
- GoalContext integration
- Wellness journey map + missions (feature-flagged)
- Achievement grid (feature-flagged)
- Recovery timeline

**Phase 4 -- Wealth Tab + Health Dashboard (Week 7-8):**
- Wealth tab with moved charts + new widgets
- Health dashboard sub-page
- Pillar detail sub-pages
- Score history chart
- Savings rate and debt/buffer widgets

**Phase 5 -- Polish + Personas (Week 9-10):**
- Persona inference logic
- Persona-specific tab labels
- Persona-gated section rendering
- Household member breakdown (family)
- Simplified views (senior)
- Teen/kid mode
- Cohort profile setup flow

---

*End of analysis. This document should be reviewed alongside the Figma designs for visual alignment before implementation begins.*
