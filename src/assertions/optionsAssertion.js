const BaseAssertion = require('./baseAssertion');

class OptionsAssertion extends BaseAssertion {
    /**
     * Assert that select has specific option available
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector for select element
     * @param {string} optionValue - Option value to check
     * @throws {Error} If option is not available
     */
    async assertHasOption(page, selector, optionValue) {
        try {
            await this.waitForElement(page, selector);
            const hasOption = await page.evaluate(
                ({ selector, value }) => {
                    const select = document.querySelector(selector);
                    return Array.from(select.options).some(opt => opt.value === value);
                },
                { selector, value: optionValue }
            );

            if (!hasOption) {
                throw new Error(`Option "${optionValue}" not found in select`);
            }
        } catch (error) {
            throw new Error(`Has option assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert that select has specific option text available
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector for select element
     * @param {string} optionText - Option text to check
     * @throws {Error} If option text is not available
     */
    async assertHasOptionText(page, selector, optionText) {
        try {
            await this.waitForElement(page, selector);
            const hasOption = await page.evaluate(
                ({ selector, text }) => {
                    const select = document.querySelector(selector);
                    return Array.from(select.options).some(opt => opt.textContent.trim() === text);
                },
                { selector, text: optionText }
            );

            if (!hasOption) {
                throw new Error(`Option with text "${optionText}" not found in select`);
            }
        } catch (error) {
            throw new Error(`Has option text assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert exact number of options in select
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector for select element
     * @param {number} expectedCount - Expected number of options
     * @throws {Error} If option count doesn't match
     */
    async assertOptionCount(page, selector, expectedCount) {
        try {
            await this.waitForElement(page, selector);
            const actualCount = await page.evaluate((selector) => {
                const select = document.querySelector(selector);
                return select.options.length;
            }, selector);

            if (actualCount !== expectedCount) {
                throw new Error(`Option count mismatch. Expected: ${expectedCount}, but got: ${actualCount}`);
            }
        } catch (error) {
            throw new Error(`Option count assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert select has at least number of options
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector for select element
     * @param {number} minimumCount - Minimum expected number of options
     * @throws {Error} If option count is less than minimum
     */
    async assertMinimumOptions(page, selector, minimumCount) {
        try {
            await this.waitForElement(page, selector);
            const actualCount = await page.evaluate((selector) => {
                const select = document.querySelector(selector);
                return select.options.length;
            }, selector);

            if (actualCount < minimumCount) {
                throw new Error(`Option count is less than expected. Minimum: ${minimumCount}, but got: ${actualCount}`);
            }
        } catch (error) {
            throw new Error(`Minimum options assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert option is disabled
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector for select element
     * @param {string} optionValue - Option value to check
     * @throws {Error} If option is not disabled
     */
    async assertOptionIsDisabled(page, selector, optionValue) {
        try {
            await this.waitForElement(page, selector);
            const isDisabled = await page.evaluate(
                ({ selector, value }) => {
                    const select = document.querySelector(selector);
                    const option = Array.from(select.options).find(opt => opt.value === value);
                    return option ? option.disabled : false;
                },
                { selector, value: optionValue }
            );

            if (!isDisabled) {
                throw new Error(`Option "${optionValue}" is not disabled`);
            }
        } catch (error) {
            throw new Error(`Option disabled assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert option is enabled
     * @param {Page} page - Playwright page object
     * @param {string} selector - CSS selector for select element
     * @param {string} optionValue - Option value to check
     * @throws {Error} If option is disabled
     */
    async assertOptionIsEnabled(page, selector, optionValue) {
        try {
            await this.waitForElement(page, selector);
            const isEnabled = await page.evaluate(
                ({ selector, value }) => {
                    const select = document.querySelector(selector);
                    const option = Array.from(select.options).find(opt => opt.value === value);
                    return option ? !option.disabled : false;
                },
                { selector, value: optionValue }
            );

            if (!isEnabled) {
                throw new Error(`Option "${optionValue}" is not enabled`);
            }
        } catch (error) {
            throw new Error(`Option enabled assertion failed for selector: ${selector}. ${error.message}`);
        }
    }

    /**
     * Assert option is available in select in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} selectSelector - Selector for select within iframe
     * @param {string} optionValue - Option value to check
     * @throws {Error} If option is not available
     */
    async assertHasOptionInIframe(page, iframeSelector, selectSelector, optionValue) {
        try {
            const frameHandle = await page.$(iframeSelector);
            if (!frameHandle) {
                throw new Error(`Iframe not found: ${iframeSelector}`);
            }

            const frame = await frameHandle.contentFrame();
            if (!frame) {
                throw new Error(`Failed to get content frame from: ${iframeSelector}`);
            }

            await frame.waitForSelector(selectSelector);
            const hasOption = await frame.evaluate(
                ({ selector, value }) => {
                    const select = document.querySelector(selector);
                    return Array.from(select.options).some(opt => opt.value === value);
                },
                { selector: selectSelector, value: optionValue }
            );

            if (!hasOption) {
                throw new Error(`Option "${optionValue}" not found in select within iframe`);
            }
        } catch (error) {
            throw new Error(`Has option assertion failed in iframe. Iframe: ${iframeSelector}, Select: ${selectSelector}. ${error.message}`);
        }
    }
}

module.exports = OptionsAssertion;
