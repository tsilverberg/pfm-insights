/**
 * Web App UAT Helper — Playwright utilities with console/network error capture
 */
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = process.env.UAT_SCREENSHOT_DIR || '/tmp/uat-screenshots';
if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

function setupErrorCapture(page, options = {}) {
  const {
    ignoreConsolePatterns = ['DevTools', 'Download the React DevTools'],
    ignoreNetworkPatterns = ['hot-update', '.woff', '.woff2', 'favicon', '__webpack_hmr', '/_next/webpack'],
  } = options;
  const errors = { console: [], network: [], pageErrors: [], warnings: [] };

  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error') {
      errors.console.push({ url: page.url(), text, ts: new Date().toISOString() });
    } else if (msg.type() === 'warning') {
      const shouldIgnore = ignoreConsolePatterns.some(p => text.includes(p));
      if (!shouldIgnore) {
        errors.warnings.push({ url: page.url(), text: text.substring(0, 300), ts: new Date().toISOString() });
      }
    }
  });

  page.on('pageerror', err => {
    errors.pageErrors.push({ url: page.url(), text: err.message, stack: err.stack?.substring(0, 500), ts: new Date().toISOString() });
  });

  page.on('response', response => {
    const status = response.status();
    const url = response.url();
    if (status >= 400) {
      const shouldIgnore = ignoreNetworkPatterns.some(p => url.includes(p));
      if (!shouldIgnore) {
        errors.network.push({ reqUrl: url, status, page: page.url(), ts: new Date().toISOString() });
      }
    }
  });

  return errors;
}

async function screenshot(page, name) {
  const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filePath = path.join(SCREENSHOT_DIR, `${safeName}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`  📸 ${safeName}.png`);
  return filePath;
}

async function waitForSettle(page, ms = 2000) {
  try { await page.waitForLoadState('networkidle', { timeout: 10000 }); } catch (e) {}
  await page.waitForTimeout(ms);
}

async function checkBrokenI18n(page) {
  return page.evaluate(() => {
    const body = document.body.innerText;
    const broken = [];
    const i18nextRegex = /KEY\s+'[^']+\s*(\([A-Z]{2}\))?\s*'\s+RETURNED\s+AN?\s+OBJECT/gi;
    let match;
    while ((match = i18nextRegex.exec(body)) !== null) broken.push(match[0]);
    const mustache = body.match(/\{\{[a-zA-Z_][a-zA-Z0-9_.]*\}\}/g);
    if (mustache) broken.push(...mustache.map(p => `Unresolved placeholder: ${p}`));
    const missingPatterns = [/\[missing ".*?" translation\]/gi, /⚠️?\s*Missing translation/gi, /translation missing:/gi];
    for (const pattern of missingPatterns) {
      const matches = body.match(pattern);
      if (matches) broken.push(...matches.map(m => `Missing translation: ${m}`));
    }
    return broken;
  });
}

async function checkA11y(page) {
  return page.evaluate(() => {
    const results = {};
    results.h1Count = document.querySelectorAll('h1').length;
    const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    results.headingCount = headings.length;
    results.headingOrder = headings.map(h => parseInt(h.tagName[1]));
    results.hasMain = !!document.querySelector('main, [role="main"]');
    results.hasNav = !!document.querySelector('nav[aria-label], nav[aria-labelledby], [role="navigation"][aria-label]');
    results.hasSkipLink = !!document.querySelector('a[href^="#"][class*="skip"], a[href="#main-content"], .skip-link');
    const imgs = [...document.querySelectorAll('img')];
    results.totalImages = imgs.length;
    results.imgsWithoutAlt = imgs.filter(i => !i.hasAttribute('alt')).length;
    results.buttonsWithoutLabel = [...document.querySelectorAll('button')].filter(
      b => !b.textContent?.trim() && !b.getAttribute('aria-label') && !b.getAttribute('aria-labelledby') && !b.querySelector('img[alt], svg[aria-label]')
    ).length;
    const inputs = [...document.querySelectorAll('input:not([type="hidden"]), textarea, select')];
    results.totalFormFields = inputs.length;
    results.formFieldsWithoutLabel = inputs.filter(input => {
      const id = input.id;
      const hasLabel = id && document.querySelector(`label[for="${id}"]`);
      const hasAriaLabel = input.getAttribute('aria-label') || input.getAttribute('aria-labelledby');
      const hasPlaceholder = input.getAttribute('placeholder');
      const wrappedInLabel = input.closest('label');
      return !hasLabel && !hasAriaLabel && !wrappedInLabel && !hasPlaceholder;
    }).length;
    return results;
  });
}

async function checkEmptyData(page, options = {}) {
  const {
    selectors = ['td', 'dd', '[class*="value"]', '[class*="stat"]', '[class*="amount"]', '[class*="price"]', '[class*="total"]', '[class*="count"]', '[class*="number"]', '[data-testid]'],
    suspiciousValues = ['---', '—', 'NaN', 'undefined', 'null', '[object Object]', '$0', '$0.00', '0.00', 'N/A', 'loading...', 'Loading...'],
  } = options;
  return page.evaluate(({ selectors, suspiciousValues }) => {
    const suspicious = [];
    const cells = document.querySelectorAll(selectors.join(', '));
    cells.forEach(el => {
      const text = el.textContent?.trim();
      if (text && suspiciousValues.includes(text)) {
        suspicious.push({ tag: el.tagName.toLowerCase(), class: el.className?.toString().substring(0, 80) || '', text, testId: el.getAttribute('data-testid') || '' });
      }
    });
    return suspicious;
  }, { selectors, suspiciousValues });
}

async function checkResponsiveOverflow(page) {
  return page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const viewWidth = document.documentElement.clientWidth;
    return { hasOverflow: docWidth > viewWidth, documentWidth: docWidth, viewportWidth: viewWidth };
  });
}

function printReport(screenName, checks, errors) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  ${screenName}`);
  console.log('═'.repeat(60));
  let pass = 0, fail = 0;
  for (const [name, result] of Object.entries(checks)) {
    const status = result ? '✅' : '❌';
    console.log(`  ${status} ${name}`);
    result ? pass++ : fail++;
  }
  if (errors.console.length > 0) {
    console.log(`  ⚠️  Console errors: ${errors.console.length}`);
    errors.console.slice(-5).forEach(e => console.log(`     ❌ ${e.text.substring(0, 150)}`));
  }
  if (errors.network.length > 0) {
    console.log(`  ⚠️  Network errors: ${errors.network.length}`);
    errors.network.slice(-5).forEach(e => console.log(`     🔴 HTTP ${e.status}: ${e.reqUrl.substring(0, 120)}`));
  }
  console.log(`  Score: ${pass}/${pass + fail} checks passed`);
  return { pass, fail };
}

function printSummary(errors, screenResults) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log('  UAT SUMMARY');
  console.log('═'.repeat(60));
  if (screenResults.length > 0) {
    console.log('\n  Screen Results:');
    let totalPass = 0, totalFail = 0;
    for (const r of screenResults) {
      const pct = Math.round((r.pass / (r.pass + r.fail)) * 100);
      const icon = r.fail === 0 ? '✅' : '⚠️';
      console.log(`    ${icon} ${r.screen}: ${r.pass}/${r.pass + r.fail} (${pct}%)`);
      totalPass += r.pass;
      totalFail += r.fail;
    }
    const totalPct = Math.round((totalPass / (totalPass + totalFail)) * 100);
    console.log(`\n  Overall: ${totalPass}/${totalPass + totalFail} checks passed (${totalPct}%)`);
  }
  console.log(`\n  Console errors: ${errors.console.length}`);
  if (errors.console.length > 0) {
    const unique = [...new Set(errors.console.map(e => e.text.substring(0, 100)))];
    unique.slice(0, 10).forEach(e => console.log(`    ❌ ${e}`));
  }
  console.log(`  Network errors: ${errors.network.length}`);
  if (errors.network.length > 0) {
    const unique = [...new Set(errors.network.map(e => `HTTP ${e.status}: ${e.reqUrl.substring(0, 80)}`))];
    unique.slice(0, 10).forEach(e => console.log(`    🔴 ${e}`));
  }
  console.log(`  Page crashes: ${errors.pageErrors.length}`);
  console.log(`  Warnings: ${errors.warnings.length}`);
  console.log('═'.repeat(60));
}

module.exports = { setupErrorCapture, screenshot, waitForSettle, checkBrokenI18n, checkA11y, checkEmptyData, checkResponsiveOverflow, printReport, printSummary, SCREENSHOT_DIR };
