class BasePage {
    constructor(page) {
        this.page = page;
    }

    async waitForSelector(selector) {
        await this.page.waitForSelector(selector);
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async isVisible(selector) {
        return await this.page.isVisible(selector);
    }

    async getText(selector) {
        return await this.page.textContent(selector);
    }
}

module.exports = BasePage;