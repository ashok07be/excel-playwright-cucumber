const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './src',
    timeout: 30000,
    expect: {
        timeout: 5000,
    },
    reporter: 'html',
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 0,
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
    },
});