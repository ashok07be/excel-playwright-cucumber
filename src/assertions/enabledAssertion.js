const BaseAssertion = require('./baseAssertion');

class EnabledAssertion extends BaseAssertion {
    /**
     * Assert that element is enabled
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If element is disabled
     */
    async assertIsEnabled(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const isDisabled = await page.isDisabled(selector);
            if (isDisabled) {
                throw new Error(`Element is disabled but should be enabled: ${selector}`);
            }
        } catch (error) {
            throw new Error(`Enabled assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that element is disabled
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If element is enabled
     */
    async assertIsDisabled(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const isDisabled = await page.isDisabled(selector);
            if (!isDisabled) {
                throw new Error(`Element is enabled but should be disabled: ${selector}`);
            }
        } catch (error) {
            throw new Error(`Disabled assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that button is enabled
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If button is disabled
     */
    async assertButtonIsEnabled(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const isDisabled = await page.isDisabled(selector);
            if (isDisabled) {
                throw new Error(`Button is disabled but should be enabled: ${selector}`);
            }
        } catch (error) {
            throw new Error(`Button enabled assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that button is disabled
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If button is enabled
     */
    async assertButtonIsDisabled(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const isDisabled = await page.isDisabled(selector);
            if (!isDisabled) {
                throw new Error(`Button is enabled but should be disabled: ${selector}`);
            }
        } catch (error) {
            throw new Error(`Button disabled assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that element is enabled in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for element within iframe
     * @throws {Error} If element is disabled
     */
    async assertIsEnabledInIframe(page, iframeSelector, elementSelector) {
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
            const isDisabled = await frame.isDisabled(elementSelector);
            if (isDisabled) {
                throw new Error(`Element is disabled in iframe but should be enabled: ${elementSelector}`);
            }
        } catch (error) {
            throw new Error(`Enabled assertion failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }

    /**
     * Assert that element is disabled in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for element within iframe
     * @throws {Error} If element is enabled
     */
    async assertIsDisabledInIframe(page, iframeSelector, elementSelector) {
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
            const isDisabled = await frame.isDisabled(elementSelector);
            if (!isDisabled) {
                throw new Error(`Element is enabled in iframe but should be disabled: ${elementSelector}`);
            }
        } catch (error) {
            throw new Error(`Disabled assertion failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }
}

module.exports = EnabledAssertion;
