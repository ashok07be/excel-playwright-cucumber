const BaseAssertion = require('./baseAssertion');

class CountAssertion extends BaseAssertion {
    /**
     * Assert that exact number of elements are present
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {number} expectedCount - Expected number of elements
     * @throws {Error} If count doesn't match
     */
    async assertElementCount(page, selector, expectedCount) {
        try {
            const elements = await page.$$(selector);
            const actualCount = elements.length;
            if (actualCount !== expectedCount) {
                throw new Error(`Element count mismatch. Expected: ${expectedCount}, but got: ${actualCount}`);
            }
        } catch (error) {
            throw new Error(`Element count assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that at least number of elements are present
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {number} minimumCount - Minimum expected number of elements
     * @throws {Error} If count is less than minimum
     */
    async assertElementCountAtLeast(page, selector, minimumCount) {
        try {
            const elements = await page.$$(selector);
            const actualCount = elements.length;
            if (actualCount < minimumCount) {
                throw new Error(`Element count is less than expected. Minimum: ${minimumCount}, but got: ${actualCount}`);
            }
        } catch (error) {
            throw new Error(`Minimum element count assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that at most number of elements are present
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {number} maximumCount - Maximum expected number of elements
     * @throws {Error} If count is more than maximum
     */
    async assertElementCountAtMost(page, selector, maximumCount) {
        try {
            const elements = await page.$$(selector);
            const actualCount = elements.length;
            if (actualCount > maximumCount) {
                throw new Error(`Element count is more than expected. Maximum: ${maximumCount}, but got: ${actualCount}`);
            }
        } catch (error) {
            throw new Error(`Maximum element count assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that no elements are present
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If elements are found
     */
    async assertNoElements(page, selector) {
        try {
            const elements = await page.$$(selector);
            if (elements.length > 0) {
                throw new Error(`Expected no elements but found ${elements.length} for selector: ${selector}`);
            }
        } catch (error) {
            throw new Error(`No elements assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that at least one element is present
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If no elements are found
     */
    async assertElementExists(page, selector) {
        try {
            const elements = await page.$$(selector);
            if (elements.length === 0) {
                throw new Error(`Expected at least one element but found none for selector: ${selector}`);
            }
        } catch (error) {
            throw new Error(`Element existence assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert element count in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for elements within iframe
     * @param {number} expectedCount - Expected number of elements
     * @throws {Error} If count doesn't match
     */
    async assertElementCountInIframe(page, iframeSelector, elementSelector, expectedCount) {
        try {
            const frameHandle = await page.$(iframeSelector);
            if (!frameHandle) {
                throw new Error(`Iframe not found: ${iframeSelector}`);
            }

            const frame = await frameHandle.contentFrame();
            if (!frame) {
                throw new Error(`Failed to get content frame from: ${iframeSelector}`);
            }

            const elements = await frame.$$(elementSelector);
            const actualCount = elements.length;
            if (actualCount !== expectedCount) {
                throw new Error(`Element count mismatch in iframe. Expected: ${expectedCount}, but got: ${actualCount}`);
            }
        } catch (error) {
            throw new Error(`Element count assertion failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }

    /**
     * Assert minimum element count in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for elements within iframe
     * @param {number} minimumCount - Minimum expected number
     * @throws {Error} If count is less than minimum
     */
    async assertElementCountAtLeastInIframe(page, iframeSelector, elementSelector, minimumCount) {
        try {
            const frameHandle = await page.$(iframeSelector);
            if (!frameHandle) {
                throw new Error(`Iframe not found: ${iframeSelector}`);
            }

            const frame = await frameHandle.contentFrame();
            if (!frame) {
                throw new Error(`Failed to get content frame from: ${iframeSelector}`);
            }

            const elements = await frame.$$(elementSelector);
            const actualCount = elements.length;
            if (actualCount < minimumCount) {
                throw new Error(`Element count in iframe is less than expected. Minimum: ${minimumCount}, but got: ${actualCount}`);
            }
        } catch (error) {
            throw new Error(`Minimum element count assertion failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }
}

module.exports = CountAssertion;
