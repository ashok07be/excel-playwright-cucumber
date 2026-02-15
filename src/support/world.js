const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const ExcelService = require('../services/excelService');

class CustomWorld {
    constructor() {
        this.browser = null;
        this.context = null;
        this.page = null;
        this.excelService = new ExcelService();
    }

    async init() {
        this.browser = await chromium.launch();
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    async close() {
        await this.browser.close();
    }
}

setWorldConstructor(CustomWorld);