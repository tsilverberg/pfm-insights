# BDS Web Component Inventory

Source: designsystem.backbase.com (78 components)

## Key Components for Dashboard/Banking UI

| Component | Module | Use |
|---|---|---|
| Collapsible Card | `@backbase/ui-ang/collapsible-card` | Card containers, sizes sm/md/lg, shadow/highlight/chevron props |
| Product Selector | `@backbase/ui-ang/product-selector` | Account dropdown, ProductItem interface |
| Product Item (Basic Account) | — | Display: name, productNumber, currency, amount |
| Account Selector | — | Account picker |
| Account Number | — | Masked account display |
| Universal Header | — | Top navigation bar |
| Mode Header | — | Context-specific header |
| Page Header | — | Page title area |
| Notification | — | Alert: icon + title + description + dismiss |
| Payment Card | — | Card display: logo, number, name, expiry, vendor |
| Button | — | Pill style (102px radius), SemiBold, primary/secondary/ghost |
| Table | — | Data table |
| Amount | — | Formatted currency display |

## Figma Component Specs (from node inspection)

### Button (16034:5356)
- border-radius: 102px (pill)
- font: Libre Franklin SemiBold
- background: primary/default token

### Payment Card (16034:5380)
- border-radius: ~8px (component scale)
- shadow: `0px Xpx Xpx rgba(16,47,67, 0.1)`
- typography: Highlight/Regular 18/27, Body/Semibold 16/24, Subheader/Regular 12/18, Subtitle/Semibold 14/21

### Notification (16034:5360)
- layout: horizontal flex — icon + text block + dismiss
- border: 1px solid primary-lighter
- shadow: rgba(16,47,67,0.1)
- sub-components: Type icon (success/info/warning/danger), Title (SemiBold), Description (Regular), Dismiss (close icon)

### Collapsible Card
- Sizes: sm, md, lg
- Props: shadow, highlight, chevron
- Structure: header (with optional chevron) / divider / body
- Module: `CollapsibleCardModule` from `@backbase/ui-ang/collapsible-card`

### ProductItem Interface
```typescript
interface ProductItem {
  id: string;
  name: string;
  currency: string;
  amount: number;
  productNumber: string;
}
```

## Full Component List (78 total)
Account Number, Account Selector, Action Status, Alert, Amount, Amount Input, Avatar, Badge, Badge Counter, Button, Card Vendor, Checkbox Group, Chip, Collapsible, Collapsible Accordion, Collapsible Card, Common Error State, Control Error Handler, Currency Input, Dropdown Menu, Dropdown Multi Select, Dropdown Multi Select Option, Dropdown Panel, Dropdown Single Select, Ellipsis, Empty State, Fieldset, File Attachment, Focus Invalid Input, Highlight, Icon, Illustration, Infinite Scroll, Input Checkbox, Input Datepicker, Input Email, Input File, Input Inline Edit, Input Number, Input Password, Input Phone, Input Radio Group, Input Range, Input Text, Input Timepicker, Input Validation Message, Item Log, Keyboard Click, Load Button, Loading Indicator, Locale Selector, Logo, Modal, Mode Header, Notification, Option List, Page Header, Pagination, Payment Card, Period Selector, Product Item (Basic Account), Product Selector, Progress Tracker, Progressbar, Rich Text Editor, Search Box, Select List, Stepper, Switch, Tab, Table, Textarea, Tooltip, Tracker, Universal Header, Value Diff
