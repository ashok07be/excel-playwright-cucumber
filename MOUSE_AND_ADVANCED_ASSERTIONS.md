# Extended Mouse Actions and Assertions Documentation

This document describes the newly added mouse-based action classes and advanced assertion classes.

## New Mouse-Based Action Classes

### 1. HoverAction (`hoverAction.js`)
Hover/move mouse over elements.

**Methods:**
- `execute(page, selector)` - Hover on main page element
- `executeInIframe(page, iframeSelector, elementSelector)` - Hover on iframe element

**Usage Example:**
```javascript
const hoverAction = new HoverAction();
await hoverAction.execute(page, '#menuItem');
await hoverAction.executeInIframe(page, '#formIframe', '.tooltip-trigger');
```

### 2. DoubleClickAction (`doubleClickAction.js`)
Perform double-click operations.

**Methods:**
- `execute(page, selector)` - Double click on main page element
- `executeInIframe(page, iframeSelector, elementSelector)` - Double click on iframe element

**Usage Example:**
```javascript
const doubleClickAction = new DoubleClickAction();
await doubleClickAction.execute(page, '#textField'); // Select all
await doubleClickAction.executeInIframe(page, '#editorFrame', '.editable-text');
```

### 3. RightClickAction (`rightClickAction.js`)
Perform right-click (context menu) operations.

**Methods:**
- `execute(page, selector)` - Right click on main page element
- `executeInIframe(page, iframeSelector, elementSelector)` - Right click on iframe element

**Usage Example:**
```javascript
const rightClickAction = new RightClickAction();
await rightClickAction.execute(page, '.context-menu-target');
await rightClickAction.executeInIframe(page, '#contentFrame', '.file-item');
```

### 4. DragAndDropAction (`dragAndDropAction.js`)
Drag and drop elements.

**Methods:**
- `execute(page, sourceSelector, targetSelector)` - Drag and drop on main page
- `executeInIframe(page, iframeSelector, sourceSelector, targetSelector)` - Drag and drop in iframe

**Usage Example:**
```javascript
const dragDropAction = new DragAndDropAction();
await dragDropAction.execute(page, '.draggable', '.drop-zone');
await dragDropAction.executeInIframe(page, '#canvasFrame', '.shape', '.trash-area');
```

### 5. ScrollAction (`scrollAction.js`)
Scroll operations - to elements, by pixels, or to top/bottom.

**Methods:**
- `execute(page, selector)` - Scroll to element
- `executeInIframe(page, iframeSelector, elementSelector)` - Scroll to element in iframe
- `scrollPage(page, pixels)` - Scroll page by pixels (positive = down, negative = up)
- `scrollToTop(page)` - Scroll page to top
- `scrollToBottom(page)` - Scroll page to bottom

**Usage Example:**
```javascript
const scrollAction = new ScrollAction();
await scrollAction.execute(page, '#targetSection');
await scrollAction.scrollPage(page, 500); // Scroll down 500px
await scrollAction.scrollToBottom(page);
await scrollAction.executeInIframe(page, '#listFrame', '.last-item');
```

### 6. FocusAction (`focusAction.js`)
Focus management - set focus, clear focus.

**Methods:**
- `execute(page, selector)` - Set focus on element
- `executeInIframe(page, iframeSelector, elementSelector)` - Set focus on iframe element
- `clearFocus(page)` - Remove focus from active element

**Usage Example:**
```javascript
const focusAction = new FocusAction();
await focusAction.execute(page, 'input[name="email"]');
await focusAction.clearFocus(page);
await focusAction.executeInIframe(page, '#formIframe', '#firstName');
```

## New Advanced Assertion Classes

### 7. StyleAssertion (`styleAssertion.js`)
Assert CSS styles and visual properties.

**Methods:**
- `assertStyleValue(page, selector, styleProperty, expectedValue)` - Check specific CSS property
- `assertDisplay(page, selector, expectedDisplay)` - Check display property (block, none, flex, etc.)
- `assertBackgroundColor(page, selector, expectedColor)` - Check background color
- `assertTextColor(page, selector, expectedColor)` - Check text color
- `assertFontSize(page, selector, expectedSize)` - Check font size
- `assertStyleValueInIframe(...)` - Style assertion in iframe

**Usage Example:**
```javascript
const styleAssert = new StyleAssertion();
await styleAssert.assertDisplay(page, '.modal', 'flex');
await styleAssert.assertBackgroundColor(page, '#hero', 'rgb(0, 0, 0)');
await styleAssert.assertFontSize(page, 'h1', '32px');
await styleAssert.assertTextColor(page, '.error', 'rgb(255, 0, 0)');
```

### 8. URLAndTitleAssertion (`urlAndTitleAssertion.js`)
Assert URL and page title properties.

**Methods:**
- `assertUrlEquals(page, expectedUrl)` - Exact URL match
- `assertUrlContains(page, expectedText)` - URL contains text
- `assertUrlMatches(page, pattern)` - URL matches regex
- `assertPageTitleEquals(page, expectedTitle)` - Exact title match
- `assertPageTitleContains(page, expectedText)` - Title contains text
- `assertPageTitleMatches(page, pattern)` - Title matches regex
- `assertOnPage(page, expectedPath)` - Check URL path

**Usage Example:**
```javascript
const urlAssert = new URLAndTitleAssertion();
await urlAssert.assertUrlContains(page, '/dashboard');
await urlAssert.assertPageTitleEquals(page, 'Dashboard - MyApp');
await urlAssert.assertOnPage(page, '/product/123');
await urlAssert.assertUrlMatches(page, /\/user\/\d+/);
```

### 9. FocusAssertion (`focusAssertion.js`)
Assert focus state and focus-related properties.

**Methods:**
- `assertHasFocus(page, selector)` - Element has focus
- `assertDoesNotHaveFocus(page, selector)` - Element doesn't have focus
- `assertFocusedElementType(page, expectedType)` - Check type of focused element
- `assertHasFocusInIframe(page, iframeSelector, elementSelector)` - Focus assertion in iframe
- `assertIsFocusable(page, selector)` - Element is focusable

**Usage Example:**
```javascript
const focusAssert = new FocusAssertion();
await focusAssert.assertHasFocus(page, 'input[name="search"]');
await focusAssert.assertFocusedElementType(page, 'INPUT');
await focusAssert.assertIsFocusable(page, '#submitBtn');
```

### 10. OptionsAssertion (`optionsAssertion.js`)
Assert select element options and dropdown states.

**Methods:**
- `assertHasOption(page, selector, optionValue)` - Select has option with value
- `assertHasOptionText(page, selector, optionText)` - Select has option with text
- `assertOptionCount(page, selector, expectedCount)` - Exact option count
- `assertMinimumOptions(page, selector, minimumCount)` - Minimum option count
- `assertOptionIsDisabled(page, selector, optionValue)` - Option is disabled
- `assertOptionIsEnabled(page, selector, optionValue)` - Option is enabled
- `assertHasOptionInIframe(...)` - Option assertion in iframe

**Usage Example:**
```javascript
const optionsAssert = new OptionsAssertion();
await optionsAssert.assertHasOption(page, '#country', 'US');
await optionsAssert.assertOptionCount(page, '#gender', 3);
await optionsAssert.assertMinimumOptions(page, '#colors', 5);
await optionsAssert.assertOptionIsEnabled(page, '#role', 'admin');
```

### 11. DOMAssertion (`domAssertion.js`)
Assert DOM structure and element properties.

**Methods:**
- `assertDOMProperty(page, selector, propertyName, expectedValue)` - DOM property value
- `assertChildrenCount(page, selector, expectedCount)` - Number of child elements
- `assertParentElement(page, selector, parentSelector)` - Element has parent matching selector
- `assertInnerText(page, selector, expectedText)` - Element innerText value
- `assertInnerHTMLContains(page, selector, expectedText)` - HTML contains text
- `assertTagName(page, selector, expectedTag)` - Element tag name
- `assertWidth(page, selector, expectedWidth)` - Element width in pixels
- `assertHeight(page, selector, expectedHeight)` - Element height in pixels
- `assertIsInViewport(page, selector)` - Element visible in viewport

**Usage Example:**
```javascript
const domAssert = new DOMAssertion();
await domAssert.assertTagName(page, '#main', 'main');
await domAssert.assertChildrenCount(page, 'ul.menu', 5);
await domAssert.assertInnerText(page, '.title', 'Welcome');
await domAssert.assertWidth(page, '.container', 1200);
await domAssert.assertIsInViewport(page, '#targetElement');
```

## Complete Usage Examples

### Example 1: Form Interaction with Hover and Focus
```javascript
const hoverAction = new HoverAction();
const fillAction = new FillAction();
const focusAction = new FocusAction();
const focusAssert = new FocusAssertion();

// Hover over help icon to show tooltip
await hoverAction.execute(page, '.help-icon');

// Focus on email field
await focusAction.execute(page, 'input[name="email"]');
await focusAssert.assertHasFocus(page, 'input[name="email"]');

// Fill email
await fillAction.execute(page, 'input[name="email"]', 'user@example.com');
```

### Example 2: Drag and Drop with Assertions
```javascript
const dragDropAction = new DragAndDropAction();
const visibilityAssert = new VisibilityAssertion();
const domAssert = new DOMAssertion();

// Drag item to trash
await dragDropAction.execute(page, '.task-item', '.trash-bin');

// Verify item is gone from list
await domAssert.assertChildrenCount(page, '.task-list', 4); // reduced from 5
```

### Example 3: Scroll and Verify Styles
```javascript
const scrollAction = new ScrollAction();
const styleAssert = new StyleAssertion();

// Scroll to section
await scrollAction.execute(page, '#pricing');

// Verify section is visible with correct styling
await styleAssert.assertDisplay(page, '#pricing', 'block');
await styleAssert.assertBackgroundColor(page, '#pricing', 'rgb(255, 255, 255)');
```

### Example 4: Select Options Verification
```javascript
const optionsAssert = new OptionsAssertion();
const focusAction = new FocusAction();
const focusAssert = new FocusAssertion();

// Focus on select
await focusAction.execute(page, '#language');
await focusAssert.assertHasFocus(page, '#language');

// Verify available options
await optionsAssert.assertHasOption(page, '#language', 'en');
await optionsAssert.assertHasOptionText(page, '#language', 'English');
await optionsAssert.assertOptionCount(page, '#language', 5);
```

### Example 5: URL and Title Verification
```javascript
const urlAssert = new URLAndTitleAssertion();
const clickAction = new ClickAction();

// Click navigation link
await clickAction.execute(page, 'a[href="/products"]');

// Wait and verify URL and title
await page.waitForNavigation();
await urlAssert.assertUrlContains(page, '/products');
await urlAssert.assertPageTitleContains(page, 'Products');
```

## Cucumber Integration Examples

### Step Definition with Mouse Actions
```javascript
const { When } = require('@cucumber/cucumber');
const HoverAction = require('../../src/actions/hoverAction');
const RightClickAction = require('../../src/actions/rightClickAction');

const hoverAction = new HoverAction();
const rightClickAction = new RightClickAction();

When('I hover over the {string}', async function (elementName) {
    const selector = await locatorResolver.resolveLocator('Page', elementName);
    await hoverAction.execute(this.page, selector);
});

When('I right click on the {string}', async function (elementName) {
    const selector = await locatorResolver.resolveLocator('Page', elementName);
    await rightClickAction.execute(this.page, selector);
});
```

### Step Definition with Advanced Assertions
```javascript
const { Then } = require('@cucumber/cucumber');
const StyleAssertion = require('../../src/assertions/styleAssertion');
const OptionsAssertion = require('../../src/assertions/optionsAssertion');

const styleAssert = new StyleAssertion();
const optionsAssert = new OptionsAssertion();

Then('the {string} should be displayed as {string}', async function (elementName, displayType) {
    const selector = await locatorResolver.resolveLocator('Page', elementName);
    await styleAssert.assertDisplay(this.page, selector, displayType);
});

Then('the {string} should have at least {int} options', async function (selectName, count) {
    const selector = await locatorResolver.resolveLocator('Page', selectName);
    await optionsAssert.assertMinimumOptions(this.page, selector, count);
});
```

## Best Practices

1. **Mouse Actions Timing** - Some hover actions may trigger animations or delays
2. **Drag and Drop** - Ensure both source and target are visible before performing
3. **Scroll Actions** - Use before assertions to ensure element is in viewport
4. **Focus Management** - Check focus state after keyboard interactions
5. **Style Assertions** - Computed styles are more reliable than inline styles
6. **DOM Assertions** - Use for verifying structure changes after interactions

## Error Handling

All new classes provide detailed error messages:

```javascript
try {
    await scrollAction.execute(page, '#nonexistentElement');
} catch (error) {
    console.log(error.message);
    // Output: "Scroll action failed for selector: #nonexistentElement. ..."
}

try {
    await styleAssert.assertDisplay(page, '.modal', 'block');
} catch (error) {
    console.log(error.message);
    // Output: "Display mismatch. Expected: 'block', but got: 'none'"
}
```

## Summary

**New Mouse Action Classes (6):**
- HoverAction
- DoubleClickAction
- RightClickAction
- DragAndDropAction
- ScrollAction
- FocusAction

**New Assertion Classes (5):**
- StyleAssertion
- URLAndTitleAssertion
- FocusAssertion
- OptionsAssertion
- DOMAssertion

**Total Framework Classes:**
- **Action Classes:** 13 (7 original + 6 new)
- **Assertion Classes:** 13 (8 original + 5 new)

All support iframe operations where applicable.
