# Excel Playwright Cucumber Automation Project

This project is designed to provide a generic test automation framework using Playwright and Cucumber. It allows for dynamic URL and locator changes based on data stored in Excel sheets, making it adaptable for various applications.

## Project Structure

```
excel-playwright-cucumber
├── src
│   ├── actions
│   │   ├── clickAction.js
│   │   ├── fillAction.js
│   │   ├── selectAction.js
│   │   └── navigateAction.js
│   ├── pages
│   │   ├── pageFactory.js
│   │   └── basePage.js
│   ├── services
│   │   └── excelService.js
│   ├── support
│   │   ├── world.js
│   │   ├── hooks.js
│   │   └── logger.js
│   └── utils
│       └── locatorResolver.js
├── features
│   ├── step_definitions
│   │   └── steps.js
│   ├── support
│   │   └── cucumber.js
│   └── examples.feature
├── test-data
│   └── test-data.xlsx
├── locators
│   └── locators.xlsx
├── reports
├── playwright.config.js
├── cucumber.js
├── package.json
├── .gitignore
└── README.md
```

## Setup Instructions

1. **Clone the Repository**
   ```
   git clone <repository-url>
   cd excel-playwright-cucumber
   ```

2. **Install Dependencies**
   ```
   npm install
   ```

3. **Configure Excel Files**
   - Place your test data in `test-data/test-data.xlsx`.
   - Define your locators in `locators/locators.xlsx`.

4. **Run Tests**
   - Execute the tests using Cucumber:
   ```
   npx cucumber-js
   ```

## Usage Guidelines

- **Dynamic URL and Locators**: The framework reads URLs and locators from Excel files, allowing for easy updates without changing the code.
- **Action Classes**: The project includes action classes for common operations such as clicking, filling inputs, selecting options, and navigating to URLs.
- **Page Object Model**: The framework follows the Page Object Model design pattern, promoting better organization and maintainability of test scripts.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.