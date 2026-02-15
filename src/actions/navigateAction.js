class NavigateAction {
    async execute(page, url) {
        await page.goto(url);
    }
}

module.exports = new NavigateAction();