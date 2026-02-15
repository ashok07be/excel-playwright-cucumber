class BaseAction {
    async getElement(page, selector) {
        if (!page) throw new Error('Page is required for actions');
        const element = await page.$(selector);
        if (!element) {
            throw new Error(`Element not found for selector: ${selector}`);
        }
        return element;
    }

    async exists(page, selector) {
        if (!page) throw new Error('Page is required for actions');
        const element = await page.$(selector);
        return !!element;
    }
}

module.exports = BaseAction;
