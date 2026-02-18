const BaseAction = require('./baseAction');

class SelectAction extends BaseAction {
    /**
     * Select an option from a select field
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} value - Value to select
     */
    async execute(page, selector, value) {
        try {
            await this.waitForElement(page, selector);
            await page.selectOption(selector, value);
        } catch (error) {
            throw new Error(`Select action failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Select option from a select field in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for select within iframe
     * @param {string} value - Value to select
     */
    async executeInIframe(page, iframeSelector, elementSelector, value) {
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
            await frame.selectOption(elementSelector, value);
        } catch (error) {
            throw new Error(`Select action failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }
}

module.exports = SelectAction;