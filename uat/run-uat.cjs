/**
 * PFM Banking — Full UAT Runner
 * Uses webapp-uat skill methodology with Playwright
 */
const { chromium } = require('playwright');
const { setupErrorCapture, screenshot, waitForSettle, checkBrokenI18n, checkA11y, checkEmptyData, checkResponsiveOverflow, printReport, printSummary } = require('./test-helper.cjs');

const BASE_URL = process.env.BASE_URL || 'http://localhost:8100';

const SCREENS = [
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
  { name: 'Account Settings', path: '/account/acc-1/settings' },
  { name: 'Account More', path: '/account/acc-1/more' },
  { name: 'Account Access', path: '/account/acc-1/access' },
  { name: 'Account Share', path: '/account/acc-1/share' },
  { name: 'Cards', path: '/cards' },
  { name: 'Send Money', path: '/send' },
  { name: 'Receive Money', path: '/receive' },
  { name: 'Request Money', path: '/request' },
  { name: 'Transfer', path: '/transfer' },
  { name: 'Child Account', path: '/child-account' },
];

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

  const screenResults = [];

  console.log(`\n🏦 PFM Banking — Full UAT`);
  console.log(`📱 Device: iPhone 15 Pro (390×844 @2x)`);
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log(`📋 Screens: ${SCREENS.length}\n`);

  for (const screen of SCREENS) {
    const screenErrors = { console: [], network: [], pageErrors: [], warnings: [] };

    // Track errors for this screen only
    const consoleStart = globalErrors.console.length;
    const networkStart = globalErrors.network.length;
    const pageErrorStart = globalErrors.pageErrors.length;

    try {
      // Navigate
      await page.goto(`${BASE_URL}${screen.path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await waitForSettle(page, 2000);

      // Screenshot
      await screenshot(page, screen.name.replace(/\s+/g, '-').toLowerCase());

      // Collect screen-specific errors
      screenErrors.console = globalErrors.console.slice(consoleStart);
      screenErrors.network = globalErrors.network.slice(networkStart);
      screenErrors.pageErrors = globalErrors.pageErrors.slice(pageErrorStart);

      // Run checks
      const checks = {};

      // 1. Page loaded (not blank)
      const bodyText = await page.evaluate(() => document.body.innerText.trim());
      checks['Page has content'] = bodyText.length > 10;

      // 2. No console errors
      checks['No console errors'] = screenErrors.console.length === 0;

      // 3. No network errors
      checks['No network errors'] = screenErrors.network.length === 0;

      // 4. No page crashes
      checks['No page crashes'] = screenErrors.pageErrors.length === 0;

      // 5. Accessibility
      const a11y = await checkA11y(page);
      checks['Images have alt text'] = a11y.imgsWithoutAlt === 0;
      checks['Buttons have labels'] = a11y.buttonsWithoutLabel === 0;
      checks['Form fields have labels'] = a11y.formFieldsWithoutLabel === 0;

      // 6. i18n
      const i18nIssues = await checkBrokenI18n(page);
      checks['No broken i18n keys'] = i18nIssues.length === 0;
      if (i18nIssues.length > 0) {
        console.log(`    i18n issues: ${i18nIssues.join(', ')}`);
      }

      // 7. Data integrity
      const emptyData = await checkEmptyData(page);
      checks['No placeholder/empty data'] = emptyData.length === 0;
      if (emptyData.length > 0) {
        console.log(`    Empty data: ${JSON.stringify(emptyData.slice(0, 3))}`);
      }

      // 8. Responsive
      const overflow = await checkResponsiveOverflow(page);
      checks['No horizontal overflow'] = !overflow.hasOverflow;
      if (overflow.hasOverflow) {
        console.log(`    Overflow: doc=${overflow.documentWidth}px, viewport=${overflow.viewportWidth}px`);
      }

      // Print report for this screen
      const result = printReport(screen.name, checks, screenErrors);
      screenResults.push({ screen: screen.name, ...result });

    } catch (err) {
      console.log(`\n❌ ${screen.name}: FAILED TO LOAD — ${err.message.substring(0, 100)}`);
      screenResults.push({ screen: screen.name, pass: 0, fail: 1 });
    }
  }

  // Final summary
  printSummary(globalErrors, screenResults);

  await browser.close();
  process.exit(globalErrors.pageErrors.length > 0 ? 1 : 0);
})();
