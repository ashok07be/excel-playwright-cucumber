# Complete Iframe Support Guide

This guide explains how to use the enhanced action and assertion classes with full iframe support.

## Overview

All action classes (Click, Fill, Select, Check, Uncheck) and assertion classes (Visibility, Text, Attribute, Count, Enabled, Checked, Value) now support iframe operations through:

1. **Regular element methods** - For elements on the main page
2. **Iframe-specific methods** - For elements inside iframes

## Locators Configuration

The `locators.xlsx` file now includes an `IframeLocator` column:

```
Screen          | ElementName      | Locator                  | Type | IframeLocator
LoginPage       | username         | #user-name              | css  | 
PaymentPage     | cardNumber       | input[name="card"]      | css  | #paymentIframe
PaymentPage     | cvv              | input[name="cvv"]       | css  | #paymentIframe
CheckoutPage    | shippingMethod   | input[name="shipping"]  | css  | #shippingFrame
```

**How to populate:**
- If element is on main page: Leave `IframeLocator` empty
- If element is inside iframe: Enter the iframe selector (e.g., `#paymentIframe`)

## Action Classes with Iframe Support

### Pattern: execute() vs executeInIframe()

Every action class has both methods:

```javascript
// Method 1: For elements on main page
await action.execute(page, selector, ...args);

// Method 2: For elements in iframe
await action.executeInIframe(page, iframeSelector, elementSelector, ...args);
```

### ClickAction

```javascript
const clickAction = new ClickAction();

// Click on main page
await clickAction.execute(page, '#submitButton');

// Click in iframe
await clickAction.executeInIframe(page, '#paymentForm', '.pay-button');
```

### FillAction

```javascript
const fillAction = new FillAction();

// Fill on main page
await fillAction.execute(page, 'input[name="email"]', 'user@example.com');

// Fill in iframe
await fillAction.executeInIframe(page, '#formIframe', 'input[name="cardNumber"]', '1234567890123456');
```

### SelectAction

```javascript
const selectAction = new SelectAction();

// Select on main page
await selectAction.execute(page, '#country', 'USA');

// Select in iframe
await selectAction.executeInIframe(page, '#checkoutFrame', '#state', 'California');
```

### CheckAction

```javascript
const checkAction = new CheckAction();

// Check on main page
await checkAction.execute(page, '#agreeTerms');

// Check in iframe
await checkAction.executeInIframe(page, '#formFrame', 'input[value="newsletter"]');
```

### UncheckAction

```javascript
const uncheckAction = new UncheckAction();

// Uncheck on main page
await uncheckAction.execute(page, '#promotions');

// Uncheck in iframe
await uncheckAction.executeInIframe(page, '#settingsFrame', '#notifications');
```

## Assertion Classes with Iframe Support

### Pattern: assert*() vs assert*InIframe()

Every assertion class has iframe variants:

```javascript
// Method 1: For elements on main page
await assertion.assertIsVisible(page, selector);

// Method 2: For elements in iframe
await assertion.assertIsVisibleInIframe(page, iframeSelector, elementSelector);
```

### VisibilityAssertion

```javascript
const visibilityAssert = new VisibilityAssertion();

// Visibility on main page
await visibilityAssert.assertIsVisible(page, '#successMessage');
await visibilityAssert.assertIsHidden(page, '.errorPanel');

// Visibility in iframe
await visibilityAssert.assertIsVisibleInIframe(page, '#messageIframe', '.notification');
await visibilityAssert.assertIsHiddenInIframe(page, '#messageIframe', '.warning');
```

### TextAssertion

```javascript
const textAssert = new TextAssertion();

// Text on main page
await textAssert.assertTextContains(page, '#title', 'Welcome');
await textAssert.assertTextEquals(page, '.status', 'Success');

// Text in iframe
await textAssert.assertTextContainsInIframe(page, '#contentFrame', '.heading', 'Payment');
await textAssert.assertTextEqualsInIframe(page, '#contentFrame', '.amount', '$99.99');
```

### AttributeAssertion

```javascript
const attributeAssert = new AttributeAssertion();

// Attributes on main page
await attributeAssert.assertAttributeEquals(page, 'input[name="email"]', 'type', 'email');
await attributeAssert.assertHasClass(page, '#button', 'btn-primary');

// Attributes in iframe
await attributeAssert.assertAttributeEqualsInIframe(page, '#formFrame', 'input', 'required', 'true');
await attributeAssert.assertHasClass(page, '#formFrame', '.field', 'mandatory');
```

### CountAssertion

```javascript
const countAssert = new CountAssertion();

// Count on main page
await countAssert.assertElementCount(page, 'tr.row', 10);
await countAssert.assertNoElements(page, '.error');

// Count in iframe
await countAssert.assertElementCountInIframe(page, '#tableFrame', 'tbody tr', 5);
await countAssert.assertElementCountAtLeastInIframe(page, '#listFrame', 'li', 3);
```

### EnabledAssertion

```javascript
const enabledAssert = new EnabledAssertion();

// Enabled state on main page
await enabledAssert.assertButtonIsEnabled(page, '#submit');
await enabledAssert.assertIsDisabled(page, '#readonly-field');

// Enabled state in iframe
await enabledAssert.assertIsEnabledInIframe(page, '#formFrame', 'button[name="save"]');
await enabledAssert.assertIsDisabledInIframe(page, '#formFrame', '#locked-input');
```

### CheckedAssertion

```javascript
const checkedAssert = new CheckedAssertion();

// Checked state on main page
await checkedAssert.assertCheckboxIsChecked(page, '#terms');
await checkedAssert.assertRadioIsSelected(page, 'input[name="gender"][value="M"]');

// Checked state in iframe
await checkedAssert.assertIsCheckedInIframe(page, '#surveyFrame', '#q1-yes');
await checkedAssert.assertRadioIsNotSelected(page, '#optionsFrame', '#option-b');
```

### ValueAssertion

```javascript
const valueAssert = new ValueAssertion();

// Values on main page
await valueAssert.assertInputValue(page, 'input[name="username"]', 'john_doe');
await valueAssert.assertSelectValue(page, '#country', 'US');

// Values in iframe
await valueAssert.assertInputValueInIframe(page, '#formFrame', 'input[name="email"]', 'test@example.com');
await valueAssert.assertSelectValueInIframe(page, '#formFrame', 'select[name="role"]', 'admin');
```

## Practical Example: Payment Form

```javascript
const { When, Then } = require('@cucumber/cucumber');
const FillAction = require('../../src/actions/fillAction');
const SelectAction = require('../../src/actions/selectAction');
const ClickAction = require('../../src/actions/clickAction');
const CheckAction = require('../../src/actions/checkAction');
const ValueAssertion = require('../../src/assertions/valueAssertion');
const VisibilityAssertion = require('../../src/assertions/visibilityAssertion');

const fillAction = new FillAction();
const selectAction = new SelectAction();
const clickAction = new ClickAction();
const checkAction = new CheckAction();
const valueAssert = new ValueAssertion();
const visibilityAssert = new VisibilityAssertion();

// Assuming payment form is in an iframe with id 'paymentIframe'
const PAYMENT_IFRAME = '#paymentIframe';

When('I enter payment details', async function () {
    // Fill card number in iframe
    await fillAction.executeInIframe(
        this.page,
        PAYMENT_IFRAME,
        'input[name="cardNumber"]',
        '4532015112830366'
    );

    // Select expiry month
    await selectAction.executeInIframe(
        this.page,
        PAYMENT_IFRAME,
        'select[name="expiryMonth"]',
        '12'
    );

    // Select expiry year
    await selectAction.executeInIframe(
        this.page,
        PAYMENT_IFRAME,
        'select[name="expiryYear"]',
        '2025'
    );

    // Fill CVV
    await fillAction.executeInIframe(
        this.page,
        PAYMENT_IFRAME,
        'input[name="cvv"]',
        '123'
    );

    // Check "Save card" checkbox
    await checkAction.executeInIframe(
        this.page,
        PAYMENT_IFRAME,
        '#saveCard'
    );
});

Then('the card number should be filled correctly', async function () {
    await valueAssert.assertInputValueInIframe(
        this.page,
        PAYMENT_IFRAME,
        'input[name="cardNumber"]',
        '4532015112830366'
    );
});

Then('the save card checkbox should be checked', async function () {
    const checkedAssert = require('../../src/assertions/checkedAssertion');
    await checkedAssert.assertIsCheckedInIframe(
        this.page,
        PAYMENT_IFRAME,
        '#saveCard'
    );
});

When('I submit the payment', async function () {
    await clickAction.executeInIframe(
        this.page,
        PAYMENT_IFRAME,
        'button[type="submit"]'
    );
});

Then('the success message should be visible', async function () {
    await visibilityAssert.assertIsVisible(
        this.page,
        '.payment-success'
    );
});
```

## Using LocatorResolver with Iframe Support

```javascript
const locatorResolver = new LocatorResolver(excelService);

// Check if element is in iframe
if (await locatorResolver.isInIframe('PaymentPage', 'cardNumber')) {
    const iframeLocator = await locatorResolver.getIframeLocator('PaymentPage', 'cardNumber');
    const elementLocator = await locatorResolver.getElementLocator('PaymentPage', 'cardNumber');
    
    await fillAction.executeInIframe(
        page,
        iframeLocator,
        elementLocator,
        '1234567890123456'
    );
} else {
    const locator = await locatorResolver.resolveLocator('PaymentPage', 'cardNumber');
    await fillAction.execute(page, locator, '1234567890123456');
}
```

## Complete Step Definition Example

```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const LocatorResolver = require('../../src/utils/locatorResolver');
const ExcelService = require('../../src/services/excelService');
const FillAction = require('../../src/actions/fillAction');
const ClickAction = require('../../src/actions/clickAction');
const TextAssertion = require('../../src/assertions/textAssertion');

const excelService = new ExcelService();
const locatorResolver = new LocatorResolver(excelService);
const fillAction = new FillAction();
const clickAction = new ClickAction();
const textAssert = new TextAssertion();

// Generic action executor with iframe support
async function executeAction(actionMethod, page, screenName, elementName, ...args) {
    const locatorDetails = await locatorResolver.resolveLocatorWithIframe(screenName, elementName);
    
    const action = actionMethod.split('_')[0]; // e.g., 'fill' from 'fill_input'
    const actionClass = action === 'fill' ? fillAction : clickAction;
    
    if (locatorDetails.isInIframe) {
        return await actionClass[`${action}InIframe`](
            page,
            locatorDetails.iframeLocator,
            locatorDetails.locator,
            ...args
        );
    } else {
        return await actionClass[action](
            page,
            locatorDetails.locator,
            ...args
        );
    }
}

// Generic assertion executor with iframe support
async function assertElement(assertMethod, page, screenName, elementName, ...args) {
    const locatorDetails = await locatorResolver.resolveLocatorWithIframe(screenName, elementName);
    
    if (locatorDetails.isInIframe) {
        return await textAssert[`${assertMethod}InIframe`](
            page,
            locatorDetails.iframeLocator,
            locatorDetails.locator,
            ...args
        );
    } else {
        return await textAssert[assertMethod](
            page,
            locatorDetails.locator,
            ...args
        );
    }
}

When('I fill in the {string} with {string}', async function (elementName, value) {
    const locatorDetails = await locatorResolver.resolveLocatorWithIframe('PaymentPage', elementName);
    
    if (locatorDetails.isInIframe) {
        await fillAction.executeInIframe(
            this.page,
            locatorDetails.iframeLocator,
            locatorDetails.locator,
            value
        );
    } else {
        await fillAction.execute(this.page, locatorDetails.locator, value);
    }
});

Then('the {string} should contain {string}', async function (elementName, expectedText) {
    const locatorDetails = await locatorResolver.resolveLocatorWithIframe('Page', elementName);
    
    if (locatorDetails.isInIframe) {
        await textAssert.assertTextContainsInIframe(
            this.page,
            locatorDetails.iframeLocator,
            locatorDetails.locator,
            expectedText
        );
    } else {
        await textAssert.assertTextContains(this.page, locatorDetails.locator, expectedText);
    }
});
```

## Benefits

✅ **Centralized Configuration** - Define iframe mappings in Excel  
✅ **Consistent API** - Same pattern for main page and iframe elements  
✅ **Easy Maintenance** - Update locators without code changes  
✅ **Better Error Handling** - Detailed messages for debugging  
✅ **Reduced Code Duplication** - Reusable action and assertion methods  
✅ **Backward Compatible** - Works with existing step definitions  

## Summary

- Use `execute()` for main page elements
- Use `executeInIframe()` for iframe elements
- Configure iframe locators in `locators.xlsx`
- Use `locatorResolver` helper methods for dynamic resolution
- Apply same pattern for both actions and assertions
