class FillAction {
    async execute(selector, value) {
        const element = await page.$(selector);
        if (element) {
            await element.fill(value);
        } else {
            throw new Error(`Element not found for selector: ${selector}`);
        }
    }
}

module.exports = FillAction;