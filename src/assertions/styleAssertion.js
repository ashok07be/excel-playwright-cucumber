const BaseAssertion = require('./baseAssertion');

class StyleAssertion extends BaseAssertion {
    /**
     * Assert that element has specific CSS style value
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} styleProperty - CSS property name (e.g., 'color', 'background-color')
     * @param {string} expectedValue - Expected style value
     * @throws {Error} If style doesn't match
     */
    async assertStyleValue(page, selector, styleProperty, expectedValue) {
        try {
            await this.waitForElement(page, selector);
            const actualValue = await page.evaluate(
                ({ selector, property }) => {
                    const element = document.querySelector(selector);
                    return window.getComputedStyle(element).getPropertyValue(property);
                },
                { selector, property: styleProperty }
            );

            if (!actualValue || !actualValue.includes(expectedValue)) {
                throw new Error(`Style mismatch. Property: "${styleProperty}", Expected: "${expectedValue}", but got: "${actualValue}"`);
            }
        } catch (error) {
            throw new Error(`Style assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that element has specific display value
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} expectedDisplay - Expected display value (e.g., 'block', 'none', 'flex')
     * @throws {Error} If display doesn't match
     */
    async assertDisplay(page, selector, expectedDisplay) {
        try {
            await this.waitForElement(page, selector);
            const actualDisplay = await page.evaluate((selector) => {
                return window.getComputedStyle(document.querySelector(selector)).display;
            }, selector);

            if (actualDisplay !== expectedDisplay) {
                throw new Error(`Display mismatch. Expected: "${expectedDisplay}", but got: "${actualDisplay}"`);
            }
        } catch (error) {
            throw new Error(`Display assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert element has specific background color
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} expectedColor - Expected background color
     * @throws {Error} If background color doesn't match
     */
    async assertBackgroundColor(page, selector, expectedColor) {
        try {
            await this.waitForElement(page, selector);
            const actualColor = await page.evaluate((selector) => {
                return window.getComputedStyle(document.querySelector(selector)).backgroundColor;
            }, selector);

            if (!actualColor.includes(expectedColor)) {
                throw new Error(`Background color mismatch. Expected: "${expectedColor}", but got: "${actualColor}"`);
            }
        } catch (error) {
            throw new Error(`Background color assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert element has specific text color
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} expectedColor - Expected text color
     * @throws {Error} If text color doesn't match
     */
    async assertTextColor(page, selector, expectedColor) {
        try {
            await this.waitForElement(page, selector);
            const actualColor = await page.evaluate((selector) => {
                return window.getComputedStyle(document.querySelector(selector)).color;
            }, selector);

            if (!actualColor.includes(expectedColor)) {
                throw new Error(`Text color mismatch. Expected: "${expectedColor}", but got: "${actualColor}"`);
            }
        } catch (error) {
            throw new Error(`Text color assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert element has specific font size
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @param {string} expectedSize - Expected font size
     * @throws {Error} If font size doesn't match
     */
    async assertFontSize(page, selector, expectedSize) {
        try {
            await this.waitForElement(page, selector);
            const actualSize = await page.evaluate((selector) => {
                return window.getComputedStyle(document.querySelector(selector)).fontSize;
            }, selector);

            if (actualSize !== expectedSize) {
                throw new Error(`Font size mismatch. Expected: "${expectedSize}", but got: "${actualSize}"`);
            }
        } catch (error) {
            throw new Error(`Font size assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert style value in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for element within iframe
     * @param {string} styleProperty - CSS property name
     * @param {string} expectedValue - Expected style value
     * @throws {Error} If style doesn't match
     */
    async assertStyleValueInIframe(page, iframeSelector, elementSelector, styleProperty, expectedValue) {
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
            const actualValue = await frame.evaluate(
                ({ selector, property }) => {
                    const element = document.querySelector(selector);
                    return window.getComputedStyle(element).getPropertyValue(property);
                },
                { selector: elementSelector, property: styleProperty }
            );

            if (!actualValue || !actualValue.includes(expectedValue)) {
                throw new Error(`Style mismatch in iframe. Property: "${styleProperty}", Expected: "${expectedValue}", but got: "${actualValue}"`);
            }
        } catch (error) {
            throw new Error(`Style assertion failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }
}

module.exports = StyleAssertion;
