class LocatorResolver {
    constructor(excelService) {
        this.excelService = excelService;
    }

    async resolveLocator(screenName, elementName) {
        const locators = await this.excelService.readLocators();
        const screenLocators = locators[screenName];

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