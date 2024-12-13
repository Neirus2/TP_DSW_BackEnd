const { defineConfig } = require('cypress')
require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development' });

module.exports = defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'http://localhost:4200', 
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000, // Esperar 10 segundos antes de timeout
    env: {
      TEST_USER: process.env.TEST_USER,
      TEST_PASS: process.env.TEST_PASS,
      ADMIN_USER: process.env.ADMIN_USER,
      ADMIN_PASS: process.env.ADMIN_PASS
    }
  }
})
