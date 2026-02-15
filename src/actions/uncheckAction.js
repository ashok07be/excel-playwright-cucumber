const BaseAction = require('./baseAction');

class UncheckAction extends BaseAction {
    async execute(page, selector) {
        if (!page) throw new Error('Page is required for UncheckAction');
        // Playwright's uncheck will ensure the element is unchecked
        await page.uncheck(selector);
    }
}

module.exports = UncheckAction;
