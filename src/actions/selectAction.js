class SelectAction {
    async execute(page, selector, value) {
        await page.selectOption(selector, value);
    }
}

module.exports = SelectAction;