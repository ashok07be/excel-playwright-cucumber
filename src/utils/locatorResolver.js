class LocatorResolver {
    constructor(excelService) {
        this.excelService = excelService;
        this.locators = null; // Cache locators
    }

    async resolveLocator(screenName, elementName) {
        // Load locators on first use
        if (!this.locators) {
            this.locators = await this.excelService.readLocators();
        }

        const screenLocators = this.locators[screenName];

        if (!screenLocators) {
            throw new Error(`No locators found for screen: ${screenName}`);
        }

        const locator = screenLocators[elementName];

        if (!locator) {
            throw new Error(`No locator found for element: ${elementName} on screen: ${screenName}`);
        }

        return locator;
    }
}

module.exports = LocatorResolver;