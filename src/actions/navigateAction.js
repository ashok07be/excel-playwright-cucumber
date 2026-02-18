const BaseAction = require('./baseAction');

class NavigateAction extends BaseAction {
    /**
     * Navigate to a URL
     * @param {Page} page - Playwright page object
     * @param {string} url - URL to navigate to
     */
    async execute(page, url) {
        try {
            await page.goto(url);
        } catch (error) {
            throw new Error(`Navigation failed to URL: ${url}. ${error.message}`);
        }
    }
}

module.exports = NavigateAction;