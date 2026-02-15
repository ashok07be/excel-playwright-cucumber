const ExcelJS = require('exceljs');

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('TestData');

// Add headers
worksheet.addRow(['TestCaseID', 'Scenario', 'Username', 'Password', 'ExpectedResult']);

// Test Data for SauceDemo
worksheet.addRow(['TC_001', 'Login with valid credentials', 'standard_user', 'secret_sauce', 'Login Successful']);
worksheet.addRow(['TC_002', 'Login with invalid username', 'invalid_user', 'secret_sauce', 'Error Message Displayed']);
worksheet.addRow(['TC_003', 'Login with invalid password', 'standard_user', 'invalid_pass', 'Error Message Displayed']);

workbook.xlsx.writeFile('./test-data/testData.xlsx').then(() => {
    console.log('✅ testData.xlsx created successfully');
});
