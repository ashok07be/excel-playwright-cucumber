const BaseAssertion = require('./baseAssertion');

class URLAndTitleAssertion extends BaseAssertion {
    /**
     * Assert that current URL equals expected URL
     * @param {Page} page - Playwright page object
     * @param {string} expectedUrl - Expected URL
     * @throws {Error} If URL doesn't match
     */
    async assertUrlEquals(page, expectedUrl) {
        try {
            const actualUrl = page.url();
            if (actualUrl !== expectedUrl) {
                throw new Error(`URL mismatch. Expected: "${expectedUrl}", but got: "${actualUrl}"`);
            }
        } catch (error) {
            throw new Error(`URL assertion failed. ${error.message}`);
        }
    }

    /**
     * Assert that current URL contains expected text
     * @param {Page} page - Playwright page object
     * @param {string} expectedText - Expected text in URL
     * @throws {Error} If URL doesn't contain text
     */
    async assertUrlContains(page, expectedText) {
        try {
            const actualUrl = page.url();
            if (!actualUrl.includes(expectedText)) {
                throw new Error(`URL doesn't contain expected text. Expected to contain: "${expectedText}", but got: "${actualUrl}"`);
            }
        } catch (error) {
            throw new Error(`URL contains assertion failed. ${error.message}`);
        }
    }

    /**
     * Assert that URL matches regex pattern
     * @param {Page} page - Playwright page object
     * @param {RegExp|string} pattern - Regex pattern
     * @throws {Error} If URL doesn't match pattern
     */
    async assertUrlMatches(page, pattern) {
        try {
            const actualUrl = page.url();
            const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
            if (!regex.test(actualUrl)) {
                throw new Error(`URL doesn't match pattern. Pattern: "${pattern}", URL: "${actualUrl}"`);
            }
        } catch (error) {
            throw new Error(`URL pattern assertion failed. ${error.message}`);
        }
    }

    /**
     * Assert page title equals expected title
     * @param {Page} page - Playwright page object
     * @param {string} expectedTitle - Expected page title
     * @throws {Error} If title doesn't match
     */
    async assertPageTitleEquals(page, expectedTitle) {
        try {
            const actualTitle = await page.title();
            if (actualTitle !== expectedTitle) {
                throw new Error(`Page title mismatch. Expected: "${expectedTitle}", but got: "${actualTitle}"`);
            }
        } catch (error) {
            throw new Error(`Page title assertion failed. ${error.message}`);
        }
    }

    /**
     * Assert page title contains expected text
     * @param {Page} page - Playwright page object
     * @param {string} expectedText - Expected text in title
     * @throws {Error} If title doesn't contain text
     */
    async assertPageTitleContains(page, expectedText) {
        try {
            const actualTitle = await page.title();
            if (!actualTitle.includes(expectedText)) {
                throw new Error(`Page title doesn't contain expected text. Expected to contain: "${expectedText}", but got: "${actualTitle}"`);
            }
        } catch (error) {
            throw new Error(`Page title contains assertion failed. ${error.message}`);
        }
    }

    /**
     * Assert page title matches regex pattern
     * @param {Page} page - Playwright page object
     * @param {RegExp|string} pattern - Regex pattern
     * @throws {Error} If title doesn't match pattern
     */
    async assertPageTitleMatches(page, pattern) {
        try {
            const actualTitle = await page.title();
            const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
            if (!regex.test(actualTitle)) {
                throw new Error(`Page title doesn't match pattern. Pattern: "${pattern}", Title: "${actualTitle}"`);
            }
        } catch (error) {
            throw new Error(`Page title pattern assertion failed. ${error.message}`);
        }
    }

    /**
     * Assert that we're on specific page (by URL path)
     * @param {Page} page - Playwright page object
     * @param {string} expectedPath - Expected URL path
     * @throws {Error} If path doesn't match
     */
    async assertOnPage(page, expectedPath) {
        try {
            const actualUrl = page.url();
            const urlPath = new URL(actualUrl).pathname;
            if (!urlPath.includes(expectedPath)) {
                throw new Error(`Not on expected page. Expected path: "${expectedPath}", but got: "${urlPath}"`);
            }
        } catch (error) {
            throw new Error(`Page assertion failed. ${error.message}`);
        }
    }
}

module.exports = URLAndTitleAssertion;
