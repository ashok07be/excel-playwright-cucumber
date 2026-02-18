const BaseAssertion = require('./baseAssertion');

class FocusAssertion extends BaseAssertion {
    /**
     * Assert that element has focus
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If element doesn't have focus
     */
    async assertHasFocus(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const hasFocus = await page.evaluate((selector) => {
                return document.querySelector(selector) === document.activeElement;
            }, selector);

            if (!hasFocus) {
                throw new Error(`Element doesn't have focus: ${selector}`);
            }
        } catch (error) {
            throw new Error(`Focus assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that element doesn't have focus
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If element has focus
     */
    async assertDoesNotHaveFocus(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const hasFocus = await page.evaluate((selector) => {
                return document.querySelector(selector) === document.activeElement;
            }, selector);

            if (hasFocus) {
                throw new Error(`Element has focus but shouldn't: ${selector}`);
            }
        } catch (error) {
            throw new Error(`No focus assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert focused element is of specific type
     * @param {Page} page - Playwright page object
     * @param {string} expectedType - Expected element type (e.g., 'input', 'button', 'textarea')
     * @throws {Error} If focused element type doesn't match
     */
    async assertFocusedElementType(page, expectedType) {
        try {
            const actualType = await page.evaluate(() => {
                return document.activeElement?.tagName?.toLowerCase() || null;
            });

            if (actualType !== expectedType.toLowerCase()) {
                throw new Error(`Focused element type mismatch. Expected: "${expectedType}", but got: "${actualType}"`);
            }
        } catch (error) {
            throw new Error(`Focused element type assertion failed. ${error.message}`);
        }
    }

    /**
     * Assert focus is on element in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for element within iframe
     * @throws {Error} If element in iframe doesn't have focus
     */
    async assertHasFocusInIframe(page, iframeSelector, elementSelector) {
        try {
            const frameHandle = await page.$(iframeSelector);
            if (!frameHandle) {
                throw new Error(`Iframe not found: ${iframeSelector}`);
            }

            const frame = await frameHandle.contentFrame();
            if (!frame) {
                throw new Error(`Failed to get content frame from: ${iframeSelector}`);
            }

            await frame.waitForSelector(elementSelector);
            const hasFocus = await frame.evaluate((selector) => {
                return document.querySelector(selector) === document.activeElement;
            }, elementSelector);

            if (!hasFocus) {
                throw new Error(`Element in iframe doesn't have focus: ${elementSelector}`);
            }
        } catch (error) {
            throw new Error(`Focus assertion failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }

    /**
     * Assert element is focusable
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If element is not focusable
     */
    async assertIsFocusable(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const isFocusable = await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                const focusableElements = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'];
                return focusableElements.includes(element?.tagName) || element?.tabIndex >= 0;
            }, selector);

            if (!isFocusable) {
                throw new Error(`Element is not focusable: ${selector}`);
            }
        } catch (error) {
            throw new Error(`Focusable assertion failed for selector: ${selector}. ${error.message}`);
        }
    }
}

module.exports = FocusAssertion;
