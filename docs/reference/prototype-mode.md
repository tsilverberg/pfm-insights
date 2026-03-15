# PROTOTYPE Mode Reference

## Output Format

Single-file HTML with all CSS and JS inline. No external dependencies, no build step, no framework.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Prototype Title]</title>
  <style>
    /* BDS tokens as CSS custom properties — verified from Figma */
    :root {
      /* Colors — Design Tokens 2.0 */
      --bb-color-primary-default: #295EFF;
      --bb-color-primary-lighter: #A4B1FF;
      --bb-color-primary-lightest: #DEE2FF;
      --bb-color-foreground-default: #061223;
      --bb-color-foreground-support: #3A495D;
      --bb-color-foreground-on-color: #FFFFFF;
      --bb-color-foreground-brand: #295EFF;
      --bb-color-background-surface-1: #FFFFFF;
      --bb-color-background-surface-2: #F5F7FA;
      --bb-color-background-page: #F5F7FA;
      --bb-color-background-brand-subtle: #DEE2FF;
      --bb-color-border-subtle: #CCD5DF;
      --bb-color-link-default: #295EFF;

      /* Typography — Libre Franklin */
      --bb-font-family: 'Libre Franklin', sans-serif;
      --bb-font-h1: bold 34px/51px var(--bb-font-family);
      --bb-font-h2: bold 24px/36px var(--bb-font-family);
      --bb-font-highlight: 400 18px/27px var(--bb-font-family);
      --bb-font-body-semibold: 600 16px/24px var(--bb-font-family);
      --bb-font-subtitle-semibold: 600 14px/21px var(--bb-font-family);
      --bb-font-subheader: 400 12px/18px var(--bb-font-family);

      /* Elevation / Shadows */
      --bb-shadow-card: 0 2px 8px rgba(16, 47, 67, 0.1);
      --bb-shadow-card-hover: 0 8px 24px rgba(16, 47, 67, 0.1);
      --bb-shadow-large: 0 15px 20px rgba(0, 0, 0, 0.56);

      /* Border Radius */
      --bb-radius-sm: 4px;
      --bb-radius-md: 8px;
      --bb-radius-pill: 102px;
    }

    /* Base styles */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: var(--bb-font-family);
      font-size: 16px;
      line-height: 24px;
      color: var(--bb-color-foreground-default);
      background: var(--bb-color-background-page);
    }

    /* Component styles using BDS tokens */
    /* ... */
  </style>
</head>
<body>
  <!-- BDS-structured markup with data-component attributes -->

  <script>
    // Vanilla JS for interactions
  </script>
</body>
</html>
```

---

## Theme Default

**Always use the Default theme (blue `#295EFF`)** for prototypes. This is the only theme with verified token values from Figma. SHC and Thrive are project-level SCSS overrides not present in Figma.

| Theme | Brand Color | Use in prototypes? |
|-------|-------------|-------------------|
| **Default** | `#295EFF` Blue | **Always** — verified from Figma |
| SHC | Red (unverified) | **No** — unless user provides exact SCSS values |
| Thrive | Green (unverified) | **No** — unless user provides exact SCSS values |

If the user requests SHC or Thrive, still use the Default theme and note:
> "Prototype uses the Default (blue) theme — the BDS Figma source of truth. SHC/Thrive values are project SCSS overrides not available in Figma."

---

## Logo and Header

### Backbase Logo

**NEVER fake the logo.** Do not use a colored `<div>` with a letter, do not use SVG approximations,
do not use Figma asset URLs (they expire), do not use text styled to look like a logo.
Always use the **actual image file**:

```html
<div class="bb-header__logo" data-component="bb-logo">
  <img src="assets/backbase-wordmark.svg" alt="Backbase" style="height: 24px;">
</div>
```

The favicon/icon variant is at `assets/backbase-favicon.png` for small/icon uses.

If the `assets/` directory is missing, warn the user and leave a visible placeholder
(`[LOGO: assets/backbase-wordmark.svg missing]`) — never fabricate a substitute.

### Header Pattern

Always use a **light/white header** with a bottom border — not a dark header:

```css
.header {
  background: var(--bb-color-background-surface-1);
  border-bottom: 1px solid var(--bb-color-border-subtle);
}
```

Header elements (icons, search, text) use dark colors on the light background.

---

## Conventions

### Token Usage
- **Every** color, spacing, font-size, shadow, and radius value must use a `--bb-*` CSS custom property
- Query the Design Tokens 2.0 file if values aren't in the reference files
- Never hardcode hex, px, or font-family directly in component styles

### HTML Structure
- Mirror BDS component structure — buttons, cards, forms, navigation should follow BDS patterns
- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Add `data-component` attributes to identify BDS component equivalents:

```html
<button class="bb-btn bb-btn--primary" data-component="bb-button">Submit</button>
<div class="bb-card" data-component="bb-collapsible-card">...</div>
<div class="bb-notification" data-component="bb-notification">...</div>
```

### Interactions
Simulate with vanilla JS:
- **Navigation**: Show/hide sections, update active states
- **Modals/Dialogs**: Overlay with backdrop, close on escape/click-outside
- **Forms**: Validation states (error, success), field focus effects
- **State changes**: Toggle classes for active/disabled/loading states
- **Tabs/Accordions**: Content switching without page reload

### Visual Fidelity
- Match BDS typography scale exactly (see token values above)
- Use BDS spacing rhythm — consistent padding/margin/gap
- Follow BDS color roles — primary, support, surface, border
- Include component states: default, hover, active, focus, disabled
- Add subtle transitions for state changes (200-300ms ease)
- BDS shadow formula: `rgba(16, 47, 67, 0.1)` — not generic black shadows

### Key Component Patterns

**Button** — Pill shape, SemiBold:
```css
.bb-btn { border-radius: var(--bb-radius-pill); font: var(--bb-font-body-semibold); }
.bb-btn--primary { background: var(--bb-color-primary-default); color: var(--bb-color-foreground-on-color); }
.bb-btn--secondary { background: transparent; border: 1px solid var(--bb-color-primary-default); color: var(--bb-color-primary-default); }
```

**Collapsible Card** — Header/divider/body with optional chevron:
```html
<div class="bb-card" data-component="bb-collapsible-card">
  <div class="bb-card__header">
    <span class="bb-card__title">Title</span>
    <span class="bb-card__chevron">▾</span>
  </div>
  <div class="bb-card__divider"></div>
  <div class="bb-card__body">Content</div>
</div>
```

**Notification** — Icon + title + description + dismiss:
```html
<div class="bb-notification" data-component="bb-notification">
  <span class="bb-notification__icon"><!-- SVG --></span>
  <div class="bb-notification__content">
    <strong class="bb-notification__title">Title</strong>
    <span class="bb-notification__description">Description</span>
  </div>
  <button class="bb-notification__dismiss">×</button>
</div>
```

---

## Quality Checklist

Before delivering a prototype:

- [ ] All colors use `--bb-*` CSS custom properties
- [ ] Typography matches BDS type scale (Libre Franklin, verified sizes)
- [ ] Spacing is consistent and uses token values
- [ ] Shadows use BDS formula `rgba(16, 47, 67, 0.1)`
- [ ] Buttons are pill-shaped (102px radius)
- [ ] Interactive elements have hover/focus/active states
- [ ] File is self-contained — opens in any browser with no dependencies
- [ ] BDS component patterns reflected with `data-component` attributes
- [ ] Uses Default (blue) theme unless user provided exact SHC/Thrive values
- [ ] Logo is `<img src="assets/backbase-wordmark.svg">` — NOT a fake div, letter, or SVG
- [ ] Header is light/white with bottom border
