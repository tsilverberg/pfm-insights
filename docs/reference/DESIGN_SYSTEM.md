# Insights Module — Complete Design System Instructions

> Verified against Figma file `cZLbdIfIgt9FPb4VonWqBQ`, section "Insights" (`3370:26334`).
> Every value below was extracted from actual node inspection — not assumed from primitives.

---

## 1. TYPOGRAPHY

**Font family: `Lato`** (not the DS default `Libre Franklin`). This is a project-level override.

| Token Name | Weight | Size | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|
| `iOS/Headings/Large Title` | Bold (700) | 34px | 51px | 0 | Net wealth hero amount |
| `iOS/Headings/Title 3` | SemiBold (600) | 20px | 30px | 0 | Section headings |
| `iOS/Headings/Headline` | SemiBold (600) | 17px | 25.5px | 0 | Card titles, badge amounts, coach moment headlines |
| `iOS/Body/Regular` | Regular (400) | 17px | 25.5px | 0 | Snapshot category names (Needs/Wants/Security in monthly snapshot) |
| `iOS/Body/Semibold` | SemiBold (600) | 17px | 25.5px | 0 | Badge text (e.g. "€1.237,50 left") |
| `iOS/Callout/Regular` | Regular (400) | 16px | 24px | 0 | List item labels, legend labels, detail row labels |
| `iOS/Callout/Semibold` | SemiBold (600) | 16px | 24px | 0 | List item amounts, detail row amounts |
| `iOS/Subhead/Regular` | Regular (400) | 15px | 22.5px | 0 | Descriptions, secondary text, coach body text, tab labels (inactive) |
| `iOS/Subhead/Semibold` | SemiBold (600) | 15px | 22.5px | 0 | Button labels, tab labels (active), coach moment titles |
| `iOS/Footnote/Regular` | Regular (400) | 13px | 19.5px | 0 | Progress bar captions, "of income" text, transaction count links |
| `iOS/Caption 1/Regular` | Regular (400) | 12px | 18px | 0 | Chart axis labels, month labels on bar chart, heatmap day headers |
| `iOS/Component/Tab bar` | Regular (400) | 10px | 15px | 0 | Bottom tab bar labels |

**Chart tooltip fonts** (use DS primitives, NOT Lato):
| Token | Family | Weight | Size | Line Height |
|---|---|---|---|---|
| `Caption 2/Regular` | `Libre Franklin` | Regular (400) | 11px | 16px |
| `Caption 1/Semibold` | `Libre Franklin` | SemiBold (600) | 12px | 18px |

---

## 2. COLOR TOKENS

### 2.1 Semantic Surface & Background
| Token | Value | Usage |
|---|---|---|
| `semantic/surface/background` | `#FFFFFF` | Page background, section backgrounds |
| `semantic/surface/card` | `#FFFFFF` | Card backgrounds (bordered cards) |
| `semantic/surface/raised` | `#F3F6F9` | Secondary button bg, insight commentary cards |
| `semantic/surface/subtle` | `#F3F6F9` | Net wealth detail box, month picker bg, heatmap legend pill active bg |
| `semantic/support/subtle` | `#E1E8EF` | Progress bar track (unfilled portion) |

### 2.2 Semantic Text
| Token | Value | Usage |
|---|---|---|
| `semantic/text/primary` | `#061223` | Headings, amounts, primary body text |
| `semantic/text/secondary` | `#3A495D` | Descriptions, captions, coach body text |
| `semantic/text/tertiary` | `#7189A7` | "of income" labels, chart axis labels, empty state text |

### 2.3 Semantic Borders & Dividers
| Token | Value | Usage |
|---|---|---|
| `semantic/divider/default` | `#E1E8EF` | Section bottom borders, separators, heatmap empty cells border |
| `semantic/border/subtle` | `#CCD5DF` | Card borders, category pill borders, chart axes, bar chart column dividers (dashed) |
| `semantic/border/strong` | `#061223` | Active tab underline, active time period pill border, outline button border |

### 2.4 Semantic Actions
| Token | Value | Usage |
|---|---|---|
| `semantic/action/secondary/background/default` | `#FFFFFF` | Outline button bg (coach CTA) |
| `semantic/action/secondary/border` | `#061223` | Outline button border |
| `semantic/action/secondary/text` | `#061223` | Outline button text |

### 2.5 Button Tokens
| Token | Value | Usage |
|---|---|---|
| `color/button/secondary/default/background` | `#F3F6F9` | Raised button bg |
| `color/button/secondary/default/border` | `#EBF0F5` | Raised button border |
| `color/button/secondary/default/foreground` | `#061223` | Raised button text |

### 2.6 Inverted (Tooltips)
| Token | Value | Usage |
|---|---|---|
| `color/background/inverted` | `#061223` | Tooltip bg, chart tooltip bg |
| `color/on-background/inverted` | `#FFFFFF` | Tooltip text |
| `color/background/shadow` | `rgba(16, 47, 67, 0.12)` | Tooltip shadow |

### 2.7 Status
| Token | Value | Usage |
|---|---|---|
| `semantic/status/success/background` | `#DBECE2` | Success banner bg ("spending on track") |
| `semantic/status/success/border` | `#B4D8C3` | Success banner border |

### 2.8 Palette Colors — Category System (50/30/20 rule)

**Needs (Pink)**
| Token | Value | Usage |
|---|---|---|
| `primitive/palette/pink/base` | `#ED5EA6` | Needs bar segments, Needs progress bar fill, Needs legend dot, donut segment |
| `primitive/palette/pink/strong` | `#A64274` | Needs badge text color |
| `semantic/category/pink/background` | `#FCE7F2` | Needs badge bg, Needs list item icon circle bg |
| `semantic/category/pink/border` | `#F9CDE3` | Needs badge border |

**Wants (Turquoise)**
| Token | Value | Usage |
|---|---|---|
| `primitive/palette/turquoise/strong` | `#4AB2B2` | Wants bar segments, wealth trajectory line, donut segment, legend dot |
| `primitive/palette/turquoise/extra-strong` | `#3A8C8C` | Wants progress bar fill, heatmap "over-budget" cells |
| `primitive/palette/turquoise/base` | `#1ED2D2` | Heatmap "warning" cells |
| `primitive/palette/turquoise/soft` | `#B9F1F1` | Heatmap "on track" cells |
| `primitive/palette/turquoise/extra-soft` | `#DDF8F8` | Heatmap "excellent" cells |
| `semantic/category/turquoise/background` | `#DDF8F8` | Wants badge bg, Wants list item icon circle bg |
| `semantic/category/turquoise/border` | `#B9F1F1` | Wants badge border |
| `semantic/category/turquoise/text` | `#3A8C8C` | Wants badge text |

**Security/Future (Green)**
| Token | Value | Usage |
|---|---|---|
| `primitive/palette/green/strong` | `#0A5A2B` | Security bar segments, Security legend dot |

### 2.9 Neutral Primitives
| Token | Value | Usage |
|---|---|---|
| `primitive/neutral/0` | `#FFFFFF` | Bar segment separator (2px white gap between stacked bar segments) |
| `primitive/neutral/100` | `#EBF0F5` | Button border, heatmap future/inactive cells |
| `primitive/neutral/200` | `#E1E8EF` | Active time period pill bg |

---

## 3. SPACING & LAYOUT

### 3.1 Page-Level
| Property | Value |
|---|---|
| Screen width | 375px (iPhone) |
| Content area width | 343px (375 - 16px padding each side) |
| Horizontal page padding | 16px |
| Section vertical padding | 32px top and bottom |
| Gap between section heading and content | 24px (net wealth), 16px (most sections) |
| Section separator | 1px bottom border `#E1E8EF` |

### 3.2 Cards
| Property | Value |
|---|---|
| Card border-radius | 16px |
| Card padding | 16px |
| Card border | 1px solid `#CCD5DF` |
| Card internal gap | 16px between elements, 24px for major section groups |
| Raised card (commentary) padding | 16px |
| Raised card bg | `#F3F6F9`, no border |

### 3.3 List Items (Category rows)
| Property | Value |
|---|---|
| Row gap (icon to text) | 16px |
| Row gap (text block to amount) | 24px |
| Icon circle size | 40px (20px icon + 10px padding each side) |
| Icon circle border-radius | 125px (fully round) |
| Icon size inside circle | 20px |
| Separator width | 287px (indented from left, aligned under text, not full width) |
| Gap between rows | 16px |

### 3.4 Progress Bars
| Variant | Height | Border-radius |
|---|---|---|
| Monthly snapshot (large) | 12px | 2px |
| Category header (thin) | 4px | 2px |
| Filled portion | left-rounded 2px, right has 2px white border gap |

---

## 4. COMPONENT PATTERNS (Custom to this design)

### 4.1 Coach Moment Card
A distinctive pattern NOT in the base DS — custom to this design.
- **Border**: 2px solid `#ED5EA6` (pink)
- **Background**: white (`semantic/surface/card`)
- **Border-radius**: 16px
- **Padding**: 16px
- **Layout**: horizontal flex — icon (24x26) | text+CTA block
- **Icon**: Custom "Icon/Coach" (atom/molecule icon), 24x26px
- **Title**: `iOS/Subhead/Semibold` in `text/secondary` (regular coach) OR `iOS/Headline` in `text/primary` (action coach)
- **Body**: `iOS/Subhead/Regular` in `text/secondary`
- **Close button**: 24px "close" icon, top-right of text block
- **CTA button** (optional): Outline style — white bg, 1px `#061223` border, 99px radius, 32px height
- **Gap**: 16px between icon and text block; 16px between text and CTA; 2px between title and body

### 4.2 Section Module Pattern
Every section follows this structure:
```
[Section bg: white, border-bottom: 1px #E1E8EF, padding: 32px 16px]
  [Title: Title 3 Semibold]
  [Subtitle: Subhead Regular, text/secondary] (optional)
  [24px gap]
  [Content area]
  [Coach moment card] (optional)
  [Action button: raised secondary, full-width]
```

### 4.3 Category Header (Needs/Wants sections)
```
[Row: space-between]
  [Left: Title 3 "Needs"]
  [Right: Badge with "€X left"]
[16px gap]
[Progress bar: 4px height, full width]
[4px gap]
[Row: space-between, Footnote Regular]
  [Left: "€X spent"]
  [Right: "€X budget"]
```

**Badge variants by category:**
- Needs: bg `#FCE7F2`, border `#F9CDE3`, text `#A64274`
- Wants: bg `#DDF8F8`, border `#B9F1F1`, text `#3A8C8C`

### 4.4 Stacked Bar Chart (Monthly Distribution)
- **Bar width**: 24px
- **Bar spacing**: separated by dashed border columns (`#CCD5DF`)
- **Column padding**: 6px each side
- **Bar segments stacked bottom-to-top**: Pink (Needs) → Turquoise (Wants) → Green (Security)
- **Segment separator**: 2px white (`primitive/neutral/0`) border-top and border-bottom on middle segment
- **Top segment**: 4px top-left and top-right border-radius
- **Y-axis**: left side, border-left + border-top on chart area, 6px top-left radius
- **Y-axis labels**: right-aligned column, Caption 1 Regular, `text/tertiary`
- **X-axis labels**: centered under each bar, Caption 1 Regular, `text/tertiary`
- **Chart height**: 301px
- **Average income line**: dashed horizontal line across chart area

### 4.5 Category Filter Pills (Needs/Wants/Security toggle)
- **Layout**: 3 equal-width pills in a row, 8px gap
- **Border**: 1px solid `#CCD5DF`
- **Border-radius**: 8px
- **Padding**: 16px
- **Content**: color dot (12px, 1px radius) + label → separator → percentage (Title 3) + "of income" (Footnote)
- **Active state**: same appearance (no fill difference visible)

### 4.6 Spending Health Heatmap
- **Grid**: 7 columns (Mon-Sun) x 5 rows
- **Cell size**: equal width (flex), 32px height
- **Cell border-radius**: 4px
- **Cell gap**: 3px
- **Color intensity levels**:
  - Excellent (€0-10): `#DDF8F8` (turquoise/extra-soft)
  - On track (€11-60): `#B9F1F1` (turquoise/soft)
  - Warning (€61-120): `#1ED2D2` (turquoise/base)
  - Over-budget (€121+): `#3A8C8C` (turquoise/extra-strong)
  - No data (empty): white with 1px `#E1E8EF` border
  - Future/inactive: `#EBF0F5` (neutral/100)
- **Month picker**: bg `#F3F6F9`, 4px radius, 2px vertical padding, 4px horizontal padding, chevron arrows each side

### 4.7 Time Period Selector Pills
- **Active pill**: bg `#E1E8EF`, 1px solid `#061223` border, 100px radius, 42px height, 16px padding
- **Inactive pill**: bg `#F3F6F9`, 1px solid `#EBF0F5` border, 100px radius, 42px height, 16px padding
- **Text**: Subhead Regular, `text/secondary`
- **Horizontal gap**: 8px

### 4.8 Wealth Trajectory Chart
- **Chart area**: border-left + border-top, `#CCD5DF`, 6px top-left radius
- **Lines**: area fill with two trajectories (recommended dashed, current solid turquoise)
- **Tooltip**: dark bg (`#061223`), 4px radius, shadow `0 4px 9px rgba(16,47,67,0.12)`, positioned absolutely
- **Y-axis**: €0 to €500k, Caption 1 Regular
- **X-axis**: Age 36 to 84, Caption 1 Regular
- **Legend row**: color dot 12px + Callout Regular label + dotted line + Callout Semibold value

### 4.9 Donut Chart (Annual Income Breakdown)
- **Inside a bordered card**: 16px padding, 16px radius, 1px `#CCD5DF` border
- **Donut size**: 146px with tooltip overlay
- **Tooltip**: same dark style as other tooltips — color dot 8px + label + value
- **Legend below**: Headline Semibold for title row, then color dot 12px + Callout Regular label + dotted separator + Callout Semibold amount

### 4.10 Dotted Leader Line (Legend rows)
Used in all legend/summary rows between label and value:
- **Implementation**: flex-1 element with dashed/dotted border image
- **Height**: 6px
- **Pattern**: evenly spaced dots connecting label to value
- **Color**: matches border/subtle system

### 4.11 Monthly Snapshot Progress Bars
Within the bordered snapshot card:
- **Needs**: 12px height, pink fill, white 2px right-border on fill
- **Wants**: 8px bg track but 12px turquoise fill (overflows — intentional full-bar indicator)
- **Security**: 12px height, green fill, white 2px right-border on fill
- **Track bg**: `#E1E8EF`
- **Success banner**: bg `#DBECE2`, border `#B4D8C3`, 8px radius, 8px padding, check_circle icon + Footnote Regular text

---

## 5. NAVIGATION

### 5.1 Screen Header
- **Background**: `rgba(255,255,255,0.5)` (semi-transparent)
- **Border-bottom**: 1px solid `#E1E8EF`
- **Height**: 110px (54px status bar + 56px title area)
- **Title**: "Insights" — `iOS/Headings/Title 3` (20px Semibold), left-aligned, max-width 150px, truncated
- **Right actions**: 2 icon buttons (credit_card + coach icon), each 44x44px tap target with 10px padding, 4px gap between

### 5.2 Sub-Navigation Tabs (Overview / Monthly goals / My path)
- **Container**: 56px height, border-bottom 1px `#E1E8EF`, horizontal scroll, 16px horizontal padding, 8px gap
- **Tab item**: flex-column, vertically centered
- **Active tab text**: `Lato SemiBold 15px`, `text/primary` (`#061223`)
- **Inactive tab text**: `Lato Regular 15px`, `text/secondary` (`#3A495D`)
- **Active underline**: 3px height, `#061223`, 4px top-left and top-right radius
- **Inactive underline**: same element, `opacity: 0`

### 5.3 Tab Bar (Bottom)
- **iOS 26+ floating pill style**
- **Background**: layered glass effect — `#333` color-dodge + `#F7F7F7` gradient + `rgba(255,255,255,0.5)` gradient
- **Shape**: massive border-radius (296px left, 300px right top)
- **Main pill width**: 272px, contains 4 items (Home, Insights, Invest, Explore)
- **Active tab**: circular `#EDEDED` background pill behind the active item
- **Tab item size**: 54px height, flex-1 width
- **Icon size**: 24px
- **Label**: `Lato Regular 10px`, `#061223`
- **Search**: separate pill, 32px icon, 15px padding, same glass bg
- **Bottom padding**: 32px (safe area), top padding: 16px
- **Tabs**: Home | **Insights** (active) | Invest | Explore + [Search]

---

## 6. WHAT MAKES THIS DESIGN DIFFERENT FROM BASE DS PRIMITIVES

1. **Font override**: Entire module uses `Lato` instead of `Libre Franklin` (except chart tooltips which keep `Libre Franklin`)
2. **Coach moment cards**: Completely custom component — pink border, icon, close button, optional CTA — not in base DS
3. **Spending heatmap**: Custom calendar-grid visualization using turquoise intensity scale — not a standard DS component
4. **50/30/20 segmented bar**: Custom tri-color stacked bar with white gaps between segments — unique to this PFM context
5. **Category color system**: Pink = Needs, Turquoise = Wants, Green = Security — semantic category tokens extending beyond base palette
6. **Badge variants**: Category-colored badges (pink/turquoise) with matching text colors — extends base Badge component
7. **Progress bars at 2 heights**: 12px (snapshot) and 4px (category headers) — base DS likely has one height
8. **Dotted leader lines**: Custom dot-pattern connecting labels to values in legends — not a standard DS element
9. **Chart tooltips**: Dark inverted tooltips with pointer arrows and color dots — custom chart component system
10. **Indented separators**: List separators are 287px wide (not full-width), indented to align under text (past the icon) — specific layout choice
11. **Month picker**: Inline month navigation with arrow buttons — custom component not in base DS
12. **Section module pattern**: Consistent wrapper (white bg + border-bottom + 32px padding) used as a repeating layout unit — design-level convention
13. **Wealth trajectory**: Dual-line area chart with age on X-axis — custom PFM visualization
14. **Euro formatting**: European format `€100.864,06` (dot thousands, comma decimals) — must be consistent throughout
15. **iOS 26+ tab bar**: Floating pill-style tab bar with glass morphism — latest iOS pattern, NOT standard Ionic tab bar
16. **Semi-transparent header**: `rgba(255,255,255,0.5)` header background — enables content-under-header scrolling effect
17. **Time period selector**: Pill-shaped toggle row for chart time ranges (1M/3M/6M/12M/YTD/All) — custom filter control
18. **Mixed typography in inline spans**: Some labels mix font sizes inline (e.g., "Needs 40% of income" where "Needs" is 17px and "40% of income" is 13px)
