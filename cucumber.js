module.exports = {
    default: {
        require: [
            './src/support/hooks.js',
            './src/support/world.js',
            './features/step_definitions/steps.js'
        ],
        format: ['json:reports/results.json', 'progress'],
        timeout: 60000,
        'gherkin-parse-options': {
            tagSyntax: 'explicit'
        }
    }
};