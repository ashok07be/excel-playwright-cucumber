const BaseAction = require('./baseAction');

class DragAndDropAction extends BaseAction {
    /**
     * Drag an element and drop it on target
     * @param {Page} page - Playwright page object
     * @param {string} sourceSelector - CSS selector for source element
     * @param {string} targetSelector - CSS selector for target element
     */
    async execute(page, sourceSelector, targetSelector) {
        try {
            await this.waitForElement(page, sourceSelector);
            await this.waitForElement(page, targetSelector);

            const sourceBox = await page.$(sourceSelector);
            const targetBox = await page.$(targetSelector);

            if (!sourceBox || !targetBox) {
                throw new Error('Source or target element not found');
            }

            // Get bounding boxes
            const sourceBounds = await sourceBox.boundingBox();
            const targetBounds = await targetBox.boundingBox();

            if (!sourceBounds || !targetBounds) {
                throw new Error('Could not get element bounding boxes');
            }

            // Perform drag and drop
            await page.mouse.move(sourceBounds.x + sourceBounds.width / 2, sourceBounds.y + sourceBounds.height / 2);
            await page.mouse.down();
            await page.mouse.move(targetBounds.x + targetBounds.width / 2, targetBounds.y + targetBounds.height / 2);
            await page.mouse.up();
        } catch (error) {
            throw new Error(`Drag and drop action failed. Source: ${sourceSelector}, Target: ${targetSelector}. ${error.message}`);
        }
    }

    /**
     * Drag and drop elements in iframe
     * @param {Page} page - Playwright page object
     * @param {string} iframeSelector - Selector for the iframe
     * @param {string} sourceSelector - CSS selector for source element
     * @param {string} targetSelector - CSS selector for target element
     */
    async executeInIframe(page, iframeSelector, sourceSelector, targetSelector) {
        try {
            const frameHandle = await page.$(iframeSelector);
            if (!frameHandle) {
                throw new Error(`Iframe not found: ${iframeSelector}`);
            }

            const frame = await frameHandle.contentFrame();
            if (!frame) {
                throw new Error(`Failed to get content frame from: ${iframeSelector}`);
            }

            await frame.waitForSelector(sourceSelector);
            await frame.waitForSelector(targetSelector);

            const sourceBox = await frame.$(sourceSelector);
            const targetBox = await frame.$(targetSelector);

            if (!sourceBox || !targetBox) {
                throw new Error('Source or target element not found in iframe');
            }

            // Get bounding boxes
            const sourceBounds = await sourceBox.boundingBox();
            const targetBounds = await targetBox.boundingBox();

            if (!sourceBounds || !targetBounds) {
                throw new Error('Could not get element bounding boxes in iframe');
            }

            // Perform drag and drop
            await page.mouse.move(sourceBounds.x + sourceBounds.width / 2, sourceBounds.y + sourceBounds.height / 2);
            await page.mouse.down();
            await page.mouse.move(targetBounds.x + targetBounds.width / 2, targetBounds.y + targetBounds.height / 2);
            await page.mouse.up();
        } catch (error) {
            throw new Error(`Drag and drop action failed in iframe. Iframe: ${iframeSelector}, Source: ${sourceSelector}, Target: ${targetSelector}. ${error.message}`);
        }
    }
}

module.exports = DragAndDropAction;
