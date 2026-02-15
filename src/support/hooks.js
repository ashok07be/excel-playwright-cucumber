const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;
let context;
let page;

Before(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
});

After(async () => {
    await page.close();
    await context.close();
    await browser.close();
});