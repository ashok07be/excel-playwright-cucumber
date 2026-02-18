const BaseAction = require('./baseAction');

class FocusAction extends BaseAction {
    /**
     * Set focus on an element
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     */
    async execute(page, selector) {
        try {
            await this.waitForElement(page, selector);
            await page.focus(selector);
        } catch (error) {
            throw new Error(`Focus action failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Set focus on an element in iframe
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
            await frame.focus(elementSelector);
        } catch (error) {
            throw new Error(`Focus action failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }

    /**
     * Clear focus from all elements
     * @param {Page} page - Playwright page object
     */
    async clearFocus(page) {
        try {
            await page.evaluate(() => {
                document.activeElement.blur();
            });
        } catch (error) {
            throw new Error(`Clear focus action failed. ${error.message}`);
        }
    }
}

module.exports = FocusAction;
