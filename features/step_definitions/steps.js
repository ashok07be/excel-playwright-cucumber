const { Given, When, Then } = require('@cucumber/cucumber');
const ClickAction = require('../../src/actions/clickAction');
const FillAction = require('../../src/actions/fillAction');
const SelectAction = require('../../src/actions/selectAction');
const NavigateAction = require('../../src/actions/navigateAction');
const ExcelService = require('../../src/services/excelService');
const LocatorResolver = require('../../src/utils/locatorResolver');

const excelService = new ExcelService();
const locatorResolver = new LocatorResolver(excelService);

Given('I navigate to {string}', async function (url) {
    const navigateAction = new NavigateAction();
    console.log(`📍 Navigating to: ${url}`);
    await navigateAction.execute(this.page, url);
});

When('I fill in the {string} with {string}', async function (elementName, value) {
    const selector = await locatorResolver.resolveLocator('LoginPage', elementName);
    const fillAction = new FillAction();
    console.log(`✏️  Filling ${elementName} with: ${value}`);
    await fillAction.execute(this.page, selector, value);
});

When('I click on the {string}', async function (elementName) {
    const selector = await locatorResolver.resolveLocator('LoginPage', elementName);
    const clickAction = new ClickAction();
    console.log(`🖱️  Clicking on: ${elementName}`);
    await clickAction.execute(this.page, selector);
});

When('I select {string} from the {string}', async function (value, elementName) {
    const selector = await locatorResolver.resolveLocator('LoginPage', elementName);
    const selectAction = new SelectAction();
    console.log(`📋 Selecting ${value} from: ${elementName}`);
    await selectAction.execute(this.page, selector, value);
});

Then('I should see the {string}', async function (elementName) {
    const selector = await locatorResolver.resolveLocator('ProductsPage', elementName);
    console.log(`👁️  Verifying element is visible: ${elementName}`);
    const element = await this.page.$(selector);
    if (!element) {
        throw new Error(`Element ${elementName} is not visible`);
    }
    const isVisible = await element.isVisible();
    if (!isVisible) {
        throw new Error(`Element ${elementName} is not visible`);
    }
    console.log(`✅ Element ${elementName} is visible`);
});

Then('I should see the {string} message', async function (elementName) {
    // Check which page we're on by trying to find the element in LoginPage first
    let selector;
    try {
        selector = await locatorResolver.resolveLocator('LoginPage', elementName);
    } catch (e) {
        selector = await locatorResolver.resolveLocator('ProductsPage', elementName);
    }
    
    console.log(`👁️  Verifying message: ${elementName}`);
    const element = await this.page.$(selector);
    if (!element) {
        throw new Error(`Message ${elementName} is not visible`);
    }
    console.log(`✅ Message ${elementName} is visible`);
});