class LocatorResolver {
    constructor(excelService) {
        this.excelService = excelService;
        this.locators = null; // Cache locators
    }

    /**
     * Resolve a locator by screen and element name
     * @param {string} screenName - Name of the screen/page
     * @param {string} elementName - Name of the element
     * @returns {string|Object} Locator string or object with iframe info
     */
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

    /**
     * Get locator details including iframe info
     * @param {string} screenName - Name of the screen/page
     * @param {string} elementName - Name of the element
     * @returns {Object} Locator details with iframe support
     */
    async resolveLocatorWithIframe(screenName, elementName) {
        const locator = await this.resolveLocator(screenName, elementName);
        return this.excelService.parseLocator(locator);
    }

    /**
     * Check if element is in iframe
     * @param {string} screenName - Name of the screen/page
     * @param {string} elementName - Name of the element
     * @returns {boolean} True if element is in iframe
     */
    async isInIframe(screenName, elementName) {
        const locatorDetails = await this.resolveLocatorWithIframe(screenName, elementName);
        return locatorDetails.isInIframe;
    }

    /**
     * Get iframe locator for element
     * @param {string} screenName - Name of the screen/page
     * @param {string} elementName - Name of the element
     * @returns {string|null} Iframe locator or null
     */
    async getIframeLocator(screenName, elementName) {
        const locatorDetails = await this.resolveLocatorWithIframe(screenName, elementName);
        return locatorDetails.iframeLocator || null;
    }

    /**
     * Get element locator (without iframe)
     * @param {string} screenName - Name of the screen/page
     * @param {string} elementName - Name of the element
     * @returns {string} Element locator
     */
    async getElementLocator(screenName, elementName) {
        const locatorDetails = await this.resolveLocatorWithIframe(screenName, elementName);
        return locatorDetails.locator;
    }
}

module.exports = LocatorResolver;