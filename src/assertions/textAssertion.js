const BaseAssertion = require('./baseAssertion');

class TextAssertion extends BaseAssertion {
    /**
     * Assert that element contains specific text
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} expectedText - Expected text content
     * @throws {Error} If text doesn't match
     */
    async assertTextContains(page, selector, expectedText) {
        try {
            await this.waitForElement(page, selector);
            const actualText = await page.textContent(selector);
            if (!actualText || !actualText.includes(expectedText)) {
                throw new Error(`Text not found. Expected to contain: "${expectedText}", but got: "${actualText}"`);
            }
        } catch (error) {
            throw new Error(`Text assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that element has exact text
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} expectedText - Expected exact text
     * @throws {Error} If text doesn't match exactly
     */
    async assertTextEquals(page, selector, expectedText) {
        try {
            await this.waitForElement(page, selector);
            const actualText = await page.textContent(selector);
            const trimmedActual = actualText ? actualText.trim() : '';
            const trimmedExpected = expectedText.trim();
            if (trimmedActual !== trimmedExpected) {
                throw new Error(`Text mismatch. Expected: "${trimmedExpected}", but got: "${trimmedActual}"`);
            }
        } catch (error) {
            throw new Error(`Exact text assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that element text matches regex
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {RegExp|string} pattern - Regex pattern
     * @throws {Error} If text doesn't match pattern
     */
    async assertTextMatches(page, selector, pattern) {
        try {
            await this.waitForElement(page, selector);
            const actualText = await page.textContent(selector);
            const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
            if (!regex.test(actualText)) {
                throw new Error(`Text doesn't match pattern. Pattern: "${pattern}", Text: "${actualText}"`);
            }
        } catch (error) {
            throw new Error(`Regex text assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert element text in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for element within iframe
     * @param {string} expectedText - Expected text content
     * @throws {Error} If text doesn't match
     */
    async assertTextContainsInIframe(page, iframeSelector, elementSelector, expectedText) {
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
            const actualText = await frame.textContent(elementSelector);
            if (!actualText || !actualText.includes(expectedText)) {
                throw new Error(`Text not found in iframe. Expected to contain: "${expectedText}", but got: "${actualText}"`);
            }
        } catch (error) {
            throw new Error(`Text assertion failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }

    /**
     * Assert element has exact text in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for element within iframe
     * @param {string} expectedText - Expected exact text
     * @throws {Error} If text doesn't match exactly
     */
    async assertTextEqualsInIframe(page, iframeSelector, elementSelector, expectedText) {
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
            const actualText = await frame.textContent(elementSelector);
            const trimmedActual = actualText ? actualText.trim() : '';
            const trimmedExpected = expectedText.trim();
            if (trimmedActual !== trimmedExpected) {
                throw new Error(`Text mismatch in iframe. Expected: "${trimmedExpected}", but got: "${trimmedActual}"`);
            }
        } catch (error) {
            throw new Error(`Exact text assertion failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }
}

module.exports = TextAssertion;
