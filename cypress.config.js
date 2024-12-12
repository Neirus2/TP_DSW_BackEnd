const { defineConfig } = require('cypress')
require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development' });

module.exports = defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'http://localhost:4200', 
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000, // Esperar 10 segundos antes de timeout
  }
})
