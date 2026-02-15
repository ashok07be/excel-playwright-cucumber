class PageFactory {
    constructor() {
        this.pages = {};
    }

    createPage(screenName) {
        if (!this.pages[screenName]) {
            const PageClass = require(`./${screenName}Page`);
            this.pages[screenName] = new PageClass();
        }
        return this.pages[screenName];
    }
}

module.exports = new PageFactory();