# Assertion Classes Documentation

This directory contains assertion classes for automated testing with Playwright and Cucumber. All assertion classes support both regular elements and elements within iframes.

## Class Structure

### 1. BaseAssertion (`baseAssertion.js`)
Base class providing common utilities for all assertion classes.

**Key Methods:**
- `getElement(page, selector)` - Get an element from page
- `getElementInIframe(page, iframeSelector, elementSelector)` - Get element within iframe
- `exists(page, selector)` - Check if element exists
- `existsInIframe(page, iframeSelector, elementSelector)` - Check if element exists in iframe
- `waitForElement(page, selector, timeout)` - Wait for element to appear
- `waitForElementInIframe(page, iframeSelector, elementSelector, timeout)` - Wait for element in iframe

### 2. VisibilityAssertion (`visibilityAssertion.js`)
Assertions for element visibility states.

**Key Methods:**
- `assertIsVisible(page, selector)` - Assert element is visible
- `assertIsHidden(page, selector)` - Assert element is hidden
- `assertIsVisibleInIframe(page, iframeSelector, elementSelector)` - Assert visibility in iframe
- `assertIsHiddenInIframe(page, iframeSelector, elementSelector)` - Assert hidden in iframe

**Usage Example:**
```javascript
const visibilityAssert = new VisibilityAssertion();
await visibilityAssert.assertIsVisible(page, '#welcomeMessage');
await visibilityAssert.assertIsVisibleInIframe(page, '#myIframe', '.content');
```

### 3. TextAssertion (`textAssertion.js`)
Assertions for element text content.

**Key Methods:**
- `assertTextContains(page, selector, expectedText)` - Assert text contains substring
- `assertTextEquals(page, selector, expectedText)` - Assert exact text match
- `assertTextMatches(page, selector, pattern)` - Assert text matches regex pattern
- `assertTextContainsInIframe(page, iframeSelector, elementSelector, expectedText)` - Text contains in iframe
- `assertTextEqualsInIframe(page, iframeSelector, elementSelector, expectedText)` - Exact text in iframe

**Usage Example:**
```javascript
const textAssert = new TextAssertion();
await textAssert.assertTextContains(page, '#message', 'Success');
await textAssert.assertTextEquals(page, '#title', 'Login Page');
await textAssert.assertTextMatches(page, '#errorMsg', /^Error \d+$/);
```

### 4. AttributeAssertion (`attributeAssertion.js`)
Assertions for element attributes and classes.

**Key Methods:**
- `assertAttributeEquals(page, selector, attributeName, expectedValue)` - Assert exact attribute value
- `assertAttributeContains(page, selector, attributeName, expectedValue)` - Assert attribute contains value
- `assertHasClass(page, selector, className)` - Assert element has specific class
- `assertDoesNotHaveClass(page, selector, className)` - Assert element doesn't have class
- `assertDataAttribute(page, selector, dataName, expectedValue)` - Assert data attribute value
- `assertAttributeEqualsInIframe(...)` - Attribute assertion in iframe

**Usage Example:**
```javascript
const attributeAssert = new AttributeAssertion();
await attributeAssert.assertAttributeEquals(page, 'input[name="email"]', 'type', 'email');
await attributeAssert.assertHasClass(page, '#button', 'btn-primary');
await attributeAssert.assertDataAttribute(page, '#item', 'id', '123');
```

### 5. CountAssertion (`countAssertion.js`)
Assertions for element counts.

**Key Methods:**
- `assertElementCount(page, selector, expectedCount)` - Assert exact element count
- `assertElementCountAtLeast(page, selector, minimumCount)` - Assert minimum element count
- `assertElementCountAtMost(page, selector, maximumCount)` - Assert maximum element count
- `assertNoElements(page, selector)` - Assert no elements found
- `assertElementExists(page, selector)` - Assert at least one element exists
- `assertElementCountInIframe(...)` - Element count in iframe

**Usage Example:**
```javascript
const countAssert = new CountAssertion();
await countAssert.assertElementCount(page, 'tr.data-row', 10);
await countAssert.assertElementCountAtLeast(page, '.list-item', 3);
await countAssert.assertNoElements(page, '.error-message');
```

### 6. EnabledAssertion (`enabledAssertion.js`)
Assertions for element enabled/disabled states.

**Key Methods:**
- `assertIsEnabled(page, selector)` - Assert element is enabled
- `assertIsDisabled(page, selector)` - Assert element is disabled
- `assertButtonIsEnabled(page, selector)` - Assert button is enabled
- `assertButtonIsDisabled(page, selector)` - Assert button is disabled
- `assertIsEnabledInIframe(...)` - Enabled assertion in iframe
- `assertIsDisabledInIframe(...)` - Disabled assertion in iframe

**Usage Example:**
```javascript
const enabledAssert = new EnabledAssertion();
await enabledAssert.assertButtonIsEnabled(page, '#submitBtn');
await enabledAssert.assertIsDisabled(page, 'input[name="readonly"]');
```

### 7. CheckedAssertion (`checkedAssertion.js`)
Assertions for checkbox and radio button states.

**Key Methods:**
- `assertIsChecked(page, selector)` - Assert element is checked
- `assertIsNotChecked(page, selector)` - Assert element is not checked
- `assertCheckboxIsChecked(page, selector)` - Assert checkbox is checked
- `assertCheckboxIsUnchecked(page, selector)` - Assert checkbox is unchecked
- `assertRadioIsSelected(page, selector)` - Assert radio button is selected
- `assertRadioIsNotSelected(page, selector)` - Assert radio button is not selected
- `assertIsCheckedInIframe(...)` - Checked assertion in iframe

**Usage Example:**
```javascript
const checkedAssert = new CheckedAssertion();
await checkedAssert.assertCheckboxIsChecked(page, '#agreeCheckbox');
await checkedAssert.assertRadioIsSelected(page, 'input[name="gender"][value="male"]');
```

### 8. ValueAssertion (`valueAssertion.js`)
Assertions for input and select field values.

**Key Methods:**
- `assertInputValue(page, selector, expectedValue)` - Assert exact input value
- `assertInputValueContains(page, selector, expectedValue)` - Assert input value contains text
- `assertInputIsEmpty(page, selector)` - Assert input is empty
- `assertInputIsNotEmpty(page, selector)` - Assert input is not empty
- `assertSelectValue(page, selector, expectedValue)` - Assert select field value
- `assertInputValueInIframe(...)` - Input value assertion in iframe

**Usage Example:**
```javascript
const valueAssert = new ValueAssertion();
await valueAssert.assertInputValue(page, 'input[name="firstName"]', 'John');
await valueAssert.assertSelectValue(page, '#countrySelect', 'US');
await valueAssert.assertInputIsEmpty(page, 'input[name="search"]');
```

## Iframe Support

All assertion classes support iframe elements. Use the pattern: `iframeSelector` and `elementSelector` parameters.

**Iframe Example:**
```javascript
// Element is inside an iframe with id "myFrame"
// Inside that iframe, there's an element with selector ".content"
await visibilityAssert.assertIsVisibleInIframe(page, '#myFrame', '.content');
await textAssert.assertTextEqualsInIframe(page, '#myFrame', '.title', 'Hello');
```

## Error Handling

All assertion methods throw detailed errors when assertions fail:
```javascript
try {
    await textAssert.assertTextEquals(page, '#title', 'Expected');
} catch (error) {
    console.log(error.message); // Detailed error with actual vs expected
}
```

## Usage in Step Definitions

Example integration with Cucumber steps:

```javascript
const { Then } = require('@cucumber/cucumber');
const VisibilityAssertion = require('../../src/assertions/visibilityAssertion');
const TextAssertion = require('../../src/assertions/textAssertion');

const visibilityAssert = new VisibilityAssertion();
const textAssert = new TextAssertion();

Then('I should see {string}', async function (elementName) {
    const selector = await locatorResolver.resolveLocator('Page', elementName);
    await visibilityAssert.assertIsVisible(this.page, selector);
});

Then('the {string} should contain {string}', async function (elementName, expectedText) {
    const selector = await locatorResolver.resolveLocator('Page', elementName);
    await textAssert.assertTextContains(this.page, selector, expectedText);
});

Then('the {string} in the {string} should be visible', async function (elementName, iframeName) {
    const iframeSelector = await locatorResolver.resolveLocator('Page', iframeName);
    const elementSelector = await locatorResolver.resolveLocator('Page', elementName);
    await visibilityAssert.assertIsVisibleInIframe(this.page, iframeSelector, elementSelector);
});
```

## Best Practices

1. **Import assertion classes** at the top of your step definition files
2. **Reuse assertion instances** to avoid recreating them
3. **Use specific assertions** - prefer `assertTextEquals` over `assertTextContains` when possible
4. **Handle timeouts** - assertions include default timeouts but can be customized
5. **For iframes** - ensure iframe is loaded before asserting elements within it
6. **Error messages** - all errors provide context about what was expected vs actual
