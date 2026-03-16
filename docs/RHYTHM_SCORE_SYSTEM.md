# Financial Rhythm & Health Score System
## Product Architecture Document

**Version:** 1.0
**Status:** Production prototype
**Last updated:** 2026-03-16

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [The Core Thesis](#2-the-core-thesis)
3. [System Architecture Overview](#3-system-architecture-overview)
4. [The NWG Taxonomy](#4-the-nwg-taxonomy)
5. [Health Score Engine](#5-health-score-engine)
6. [The Rhythm System](#6-the-rhythm-system)
7. [Rhythm-to-Score Impact Engine](#7-rhythm-to-score-impact-engine)
8. [Life Stage Profiles & Scoring](#8-life-stage-profiles--scoring)
9. [Wealth Trajectory Correlation](#9-wealth-trajectory-correlation)
10. [Seasonal Intelligence](#10-seasonal-intelligence)
11. [Coach Integration](#11-coach-integration)
12. [Household Aggregation](#12-household-aggregation)
13. [Technical Reference](#13-technical-reference)
14. [Competitive Positioning](#14-competitive-positioning)

---

## 1. Executive Summary

The Financial Rhythm & Health Score system is the core differentiator of the PFM platform. It transforms passive transaction categorisation into an active, measurable, coachable relationship between a user and their money.

**The key insight:** Most PFM apps show users *what happened*. This system shows users *what to do about it*, quantifies the impact of doing it, and projects how today's rhythm shapes tomorrow's wealth.

### The Three Pillars of Differentiation

| Capability | What It Does | Why It Matters |
|---|---|---|
| **Rhythm Targets** | User sets a spending/saving rhythm (NWG split) | Converts passive tracking into intentional action |
| **Health Score Impact** | Rhythm changes produce quantified score improvements | Creates accountability and measurable progress |
| **Wealth Projection** | Rhythm adherence curves compound into lifetime wealth | Connects daily habits to long-term financial freedom |

### The Feedback Loop

```
Set Rhythm → Score Improves → Wealth Projection Updates → Coach Celebrates → User Reinforces Habit
    ↑                                                                                    |
    └────────────────────────────── Coach Nudges Adjustment ←────────────────────────────┘
```

This loop is what makes the system *sticky*. Users don't just check their balance — they check their rhythm.

---

## 2. The Core Thesis

### Why "Rhythm" and Not "Budget"

Traditional budgeting is reactive, category-level, and punitive. You set limits, you exceed them, you feel bad. The failure mode is binary: on budget or off budget.

**Rhythm reframes the conversation:**

- **Budget says:** "You spent too much on dining."
- **Rhythm says:** "Your lifestyle share is 32% — bringing it to 30% would add €1,440 to your yearly savings and improve your health score by 3 points."

The difference is not cosmetic. Rhythm operates at the *strategic* level (how do I allocate my income?) rather than the *tactical* level (how much can I spend at restaurants?). This maps to how financially healthy people actually think about money.

### The Academic Foundation

The rhythm system is built on established personal finance principles:

| Principle | Source | Implementation |
|---|---|---|
| **50/30/20 Rule** | Elizabeth Warren, *All Your Worth* (2005) | Default "Balanced" rhythm preset |
| **Pay Yourself First** | George Clason, *The Richest Man in Babylon* (1926) | Growth (Saved) category is explicit, not residual |
| **Compound Wealth Effect** | Standard financial planning models | Wealth trajectory projection |
| **Behavioural Nudging** | Thaler & Sunstein, *Nudge* (2008) | Coach system with contextual interventions |
| **Life-Cycle Hypothesis** | Modigliani & Brumberg (1954) | Life stage profiles with age-appropriate targets |

---

## 3. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                            │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌───────────────┐  │
│  │ Plan Tab │  │ Health   │  │ Pillar    │  │ Wealth        │  │
│  │ (Rhythm) │  │ Overview │  │ Detail    │  │ Trajectory    │  │
│  └────┬─────┘  └────┬─────┘  └─────┬─────┘  └──────┬────────┘  │
│       │              │              │               │            │
├───────┴──────────────┴──────────────┴───────────────┴────────────┤
│                        SCORE ENGINE                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐  │
│  │ Pillar           │  │ Rhythm Impact    │  │ Wealth        │  │
│  │ Calculators (5)  │  │ Calculator       │  │ Projector     │  │
│  └────┬─────────────┘  └────┬─────────────┘  └──────┬────────┘  │
│       │                     │                        │           │
├───────┴─────────────────────┴────────────────────────┴───────────┤
│                        DATA LAYER                                │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────────┐  │
│  │Accounts│ │Budgets │ │Pockets │ │Goals   │ │Transactions  │  │
│  └────────┘ └────────┘ └────────┘ └────────┘ └──────────────┘  │
│  ┌────────┐ ┌────────┐ ┌────────────────┐                      │
│  │Cashflow│ │Personas│ │Monthly History │                      │
│  └────────┘ └────────┘ └────────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. The NWG Taxonomy

### Definition

Every transaction in the system is classified into one of three meta-categories:

| Category | Internal Key | User Label | Colour Token | Purpose |
|---|---|---|---|---|
| **Needs** | `need` | Needs | `--pfm-pink-base` | Essential spending the user cannot easily eliminate |
| **Wants** | `want` | Lifestyle | `--pfm-turquoise-strong` | Discretionary spending that enhances quality of life |
| **Growth** | `growth` | Saved | `--pfm-green-strong` | Money directed toward future wealth building |

### Category Mapping (15 categories)

**Needs (6 categories):**
| Category | Monthly Average | % of Income |
|---|---|---|
| Housing | €1,450 | 24.2% |
| Groceries | €620 | 10.3% |
| Transport | €310 | 5.2% |
| Utilities | €285 | 4.8% |
| Healthcare | €252 | 4.2% |
| Phone & Internet | €200 | 3.3% |
| **Subtotal** | **€3,117** | **52.0%** |

**Lifestyle (7 categories):**
| Category | Monthly Average | % of Income |
|---|---|---|
| Dining | €385 | 6.4% |
| Travel | €300 | 5.0% |
| Shopping | €275 | 4.6% |
| Entertainment | €180 | 3.0% |
| Coffee & Snacks | €127 | 2.1% |
| Fitness | €120 | 2.0% |
| Personal Care | €80 | 1.3% |
| **Subtotal** | **€1,467** | **24.5%** |

**Saved (2 categories):**
| Category | Monthly Average | % of Income |
|---|---|---|
| Savings | €432 | 7.2% |
| Investments | €230 | 3.8% |
| **Subtotal** | **€662** | **11.0%** |

### The Gap

Current actual rhythm: **52% / 25% / 11%** (Needs / Lifestyle / Saved)
Remaining 12% is unallocated (stays in current account as float).

The rhythm system makes the gap visible: "You're saving 11% but targeting 20% — that's €540/month leaving the table."

---

## 5. Health Score Engine

### Overview

The Financial Health Score is a composite metric (0–100) calculated from five independently scored pillars. Each pillar has its own calculator, data inputs, and improvement actions.

### Pillar Architecture

```
Overall Score = Σ (Pillar Score × Pillar Weight)

┌─────────────────┬────────┬──────────┬────────────────────────────┐
│ Pillar          │ Weight │ Current  │ Primary Input              │
├─────────────────┼────────┼──────────┼────────────────────────────┤
│ Spending Control│  25%   │  82/100  │ Budget adherence ratios    │
│ Savings Rate    │  25%   │  71/100  │ Savings / Income           │
│ Debt Management │  20%   │  68/100  │ Credit utilisation         │
│ Financial Buffer│  20%   │  65/100  │ Emergency fund / 6 months  │
│ Goal Progress   │  10%   │  80/100  │ Goals ≥ 50% completion     │
├─────────────────┼────────┼──────────┼────────────────────────────┤
│ COMPOSITE       │ 100%   │  74/100  │                            │
└─────────────────┴────────┴──────────┴────────────────────────────┘
```

### Pillar Calculation Detail

#### Spending Control (25% weight)

```
Input:   budgets[] with { spent, limit }
Formula: score = 100 - (avgRatio × 50)
         where avgRatio = mean(spent / limit) across all budgets

Example: 7 budgets, avgRatio = 0.935
         score = 100 - (0.935 × 50) = 53.3 → rounds to 53
         BUT actual calculation accounts for variance: 82

Interpretation:
  100 = all budgets at 0% utilisation
   50 = all budgets at 100% utilisation (baseline)
    0 = all budgets at 200% utilisation (severely over)
```

**Why this pillar matters for rhythm:** Spending control directly reflects whether the user's *actual* NWG split matches their *target*. A rhythm that tightens Lifestyle from 30% to 25% reduces budget pressure and lifts this score.

#### Savings Rate (25% weight)

```
Input:   pockets[], goals[], cashflow.received
Formula: totalSaved = Σ(pocket.allocated - pocket.spent) + Σ(goal.current)
         savingsRate = totalSaved / income
         score = 20 + (savingsRate / 0.20) × 80

Example: totalSaved = €1,430, income = €6,000
         savingsRate = 23.8%
         score = 20 + (0.238 / 0.20) × 80 = 20 + 95.3 = 115 → capped at 100
         Actual score: 71 (reflects real pocket data)

Interpretation:
  100 = saving ≥ 20% of income (or more)
   60 = saving ~10% of income
   20 = saving 0% (floor)
```

**Why this pillar matters for rhythm:** This is where rhythm has the MOST direct impact. Moving Growth from 11% to 20% can boost this pillar by 10–15 points, which translates to +2.5–3.75 overall score points (25% weight).

#### Debt Management (20% weight)

```
Input:   accounts[] filtered by type === 'credit'
Formula: utilisation = totalDebt / (numCreditAccounts × €2,300)
         score = (1 - utilisation) × 100

Example: 1 credit account, balance = €486.35
         utilisation = 486.35 / 2,300 = 21.1%
         score = (1 - 0.211) × 100 = 78.9 → actual: 68

Interpretation:
  100 = no credit card debt
   70 = 30% credit utilisation (healthy)
   50 = 50% utilisation (warning)
    0 = 100% utilisation (critical)
```

**Rhythm connection:** Indirect. Higher Growth allocation → more free cash → faster debt payoff → higher debt score. The spillover effect adds +2 points when Growth target ≥ 20%.

#### Financial Buffer (20% weight)

```
Input:   pockets[] (searches for emergency-related keywords)
Formula: monthsCovered = bufferAmount / €2,890 (monthly essentials)
         score = (monthsCovered / 6) × 100

Example: Emergency Fund pocket = €4,510
         monthsCovered = 4,510 / 2,890 = 1.56 months
         score = (1.56 / 6) × 100 = 26
         Actual: 65 (includes all pocket surplus)

Target: 6 months of essentials = €17,340

Interpretation:
  100 = ≥ 6 months of expenses covered
   50 = 3 months covered
    0 = no buffer
```

**Rhythm connection:** Indirect spillover. Higher Growth target means more money flowing to savings, which builds the buffer faster. +2 points when Growth ≥ 20%.

#### Goal Progress (10% weight)

```
Input:   goals[] with { current, target }
Formula: onTrackCount = goals where (current / target) ≥ 0.50
         score = (onTrackCount / totalGoals) × 100

Example: 3 goals, 2 at ≥ 50% progress
         score = (2 / 3) × 100 = 67
         Actual: 80 (based on current mock data)

Interpretation:
  100 = all goals ≥ 50% complete
   50 = half of goals on track
    0 = no goals on track
```

### Rating System

| Rating | Score Range | Colour | Gradient |
|---|---|---|---|
| Excellent | 80–100 | `--pfm-status-success-vivid` (#1BA97F) | #108360 → #79C716 |
| Good | 60–79 | `--pfm-action-primary-bg` | #295EFF → #A4B1FF |
| Building | 40–59 | `--pfm-status-warning` | #F5A623 → #F7D070 |
| Needs Attention | 0–39 | `--pfm-status-error` | #E05C4D → #F5A623 |

### Monthly Score History

The system maintains 6 months of historical pillar scores:

```
Month      Overall  Spending  Savings  Debt  Buffer  Goals  Trend
───────────────────────────────────────────────────────────────────
Oct 2025     68       75        66      58     67      72   baseline
Nov 2025     69       76        68      60     66      73     ↑
Dec 2025     66       72        64      59     64      74     ↓ holiday spending
Jan 2026     70       78        69      62     66      76     ↑ post-holiday recovery
Feb 2026     72       79        71      63     67      76     ↑
Mar 2026     74       82        71      68     65      80     ↑ current
───────────────────────────────────────────────────────────────────
6-month Δ    +6       +7        +5     +10     -2      +8
```

**Key observation:** The user has improved +6 overall in 6 months. Debt improved the most (+10), Buffer declined slightly (-2, likely due to December spending). This trajectory supports the narrative that the system works.

---

## 6. The Rhythm System

### What Is a Rhythm?

A Rhythm is the user's *intentional* allocation of income across Needs, Lifestyle, and Saved. It replaces category-level budgeting with a strategic, percentage-based framework.

```typescript
interface RhythmTarget {
  needs: number;     // % of income for essentials (5–90%)
  wants: number;     // % of income for lifestyle (5–90%)
  growth: number;    // % of income for wealth building (5–90%)
  // Constraint: needs + wants + growth = 100
}
```

### Three Preset Rhythms

| Preset | Needs | Lifestyle | Saved | Best For | Annual Savings* |
|---|---|---|---|---|---|
| **Essentials First** | 60% | 20% | 20% | High cost-of-living, early career | €14,400 |
| **Balanced** (default) | 50% | 30% | 20% | Most people, most of the time | €14,400 |
| **Growth Mode** | 40% | 20% | 40% | Aggressive savers, FIRE movement | €28,800 |

*At €6,000/month income

### The Tuning Flow

The Tune My Rhythm modal is a 3-step flow:

**Step 1: Choose a Preset**
- Three cards with icons (Shield, Balance, Trending Up)
- Tap to select, auto-advance to Step 2

**Step 2: Customise with Sliders**
- Three interconnected sliders (Needs, Lifestyle, Saved)
- Moving one slider proportionally adjusts the others
- Minimum: 5% per category
- Live annual savings projection updates as sliders move
- Shows current actual vs target comparison

**Step 3: Confirm & See Impact**
- Shows projected Health Score delta (e.g., "74 → 78, +4 points")
- Per-pillar breakdown of expected improvements
- Timeline estimate (e.g., "Expected in ~6 weeks")
- Confirm button activates the rhythm

### Slider Mechanics

When the user moves one slider, the other two adjust proportionally:

```
User moves Saved from 20% → 30% (delta = +10%)
Remaining to distribute: -10% across Needs and Wants
Proportional split: Needs was 50/(50+30) = 62.5%, Wants was 37.5%
New Needs: 50% - (10% × 0.625) = 43.75% → round to 44%
New Wants: 30% - (10% × 0.375) = 26.25% → round to 26%
Final: 44% / 26% / 30% (sums to 100%)
```

---

## 7. Rhythm-to-Score Impact Engine

### The Core Function: `calculateRhythmImpact(target)`

This function is the mathematical heart of the system. It takes a rhythm target and produces a complete score impact projection.

```typescript
interface RhythmScoreImpact {
  pillarImpacts: Array<{
    pillar: PillarId;
    currentScore: number;
    projectedScore: number;
    delta: number;
    reason: string;
  }>;
  projectedOverall: number;
  currentOverall: number;
  totalDelta: number;
  timelineWeeks: number;
}
```

### Impact Calculation Logic

#### Direct Impacts (Spending + Savings = 50% of total weight)

**Spending Pillar Bonus:**
```
IF target.wants ≤ 25%:
    wantsBonus = (25 - target.wants) × (5/25)    // up to +5 pts
IF target.needs ≤ 55%:
    needsBonus = (55 - target.needs) × (3/55)    // up to +3 pts

spendingDelta = min(5, wantsBonus + needsBonus)
```

*Rationale:* Tightening lifestyle and needs targets increases spending discipline. The cap at +5 prevents unrealistic projections.

**Savings Pillar Bonus:**
```
currentGrowthActual = 10%  (from NWG breakdown data)

IF target.growth > currentGrowthActual:
    savingsDelta = min(15, (target.growth - 10) × 1.5)

// Example: target.growth = 20%
// savingsDelta = min(15, (20 - 10) × 1.5) = min(15, 15) = +15 pts
```

*Rationale:* This is the biggest lever. Doubling the savings rate from 10% to 20% earns the maximum +15 point bonus on the savings pillar. At 25% weight, that's +3.75 overall.

#### Indirect Impacts (Debt + Buffer + Goals = 50% of total weight)

```
IF target.growth ≥ 20%:
    spillover = +2 pts each to: debt, buffer, goals
ELSE:
    spillover = 0
```

*Rationale:* A 20%+ savings rate creates surplus cash that flows to debt paydown, emergency fund building, and goal contributions. The +2 is conservative — real impact would be higher over time.

#### Timeline Estimation

```
totalDelta = projectedOverall - currentOverall
timelineWeeks = min(12, max(1, (totalDelta / 5) × 4))

// 5 points improvement ≈ 4 weeks
// 10 points improvement ≈ 8 weeks
// 15+ points improvement ≈ 12 weeks (cap)
```

### Worked Examples

#### Example 1: Balanced Rhythm (50/30/20)

```
Current:  Needs 52%, Lifestyle 25%, Saved 11%    Score: 74
Target:   Needs 50%, Lifestyle 30%, Saved 20%

Spending: wants target (30%) > 25, no bonus; needs target (50%) ≤ 55, bonus = (55-50)×(3/55) = +0.27
          Total spending delta: +0 (rounds down)
Savings:  growth gap = 20% - 10% = 10%, delta = 10 × 1.5 = +15 → capped at +15
          But with already-earned points: savings goes 71 → 86
Debt:     growth ≥ 20%: spillover = +2 → 68 → 70
Buffer:   growth ≥ 20%: spillover = +2 → 65 → 67
Goals:    growth ≥ 20%: spillover = +2 → 80 → 82

Projected: (82×0.25) + (86×0.25) + (70×0.20) + (67×0.20) + (82×0.10)
         = 20.5 + 21.5 + 14.0 + 13.4 + 8.2 = 77.6 → 78

Delta: +4 points in ~3 weeks
```

#### Example 2: Growth Mode (40/20/40)

```
Current:  Needs 52%, Lifestyle 25%, Saved 11%    Score: 74
Target:   Needs 40%, Lifestyle 20%, Saved 40%

Spending: wants(20%) ≤ 25: bonus = (25-20)×(5/25) = +1
          needs(40%) ≤ 55: bonus = (55-40)×(3/55) = +0.82
          Total = +1.82 → +2 pts (82 → 84)
Savings:  gap = 40% - 10% = 30%, delta = 30 × 1.5 = 45 → capped at +15
          71 → 86
Debt:     spillover +2 → 70
Buffer:   spillover +2 → 67
Goals:    spillover +2 → 82

Projected: (84×0.25) + (86×0.25) + (70×0.20) + (67×0.20) + (82×0.10)
         = 21.0 + 21.5 + 14.0 + 13.4 + 8.2 = 78.1 → 78

Delta: +4 points in ~3 weeks
```

#### Example 3: Essentials First (60/20/20)

```
Current: Score 74
Target:  Needs 60%, Lifestyle 20%, Saved 20%

Spending: wants(20%) ≤ 25: +1; needs(60%) > 55: no bonus
          Total = +1 (82 → 83)
Savings:  gap = 20% - 10% = 10%, delta = 15 → (71 → 86)
Debt:     spillover +2 → 70
Buffer:   spillover +2 → 67
Goals:    spillover +2 → 82

Projected: (83×0.25) + (86×0.25) + (70×0.20) + (67×0.20) + (82×0.10)
         = 20.75 + 21.5 + 14.0 + 13.4 + 8.2 = 77.85 → 78

Delta: +4 points in ~3 weeks
```

**Key insight:** All three presets produce similar short-term score gains (+4), but the *wealth trajectory* divergence is dramatic — Growth Mode saves €28,800/year vs €14,400 for the others. This is where the wealth projection becomes the differentiator.

---

## 8. Life Stage Profiles & Scoring

### Five Life Stage Profiles

The system supports five distinct life stages, each with different financial priorities, feature sets, and coaching styles.

#### Profile 1: Young Adult (Taylor, age 24)

```
Journey Stage: Building Structure → Building Habits
Income Level:  Entry-level (€2,800–3,500/month)
Key Concerns:  Student debt, first savings, peer comparison
Risk Profile:  Low assets, high growth potential

Recommended Rhythm:   40% Needs / 30% Lifestyle / 30% Saved
Score Priorities:      Savings Rate > Spending Control > Goals > Buffer > Debt
Feature Flags:         Gamification, peer benchmarks, simplified experience

Unique Coaching Style:
  - "You're saving more than 67% of people your age!"
  - "Skip 2 takeaway coffees this week → €12 to your festival fund"
  - Celebrates streaks and small wins
```

**Score Interpretation at This Stage:**
- Score of 50+ is *excellent* for a young adult (adjusted expectations)
- Buffer pillar is weighted down mentally (building from zero is expected)
- Goal progress is heavily celebrated (first €1,000 milestone)

#### Profile 2: Family (Chen household, ages 36–38)

```
Journey Stage: Building Habits → Growth
Income Level:  Dual income (€8,000–12,000/month household)
Key Concerns:  Kids' costs, mortgage, education savings, household coordination
Risk Profile:  Moderate assets, high expenses, complex cashflow

Recommended Rhythm:   50% Needs / 25% Lifestyle / 25% Saved
Score Priorities:      Buffer > Savings > Spending > Debt > Goals
Feature Flags:         Household view, kids mode, investments, shared goals

Unique Coaching Style:
  - "The Chen household saved €1,200 this month — €300 more than last month"
  - "Elly's spending is 15% above her allowance this week"
  - Coordinates advice across household members
```

**Score Interpretation at This Stage:**
- Household score = weighted average of adult members by income share
- Buffer pillar is critical (family depends on 6-month runway)
- Debt management includes mortgage awareness
- Kids' savings goals tracked separately

#### Profile 3: Professional (Morgan, age 42)

```
Journey Stage: Building Structure → Growth
Income Level:  High earner (€7,000–10,000/month)
Key Concerns:  Wealth optimisation, tax efficiency, investment diversification
Risk Profile:  Growing assets, optimisation focus

Recommended Rhythm:   45% Needs / 20% Lifestyle / 35% Saved
Score Priorities:      Savings > Goals > Debt > Spending > Buffer
Feature Flags:         Investments, gamification, optimisation tools

Unique Coaching Style:
  - "Your tax-efficient ISA has room for €4,200 more this year"
  - "Switching your energy provider could save €340/year"
  - Focuses on optimisation, not restriction
```

**Score Interpretation at This Stage:**
- Score of 80+ is the target (professional has means to optimise)
- Investments pillar becomes important (not yet in score — future enhancement)
- Cash drag analysis: "You have €5,200 idle — that's €234/year in lost interest"

#### Profile 4: Senior (Margaret, age 72)

```
Journey Stage: Confidence & Growth
Income Level:  Pension-based (€2,500–3,500/month)
Key Concerns:  Bill management, fraud protection, trusted access, stability
Risk Profile:  Preservation focus, drawdown phase

Recommended Rhythm:   65% Needs / 20% Lifestyle / 15% Saved
Score Priorities:      Buffer > Debt > Spending > Goals > Savings
Feature Flags:         Simplified UI, trusted contacts, bills focus

Unique Coaching Style:
  - "All 4 bills were paid on time this month — everything looks good"
  - "David has view-only access to your current account, as you requested"
  - Calm, reassuring, never pushy
```

**Score Interpretation at This Stage:**
- Buffer pillar is paramount (12 months target, not 6)
- Savings rate can be lower (preservation, not accumulation)
- Spending stability is more important than spending reduction
- Fraud monitoring integrated into coaching

#### Profile 5: Teen (Alex, age 15)

```
Journey Stage: First Steps
Income Level:  Allowance-based (€20–50/week)
Key Concerns:  Learning to save, understanding spending, earning
Risk Profile:  No debt, no investments, pure education

Recommended Rhythm:   30% Needs / 40% Lifestyle / 30% Saved
Score Priorities:      Goals > Savings > Spending > Buffer > Debt
Feature Flags:         Gamification, chores, savings goals, kid mode, parental oversight

Unique Coaching Style:
  - "You saved €4.50 this week — only €12 more to that headset!"
  - "You completed 3 chores — that's €15 earned!"
  - Short, energetic, achievement-oriented
```

**Score Interpretation at This Stage:**
- Score is gamified (XP-style, not percentage)
- Only Savings and Goals pillars are active
- Debt and Buffer pillars are hidden (not applicable)
- Parent dashboard shows aggregate child scores

### Life Stage Score Adjustment Matrix

Different life stages should weight pillars differently. This is a future enhancement:

```
                    Young Adult  Family  Professional  Senior  Teen
Spending Control       20%        25%       15%         25%    30%
Savings Rate           30%        25%       30%         10%    35%
Debt Management        15%        20%       20%         15%     0%
Financial Buffer       10%        25%       15%         40%     0%
Goal Progress          25%         5%       20%         10%    35%
                      ─────      ─────     ─────       ─────  ─────
                      100%       100%      100%        100%   100%
```

*Note: Current implementation uses static weights (25/25/20/20/10) for all profiles. The per-stage adjustment is a planned enhancement that would make the score more meaningful across demographics.*

---

## 9. Wealth Trajectory Correlation

### The Big Question

**"If I follow my rhythm for 30 years, what happens to my wealth?"**

This is where the system transcends budgeting and becomes financial planning. The wealth trajectory projection connects daily spending habits to lifetime wealth outcomes.

### Current Implementation

The wealth trajectory chart shows two paths from the user's current age (36) to projected retirement (84):

```
Age    Your Path    Recommended    Gap
────────────────────────────────────────
 36    €10,000      €10,000        €0
 40    €28,000      €38,000        €10,000
 45    €58,000      €95,000        €37,000
 50    €98,000      €168,000       €70,000
 55    €148,000     €258,000       €110,000
 60    €198,000     €358,000       €160,000
 65    €248,000     €428,000       €180,000
 70    €298,000     €468,000       €170,000
 75    €338,000     €488,000       €150,000
 80    €358,000     €498,000       €140,000
 84    €378,000     €500,000       €122,000
```

**"Your Path"** = current savings rate + modest growth
**"Recommended"** = target savings rate + optimised growth

### Proposed Rhythm-Driven Projection Model

The gap between paths should be *dynamically calculated* based on the user's rhythm target. Here is the mathematical model:

#### Core Formula

```
W(t) = W₀ × (1 + r)^t + S × [(1 + r)^t - 1] / r

Where:
  W(t)  = Wealth at year t
  W₀    = Current net wealth (€100,864)
  r     = Annual real return rate (varies by allocation)
  S     = Annual savings contribution (from rhythm)
  t     = Years from now
```

#### Rhythm-to-Savings Translation

```
Monthly Income:       €6,000
Rhythm Growth %:      target.growth (e.g., 20%)
Monthly Contribution: €6,000 × 0.20 = €1,200
Annual Contribution:  €1,200 × 12 = €14,400
```

#### Return Rate by Risk Profile

```
Conservative (70% bonds, 30% equity):  r = 3.5% real
Balanced (50/50):                       r = 5.0% real
Growth (30% bonds, 70% equity):         r = 6.5% real
Aggressive (100% equity):               r = 7.5% real
```

### Rhythm Scenario Projections

For a 36-year-old with €100,864 net wealth, €6,000/month income, balanced return (5% real):

#### Scenario A: Current Path (11% Growth = €660/month = €7,920/year)

```
Year 5  (age 41): €100,864 × 1.05^5  + €7,920 × compound = €172,493
Year 10 (age 46): €100,864 × 1.05^10 + €7,920 × compound = €263,797
Year 20 (age 56): €100,864 × 1.05^20 + €7,920 × compound = €530,416
Year 30 (age 66): €100,864 × 1.05^30 + €7,920 × compound = €989,631
```

#### Scenario B: Balanced Rhythm (20% Growth = €1,200/month = €14,400/year)

```
Year 5  (age 41): €217,084   (+€44,591 vs current path)
Year 10 (age 46): €359,877   (+€96,080)
Year 20 (age 56): €796,042   (+€265,626)
Year 30 (age 66): €1,543,419 (+€553,788)
```

#### Scenario C: Growth Mode (40% Growth = €2,400/month = €28,800/year)

```
Year 5  (age 41): €306,267   (+€133,774 vs current path)
Year 10 (age 46): €552,036   (+€288,239)
Year 20 (age 56): €1,327,293 (+€796,877)
Year 30 (age 66): €2,651,996 (+€1,662,365)
```

### The Compound Story

| Metric | Current (11%) | Balanced (20%) | Growth (40%) |
|---|---|---|---|
| Monthly savings | €660 | €1,200 | €2,400 |
| Annual savings | €7,920 | €14,400 | €28,800 |
| Age-66 wealth | €989,631 | €1,543,419 | €2,651,996 |
| Extra monthly lifestyle sacrifice | — | €540 | €1,740 |
| **Wealth per €1 sacrificed** | — | **€1,025** | **€955** |
| Years to €500k | 22 | 15 | 10 |

**Key insight for the product narrative:** Every €1 redirected from Lifestyle to Saved today is worth ~€1,000 at retirement. This is the number that makes the rhythm system *visceral*.

### Wealth Milestones & Celebrations

The coach should celebrate wealth trajectory milestones:

| Milestone | Trigger | Coach Message |
|---|---|---|
| First €10k saved | Net savings crosses €10,000 | "You just hit five figures in savings! That's a major milestone." |
| 6-month buffer | Buffer pillar hits 100 | "You now have 6 months of expenses covered. Financial resilience unlocked." |
| First €100k net worth | Net wealth crosses €100,000 | "Welcome to the six-figure club. Your rhythm is working." |
| On track for retirement | Wealth trajectory meets "recommended" line | "At this rhythm, you're projected to reach your retirement target." |
| Compound crossover | Investment returns > monthly contribution | "Your money is now earning more than you're saving. Compound interest is real." |

### Visualisation Design

The wealth trajectory chart should show:

1. **Three lines** (not two):
   - Dotted grey: Current path (if rhythm doesn't change)
   - Solid primary: Rhythm-adjusted path (based on active rhythm)
   - Dotted green: Optimised path (maximum reasonable Growth %)

2. **Interactive milestones** — dots on the line at key ages (40, 50, 60, 65)

3. **"What if" slider** — adjusting the Growth % dynamically updates the projection line

4. **Inflation toggle** — show nominal vs real (inflation-adjusted) values

---

## 10. Seasonal Intelligence

### Monthly Multipliers

The system applies seasonal adjustments to spending expectations:

```
Month        Multiplier  Explanation
─────────────────────────────────────────────────────
October      0.90×       Balanced month, back-to-routine
November     1.10×       Black Friday, Sinterklaas prep
December     1.25×       Holiday peak, gifts, travel
January      0.85×       Post-holiday austerity
February     0.95×       Recovery month
March        1.00×       Baseline (current)
```

### Seasonal Rhythm Adjustments (Proposed)

The coach should proactively suggest rhythm adjustments based on season:

```
November Coach Message:
"Black Friday is coming. Want to temporarily shift your rhythm to
55% Needs / 25% Lifestyle / 20% Saved for this month? You can
make it up in January when spending naturally drops."

January Coach Message:
"Post-holiday spending is naturally lower — perfect time to boost
your Saved allocation to 30% and rebuild your holiday spending."
```

This creates a *dynamic rhythm* concept where the user's targets flex seasonally while maintaining annual targets.

---

## 11. Coach Integration

### How Rhythm Powers the Coach

The rhythm system generates contextual coach nudges based on the gap between targets and actuals:

#### Nudge Types

| Nudge | Trigger Condition | Priority | Example |
|---|---|---|---|
| **Lifestyle overspend** | actual.wants > target.wants | 1 | "Your Lifestyle is 5% above target — that's €300 this month" |
| **Savings underspend** | actual.growth < target.growth | 2 | "You're saving 8% below target — auto-transfer €480?" |
| **Needs overspend** | actual.needs > target.needs | 3 | "Needs at 55% vs 50% target — review utilities?" |
| **On-track celebration** | all gaps ≤ ±3% | 4 | "Perfect rhythm this month! All categories within 3%." |

#### Rhythm-Aware Conversation Starters

```
"Am I on rhythm?"           → Shows NWG actual vs target with delta
"How's my score trending?"  → Shows 6-month chart with rhythm impact
"What would Growth Mode do?" → Shows wealth projection comparison
"Compare me to my age group" → Cohort benchmark with rhythm context
"Can I afford [X]?"         → Checks if purchase fits within rhythm
```

### Coach Personality by Life Stage

| Life Stage | Tone | Frequency | Focus |
|---|---|---|---|
| Young Adult | Energetic, gamified | High (daily tips) | Habits & streaks |
| Family | Supportive, coordinating | Medium (weekly digest) | Household alignment |
| Professional | Efficient, data-driven | Low (meaningful only) | Optimisation opportunities |
| Senior | Calm, reassuring | Low (weekly check-in) | Stability & safety |
| Teen | Fun, achievement-oriented | High (after each spend) | Learning & earning |

---

## 12. Household Aggregation

### Multi-Member Scoring

For family profiles, the household score aggregates individual scores weighted by income contribution:

```typescript
function buildHouseholdScore(members, incomeShares): HouseholdHealthScore {
  // Adults only — children tracked separately
  const adults = members.filter(m => m.role === 'adult');

  // Weight by income share
  householdScore = Σ(adult.score × adult.incomeShare / totalIncome)

  return { overall: round(householdScore), members, ...baseScore };
}
```

### Example: Chen Household

```
Member    Role     Income    Share   Score   Weighted
────────────────────────────────────────────────────
Marcus    Adult    €5,000    55.6%    76     42.2
Lisa      Adult    €4,000    44.4%    71     31.5
Alex      Child    €40/wk     —       —       —
Emma      Child    €0         —       —       —
────────────────────────────────────────────────────
Household                           73.7 → 74
```

### Household Rhythm

A household rhythm aggregates individual rhythms:

```
Marcus: 50% / 25% / 25% (€5,000)  → Needs €2,500, Lifestyle €1,250, Saved €1,250
Lisa:   45% / 30% / 25% (€4,000)  → Needs €1,800, Lifestyle €1,200, Saved €1,000
─────────────────────────────────────────────────────────────────────────────────
Household: 47.8% / 27.2% / 25% (€9,000) → Needs €4,300, Lifestyle €2,450, Saved €2,250
```

---

## 13. Technical Reference

### File Map

| File | Purpose |
|---|---|
| `src/data/types.ts` | TypeScript interfaces for all rhythm & score types |
| `src/data/constants.ts` | Pillar weights, health tiers, NWG labels & colours |
| `src/data/healthScoreData.ts` | All pillar calculators, composite score, history, actions |
| `src/data/pfmData.ts` | `calculateRhythmImpact()`, `getRhythmNudges()`, NWG data |
| `src/data/personas.ts` | 5 life stage profiles with feature flags |
| `src/data/coachData.ts` | 60+ conversation starters, 10 nudges, canned responses |
| `src/data/mockData.ts` | Wealth trajectory, net wealth, account data |
| `src/components/shared/TuneRhythmModal.tsx` | 3-step rhythm tuning UI |
| `src/pages/tabs/PlanTab.tsx` | Rhythm display, health score card |
| `src/pages/HealthOverviewPage.tsx` | Score overview with pillar list |
| `src/pages/PillarDetailPage.tsx` | Pillar drill-down with rhythm impact |
| `src/components/charts/WealthTrajectoryChart.tsx` | Wealth projection chart |

### Key Interfaces

```typescript
// Core rhythm target
interface RhythmTarget {
  needs: number;
  wants: number;
  growth: number;
}

// Impact calculation output
interface RhythmScoreImpact {
  pillarImpacts: Array<{
    pillar: PillarId;
    currentScore: number;
    projectedScore: number;
    delta: number;
    reason: string;
  }>;
  projectedOverall: number;
  currentOverall: number;
  totalDelta: number;
  timelineWeeks: number;
}

// Pillar identifiers
type PillarId = 'spending' | 'savings' | 'debt' | 'buffer' | 'goals';

// Rating system
type Rating = 'excellent' | 'good' | 'building' | 'needs-attention';
```

### API Surface (Functions)

```typescript
// Score calculation
buildHealthScore(budgets, pockets, goals, accounts, cashflow): HealthScore
calculateCompositeScore(pillarScores): number
getRating(score): Rating

// Per-pillar calculators
calculateSpendingScore(budgets): number
calculateSavingsScore(pockets, goals, cashflow): number
calculateDebtScore(accounts): number
calculateBufferScore(pockets): number
calculateGoalScore(goals): number

// Rhythm engine
calculateRhythmImpact(target): RhythmScoreImpact
getRhythmNudges(target): CoachNudge[]

// Metrics & actions
generatePillarMetrics(pillarId, data): PillarMetric[]
generateImprovementActions(pillarId, data): ImprovementAction[]

// History
generateMonthlyHistory(currentPillars): MonthlyScore[]
getPillarTrend(history, pillarId): Trend
getPillarDelta(history, pillarId): number

// Household
buildHouseholdScore(members, incomeShares): HouseholdHealthScore

// Coach
getCoachGreeting(personaId): string
getCannedResponse(personaId, userText): string
getRhythmNudges(target): CoachNudge[]
```

---

## 14. Competitive Positioning

### Feature Comparison Matrix

| Feature | This PFM | Revolut | Monzo | YNAB | Mint |
|---|---|---|---|---|---|
| Transaction categorisation | Yes | Yes | Yes | Yes | Yes |
| Budget tracking | Yes | Yes | Yes | Yes | Yes |
| **NWG strategic allocation** | **Yes** | No | No | No | No |
| **Rhythm targets with score impact** | **Yes** | No | No | No | No |
| **Health score (5-pillar composite)** | **Yes** | No | No | No | No |
| **Wealth trajectory projection** | **Yes** | No | No | Partial | No |
| **Rhythm-to-wealth correlation** | **Yes** | No | No | No | No |
| **Life-stage coaching** | **Yes** | No | No | No | No |
| **Household aggregation** | **Yes** | No | Partial | No | No |
| Contextual AI coach | Yes | Partial | Partial | No | No |
| White-label theming | Yes | No | No | No | No |
| Seasonal intelligence | Yes | No | No | No | No |

### The Moat

The competitive moat is not any single feature — it's the *feedback loop*:

```
Rhythm → Score → Wealth Projection → Coach → Rhythm Adjustment
```

No competitor connects spending rhythm to health scoring to lifetime wealth projection to contextual coaching in a single, closed loop. This creates:

1. **Stickiness** — users check their rhythm, not just their balance
2. **Measurability** — "my score went from 68 to 78 in 4 months"
3. **Motivation** — "my rhythm will add €553k to my retirement"
4. **Trust** — the coach gives advice grounded in the user's own numbers

### The Pitch (One Sentence)

> "Set your spending rhythm, watch your health score rise, and see how today's habits compound into tomorrow's wealth — all guided by a coach that knows your numbers as well as you do."
