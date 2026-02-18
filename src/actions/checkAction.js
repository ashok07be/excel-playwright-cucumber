const BaseAction = require('./baseAction');

class CheckAction extends BaseAction {
    /**
     * Check a checkbox or radio button
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     */
    async execute(page, selector) {
        try {
            await this.waitForElement(page, selector);
            await page.check(selector);
        } catch (error) {
            throw new Error(`Check action failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Check a checkbox or radio button in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for checkbox within iframe
     */
    async executeInIframe(page, iframeSelector, elementSelector) {
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
            await frame.check(elementSelector);
        } catch (error) {
            throw new Error(`Check action failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }
}

module.exports = CheckAction;
