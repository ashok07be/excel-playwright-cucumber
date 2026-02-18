const BaseAction = require('./baseAction');

class RightClickAction extends BaseAction {
    /**
     * Right click (context menu) on an element
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     */
    async execute(page, selector) {
        try {
            await this.waitForElement(page, selector);
            await page.click(selector, { button: 'right' });
        } catch (error) {
            throw new Error(`Right click action failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Right click on an element in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for element within iframe
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
            await frame.click(elementSelector, { button: 'right' });
        } catch (error) {
            throw new Error(`Right click action failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }
}

module.exports = RightClickAction;
