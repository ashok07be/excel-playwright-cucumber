# Action Classes Documentation - With Iframe Support

This directory contains action classes for automated testing with Playwright and Cucumber. All action classes now support both regular elements and elements within iframes.

## Class Structure

### 1. BaseAction (`baseAction.js`)
Base class providing common utilities for all action classes.

**Key Methods:**
- `getElement(page, selector)` - Get an element from page
- `getElementInIframe(page, iframeSelector, elementSelector)` - Get element within iframe
- `exists(page, selector)` - Check if element exists
- `existsInIframe(page, iframeSelector, elementSelector)` - Check if element exists in iframe
- `waitForElement(page, selector, timeout)` - Wait for element to appear
- `waitForElementInIframe(page, iframeSelector, elementSelector, timeout)` - Wait for element in iframe

### 2. NavigateAction (`navigateAction.js`)
Navigate to URLs.

**Key Methods:**
- `execute(page, url)` - Navigate to a URL

**Usage Example:**
```javascript
const navigateAction = new NavigateAction();
await navigateAction.execute(page, 'https://example.com');
```

### 3. ClickAction (`clickAction.js`)
Click on elements.

**Key Methods:**
- `execute(page, selector)` - Click on element
- `executeInIframe(page, iframeSelector, elementSelector)` - Click element in iframe

**Usage Example:**
```javascript
const clickAction = new ClickAction();
await clickAction.execute(page, '#submitButton');
await clickAction.executeInIframe(page, '#myIframe', '.submit-btn');
```

### 4. FillAction (`fillAction.js`)
Fill form fields with values.

**Key Methods:**
- `execute(page, selector, value)` - Fill element with value
- `executeInIframe(page, iframeSelector, elementSelector, value)` - Fill element in iframe

**Usage Example:**
```javascript
const fillAction = new FillAction();
await fillAction.execute(page, 'input[name="username"]', 'john_doe');
await fillAction.executeInIframe(page, '#paymentIframe', 'input[name="cardNumber"]', '1234567890123456');
```

### 5. SelectAction (`selectAction.js`)
Select options from dropdown/select fields.

**Key Methods:**
- `execute(page, selector, value)` - Select option from dropdown
- `executeInIframe(page, iframeSelector, elementSelector, value)` - Select in iframe

**Usage Example:**
```javascript
const selectAction = new SelectAction();
await selectAction.execute(page, '#countrySelect', 'US');
await selectAction.executeInIframe(page, '#formIframe', '#stateSelect', 'CA');
```

### 6. CheckAction (`checkAction.js`)
Check checkboxes and radio buttons.

**Key Methods:**
- `execute(page, selector)` - Check element
- `executeInIframe(page, iframeSelector, elementSelector)` - Check element in iframe

**Usage Example:**
```javascript
const checkAction = new CheckAction();
await checkAction.execute(page, '#agreeCheckbox');
await checkAction.executeInIframe(page, '#formIframe', 'input[name="terms"]');
```

### 7. UncheckAction (`uncheckAction.js`)
Uncheck checkboxes.

**Key Methods:**
- `execute(page, selector)` - Uncheck element
- `executeInIframe(page, iframeSelector, elementSelector)` - Uncheck element in iframe

**Usage Example:**
```javascript
const uncheckAction = new UncheckAction();
await uncheckAction.execute(page, '#optionalCheckbox');
await uncheckAction.executeInIframe(page, '#formIframe', '#removeOptional');
```

## Iframe Support

All action classes support iframe elements through the `executeInIframe()` method.

**Iframe Usage Pattern:**
```javascript
// Element is inside an iframe with id "myFrame"
// Inside that iframe, there's a button with class "submit"
await clickAction.executeInIframe(page, '#myFrame', '.submit');
```

**Example Scenarios:**

1. **Payment Form in Iframe:**
```javascript
const fillAction = new FillAction();
const selectAction = new SelectAction();
const clickAction = new ClickAction();

await fillAction.executeInIframe(page, '#paymentForm', 'input[name="cardNumber"]', '1234567890');
await fillAction.executeInIframe(page, '#paymentForm', 'input[name="cvv"]', '123');
await selectAction.executeInIframe(page, '#paymentForm', 'select[name="month"]', '12');
await clickAction.executeInIframe(page, '#paymentForm', 'button.submit');
```

2. **Form with Multiple Iframes:**
```javascript
// Personal info in one iframe
await fillAction.executeInIframe(page, '#personalInfoFrame', 'input[name="firstName"]', 'John');

// Address in another iframe
await fillAction.executeInIframe(page, '#addressFrame', 'input[name="street"]', '123 Main St');
```

## Locator Configuration with Iframe Support

The `locators.xlsx` file now includes an `IframeLocator` column for iframe support.

**Excel Structure:**
```
Screen          | ElementName  | Locator              | Type | IframeLocator
LoginPage       | username     | #user-name           | css  | 
PaymentPage     | cardNumber   | input[name="card"]   | css  | #paymentIframe
PaymentPage     | expiryDate   | input[name="expiry"] | css  | #paymentIframe
```

**Using LocatorResolver with Iframe:**

```javascript
const locatorResolver = new LocatorResolver(excelService);

// Check if element is in iframe
const isInIframe = await locatorResolver.isInIframe('PaymentPage', 'cardNumber');

// Get iframe locator
const iframeLocator = await locatorResolver.getIframeLocator('PaymentPage', 'cardNumber');

// Get element locator
const elementLocator = await locatorResolver.getElementLocator('PaymentPage', 'cardNumber');

// Get complete locator details
const locatorDetails = await locatorResolver.resolveLocatorWithIframe('PaymentPage', 'cardNumber');
// Returns: { locator: '...', type: 'css', iframeLocator: '#paymentIframe', isInIframe: true }
```

## Integration with Cucumber Steps

**Example Step with Iframe Support:**

```javascript
const { When } = require('@cucumber/cucumber');
const ClickAction = require('../../src/actions/clickAction');
const FillAction = require('../../src/actions/fillAction');

const clickAction = new ClickAction();
const fillAction = new FillAction();

When('I fill in the payment card number with {string}', async function (cardNumber) {
    const locatorDetails = await locatorResolver.resolveLocatorWithIframe('PaymentPage', 'cardNumber');
    
    if (locatorDetails.isInIframe) {
        await fillAction.executeInIframe(
            this.page, 
            locatorDetails.iframeLocator, 
            locatorDetails.locator, 
            cardNumber
        );
    } else {
        await fillAction.execute(this.page, locatorDetails.locator, cardNumber);
    }
});

When('I click the submit button', async function () {
    const locatorDetails = await locatorResolver.resolveLocatorWithIframe('PaymentPage', 'submitButton');
    
    if (locatorDetails.isInIframe) {
        await clickAction.executeInIframe(
            this.page, 
            locatorDetails.iframeLocator, 
            locatorDetails.locator
        );
    } else {
        await clickAction.execute(this.page, locatorDetails.locator);
    }
});
```

## Helper Function for Generic Steps

Create a helper to automatically handle iframe resolution:

```javascript
// Helper function to execute actions with iframe support
async function executeActionWithIframe(action, actionMethod, page, screenName, elementName, ...args) {
    const locatorDetails = await locatorResolver.resolveLocatorWithIframe(screenName, elementName);
    
    if (locatorDetails.isInIframe) {
        return await action[`${actionMethod}InIframe`](
            page,
            locatorDetails.iframeLocator,
            locatorDetails.locator,
            ...args
        );
    } else {
        return await action[actionMethod](
            page,
            locatorDetails.locator,
            ...args
        );
    }
}

// Usage in steps
Then('I fill in the {string} with {string}', async function (elementName, value) {
    await executeActionWithIframe(fillAction, 'execute', this.page, 'PaymentPage', elementName, value);
});
```

## Error Handling

All action methods provide detailed error messages:

```javascript
try {
    await fillAction.execute(page, '#nonexistentField', 'value');
} catch (error) {
    console.log(error.message);
    // Output: "Fill action failed for selector: #nonexistentField. Element not found..."
}

try {
    await fillAction.executeInIframe(page, '#wrongIframe', '#field', 'value');
} catch (error) {
    console.log(error.message);
    // Output: "Fill action failed in iframe. Iframe: #wrongIframe, Element: #field. ..."
}
```

## Best Practices

1. **Always define iframe locators in Excel** - Make maintenance easier
2. **Use helper functions** - To reduce code duplication for iframe handling
3. **Test iframe selectors** - Browser dev tools: Right-click → Inspect → find iframe
4. **Handle timeouts** - Use appropriate timeout values for iframe loading
5. **Document iframe changes** - Keep track of which elements are in iframes
6. **Use data attributes** - Make iframe selectors more stable (e.g., `[data-testid="paymentForm"]`)

## Troubleshooting

**Issue:** "Iframe not found"
- **Solution:** Verify iframe selector is correct. Check if iframe loads dynamically.

**Issue:** "Element not found in iframe"
- **Solution:** Ensure iframe has fully loaded before accessing elements. Add wait time.

**Issue:** Cross-origin iframe errors
- **Solution:** Playwright restricts access to cross-origin iframes. Use proper security headers.

**Issue:** Element exists but cannot interact**
- **Solution:** Element might be hidden or disabled. Check visibility/enabled state first.
