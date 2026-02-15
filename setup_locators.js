const ExcelJS = require('exceljs');

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Locators');

// Add headers
worksheet.addRow(['Screen', 'ElementName', 'Locator', 'Type']);

// SauceDemo Login Page Locators
worksheet.addRow(['LoginPage', 'username', '#user-name', 'css']);
worksheet.addRow(['LoginPage', 'password', '#password', 'css']);
worksheet.addRow(['LoginPage', 'loginButton', '#login-button', 'css']);
worksheet.addRow(['LoginPage', 'errorMessage', '[data-test="error"]', 'css']);

// SauceDemo Products Page Locators
worksheet.addRow(['ProductsPage', 'productTitle', '.title', 'css']);
worksheet.addRow(['ProductsPage', 'appLogo', '.app_logo', 'css']);
worksheet.addRow(['ProductsPage', 'logout', '#logout_sidebar_link', 'css']);
worksheet.addRow(['ProductsPage', 'menuButton', '#react-burger-menu-btn', 'css']);

workbook.xlsx.writeFile('./locators/locators.xlsx').then(() => {
    console.log('✅ locators.xlsx created successfully');
});
