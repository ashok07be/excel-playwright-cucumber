const BaseAction = require('./baseAction');

class FillAction extends BaseAction {
    /**
     * Fill a form field with value
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} value - Value to fill
     */
    async execute(page, selector, value) {
        try {
            await this.waitForElement(page, selector);
            await page.fill(selector, value);
        } catch (error) {
            throw new Error(`Fill action failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Fill a form field in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for input within iframe
     * @param {string} value - Value to fill
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
            await frame.fill(elementSelector, value);
        } catch (error) {
            throw new Error(`Fill action failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }
}

module.exports = FillAction;