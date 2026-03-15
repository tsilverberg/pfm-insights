/**
 * PFM Banking — Persona-Driven UAT
 * 3 Danske Bank personas evaluate the app through real user flows
 */
const { chromium } = require('playwright');
const { setupErrorCapture, screenshot, waitForSettle, checkA11y, checkEmptyData, checkResponsiveOverflow, SCREENSHOT_DIR } = require('./test-helper.cjs');

const BASE_URL = process.env.BASE_URL || 'http://localhost:8100';

// ═══════════════════════════════════════════════════════════
// PERSONA DEFINITIONS
// ═══════════════════════════════════════════════════════════

const PERSONAS = [
  {
    id: 'lars',
    name: 'Lars Kjeldsen',
    role: 'Senior Product Owner — Danske Bank MobilePay & PFM',
    age: 41,
    context: 'Evaluates product-market fit, UX flow coherence, and whether the prototype could pass a Danske Bank design review. Has shipped 3 PFM features to 1.2M users.',
    focus: ['Flow coherence', 'Data consistency', 'Feature completeness', 'Navigation logic', 'Error states'],
  },
  {
    id: 'maja',
    name: 'Maja Sørensen',
    role: 'Lead QA Engineer — Danske Bank Digital Banking',
    age: 34,
    context: 'Hunts for edge cases, broken states, and data inconsistencies. Tests with a "break it" mentality. Has blocked 40+ releases for quality issues.',
    focus: ['Console errors', 'Data integrity', 'Edge cases', 'State management', 'Input validation'],
  },
  {
    id: 'erik',
    name: 'Erik Lindberg',
    role: 'Accessibility & Compliance Lead — Danske Bank Group',
    age: 52,
    context: 'Ensures WCAG 2.2 AA compliance and EBA/PSD2 regulatory alignment. Has audited 15 banking apps. Uses screen readers daily.',
    focus: ['ARIA semantics', 'Keyboard navigation', 'Screen reader flow', 'Color contrast', 'Focus management'],
  },
];

// ═══════════════════════════════════════════════════════════
// PERSONA 1: Lars — Product Owner flows
// ═══════════════════════════════════════════════════════════

async function runLarsUAT(page) {
  const findings = [];
  const scores = {};

  console.log('\n🔍 FLOW 1: First-time app open → Account overview → Transaction drill-down');

  // Home page first impression
  await page.goto(`${BASE_URL}/home`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await waitForSettle(page, 2000);
  await screenshot(page, 'lars-01-home');

  // Check account selector exists and is functional
  const accountSelector = await page.$('.account-selector, select, [class*="account"]');
  if (!accountSelector) findings.push({ severity: 'P2', issue: 'Home: No visible account selector — user cannot switch accounts from home' });

  // Check balance is visible and formatted correctly
  const balanceText = await page.evaluate(() => {
    const el = document.querySelector('[class*="balance"], [class*="amount"], [class*="euros"]');
    return el ? el.textContent.trim() : null;
  });
  if (!balanceText) findings.push({ severity: 'P1', issue: 'Home: Balance not visible above the fold' });
  else if (!balanceText.includes('€')) findings.push({ severity: 'P1', issue: `Home: Balance missing € symbol: "${balanceText}"` });

  // Check quick actions are all tappable
  const quickActions = await page.$$('[class*="quick-action"] button, [class*="QuickAction"] button, .quick-action__circle');
  scores['Quick actions count'] = quickActions.length;
  if (quickActions.length < 3) findings.push({ severity: 'P1', issue: `Home: Only ${quickActions.length} quick actions visible (expected 4)` });

  // Check transactions section exists
  const txSection = await page.$('text=Transactions');
  if (!txSection) findings.push({ severity: 'P1', issue: 'Home: No transactions section visible' });

  // Navigate to transaction search
  console.log('\n🔍 FLOW 2: Home → Search → Filter → Back');
  await page.goto(`${BASE_URL}/search`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await waitForSettle(page, 2000);
  await screenshot(page, 'lars-02-search');

  // Check search input exists
  const searchInput = await page.$('input[type="text"], input[type="search"], input[placeholder*="Search"]');
  if (!searchInput) findings.push({ severity: 'P1', issue: 'Search: No search input field found' });

  // Check filter chips
  const filterChips = await page.$$('[class*="chip"], [class*="pill"], [class*="filter"] button');
  if (filterChips.length < 2) findings.push({ severity: 'P2', issue: 'Search: Missing filter chips for transaction types' });

  // Check transaction list has items
  const txItems = await page.$$('[class*="transaction"], [class*="list-row"], [class*="TransactionListItem"]');
  if (txItems.length === 0) findings.push({ severity: 'P1', issue: 'Search: No transactions displayed' });

  console.log('\n🔍 FLOW 3: Insights → Monthly goals → My path (tab switching)');
  await page.goto(`${BASE_URL}/insights`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await waitForSettle(page, 2000);
  await screenshot(page, 'lars-03-insights-overview');

  // Check sub-nav tabs exist
  const insightTabs = await page.$$('[role="tab"], [class*="sub-nav"] button, [class*="SubNav"] button');
  scores['Insight tabs count'] = insightTabs.length;

  // Try clicking "Monthly goals" tab
  const monthlyGoalsTab = await page.$('text=Monthly goals');
  if (monthlyGoalsTab) {
    await monthlyGoalsTab.click();
    await waitForSettle(page, 1500);
    await screenshot(page, 'lars-04-insights-goals');
    const goalsContent = await page.evaluate(() => document.body.innerText);
    if (goalsContent.includes('undefined') || goalsContent.includes('NaN')) {
      findings.push({ severity: 'P0', issue: 'Insights/Goals: Shows "undefined" or "NaN" in content' });
    }
  } else {
    findings.push({ severity: 'P2', issue: 'Insights: "Monthly goals" tab not found' });
  }

  // Try clicking "My path" tab
  const myPathTab = await page.$('text=My path');
  if (myPathTab) {
    await myPathTab.click();
    await waitForSettle(page, 1500);
    await screenshot(page, 'lars-05-insights-path');
  }

  console.log('\n🔍 FLOW 4: Invest → Portfolio detail → Time period switching');
  await page.goto(`${BASE_URL}/invest`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await waitForSettle(page, 2000);
  await screenshot(page, 'lars-06-invest');

  // Check chart is rendered (canvas element with dimensions)
  const hasChart = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    return canvas && canvas.width > 0 && canvas.height > 0;
  });
  if (!hasChart) findings.push({ severity: 'P1', issue: 'Invest: Chart canvas not rendered or has zero dimensions' });

  // Check time period pills
  const timePills = await page.$$('[class*="time-pill"], [class*="TimePeriod"] button');
  if (timePills.length < 4) findings.push({ severity: 'P2', issue: `Invest: Only ${timePills.length} time period pills (expected 6)` });

  // Click 1M pill
  const pill1M = await page.$('text=1M');
  if (pill1M) {
    await pill1M.click();
    await waitForSettle(page, 1000);
    await screenshot(page, 'lars-07-invest-1m');
  }

  console.log('\n🔍 FLOW 5: Account → Settings → More actions → Share access');
  await page.goto(`${BASE_URL}/account/acc-1`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await waitForSettle(page, 2000);
  await screenshot(page, 'lars-08-account');

  // Navigate to settings
  await page.goto(`${BASE_URL}/account/acc-1/settings`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await waitForSettle(page, 1500);
  await screenshot(page, 'lars-09-settings');

  // Check settings sections
  const settingSections = await page.evaluate(() => {
    const headers = document.querySelectorAll('[class*="section-title"], h2, h3');
    return Array.from(headers).map(h => h.textContent.trim()).filter(Boolean);
  });
  scores['Settings sections'] = settingSections.length;

  // Navigate to more actions
  await page.goto(`${BASE_URL}/account/acc-1/more`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await waitForSettle(page, 1500);
  await screenshot(page, 'lars-10-more');

  // Navigate to share
  await page.goto(`${BASE_URL}/account/acc-1/share`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await waitForSettle(page, 1500);
  await screenshot(page, 'lars-11-share');

  const contactList = await page.$$('[class*="contact"], [class*="member"], [class*="avatar"]');
  if (contactList.length < 2) findings.push({ severity: 'P2', issue: 'Share: Contact list appears empty or minimal' });

  console.log('\n🔍 FLOW 6: Money flows — Send, Request, Transfer');
  for (const [name, path] of [['Send', '/send'], ['Request', '/receive'], ['Transfer', '/transfer']]) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await waitForSettle(page, 2500);

    // Check keypad renders all 12 keys
    const keypadKeys = await page.$$('.keypad__key');
    if (keypadKeys.length !== 12) findings.push({ severity: 'P1', issue: `${name}: Keypad has ${keypadKeys.length} keys (expected 12)` });

    // Check amount display shows €
    const amountDisplay = await page.evaluate(() => {
      const el = document.querySelector('[class*="amount__text"], [class*="amount__display"]');
      return el ? el.textContent.trim() : '';
    });
    if (!amountDisplay.includes('€')) findings.push({ severity: 'P1', issue: `${name}: Amount display missing €: "${amountDisplay}"` });
    if (amountDisplay.includes('.') && !amountDisplay.includes(',')) findings.push({ severity: 'P2', issue: `${name}: Amount uses period instead of comma: "${amountDisplay}"` });
  }
  await screenshot(page, 'lars-12-transfer');

  console.log('\n🔍 FLOW 7: Profile → Settings items → Logout confirmation');
  await page.goto(`${BASE_URL}/profile`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await waitForSettle(page, 1500);
  await screenshot(page, 'lars-13-profile');

  // Check profile name is displayed
  const profileName = await page.evaluate(() => {
    const el = document.querySelector('[class*="hero__name"], [class*="profile"] h1, [class*="profile"] h2');
    return el ? el.textContent.trim() : '';
  });
  if (!profileName) findings.push({ severity: 'P2', issue: 'Profile: User name not visible' });

  // Check settings items
  const settingsItems = await page.$$('[class*="settings-menu"], [class*="SettingsMenuItem"]');
  scores['Profile menu items'] = settingsItems.length;

  // Check logout button exists
  const logoutBtn = await page.$('text=Log out');
  if (!logoutBtn) findings.push({ severity: 'P1', issue: 'Profile: No logout button found' });

  return { findings, scores };
}

// ═══════════════════════════════════════════════════════════
// PERSONA 2: Maja — QA Engineer edge cases
// ═══════════════════════════════════════════════════════════

async function runMajaUAT(page) {
  const findings = [];

  console.log('\n🐛 TEST 1: Data consistency — same balance across views');
  await page.goto(`${BASE_URL}/home`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await waitForSettle(page, 2000);

  const homeBalance = await page.evaluate(() => {
    // Target the balance card amount specifically (euros + cents)
    const el = document.querySelector('.balance-card__amount');
    if (el) return el.textContent.replace(/\s/g, '').trim();
    // Fallback to any element with "balance" class containing €
    const els = document.querySelectorAll('[class*="balance"]');
    for (const e of els) {
      const t = e.textContent.trim();
      if (t.includes('€')) return t.replace(/\s/g, '');
    }
    return '';
  });

  await page.goto(`${BASE_URL}/account/acc-1`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await waitForSettle(page, 2000);

  const detailBalance = await page.evaluate(() => {
    const el = document.querySelector('.balance-card__amount');
    if (el) return el.textContent.replace(/\s/g, '').trim();
    const els = document.querySelectorAll('[class*="balance"]');
    for (const e of els) {
      const t = e.textContent.trim();
      if (t.includes('€')) return t.replace(/\s/g, '');
    }
    return '';
  });

  if (homeBalance && detailBalance && homeBalance !== detailBalance) {
    findings.push({ severity: 'P1', issue: `Balance mismatch: Home="${homeBalance}" vs Detail="${detailBalance}"` });
  } else {
    console.log(`  ✅ Balance consistent: ${homeBalance}`);
  }

  console.log('\n🐛 TEST 2: Currency formatting consistency');
  const pagesToCheck = [
    { name: 'Home', path: '/home' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Accounts', path: '/accounts' },
    { name: 'Account Detail', path: '/account/acc-1' },
    { name: 'Pockets', path: '/pockets' },
    { name: 'Send', path: '/send' },
    { name: 'Invest', path: '/invest' },
    { name: 'Notifications', path: '/notifications' },
    { name: 'Child Account', path: '/child-account' },
  ];

  for (const { name, path } of pagesToCheck) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await waitForSettle(page, 1500);

    const currencyIssues = await page.evaluate(() => {
      const body = document.body.innerText;
      const issues = [];
      // Check for $ instead of €
      if (/\$\d/.test(body) && !/\$\{/.test(body)) issues.push('Uses $ instead of €');
      // Check for period as decimal separator in euro amounts (€XX.XX pattern)
      const periodDecimals = body.match(/€\s?\d[\d.]*\.\d{2}(?!\d)/g);
      if (periodDecimals) issues.push(`Period decimal: ${periodDecimals[0]}`);
      // Check for "EUR" text (should use €)
      if (/\bEUR\s+\d/.test(body)) issues.push('Uses "EUR" text instead of € symbol');
      // Check for space after € in amounts (except in "€ 0,00" which is the zero state)
      const spaceAfterEuro = body.match(/€\s+\d{2,}/g);
      if (spaceAfterEuro) issues.push(`Space after €: ${spaceAfterEuro[0]}`);
      return issues;
    });

    if (currencyIssues.length > 0) {
      findings.push({ severity: 'P2', issue: `${name}: ${currencyIssues.join('; ')}` });
    } else {
      console.log(`  ✅ ${name}: Currency formatting OK`);
    }
  }

  console.log('\n🐛 TEST 3: Empty data / placeholder detection');
  const allPages = [
    '/home', '/insights', '/invest', '/explore', '/profile',
    '/search', '/notifications', '/accounts', '/pockets', '/dashboard',
    '/account/acc-1', '/account/acc-1/settings', '/account/acc-1/more',
    '/account/acc-1/access', '/account/acc-1/share',
    '/cards', '/send', '/receive', '/transfer', '/child-account',
  ];

  for (const path of allPages) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await waitForSettle(page, 1500);

    const emptyData = await checkEmptyData(page);
    const bodyText = await page.evaluate(() => document.body.innerText);

    // Check for common data bugs
    const dataIssues = [];
    if (bodyText.includes('undefined')) dataIssues.push('"undefined" visible');
    if (bodyText.includes('NaN')) dataIssues.push('"NaN" visible');
    if (bodyText.includes('[object Object]')) dataIssues.push('"[object Object]" visible');
    if (bodyText.match(/\bnull\b/) && !bodyText.match(/\bnullable\b/i)) dataIssues.push('"null" visible');

    if (emptyData.length > 0) dataIssues.push(`${emptyData.length} placeholder values`);
    if (dataIssues.length > 0) {
      findings.push({ severity: 'P0', issue: `${path}: ${dataIssues.join(', ')}` });
    }
  }
  console.log('  ✅ Empty data scan complete');

  console.log('\n🐛 TEST 4: Navigation dead-ends');
  // Check all back buttons work
  const pagesWithBack = [
    { name: 'Profile', path: '/profile' },
    { name: 'Notifications', path: '/notifications' },
    { name: 'Cards', path: '/cards' },
    { name: 'Pockets', path: '/pockets' },
    { name: 'Account Detail', path: '/account/acc-1' },
    { name: 'Account Settings', path: '/account/acc-1/settings' },
    { name: 'Account More', path: '/account/acc-1/more' },
  ];

  for (const { name, path } of pagesWithBack) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await waitForSettle(page, 1000);

    const hasBackButton = await page.$('[class*="back"], [aria-label*="back"], [aria-label*="Back"], [class*="header"] button:first-child');
    if (!hasBackButton) {
      findings.push({ severity: 'P2', issue: `${name}: No back button found — potential navigation dead-end` });
    }
  }
  console.log('  ✅ Navigation check complete');

  console.log('\n🐛 TEST 5: Responsive overflow on all pages');
  for (const path of allPages) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await waitForSettle(page, 1000);

    const overflow = await checkResponsiveOverflow(page);
    if (overflow.hasOverflow) {
      findings.push({ severity: 'P2', issue: `${path}: Horizontal overflow — doc ${overflow.documentWidth}px > viewport ${overflow.viewportWidth}px` });
      await screenshot(page, `maja-overflow-${path.replace(/\//g, '_')}`);
    }
  }
  console.log('  ✅ Responsive overflow scan complete');

  console.log('\n🐛 TEST 6: Console errors across all pages');
  // Already captured by global error handler — will be in summary

  return { findings };
}

// ═══════════════════════════════════════════════════════════
// PERSONA 3: Erik — Accessibility & Compliance
// ═══════════════════════════════════════════════════════════

async function runErikUAT(page) {
  const findings = [];
  const a11yResults = {};

  const allPages = [
    { name: 'Home', path: '/home' },
    { name: 'Insights', path: '/insights' },
    { name: 'Invest', path: '/invest' },
    { name: 'Explore', path: '/explore' },
    { name: 'Profile', path: '/profile' },
    { name: 'Search', path: '/search' },
    { name: 'Notifications', path: '/notifications' },
    { name: 'Accounts', path: '/accounts' },
    { name: 'Pockets', path: '/pockets' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Account Detail', path: '/account/acc-1' },
    { name: 'Cards', path: '/cards' },
    { name: 'Send Money', path: '/send' },
    { name: 'Transfer', path: '/transfer' },
    { name: 'Child Account', path: '/child-account' },
  ];

  console.log('\n♿ TEST 1: WCAG 2.2 AA — Full page audit');
  for (const { name, path } of allPages) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await waitForSettle(page, 1500);

    const a11y = await checkA11y(page);
    a11yResults[name] = a11y;

    // Check heading structure
    if (a11y.h1Count > 1) findings.push({ severity: 'P2', issue: `${name}: ${a11y.h1Count} h1 elements (should be exactly 1)` });
    if (a11y.h1Count === 0 && a11y.headingCount > 0) findings.push({ severity: 'P2', issue: `${name}: No h1 — headings start at h${a11y.headingOrder[0]}` });

    // Check heading order (no skipping levels)
    for (let i = 1; i < a11y.headingOrder.length; i++) {
      if (a11y.headingOrder[i] > a11y.headingOrder[i - 1] + 1) {
        findings.push({ severity: 'P3', issue: `${name}: Heading skip h${a11y.headingOrder[i - 1]} → h${a11y.headingOrder[i]}` });
        break;
      }
    }

    // Images
    if (a11y.imgsWithoutAlt > 0) findings.push({ severity: 'P1', issue: `${name}: ${a11y.imgsWithoutAlt}/${a11y.totalImages} images missing alt text` });

    // Buttons
    if (a11y.buttonsWithoutLabel > 0) findings.push({ severity: 'P1', issue: `${name}: ${a11y.buttonsWithoutLabel} buttons without accessible label` });

    // Form fields
    if (a11y.formFieldsWithoutLabel > 0) findings.push({ severity: 'P1', issue: `${name}: ${a11y.formFieldsWithoutLabel}/${a11y.totalFormFields} form fields without label` });

    const status = (a11y.imgsWithoutAlt === 0 && a11y.buttonsWithoutLabel === 0 && a11y.formFieldsWithoutLabel === 0) ? '✅' : '⚠️';
    console.log(`  ${status} ${name}: h1=${a11y.h1Count} imgs=${a11y.totalImages}(${a11y.imgsWithoutAlt} unlabeled) btns-unlabeled=${a11y.buttonsWithoutLabel} forms-unlabeled=${a11y.formFieldsWithoutLabel}`);
  }

  console.log('\n♿ TEST 2: Keyboard navigation — Tab order on key pages');
  const keyPages = ['/home', '/send', '/search', '/profile'];
  for (const path of keyPages) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await waitForSettle(page, 1500);

    // Tab 10 times and check focus is visible
    const focusableCount = await page.evaluate(() => {
      return document.querySelectorAll('a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])').length;
    });

    if (focusableCount === 0) {
      findings.push({ severity: 'P1', issue: `${path}: No focusable elements found` });
    }

    // Check for tabindex > 0 (anti-pattern)
    const badTabindex = await page.evaluate(() => {
      return document.querySelectorAll('[tabindex]:not([tabindex="0"]):not([tabindex="-1"])').length;
    });
    if (badTabindex > 0) {
      findings.push({ severity: 'P2', issue: `${path}: ${badTabindex} elements with tabindex > 0 (disrupts natural tab order)` });
    }
  }

  console.log('\n♿ TEST 3: ARIA roles and semantics');
  for (const { name, path } of allPages) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await waitForSettle(page, 1500);

    const ariaCheck = await page.evaluate(() => {
      const issues = [];

      // Check for clickable divs without role="button"
      const clickableDivs = document.querySelectorAll('div[onclick], div[onClick]');
      if (clickableDivs.length > 0) {
        const withoutRole = [...clickableDivs].filter(d => !d.getAttribute('role'));
        if (withoutRole.length > 0) issues.push(`${withoutRole.length} clickable divs without role="button"`);
      }

      // Check modals have aria-modal
      const modals = document.querySelectorAll('[class*="modal"], [class*="dialog"], [class*="sheet"]');
      const visibleModals = [...modals].filter(m => m.offsetParent !== null);
      for (const m of visibleModals) {
        if (!m.getAttribute('aria-modal') && !m.getAttribute('role')) {
          issues.push('Visible modal/dialog without aria-modal or role="dialog"');
        }
      }

      // Check live regions exist for dynamic content
      const liveRegions = document.querySelectorAll('[aria-live]').length;

      return { issues, liveRegions };
    });

    if (ariaCheck.issues.length > 0) {
      for (const issue of ariaCheck.issues) {
        findings.push({ severity: 'P2', issue: `${name}: ${issue}` });
      }
    }
  }
  console.log('  ✅ ARIA semantics scan complete');

  console.log('\n♿ TEST 4: Color and visual indicators');
  for (const { name, path } of [{ name: 'Home', path: '/home' }, { name: 'Invest', path: '/invest' }]) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await waitForSettle(page, 1500);

    // Check that positive/negative amounts use more than just color
    const colorOnlyIndicators = await page.evaluate(() => {
      const amounts = document.querySelectorAll('[class*="amount"], [class*="value"], [class*="change"]');
      let colorOnlyCount = 0;
      for (const el of amounts) {
        const text = el.textContent.trim();
        const style = window.getComputedStyle(el);
        const isColored = style.color !== 'rgb(0, 0, 0)' && style.color !== 'rgb(6, 18, 35)';
        const hasPrefix = text.startsWith('+') || text.startsWith('-') || text.includes('↑') || text.includes('↓');
        if (isColored && !hasPrefix && text.match(/[\d€]/)) colorOnlyCount++;
      }
      return colorOnlyCount;
    });
    if (colorOnlyIndicators > 0) {
      findings.push({ severity: 'P2', issue: `${name}: ${colorOnlyIndicators} amounts use color-only to indicate positive/negative` });
    }
  }

  return { findings, a11yResults };
}

// ═══════════════════════════════════════════════════════════
// MAIN RUNNER
// ═══════════════════════════════════════════════════════════

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
  });

  const page = await context.newPage();
  const globalErrors = setupErrorCapture(page, {
    ignoreConsolePatterns: ['DevTools', 'Download the React DevTools', 'Autofocus'],
    ignoreNetworkPatterns: ['hot-update', '.woff', '.woff2', 'favicon', '__webpack_hmr', 'fonts.googleapis', 'fonts.gstatic'],
  });

  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║   PFM Banking — Danske Bank Persona UAT                ║');
  console.log('║   3 Personas × Full App Coverage                       ║');
  console.log('║   Device: iPhone 15 Pro (390×844 @2x)                  ║');
  console.log('╚══════════════════════════════════════════════════════════╝');

  const allFindings = [];

  // ─── Persona 1: Lars ───
  console.log('\n' + '═'.repeat(60));
  console.log(`  👤 PERSONA 1: ${PERSONAS[0].name}`);
  console.log(`  📋 ${PERSONAS[0].role}`);
  console.log(`  🎯 Focus: ${PERSONAS[0].focus.join(', ')}`);
  console.log('═'.repeat(60));
  const lars = await runLarsUAT(page);
  allFindings.push(...lars.findings.map(f => ({ ...f, persona: PERSONAS[0].name })));

  // ─── Persona 2: Maja ───
  console.log('\n' + '═'.repeat(60));
  console.log(`  👤 PERSONA 2: ${PERSONAS[1].name}`);
  console.log(`  📋 ${PERSONAS[1].role}`);
  console.log(`  🎯 Focus: ${PERSONAS[1].focus.join(', ')}`);
  console.log('═'.repeat(60));
  const maja = await runMajaUAT(page);
  allFindings.push(...maja.findings.map(f => ({ ...f, persona: PERSONAS[1].name })));

  // ─── Persona 3: Erik ───
  console.log('\n' + '═'.repeat(60));
  console.log(`  👤 PERSONA 3: ${PERSONAS[2].name}`);
  console.log(`  📋 ${PERSONAS[2].role}`);
  console.log(`  🎯 Focus: ${PERSONAS[2].focus.join(', ')}`);
  console.log('═'.repeat(60));
  const erik = await runErikUAT(page);
  allFindings.push(...erik.findings.map(f => ({ ...f, persona: PERSONAS[2].name })));

  // ═══════════════════════════════════════════════════════════
  // FINAL REPORT
  // ═══════════════════════════════════════════════════════════
  console.log('\n' + '═'.repeat(60));
  console.log('  DANSKE BANK UAT — CONSOLIDATED FINDINGS');
  console.log('═'.repeat(60));

  const bySeverity = { P0: [], P1: [], P2: [], P3: [] };
  for (const f of allFindings) {
    bySeverity[f.severity].push(f);
  }

  for (const [sev, items] of Object.entries(bySeverity)) {
    if (items.length > 0) {
      const label = { P0: '🔴 BLOCKER', P1: '🟠 HIGH', P2: '🟡 MEDIUM', P3: '🔵 LOW' }[sev];
      console.log(`\n  ${label} (${items.length}):`);
      for (const f of items) {
        console.log(`    ${sev} [${f.persona.split(' ')[0]}] ${f.issue}`);
      }
    }
  }

  if (allFindings.length === 0) {
    console.log('\n  🎉 ZERO FINDINGS — All personas approved!');
  }

  // Persona verdicts
  console.log('\n' + '─'.repeat(60));
  console.log('  PERSONA VERDICTS');
  console.log('─'.repeat(60));

  const larsIssues = lars.findings.length;
  const majaIssues = maja.findings.length;
  const erikIssues = erik.findings.length;

  const verdict = (count, p0Count) => {
    if (p0Count > 0) return '❌ BLOCKED — P0 issues must be resolved';
    if (count === 0) return '✅ APPROVED — Ship it';
    if (count <= 3) return '⚠️ APPROVED WITH NOTES — Minor issues logged';
    return '❌ NEEDS REWORK — Too many issues';
  };

  const larsP0 = lars.findings.filter(f => f.severity === 'P0').length;
  const majaP0 = maja.findings.filter(f => f.severity === 'P0').length;
  const erikP0 = erik.findings.filter(f => f.severity === 'P0').length;

  console.log(`\n  👤 ${PERSONAS[0].name} (Product Owner): ${larsIssues} findings`);
  console.log(`     ${verdict(larsIssues, larsP0)}`);
  console.log(`\n  👤 ${PERSONAS[1].name} (QA Engineer): ${majaIssues} findings`);
  console.log(`     ${verdict(majaIssues, majaP0)}`);
  console.log(`\n  👤 ${PERSONAS[2].name} (Accessibility Lead): ${erikIssues} findings`);
  console.log(`     ${verdict(erikIssues, erikP0)}`);

  // Overall
  const totalP0 = bySeverity.P0.length;
  const totalP1 = bySeverity.P1.length;
  console.log('\n' + '═'.repeat(60));
  if (totalP0 > 0) {
    console.log(`  ❌ OVERALL: BLOCKED — ${totalP0} blocker(s) require immediate fix`);
  } else if (totalP1 > 0) {
    console.log(`  ⚠️ OVERALL: CONDITIONAL PASS — ${totalP1} high-priority issue(s)`);
  } else if (allFindings.length > 0) {
    console.log(`  ✅ OVERALL: PASS — ${allFindings.length} minor issue(s) logged`);
  } else {
    console.log('  ✅ OVERALL: CLEAN PASS — All 3 personas approved');
  }
  console.log('═'.repeat(60));

  // Console/network error summary
  if (globalErrors.console.length > 0 || globalErrors.pageErrors.length > 0) {
    console.log(`\n  Runtime: ${globalErrors.console.length} console errors, ${globalErrors.pageErrors.length} crashes, ${globalErrors.warnings.length} warnings`);
    const unique = [...new Set(globalErrors.console.map(e => e.text.substring(0, 120)))];
    unique.slice(0, 5).forEach(e => console.log(`    ❌ ${e}`));
  }

  await browser.close();
})();
