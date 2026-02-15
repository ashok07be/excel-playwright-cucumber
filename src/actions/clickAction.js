class ClickAction {
    async execute(page, selector) {
        await page.click(selector);
    }
}

module.exports = ClickAction;