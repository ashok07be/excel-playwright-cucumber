const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

Before(async function () {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Attach to world object so steps can access them
    this.browser = browser;
    this.context = context;
    this.page = page;
});

After(async function () {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});