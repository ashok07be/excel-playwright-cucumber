const BaseAssertion = require('./baseAssertion');

class DOMAssertion extends BaseAssertion {
    /**
     * Assert element has specific DOM property value
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} propertyName - DOM property name
     * @param {string} expectedValue - Expected property value
     * @throws {Error} If property doesn't match
     */
    async assertDOMProperty(page, selector, propertyName, expectedValue) {
        try {
            await this.waitForElement(page, selector);
            const actualValue = await page.evaluate(
                ({ selector, property }) => {
                    return document.querySelector(selector)[property];
                },
                { selector, property: propertyName }
            );

            if (actualValue !== expectedValue) {
                throw new Error(`DOM property mismatch. Property: "${propertyName}", Expected: "${expectedValue}", but got: "${actualValue}"`);
            }
        } catch (error) {
            throw new Error(`DOM property assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert element has specific number of children
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {number} expectedCount - Expected number of children
     * @throws {Error} If child count doesn't match
     */
    async assertChildrenCount(page, selector, expectedCount) {
        try {
            await this.waitForElement(page, selector);
            const actualCount = await page.evaluate((selector) => {
                return document.querySelector(selector).children.length;
            }, selector);

            if (actualCount !== expectedCount) {
                throw new Error(`Children count mismatch. Expected: ${expectedCount}, but got: ${actualCount}`);
            }
        } catch (error) {
            throw new Error(`Children count assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert element has parent matching selector
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector for child element
     * @param {string} parentSelector - CSS selector for parent
     * @throws {Error} If parent doesn't match
     */
    async assertParentElement(page, selector, parentSelector) {
        try {
            await this.waitForElement(page, selector);
            const hasParent = await page.evaluate(
                ({ selector, parentSelector }) => {
                    const element = document.querySelector(selector);
                    return element?.closest(parentSelector) !== null;
                },
                { selector, parentSelector }
            );

            if (!hasParent) {
                throw new Error(`Element doesn't have parent matching: ${parentSelector}`);
            }
        } catch (error) {
            throw new Error(`Parent element assertion failed. ${error.message}`);
        }
    }

    /**
     * Assert element innerText matches
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} expectedText - Expected inner text
     * @throws {Error} If inner text doesn't match
     */
    async assertInnerText(page, selector, expectedText) {
        try {
            await this.waitForElement(page, selector);
            const actualText = await page.evaluate((selector) => {
                return document.querySelector(selector).innerText?.trim() || '';
            }, selector);

            if (actualText !== expectedText.trim()) {
                throw new Error(`Inner text mismatch. Expected: "${expectedText}", but got: "${actualText}"`);
            }
        } catch (error) {
            throw new Error(`Inner text assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert element innerHTML contains text
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} expectedText - Expected text in HTML
     * @throws {Error} If text not found in HTML
     */
    async assertInnerHTMLContains(page, selector, expectedText) {
        try {
            await this.waitForElement(page, selector);
            const actualHTML = await page.evaluate((selector) => {
                return document.querySelector(selector).innerHTML;
            }, selector);

            if (!actualHTML.includes(expectedText)) {
                throw new Error(`Inner HTML doesn't contain: "${expectedText}"`);
            }
        } catch (error) {
            throw new Error(`Inner HTML assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert element has specific tag name
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} expectedTag - Expected tag name (e.g., 'div', 'span', 'button')
     * @throws {Error} If tag name doesn't match
     */
    async assertTagName(page, selector, expectedTag) {
        try {
            await this.waitForElement(page, selector);
            const actualTag = await page.evaluate((selector) => {
                return document.querySelector(selector).tagName.toLowerCase();
            }, selector);

            if (actualTag !== expectedTag.toLowerCase()) {
                throw new Error(`Tag name mismatch. Expected: "${expectedTag}", but got: "${actualTag}"`);
            }
        } catch (error) {
            throw new Error(`Tag name assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert element has specific width
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {number} expectedWidth - Expected width in pixels
     * @throws {Error} If width doesn't match
     */
    async assertWidth(page, selector, expectedWidth) {
        try {
            await this.waitForElement(page, selector);
            const actualWidth = await page.evaluate((selector) => {
                return document.querySelector(selector).offsetWidth;
            }, selector);

            if (actualWidth !== expectedWidth) {
                throw new Error(`Width mismatch. Expected: ${expectedWidth}px, but got: ${actualWidth}px`);
            }
        } catch (error) {
            throw new Error(`Width assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert element has specific height
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {number} expectedHeight - Expected height in pixels
     * @throws {Error} If height doesn't match
     */
    async assertHeight(page, selector, expectedHeight) {
        try {
            await this.waitForElement(page, selector);
            const actualHeight = await page.evaluate((selector) => {
                return document.querySelector(selector).offsetHeight;
            }, selector);

            if (actualHeight !== expectedHeight) {
                throw new Error(`Height mismatch. Expected: ${expectedHeight}px, but got: ${actualHeight}px`);
            }
        } catch (error) {
            throw new Error(`Height assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert element is within viewport
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If element is outside viewport
     */
    async assertIsInViewport(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const isInViewport = await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                const rect = element.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= window.innerHeight &&
                    rect.right <= window.innerWidth
                );
            }, selector);

            if (!isInViewport) {
                throw new Error(`Element is not completely visible in viewport: ${selector}`);
            }
        } catch (error) {
            throw new Error(`Viewport assertion failed for selector: ${selector}. ${error.message}`);
        }
    }
}

module.exports = DOMAssertion;
