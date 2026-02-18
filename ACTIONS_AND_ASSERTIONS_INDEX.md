# Complete Action and Assertion Classes Index

## Overview
The framework now includes **13 Action Classes** and **13 Assertion Classes** for comprehensive test automation with full iframe support.

---

## ACTION CLASSES (13 Total)

### Basic Actions
| Class | File | Purpose | Iframe Support |
|-------|------|---------|-----------------|
| ClickAction | clickAction.js | Click on elements | ✅ Yes |
| FillAction | fillAction.js | Fill form fields | ✅ Yes |
| SelectAction | selectAction.js | Select options | ✅ Yes |
| CheckAction | checkAction.js | Check checkboxes | ✅ Yes |
| UncheckAction | uncheckAction.js | Uncheck checkboxes | ✅ Yes |
| NavigateAction | navigateAction.js | Navigate to URLs | N/A |

### Mouse-Based Actions
| Class | File | Purpose | Iframe Support |
|-------|------|---------|-----------------|
| HoverAction | hoverAction.js | Hover over elements | ✅ Yes |
| DoubleClickAction | doubleClickAction.js | Double click | ✅ Yes |
| RightClickAction | rightClickAction.js | Right click (context menu) | ✅ Yes |
| DragAndDropAction | dragAndDropAction.js | Drag and drop | ✅ Yes |
| ScrollAction | scrollAction.js | Scroll operations | ✅ Yes |
| FocusAction | focusAction.js | Focus management | ✅ Yes |

### Base Classes
| Class | File | Purpose |
|-------|------|---------|
| BaseAction | baseAction.js | Common utilities and iframe helpers |

---

## ASSERTION CLASSES (13 Total)

### Basic Assertions
| Class | File | Purpose | Iframe Support |
|-------|------|---------|-----------------|
| VisibilityAssertion | visibilityAssertion.js | Element visibility | ✅ Yes |
| TextAssertion | textAssertion.js | Text content | ✅ Yes |
| AttributeAssertion | attributeAssertion.js | Attributes and classes | ✅ Yes |
| CountAssertion | countAssertion.js | Element counts | ✅ Yes |
| EnabledAssertion | enabledAssertion.js | Enabled/disabled states | ✅ Yes |
| CheckedAssertion | checkedAssertion.js | Checkbox/radio states | ✅ Yes |
| ValueAssertion | valueAssertion.js | Input/select values | ✅ Yes |

### Advanced Assertions
| Class | File | Purpose | Iframe Support |
|-------|------|---------|-----------------|
| StyleAssertion | styleAssertion.js | CSS styles | ✅ Yes (partial) |
| URLAndTitleAssertion | urlAndTitleAssertion.js | URL and page title | N/A |
| FocusAssertion | focusAssertion.js | Focus state | ✅ Yes |
| OptionsAssertion | optionsAssertion.js | Select options | ✅ Yes |
| DOMAssertion | domAssertion.js | DOM structure | ✅ Yes (partial) |

### Base Classes
| Class | File | Purpose |
|-------|------|---------|
| BaseAssertion | baseAssertion.js | Common utilities and iframe helpers |

---

## QUICK REFERENCE

### Common Action Patterns
```javascript
// Main page
await action.execute(page, selector, ...args);

// Iframe
await action.executeInIframe(page, iframeSelector, elementSelector, ...args);
```

### Common Assertion Patterns
```javascript
// Main page
await assertion.assert*(page, selector, ...args);

// Iframe
await assertion.assert*InIframe(page, iframeSelector, elementSelector, ...args);
```

---

## ACTION CLASSES - DETAILED METHODS

### 1. ClickAction
- `execute(page, selector)` - Click element
- `executeInIframe(page, iframeSelector, elementSelector)` - Click in iframe

### 2. FillAction
- `execute(page, selector, value)` - Fill input
- `executeInIframe(page, iframeSelector, elementSelector, value)` - Fill in iframe

### 3. SelectAction
- `execute(page, selector, value)` - Select option
- `executeInIframe(page, iframeSelector, elementSelector, value)` - Select in iframe

### 4. CheckAction
- `execute(page, selector)` - Check checkbox
- `executeInIframe(page, iframeSelector, elementSelector)` - Check in iframe

### 5. UncheckAction
- `execute(page, selector)` - Uncheck checkbox
- `executeInIframe(page, iframeSelector, elementSelector)` - Uncheck in iframe

### 6. NavigateAction
- `execute(page, url)` - Navigate to URL

### 7. HoverAction
- `execute(page, selector)` - Hover element
- `executeInIframe(page, iframeSelector, elementSelector)` - Hover in iframe

### 8. DoubleClickAction
- `execute(page, selector)` - Double click
- `executeInIframe(page, iframeSelector, elementSelector)` - Double click in iframe

### 9. RightClickAction
- `execute(page, selector)` - Right click
- `executeInIframe(page, iframeSelector, elementSelector)` - Right click in iframe

### 10. DragAndDropAction
- `execute(page, sourceSelector, targetSelector)` - Drag and drop
- `executeInIframe(page, iframeSelector, sourceSelector, targetSelector)` - Drag in iframe

### 11. ScrollAction
- `execute(page, selector)` - Scroll to element
- `executeInIframe(page, iframeSelector, elementSelector)` - Scroll in iframe
- `scrollPage(page, pixels)` - Scroll by pixels
- `scrollToTop(page)` - Scroll to top
- `scrollToBottom(page)` - Scroll to bottom

### 12. FocusAction
- `execute(page, selector)` - Set focus
- `executeInIframe(page, iframeSelector, elementSelector)` - Focus in iframe
- `clearFocus(page)` - Remove focus

### 13. BaseAction
- `getElement(page, selector)` - Get element
- `getElementInIframe(page, iframeSelector, elementSelector)` - Get element in iframe
- `exists(page, selector)` - Check existence
- `existsInIframe(page, iframeSelector, elementSelector)` - Check in iframe
- `waitForElement(page, selector, timeout)` - Wait for element
- `waitForElementInIframe(page, iframeSelector, elementSelector, timeout)` - Wait in iframe

---

## ASSERTION CLASSES - DETAILED METHODS

### 1. VisibilityAssertion (4 methods + 4 iframe)
- `assertIsVisible(page, selector)`
- `assertIsHidden(page, selector)`
- `assertIsVisibleInIframe(page, iframeSelector, elementSelector)`
- `assertIsHiddenInIframe(page, iframeSelector, elementSelector)`

### 2. TextAssertion (3 methods + 2 iframe)
- `assertTextContains(page, selector, text)`
- `assertTextEquals(page, selector, text)`
- `assertTextMatches(page, selector, pattern)`
- `assertTextContainsInIframe(...)`
- `assertTextEqualsInIframe(...)`

### 3. AttributeAssertion (5 methods + 1 iframe)
- `assertAttributeEquals(page, selector, attr, value)`
- `assertAttributeContains(page, selector, attr, value)`
- `assertHasClass(page, selector, className)`
- `assertDoesNotHaveClass(page, selector, className)`
- `assertDataAttribute(page, selector, name, value)`
- `assertAttributeEqualsInIframe(...)`

### 4. CountAssertion (5 methods + 2 iframe)
- `assertElementCount(page, selector, count)`
- `assertElementCountAtLeast(page, selector, min)`
- `assertElementCountAtMost(page, selector, max)`
- `assertNoElements(page, selector)`
- `assertElementExists(page, selector)`
- `assertElementCountInIframe(...)`
- `assertElementCountAtLeastInIframe(...)`

### 5. EnabledAssertion (6 methods + 2 iframe)
- `assertIsEnabled(page, selector)`
- `assertIsDisabled(page, selector)`
- `assertButtonIsEnabled(page, selector)`
- `assertButtonIsDisabled(page, selector)`
- `assertIsEnabledInIframe(...)`
- `assertIsDisabledInIframe(...)`

### 6. CheckedAssertion (7 methods + 2 iframe)
- `assertIsChecked(page, selector)`
- `assertIsNotChecked(page, selector)`
- `assertCheckboxIsChecked(page, selector)`
- `assertCheckboxIsUnchecked(page, selector)`
- `assertRadioIsSelected(page, selector)`
- `assertRadioIsNotSelected(page, selector)`
- `assertIsCheckedInIframe(...)`
- `assertIsNotCheckedInIframe(...)`

### 7. ValueAssertion (5 methods + 2 iframe)
- `assertInputValue(page, selector, value)`
- `assertInputValueContains(page, selector, value)`
- `assertInputIsEmpty(page, selector)`
- `assertInputIsNotEmpty(page, selector)`
- `assertSelectValue(page, selector, value)`
- `assertInputValueInIframe(...)`
- `assertSelectValueInIframe(...)`

### 8. StyleAssertion (5 methods + 1 iframe)
- `assertStyleValue(page, selector, property, value)`
- `assertDisplay(page, selector, display)`
- `assertBackgroundColor(page, selector, color)`
- `assertTextColor(page, selector, color)`
- `assertFontSize(page, selector, size)`
- `assertStyleValueInIframe(...)`

### 9. URLAndTitleAssertion (7 methods)
- `assertUrlEquals(page, url)`
- `assertUrlContains(page, text)`
- `assertUrlMatches(page, pattern)`
- `assertPageTitleEquals(page, title)`
- `assertPageTitleContains(page, text)`
- `assertPageTitleMatches(page, pattern)`
- `assertOnPage(page, path)`

### 10. FocusAssertion (5 methods + 1 iframe)
- `assertHasFocus(page, selector)`
- `assertDoesNotHaveFocus(page, selector)`
- `assertFocusedElementType(page, type)`
- `assertHasFocusInIframe(...)`
- `assertIsFocusable(page, selector)`

### 11. OptionsAssertion (6 methods + 1 iframe)
- `assertHasOption(page, selector, value)`
- `assertHasOptionText(page, selector, text)`
- `assertOptionCount(page, selector, count)`
- `assertMinimumOptions(page, selector, min)`
- `assertOptionIsDisabled(page, selector, value)`
- `assertOptionIsEnabled(page, selector, value)`
- `assertHasOptionInIframe(...)`

### 12. DOMAssertion (9 methods)
- `assertDOMProperty(page, selector, property, value)`
- `assertChildrenCount(page, selector, count)`
- `assertParentElement(page, selector, parentSelector)`
- `assertInnerText(page, selector, text)`
- `assertInnerHTMLContains(page, selector, text)`
- `assertTagName(page, selector, tag)`
- `assertWidth(page, selector, width)`
- `assertHeight(page, selector, height)`
- `assertIsInViewport(page, selector)`

### 13. BaseAssertion
- `getElement(page, selector)` - Get element
- `getElementInIframe(page, iframeSelector, elementSelector)` - Get in iframe
- `exists(page, selector)` - Check existence
- `existsInIframe(page, iframeSelector, elementSelector)` - Check in iframe
- `waitForElement(page, selector, timeout)` - Wait
- `waitForElementInIframe(page, iframeSelector, elementSelector, timeout)` - Wait in iframe

---

## FILE STRUCTURE

```
src/
├── actions/
│   ├── baseAction.js
│   ├── clickAction.js
│   ├── fillAction.js
│   ├── selectAction.js
│   ├── checkAction.js
│   ├── uncheckAction.js
│   ├── navigateAction.js
│   ├── hoverAction.js                  (NEW)
│   ├── doubleClickAction.js             (NEW)
│   ├── rightClickAction.js              (NEW)
│   ├── dragAndDropAction.js             (NEW)
│   ├── scrollAction.js                  (NEW)
│   ├── focusAction.js                   (NEW)
│   └── README.md
├── assertions/
│   ├── baseAssertion.js
│   ├── visibilityAssertion.js
│   ├── textAssertion.js
│   ├── attributeAssertion.js
│   ├── countAssertion.js
│   ├── enabledAssertion.js
│   ├── checkedAssertion.js
│   ├── valueAssertion.js
│   ├── styleAssertion.js                (NEW)
│   ├── urlAndTitleAssertion.js          (NEW)
│   ├── focusAssertion.js                (NEW)
│   ├── optionsAssertion.js              (NEW)
│   ├── domAssertion.js                  (NEW)
│   └── README.md
├── services/
│   └── excelService.js
└── utils/
    └── locatorResolver.js

Root Documentation:
├── IFRAME_GUIDE.md
├── ENHANCEMENT_SUMMARY.md
└── MOUSE_AND_ADVANCED_ASSERTIONS.md    (NEW)
```

---

## USAGE SUMMARY

### Complete Test Workflow
```javascript
const clickAction = new ClickAction();
const fillAction = new FillAction();
const selectAction = new SelectAction();
const scrollAction = new ScrollAction();
const hoverAction = new HoverAction();

const textAssert = new TextAssertion();
const styleAssert = new StyleAssertion();
const urlAssert = new URLAndTitleAssertion();
const domAssert = new DOMAssertion();

// Navigate
await page.goto('https://example.com');
await urlAssert.assertUrlContains(page, 'example.com');

// Interact with form
await scrollAction.execute(page, '#form');
await fillAction.execute(page, 'input[name="email"]', 'user@test.com');
await selectAction.execute(page, '#country', 'US');
await hoverAction.execute(page, '.help-icon');

// Verify results
await textAssert.assertTextContains(page, '.success', 'submitted');
await styleAssert.assertDisplay(page, '.result', 'block');
await domAssert.assertChildrenCount(page, '.result-list', 5);
```

---

## Key Features

✅ **13 Action Classes** - Comprehensive interaction coverage  
✅ **13 Assertion Classes** - Complete verification capabilities  
✅ **Full Iframe Support** - Works seamlessly with iframe elements  
✅ **Consistent API** - Same patterns across all classes  
✅ **Detailed Errors** - Clear error messages for debugging  
✅ **Mouse Operations** - Hover, double-click, right-click, drag-drop  
✅ **Scroll Management** - Element and page scrolling  
✅ **Focus Control** - Focus state management  
✅ **Style Validation** - CSS property assertions  
✅ **DOM Inspection** - Structure and property verification  
✅ **URL/Title Checks** - Navigation verification  
✅ **Select Handling** - Options and dropdown assertions  

---

## Documentation Files

- **[Actions README](src/actions/README.md)** - Action classes documentation
- **[Assertions README](src/assertions/README.md)** - Assertion classes documentation
- **[Iframe Guide](IFRAME_GUIDE.md)** - Iframe implementation guide
- **[Enhancement Summary](ENHANCEMENT_SUMMARY.md)** - Framework overview
- **[Mouse & Advanced Assertions](MOUSE_AND_ADVANCED_ASSERTIONS.md)** - New classes guide

---

## Getting Started

1. Import needed classes in step definitions
2. Create instances or reuse singletons
3. Call appropriate methods with page and selectors
4. Use iframe variants for iframe elements
5. Chain assertions for comprehensive validation

See individual class documentation for detailed method signatures and examples.
