const BaseAssertion = require('./baseAssertion');

class VisibilityAssertion extends BaseAssertion {
    /**
     * Assert that an element is visible
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If element is not visible
     */
    async assertIsVisible(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const isVisible = await page.isVisible(selector);
            if (!isVisible) {
                throw new Error(`Element is not visible: ${selector}`);
            }
        } catch (error) {
            throw new Error(`Visibility assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that an element is hidden
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If element is visible
     */
    async assertIsHidden(page, selector) {
        try {
            const isVisible = await page.isVisible(selector);
            if (isVisible) {
                throw new Error(`Element is visible but should be hidden: ${selector}`);
            }
        } catch (error) {
            if (error.message.includes('should be hidden')) {
                throw error;
            }
            // Element doesn't exist, which is also hidden
        }
    }

    /**
     * Assert that element is visible in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for element within iframe
     * @throws {Error} If element is not visible
     */
    async assertIsVisibleInIframe(page, iframeSelector, elementSelector) {
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
            const isVisible = await frame.isVisible(elementSelector);
            if (!isVisible) {
                throw new Error(`Element is not visible in iframe: ${elementSelector}`);
            }
        } catch (error) {
            throw new Error(`Visibility assertion failed for element in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }

    /**
     * Assert that element is hidden in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for element within iframe
     * @throws {Error} If element is visible
     */
    async assertIsHiddenInIframe(page, iframeSelector, elementSelector) {
        try {
            const frameHandle = await page.$(iframeSelector);
            if (!frameHandle) {
                throw new Error(`Iframe not found: ${iframeSelector}`);
            }

            const frame = await frameHandle.contentFrame();
            if (!frame) {
                throw new Error(`Failed to get content frame from: ${iframeSelector}`);
            }

            const isVisible = await frame.isVisible(elementSelector);
            if (isVisible) {
                throw new Error(`Element is visible in iframe but should be hidden: ${elementSelector}`);
            }
        } catch (error) {
            if (error.message.includes('should be hidden')) {
                throw error;
            }
            // Element doesn't exist, which is also hidden
        }
    }
}

module.exports = VisibilityAssertion;
