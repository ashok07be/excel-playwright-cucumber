const ExcelJS = require('exceljs');

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
}

module.exports = new ExcelService();