const BaseAction = require('./baseAction');

class ScrollAction extends BaseAction {
    /**
     * Scroll to an element
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     */
    async execute(page, selector) {
        try {
            await this.waitForElement(page, selector);
            await page.locator(selector).scrollIntoViewIfNeeded();
        } catch (error) {
            throw new Error(`Scroll action failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Scroll to an element in iframe
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
            await frame.locator(elementSelector).scrollIntoViewIfNeeded();
        } catch (error) {
            throw new Error(`Scroll action failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }

    /**
     * Scroll page vertically
     * @param {Page} page - Playwright page object
     * @param {number} pixels - Number of pixels to scroll (positive = down, negative = up)
     */
    async scrollPage(page, pixels) {
        try {
            await page.evaluate((px) => {
                window.scrollBy(0, px);
            }, pixels);
        } catch (error) {
            throw new Error(`Page scroll action failed. ${error.message}`);
        }
    }

    /**
     * Scroll to top of page
     * @param {Page} page - Playwright page object
     */
    async scrollToTop(page) {
        try {
            await page.evaluate(() => {
                window.scrollTo(0, 0);
            });
        } catch (error) {
            throw new Error(`Scroll to top action failed. ${error.message}`);
        }
    }

    /**
     * Scroll to bottom of page
     * @param {Page} page - Playwright page object
     */
    async scrollToBottom(page) {
        try {
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });
        } catch (error) {
            throw new Error(`Scroll to bottom action failed. ${error.message}`);
        }
    }
}

module.exports = ScrollAction;
