const ExcelJS = require('exceljs');
const path = require('path');

class ExcelService {
    async readExcel(filePath) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.worksheets[0];
        const data = [];

        worksheet.eachRow((row) => {
            data.push(row.values);
        });

        return data;
    }

    async writeExcel(filePath, data) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        data.forEach((row) => {
            worksheet.addRow(row);
        });

        await workbook.xlsx.writeFile(filePath);
    }

    async updateExcel(filePath, data) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.worksheets[0];

        data.forEach((row, index) => {
            worksheet.getRow(index + 1).values = row;
        });

        await workbook.xlsx.writeFile(filePath);
    }

    async readLocators() {
        const locatorsPath = path.join(process.cwd(), 'locators', 'locators.xlsx');
        const data = await this.readExcel(locatorsPath);
        const locators = {};

        // Skip header row
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            const screen = row[1];
            const elementName = row[2];
            const locator = row[3];

            if (!locators[screen]) {
                locators[screen] = {};
            }
            locators[screen][elementName] = locator;
        }

        return locators;
    }

    async readTestData() {
        const testDataPath = path.join(process.cwd(), 'test-data', 'testData.xlsx');
        const data = await this.readExcel(testDataPath);
        const testData = [];

        // Skip header row and convert to objects
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            testData.push({
                testCaseID: row[1],
                scenario: row[2],
                username: row[3],
                password: row[4],
                expectedResult: row[5]
            });
        }

        return testData;
    }

    async readTestDataByScenario(scenario) {
        const testData = await this.readTestData();
        return testData.find(data => data.scenario.toLowerCase().includes(scenario.toLowerCase()));
    }
}

module.exports = ExcelService;