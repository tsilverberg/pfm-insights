# Home Screen — Items & Data Reference

Extracted from implementation and Figma. Use as reference for Home screen fidelity and data structure.

---

## 1. Home Page Structure (Implementation)

| Order | Component | Purpose |
|-------|-----------|---------|
| 1 | **UserAvatarHeader** | Avatar (top-left), Bell, Cards, 2×2 Grid icons (top-right) |
| 2 | **AccountBalanceCard** | Account icon, label (Checking ....3284), balance (€2.864,66) |
| 3 | **QuickActionsRow** | Transfer, Receive, QR code, More (circular buttons) |
| 4 | **Transactions** | Tab pills (Latest / Upcoming / Subscriptions), TransactionList, Coach moment, "View all" |
| 5 | **Pockets** | PocketGoalCard list, "View all" |
| 6 | **Child's Account** | ChildAccountCard carousel, DotIndicator |

---

## 2. Data Exports (mockData.ts)

### homeAccountData
```ts
{
  id: 'acc-1',
  name: 'Checking',
  type: 'checking',
  lastFour: '3284',
  balance: 2864.66,
  iban: 'NL42 INGB 0123 4567 89',
  bic: 'INGBNL2A',
}
```

### homeQuickActions
| id | label | icon | variant | route |
|----|-------|------|---------|-------|
| transfer | Transfer | transfer | primary | /send |
| receive | Receive | receive | primary | /receive |
| qr | QR code | qr_code | secondary | /qr |
| more | More | more | secondary | — |

### homeTransactionsData
- **Today:** Amazon (-€48,11), Netflix (-€24,00)
- **15 Dec, 2025:** Paul Nelson (+€100,00), Starbucks (-€16,35)

### homePocketsData
| name | current | target | targetDate |
|------|---------|--------|-------------|
| New car for Elly | €7.460 | €10.000 | Nov 10, 2025 |
| Trip to Japan | €2.570 | €5.000 | Jan 1, 2027 |

### homeChildAccountData
| name | lastFour | balance | status |
|------|----------|---------|--------|
| Elly | 8836 | €67,11 | over-budget |
| Elly | 8836 | €67,11 | needs-attention |

---

## 3. Account Balance / Hero Spec (Figma-aligned)

**Label:** `{account.name} ....{account.lastFour}` (4 periods, e.g. `Checking ....3284`)

**Balance format:** European — `€2.864,66` (dot thousands, comma decimals)

**Account icon:** Light grey rounded square, thin black outline of horizontal card rectangle (24×24 viewBox)

**Quick action styling:**
- Primary (Transfer, Receive): dark blue bg `--pfm-action-primary-bg`
- Secondary (QR code, More): light grey bg `--pfm-neutral-100` (#EBF0F5)

---

## 4. Header Icons (Figma spec)

| Position | Icon | Semantics |
|----------|------|-----------|
| 1 | Bell | Notifications |
| 2 | Overlapping squares (2 cards) | Cards → /cards |
| 3 | 2×2 grid (4 squares) | Menu / app launcher |

---

## 5. Figma Node References

| Component | File | Node ID |
|-----------|------|---------|
| Home hero (Net wealth variant) | cZLbdIfIgt9FPb4VonWqBQ | 3598:26784 |
| Section "Insights" | cZLbdIfIgt9FPb4VonWqBQ | 3370:26334 |

**Note:** The "Home hero" in Figma (3598:26784) shows the **Net wealth** variant (€100.864,06, "Net wealth" label) — used in Insights Overview expanded. The **account-specific** hero (Checking, single-account balance, quick actions) may live in another frame or file.
