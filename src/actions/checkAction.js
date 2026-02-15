const BaseAction = require('./baseAction');

class CheckAction extends BaseAction {
    async execute(page, selector) {
        if (!page) throw new Error('Page is required for CheckAction');
        // Playwright's check will ensure the element is checked
        await page.check(selector);
    }
}

module.exports = CheckAction;
