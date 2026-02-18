const BaseAssertion = require('./baseAssertion');

class AttributeAssertion extends BaseAssertion {
    /**
     * Assert that element has specific attribute with value
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} attributeName - Name of the attribute
     * @param {string} expectedValue - Expected attribute value
     * @throws {Error} If attribute doesn't match
     */
    async assertAttributeEquals(page, selector, attributeName, expectedValue) {
        try {
            await this.waitForElement(page, selector);
            const actualValue = await page.getAttribute(selector, attributeName);
            if (actualValue !== expectedValue) {
                throw new Error(`Attribute "${attributeName}" mismatch. Expected: "${expectedValue}", but got: "${actualValue}"`);
            }
        } catch (error) {
            throw new Error(`Attribute assertion failed for selector: ${selector}, attribute: ${attributeName}. ${error.message}`);
        }
    }

    /**
     * Assert that element attribute contains value
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} attributeName - Name of the attribute
     * @param {string} expectedValue - Expected value to be contained
     * @throws {Error} If attribute doesn't contain value
     */
    async assertAttributeContains(page, selector, attributeName, expectedValue) {
        try {
            await this.waitForElement(page, selector);
            const actualValue = await page.getAttribute(selector, attributeName);
            if (!actualValue || !actualValue.includes(expectedValue)) {
                throw new Error(`Attribute "${attributeName}" doesn't contain expected value. Expected to contain: "${expectedValue}", but got: "${actualValue}"`);
            }
        } catch (error) {
            throw new Error(`Attribute contains assertion failed for selector: ${selector}, attribute: ${attributeName}. ${error.message}`);
        }
    }

    /**
     * Assert that element has specific class
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} className - Class name to check
     * @throws {Error} If class is not present
     */
    async assertHasClass(page, selector, className) {
        try {
            await this.waitForElement(page, selector);
            const classes = await page.getAttribute(selector, 'class');
            if (!classes || !classes.includes(className)) {
                throw new Error(`Class "${className}" not found. Classes: "${classes}"`);
            }
        } catch (error) {
            throw new Error(`Class assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that element doesn't have specific class
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} className - Class name to check
     * @throws {Error} If class is present
     */
    async assertDoesNotHaveClass(page, selector, className) {
        try {
            await this.waitForElement(page, selector);
            const classes = await page.getAttribute(selector, 'class');
            if (classes && classes.includes(className)) {
                throw new Error(`Class "${className}" should not be present but found in: "${classes}"`);
            }
        } catch (error) {
            if (error.message.includes('should not be present')) {
                throw error;
            }
        }
    }

    /**
     * Assert element attribute in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for element within iframe
     * @param {string} attributeName - Name of the attribute
     * @param {string} expectedValue - Expected attribute value
     * @throws {Error} If attribute doesn't match
     */
    async assertAttributeEqualsInIframe(page, iframeSelector, elementSelector, attributeName, expectedValue) {
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
            const actualValue = await frame.getAttribute(elementSelector, attributeName);
            if (actualValue !== expectedValue) {
                throw new Error(`Attribute "${attributeName}" mismatch in iframe. Expected: "${expectedValue}", but got: "${actualValue}"`);
            }
        } catch (error) {
            throw new Error(`Attribute assertion failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}, Attribute: ${attributeName}. ${error.message}`);
        }
    }

    /**
     * Assert element has specific data attribute value
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} dataName - Data attribute name (without 'data-' prefix)
     * @param {string} expectedValue - Expected value
     * @throws {Error} If data attribute doesn't match
     */
    async assertDataAttribute(page, selector, dataName, expectedValue) {
        try {
            await this.waitForElement(page, selector);
            const actualValue = await page.getAttribute(selector, `data-${dataName}`);
            if (actualValue !== expectedValue) {
                throw new Error(`Data attribute "data-${dataName}" mismatch. Expected: "${expectedValue}", but got: "${actualValue}"`);
            }
        } catch (error) {
            throw new Error(`Data attribute assertion failed for selector: ${selector}. ${error.message}`);
        }
    }
}

module.exports = AttributeAssertion;
