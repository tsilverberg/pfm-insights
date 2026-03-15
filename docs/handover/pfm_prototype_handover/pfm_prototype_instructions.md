# PFM Experience · Prototype Build Instructions
**For Claude Code · Connected to product design system**

---

## How to use this document

Work through the layers in order. Do not skip ahead. After each layer, verify the output before proceeding. Each layer builds on the last — getting layer 1 wrong propagates through everything.

**What you are building:** A click-through prototype of a Personal Finance Management (PFM) feature inside a retail banking app. 13 screens across 4 journey stages. No backend. Navigation is click-only — tapping a CTA or button advances to the next screen in the flow.

---

## Layer 1 — Design system alignment

**Do this before writing any screen code.**

1. Read the design system in this repo. Identify and note:
   - The **colour token names** for: primary dark (navy), primary accent (teal), warning/amber, success/green, destructive/red, surface, border, muted text
   - The **typography scale** tokens for: heading large, heading small, body, caption, label
   - The **spacing scale** in use (4px base, 8px, 16px, 24px, etc.)
   - The **border radius tokens** for: cards, pills, buttons, inputs
   - The **component names** available for: Card, Button (primary + ghost), Badge/Tag, Input, ProgressBar, Avatar, BottomNav/TabBar, ListItem

2. Create a file called `pfm-tokens.md` in the project root that maps each of the above to the design system equivalents. Use this format:

```
## Colour mapping
navy → [design system token]
teal → [design system token]
amber → [design system token]
green → [design system token]
red → [design system token]
surface/bg → [design system token]
border → [design system token]
muted → [design system token]

## Typography mapping
heading-lg → [token]
heading-sm → [token]
body → [token]
caption → [token]
label-caps → [token]

## Component mapping
Card → [component name + import path]
Button primary → [component name]
Button ghost → [component name]
Badge → [component name]
Input → [component name]
ProgressBar → [component name]
BottomNav → [component name]
ListItem → [component name]
```

**Do not proceed to Layer 2 until this file exists and is complete.**

---

## Layer 2 — Prototype shell

Build a single-page prototype shell that:

- Renders one screen at a time at **390px wide** (standard mobile viewport)
- Centres the phone shell horizontally on a neutral background (`#F0F2F7` or design system equivalent)
- Has a fixed **status bar** at the top (time: 9:41, signal/wifi/battery icons)
- Has a fixed **bottom navigation bar** with 4 tabs: Home · Pockets · Insights · Coach
- Has a **scrollable content area** between status bar and bottom nav (`overflow-y: auto`, `max-height` fills remaining viewport)
- Manages **screen state** — a single `currentScreen` variable controls which screen renders
- Exposes a global `navigateTo(screenId)` function that updates `currentScreen`

Bottom nav tab order (left to right): **Home · Pockets · Insights · Coach**

The active tab should highlight based on which screen is active. Use this mapping:

| Screen | Active tab |
|--------|-----------|
| 01, 12 | Home |
| 04, 05, 07, 08, 10, 11 | Pockets |
| 02, 13 | Insights |
| 03, 06, 09 | Coach |

**Verify:** Load the shell. You should see a phone frame with status bar, empty content area, and bottom nav. Nothing else yet.

---

## Layer 3 — Screen inventory

Build each screen as a self-contained component or function. The HTML reference for each screen is provided in Layer 5. Map content to your design system components — do not copy the reference HTML verbatim. The reference HTML uses inline styles for prototyping purposes; your implementation should use design system tokens and components throughout.

### Screen list

| ID | File ref | Screen name | Journey stage |
|----|----------|-------------|---------------|
| 01 | `01_day0_budget_view.html` | Budget view | Day 0 |
| 02 | `02_week1_insights.html` | Spending insights | Week 1 |
| 03 | `03_flowA_coach_insight.html` | Coach · behaviour review | Month 1 · Flow A |
| 04 | `04_flowA_pocket_setup.html` | Pocket setup | Month 1 · Flow A |
| 05 | `05_flowA_pocket_live.html` | Pocket live + virtual card | Month 1 · Flow A |
| 06 | `06_flowB_holiday_coach.html` | Coach · holiday goal | Month 1 · Flow B |
| 07 | `07_flowB_goal_creation.html` | Goal creation form | Month 1 · Flow B |
| 08 | `08_flowB_goal_recovery.html` | Goal live + recovery plan | Month 1 · Flow B |
| 09 | `09_flowC_coach_savings.html` | Coach · savings habit | Month 1 · Flow C |
| 10 | `10_flowC_hisa_setup.html` | HISA setup | Month 1 · Flow C |
| 11 | `11_flowC_hisa_live.html` | HISA + pockets live | Month 1 · Flow C |
| 12 | `12_year1_dormant_cash.html` | Account · dormant cash banner | Year 1–3 |
| 13 | `13_year1_investing_nudge.html` | Insights · investing nudge | Year 1–3 |

---

## Layer 4 — Navigation logic

Wire all click targets. Every tap on a CTA, button, or chip navigates to the next screen in sequence. Use `navigateTo(screenId)` for all navigation.

### Flow A — Spending pocket
```
Screen 03 → [CTA: "Yes, set it up"] → Screen 04
Screen 04 → [CTA: "Continue"] → Screen 05
Screen 05 → (end of flow — return to home or show completion state)
```

### Flow B — Holiday goal
```
Screen 06 → [CTA: "Set this up"] → Screen 07
Screen 07 → [CTA: "Confirm goal + auto-transfer"] → Screen 08
Screen 08 → (end of flow)
```

### Flow C — HISA
```
Screen 09 → [CTA: "Move to HISA now"] → Screen 10
Screen 10 → [CTA: "Set up savings account"] → Screen 11
Screen 11 → (end of flow)
```

### Entry points (bottom nav or home)
```
Bottom nav: Home → Screen 01
Bottom nav: Insights → Screen 02
Bottom nav: Coach → Screen 03  (entry to Flow A)
Coach tab from Screen 02 nudge → Screen 09  (entry to Flow C)
```

### Year 1–3 screens
These are accessed via a journey selector or demo nav — not from within the main flows. Add a small "Jump to" overlay or demo navigation control so the director can access screens 12 and 13 directly during presentation.

### Back navigation
Screens with a `← Back` link navigate to the previous screen in the flow:
```
Screen 04 ← Screen 03
Screen 07 ← Screen 06
Screen 10 ← Screen 09
Screen 08 ← Screen 07 (via Pockets tab)
```

---

## Layer 5 — Screen content reference

The following HTML files are attached to this document and should be in the same directory. Each file contains a complete scrollable screen at 390px width. Use these as content and layout reference — map all components and tokens to your design system.

### Critical design decisions embedded in these screens — do not change them

**Screen 01 · Budget view**
- Toggle between "By date" and "Budget view" — Budget view is the active state shown
- Accordion structure: Income (open) · Fixed costs (open with subcategories) · Recurring (collapsed) · Discretionary (collapsed with subcategories visible on scroll)
- Hero number is "Available to spend" not total balance
- Two income sources shown: Salary + Etsy store

**Screen 02 · Insights**
- Total income strip anchors all percentages at the top
- Three sections: Needs (blue) · Wants (amber) · Saved (green)
- Eating out has an ↑ flag — it is the only flagged item
- HISA nudge lives inside the Saved section — not a separate notification
- Labels are "Needs / Wants / Saved" — NOT "50/30/20"

**Screen 03 · Coach insight (Flow A)**
- Coach speaks first — this is a proactive message, not a response to a query
- Two stat cards inline in the coach bubble: avg lifestyle spend + eating out trend
- Two response chips: primary CTA + secondary adjustment option

**Screen 04 · Pocket setup**
- 4-step setup flow, pre-filled from history
- Step 1 is already ticked (name pre-filled as "Daily spending")
- Step 2 is active — amount pre-filled as £1,100 with "3-month avg: £1,065 · buffer added" hint
- Steps 3 and 4 are greyed/pending

**Screen 05 · Pocket live**
- Virtual card appears immediately on the pocket card — this is intentional (proof the system is running)
- Inline coach note below the active pocket (not a notification — embedded in the screen)
- Second pocket (Holiday fund) visible below showing £0 of £2,000

**Screen 06 · Coach holiday (Flow B)**
- User speaks first — this is an inbound request
- Coach breaks down the £400/mo into two sources (wants + savings) using stat cards
- Recovery framing ("end year ahead") appears in the first coach response — not revealed later
- Second coach bubble confirms the setup is done and auto-revert is managed

**Screen 07 · Goal creation**
- All fields pre-filled from the coach conversation — user confirms, not inputs from scratch
- "After August" section is visible below the form fields before the CTA — recovery plan is part of the creation step, not revealed post-holiday

**Screen 08 · Goal + recovery**
- Timeline has 4 nodes: Mar (now) → Aug (holiday) → Sep (revert) → Dec (restored)
- Dec node is green — "End year ahead of where you started" is the emotional anchor
- This screen is accessed via "View holiday pocket" chip or Pockets tab

**Screen 09 · Coach savings (Flow C)**
- Coach opens with the habit observation — 3 months of consistent saving
- User asks "How much difference does it actually make?" — this is the key moment
- Projections use real-world anchors: dinner / weekend away / second-hand car
- "Behaviour doesn't change. The money just works harder." — this line must appear verbatim

**Screen 10 · HISA setup**
- Green card at top communicates: 4.5% AER, monthly interest, no lock-in, FSCS protected
- Fields pre-filled: source account, monthly amount (£240), transfer day (1st / payday)
- Year 1 earning (£79) shown as a single reassurance line before the CTA

**Screen 11 · HISA live**
- Interest earned shown from day 1 — even if it is £0.09. This is intentional.
- Projection table (Year 1 / Year 5 / Year 10) with real-world anchors visible on the pocket card
- Both other pockets (Daily spending + Japan holiday) visible below — shows the full pockets view

**Screen 12 · Dormant cash banner**
- Banner appears mid-transaction list — between transaction rows, not above the list
- Specific figures: £3,300 idle · +£149/yr — not generic
- Two chips: "Move to savings" (primary green) + "Remind me later" (ghost)

**Screen 13 · Investing nudge**
- Nudge appears at the bottom of the Saved section — inside the section, not above or below it
- Trigger condition (for reference): goal must be on track before this appears
- Two chips: "Try with £25" + "Talk to coach" — both styled as secondary/blue

---

## Layer 6 — Demo navigation overlay

Add a persistent but unobtrusive demo control for the product director to use during presentation. This should not look like part of the product.

Requirements:
- Small pill or tab in the top-right corner of the browser window (outside the phone shell)
- Labelled "Demo nav"
- On click, shows a panel listing all 13 screens grouped by journey stage
- Clicking any screen navigates directly to it
- Panel closes on second click or on outside click

Grouping for the panel:
```
Day 0
  → 01 · Budget view

Week 1
  → 02 · Spending insights

Month 1 · Flow A (Spending pocket)
  → 03 · Coach insight
  → 04 · Pocket setup
  → 05 · Pocket live

Month 1 · Flow B (Holiday goal)
  → 06 · Coach · holiday goal
  → 07 · Goal creation
  → 08 · Goal + recovery plan

Month 1 · Flow C (HISA)
  → 09 · Coach · savings habit
  → 10 · HISA setup
  → 11 · HISA live

Year 1–3
  → 12 · Dormant cash
  → 13 · Investing nudge
```

---

## Layer 7 — Quality checks

Run through each of these before considering the prototype complete.

**Navigation**
- [ ] Every primary CTA advances to the correct next screen
- [ ] Every back link returns to the correct previous screen
- [ ] Bottom nav tabs switch to the correct screen and highlight the correct active tab
- [ ] Demo nav panel opens, lists all 13 screens, navigates correctly, and closes

**Content fidelity**
- [ ] Screen 02: Labels say "Needs / Wants / Saved" — not 50/30/20
- [ ] Screen 04: Amount field shows £1,100 with hint "3-month avg: £1,065 · buffer added"
- [ ] Screen 06: Recovery framing ("end year ahead") visible in first coach response
- [ ] Screen 07: "After August" section visible before the CTA — not hidden below it
- [ ] Screen 09: Last line of coach bubble reads "Behaviour doesn't change. The money just works harder."
- [ ] Screen 10: Three HISA attributes visible: AER rate · no lock-in · FSCS protected
- [ ] Screen 11: Interest earned shows +£0.09 — not zero, not hidden
- [ ] Screen 12: Banner is between transaction rows — not above the transaction list
- [ ] Screen 13: Nudge is inside the Saved section — not below it

**Design system**
- [ ] All colours use design system tokens — no hardcoded hex values
- [ ] All type uses design system scale — no hardcoded font sizes
- [ ] All spacing uses design system scale — no arbitrary pixel values
- [ ] All components (cards, buttons, badges, inputs) use design system components

**Scrollability**
- [ ] Screen 01: Accordion content scrolls — all 4 categories visible on scroll
- [ ] Screen 02: All three insight sections visible on scroll
- [ ] Screen 11: All three pocket cards visible on scroll
- [ ] Screen 12: Transaction list + banner + further transactions visible on scroll

---

## Reference files

The following files are in this package. All HTML files are 390px-width scrollable screens:

```
_base.css                     Shared CSS (for reference only — use design system in implementation)
01_day0_budget_view.html
02_week1_insights.html
03_flowA_coach_insight.html
04_flowA_pocket_setup.html
05_flowA_pocket_live.html
06_flowB_holiday_coach.html
07_flowB_goal_creation.html
08_flowB_goal_recovery.html
09_flowC_coach_savings.html
10_flowC_hisa_setup.html
11_flowC_hisa_live.html
12_year1_dormant_cash.html
13_year1_investing_nudge.html
```

Open any `.html` file in a browser to see the reference screen at full fidelity before building.

---

## Notes for the product director

**What Claude Code will do well:** Structure, navigation logic, component wiring, content accuracy.

**Where to check carefully:** Token mapping in Layer 1 — if Claude Code makes an assumption about which design system token maps to which visual role, verify it before proceeding. One wrong token propagates across all 13 screens.

**The one line to protect:** Screen 09, bottom of the coach conversation — *"Behaviour doesn't change. The money just works harder."* This is the emotional core of Flow C. If it gets cut or reworded, the screen loses its point.

**If the design system doesn't have a component:** Default to the reference HTML layout for that element. Note the gap in `pfm-tokens.md` and flag it for the design system team.
