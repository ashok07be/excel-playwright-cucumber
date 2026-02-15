const { setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const ExcelService = require('../services/excelService');
const Logger = require('./logger');

class CustomWorld {
    constructor() {
        this.browser = null;
        this.context = null;
        this.page = null;
        this.excelService = new ExcelService();
        this.logger = new Logger();
    }

    async init() {
        this.browser = await chromium.launch({ headless: false });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    async close() {
        await this.page.close();
        await this.context.close();
        await this.browser.close();
    }
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60000);