const BaseAssertion = require('./baseAssertion');

class ValueAssertion extends BaseAssertion {
    /**
     * Assert that input field has specific value
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} expectedValue - Expected input value
     * @throws {Error} If value doesn't match
     */
    async assertInputValue(page, selector, expectedValue) {
        try {
            await this.waitForElement(page, selector);
            const actualValue = await page.inputValue(selector);
            if (actualValue !== expectedValue) {
                throw new Error(`Input value mismatch. Expected: "${expectedValue}", but got: "${actualValue}"`);
            }
        } catch (error) {
            throw new Error(`Input value assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that input field value contains expected text
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} expectedValue - Expected value to contain
     * @throws {Error} If value doesn't contain expected text
     */
    async assertInputValueContains(page, selector, expectedValue) {
        try {
            await this.waitForElement(page, selector);
            const actualValue = await page.inputValue(selector);
            if (!actualValue.includes(expectedValue)) {
                throw new Error(`Input value doesn't contain expected text. Expected to contain: "${expectedValue}", but got: "${actualValue}"`);
            }
        } catch (error) {
            throw new Error(`Input value contains assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that input field is empty
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If input has value
     */
    async assertInputIsEmpty(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const actualValue = await page.inputValue(selector);
            if (actualValue !== '') {
                throw new Error(`Input should be empty but contains: "${actualValue}"`);
            }
        } catch (error) {
            throw new Error(`Empty input assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that input field is not empty
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If input is empty
     */
    async assertInputIsNotEmpty(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const actualValue = await page.inputValue(selector);
            if (actualValue === '') {
                throw new Error(`Input should not be empty but is empty`);
            }
        } catch (error) {
            throw new Error(`Non-empty input assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that select field has specific value
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} expectedValue - Expected selected value
     * @throws {Error} If selected value doesn't match
     */
    async assertSelectValue(page, selector, expectedValue) {
        try {
            await this.waitForElement(page, selector);
            const actualValue = await page.inputValue(selector);
            if (actualValue !== expectedValue) {
                throw new Error(`Select value mismatch. Expected: "${expectedValue}", but got: "${actualValue}"`);
            }
        } catch (error) {
            throw new Error(`Select value assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert input field value in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for input within iframe
     * @param {string} expectedValue - Expected input value
     * @throws {Error} If value doesn't match
     */
    async assertInputValueInIframe(page, iframeSelector, elementSelector, expectedValue) {
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
            const actualValue = await frame.inputValue(elementSelector);
            if (actualValue !== expectedValue) {
                throw new Error(`Input value mismatch in iframe. Expected: "${expectedValue}", but got: "${actualValue}"`);
            }
        } catch (error) {
            throw new Error(`Input value assertion failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }

    /**
     * Assert that select value matches in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for select within iframe
     * @param {string} expectedValue - Expected selected value
     * @throws {Error} If selected value doesn't match
     */
    async assertSelectValueInIframe(page, iframeSelector, elementSelector, expectedValue) {
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
            const actualValue = await frame.inputValue(elementSelector);
            if (actualValue !== expectedValue) {
                throw new Error(`Select value mismatch in iframe. Expected: "${expectedValue}", but got: "${actualValue}"`);
            }
        } catch (error) {
            throw new Error(`Select value assertion failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }
}

module.exports = ValueAssertion;
