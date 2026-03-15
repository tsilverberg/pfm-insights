# CODE Mode Reference — retail-usa Angular App

## Core Stack

| Dependency | Version | Notes |
|---|---|---|
| Angular | ~20.3.2 | Standalone components where appropriate |
| TypeScript | 5.x | Target ES2022 |
| NX | Monorepo | Respect library boundaries and path aliases |
| RxJS | ~7.8.0 | Async/reactive patterns |
| NgRx | ~20.0.1 | Signals for component state, store for global state |
| `@backbase/ui-ang` | ~13.1.77 | BDS Angular components — always check Figma first |
| Bootstrap | ~5.3.7 | Grid and utilities only |
| ng-bootstrap | ^19.0.1 | Angular-specific Bootstrap components |

---

## UI and Styling

### Component Library
Always check the **Web Components & Patterns** Figma file (`OfCMgWHu0KelJCPkDYfpAb`) before using any `@backbase/ui-ang` component. Cite the Figma file and node ID in a comment above the component usage.

### SCSS Architecture — ITCSS
All styles follow ITCSS layering. SCSS include path: `libs/shc/shc-theme-preset`

```
Settings   → BDS tokens, theme variables, breakpoints
Tools      → Mixins, functions
Generic    → Normalize, reset, box-sizing
Elements   → Bare HTML element styles (h1, a, p)
Components → BDS component overrides, custom component styles
Utilities  → Helper classes, overrides
```

### Styling Rules
- SCSS only — no inline styles, no CSS-in-JS
- NEVER hardcode hex values, px sizes, or font names
- Always use BDS tokens as CSS custom properties: `var(--bb-token-name)`
- Use Bootstrap grid (`container`, `row`, `col-*`) for layout
- Component-scoped styles via Angular `ViewEncapsulation` defaults

---

## Theming

Three switchable themes. Always ask which is in scope if not specified:

| Theme | Figma Default? | Brand Color | Notes |
|-------|----------------|-------------|-------|
| Default | Yes | `#295EFF` Blue | BDS Figma source of truth |
| SHC | No | Red | Project-level SCSS override, primary for retail-usa |
| Thrive | No | `#108360` Green | Project-level SCSS override |

Token values in CODE mode come from project SCSS for the active theme — not directly from Figma.

---

## Path Aliases

Always use these aliases — never use relative paths to cross library boundaries:

| Alias | Purpose |
|-------|---------|
| `@showcase/ai-assistant` | Chat overlay, widget system, stepper wizard, chart renderer |
| `@showcase/app-settings` | Theme switcher, feature toggles |
| `@showcase/permissions-retail` | Retail entitlements config |
| `@showcase/shc-services` | Access control, interceptors, route tracking |
| `@showcase/sng-charts` | D3 chart components |
| `@showcase/animation` | Animation sequences and tokens |
| `@showcase/showcase-theme-preset` | SCSS variables and theme foundation |
| `@showcase-next-gen/shared` | Data models, auth services, shared UI |

---

## Data Visualization

- Use **`@showcase/sng-charts`** (D3-based) for all charts — not third-party chart libraries
- Available chart types: bar, line, pie, area, combo
- Use **`ngx-lottie`** for animations
- Query the **Data Visualization** Figma file (`MtYZ0mw9gKFkLH7lEMBjnj`) when charts are needed

---

## Auth and Entitlements

| Concern | Implementation |
|---------|----------------|
| Auth provider | `@backbase/identity-auth` + OAuth2 OIDC |
| Route protection | `authGuard`, `SharedUserContextGuard`, `EntitlementsGuard` on all `LayoutComponent` routes |
| Step-up auth | `stepUpInterceptor` — triggers automatically on 403 |
| Transaction signing | `transactionSigningInterceptor` — for payment flows |
| RBAC / entitlements | `@backbase/accesscontrol-v3-http-ang` |

All routes under `LayoutComponent` must include all three guards.

---

## Journey Modules

- All journeys are **lazy-loaded** via `@backbase/journey-bundles/*`
- New journeys must follow the same lazy-load pattern and be registered in `AppRoutingModule`
- Product journeys live under `/products/`: `explore-loans`, `explore-mortgages`, `explore-deposits`

### Adding a New Journey
```typescript
{
  path: 'products/explore-savings',
  loadChildren: () =>
    import('@backbase/journey-bundles/explore-savings').then(m => m.ExploreSavingsJourneyModule),
  canActivate: [authGuard, SharedUserContextGuard, EntitlementsGuard],
}
```

---

## AI Assistant (when relevant)

| Layer | Location | Notes |
|-------|----------|-------|
| Frontend | `libs/shc/retail/ai-assistant/` | Angular standalone components, signal-based state, NO NgRx |
| BFF | `apps/ai-assistant-bff/` | Node.js/Express, Anthropic Claude API via raw `fetch` (no SDK) |
| Proxy | `/api/ai-assistant` → BFF | Content blocks are server-side parsed — no client-side markdown |

---

## State Management

| Scope | Approach |
|-------|----------|
| Component-local | `@ngrx/signals` — signal-based, lightweight |
| Global / shared | NgRx store — actions, reducers, effects, selectors |
| AI assistant | Signals only — NO NgRx |

---

## Code Quality Rules

### Component Structure
- Use standalone components where appropriate
- Include `@Input()` / `@Output()` bindings with correct types
- Use correct Angular selectors matching BDS conventions
- Include module/standalone imports for all BDS components used

### i18n
- All user-facing strings must support **en-US** and **es**
- Use Angular i18n (`i18n` attribute) or `@ngx-translate`

### Testing
- **Jest** for unit tests
- Include a basic `.spec.ts` file for every new component

### BDS Compliance
- NEVER invent bespoke components — flag missing ones with warning and suggest alternatives
- Always cite which BDS Figma file and node ID a component came from
- Flag any deviation from BDS or architecture patterns with warning and explain why
