const { Given, When, Then } = require('@cucumber/cucumber');
const ClickAction = require('../../src/actions/clickAction');
const FillAction = require('../../src/actions/fillAction');
const SelectAction = require('../../src/actions/selectAction');
const NavigateAction = require('../../src/actions/navigateAction');
const ExcelService = require('../../src/services/excelService');
const LocatorResolver = require('../../src/utils/locatorResolver');

const excelService = new ExcelService();
const locatorResolver = new LocatorResolver();

Given('I navigate to {string}', async function (url) {
    const navigateAction = new NavigateAction();
    await navigateAction.execute(url);
});

When('I fill {string} with {string}', async function (elementName, value) {
    const selector = await locatorResolver.resolve(elementName);
    const fillAction = new FillAction();
    await fillAction.execute(selector, value);
});

When('I click on {string}', async function (elementName) {
    const selector = await locatorResolver.resolve(elementName);
    const clickAction = new ClickAction();
    await clickAction.execute(selector);
});

When('I select {string} from {string}', async function (value, elementName) {
    const selector = await locatorResolver.resolve(elementName);
    const selectAction = new SelectAction();
    await selectAction.execute(selector, value);
});

Then('I should see {string}', async function (elementName) {
    const selector = await locatorResolver.resolve(elementName);
    // Add assertion logic here to verify the element is visible
});