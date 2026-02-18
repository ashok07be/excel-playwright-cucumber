const BaseAssertion = require('./baseAssertion');

class CheckedAssertion extends BaseAssertion {
    /**
     * Assert that checkbox or radio button is checked
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If element is not checked
     */
    async assertIsChecked(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const isChecked = await page.isChecked(selector);
            if (!isChecked) {
                throw new Error(`Element is not checked but should be checked: ${selector}`);
            }
        } catch (error) {
            throw new Error(`Checked assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that checkbox or radio button is not checked
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If element is checked
     */
    async assertIsNotChecked(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const isChecked = await page.isChecked(selector);
            if (isChecked) {
                throw new Error(`Element is checked but should not be checked: ${selector}`);
            }
        } catch (error) {
            throw new Error(`Unchecked assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that checkbox is checked
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If checkbox is not checked
     */
    async assertCheckboxIsChecked(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const isChecked = await page.isChecked(selector);
            if (!isChecked) {
                throw new Error(`Checkbox is not checked but should be checked: ${selector}`);
            }
        } catch (error) {
            throw new Error(`Checkbox checked assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that checkbox is unchecked
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If checkbox is checked
     */
    async assertCheckboxIsUnchecked(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const isChecked = await page.isChecked(selector);
            if (isChecked) {
                throw new Error(`Checkbox is checked but should be unchecked: ${selector}`);
            }
        } catch (error) {
            throw new Error(`Checkbox unchecked assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that radio button is selected
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If radio button is not selected
     */
    async assertRadioIsSelected(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const isChecked = await page.isChecked(selector);
            if (!isChecked) {
                throw new Error(`Radio button is not selected but should be selected: ${selector}`);
            }
        } catch (error) {
            throw new Error(`Radio button selected assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that radio button is not selected
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector
     * @throws {Error} If radio button is selected
     */
    async assertRadioIsNotSelected(page, selector) {
        try {
            await this.waitForElement(page, selector);
            const isChecked = await page.isChecked(selector);
            if (isChecked) {
                throw new Error(`Radio button is selected but should not be selected: ${selector}`);
            }
        } catch (error) {
            throw new Error(`Radio button not selected assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that checkbox is checked in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for checkbox within iframe
     * @throws {Error} If checkbox is not checked
     */
    async assertIsCheckedInIframe(page, iframeSelector, elementSelector) {
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
            const isChecked = await frame.isChecked(elementSelector);
            if (!isChecked) {
                throw new Error(`Element is not checked in iframe but should be checked: ${elementSelector}`);
            }
        } catch (error) {
            throw new Error(`Checked assertion failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }

    /**
     * Assert that checkbox is unchecked in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} elementSelector - Selector for checkbox within iframe
     * @throws {Error} If checkbox is checked
     */
    async assertIsNotCheckedInIframe(page, iframeSelector, elementSelector) {
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
            const isChecked = await frame.isChecked(elementSelector);
            if (isChecked) {
                throw new Error(`Element is checked in iframe but should not be checked: ${elementSelector}`);
            }
        } catch (error) {
            throw new Error(`Unchecked assertion failed in iframe. Iframe: ${iframeSelector}, Element: ${elementSelector}. ${error.message}`);
        }
    }
}

module.exports = CheckedAssertion;
