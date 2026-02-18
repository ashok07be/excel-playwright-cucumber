class BaseAssertion {
    /**
     * Get an element, handling both regular and iframe selectors
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector or iframe path (e.g., "iframe#iframeId >> input.field")
     * @returns {ElementHandle} The element
     */
    async getElement(page, selector) {
        if (!page) throw new Error('Page is required for assertions');
        
        try {
            // Handle iframe selectors: "iframe#id >> selector"
            if (selector.includes('>>')) {
                return await page.locator(selector).first();
            }
            
            const element = await page.$(selector);
            if (!element) {
                throw new Error(`Element not found for selector: ${selector}`);
            }
            return element;
        } catch (error) {
            throw new Error(`Failed to get element with selector: ${selector}. Error: ${error.message}`);
        }
    }

    /**
     * Get elements within an iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for element within iframe
     * @returns {ElementHandle} The element within iframe
     */
    async getElementInIframe(page, iframeSelector, elementSelector) {
        if (!page) throw new Error('Page is required for assertions');
        
        try {
            const frameHandle = await page.$(iframeSelector);
            if (!frameHandle) {
                throw new Error(`Iframe not found for selector: ${iframeSelector}`);
            }
            
            const frame = await frameHandle.contentFrame();
            if (!frame) {
                throw new Error(`Failed to get content frame from: ${iframeSelector}`);
            }
            
            const element = await frame.$(elementSelector);
            if (!element) {
                throw new Error(`Element not found in iframe. Element selector: ${elementSelector}`);
            }
            
            return element;
        } catch (error) {
            throw new Error(`Failed to get element in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. Error: ${error.message}`);
        }
    }

    /**
     * Check if element exists
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @returns {boolean} True if element exists
     */
    async exists(page, selector) {
        if (!page) throw new Error('Page is required for assertions');
        
        try {
            const element = await page.$(selector);
            return !!element;
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if element exists in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for element within iframe
     * @returns {boolean} True if element exists in iframe
     */
    async existsInIframe(page, iframeSelector, elementSelector) {
        try {
            await this.getElementInIframe(page, iframeSelector, elementSelector);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Wait for element to be ready
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForElement(page, selector, timeout = 5000) {
        if (!page) throw new Error('Page is required for assertions');
        
        try {
            await page.waitForSelector(selector, { timeout });
        } catch (error) {
            throw new Error(`Element not found within timeout for selector: ${selector}`);
        }
    }

    /**
     * Wait for element in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for element within iframe
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForElementInIframe(page, iframeSelector, elementSelector, timeout = 5000) {
        try {
            const frameHandle = await page.waitForSelector(iframeSelector, { timeout });
            const frame = await frameHandle.contentFrame();
            if (!frame) {
                throw new Error(`Failed to get content frame from: ${iframeSelector}`);
            }
            await frame.waitForSelector(elementSelector, { timeout });
        } catch (error) {
            throw new Error(`Element not found in iframe within timeout. Iframe: ${iframeSelector}, Element: ${elementSelector}`);
        }
    }
}

module.exports = BaseAssertion;
