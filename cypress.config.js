const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/index.js',
    fixturesFolder: 'cypress/fixtures',
    specPattern: 'cypress/integration/**/*.spec.js',
  },
});
