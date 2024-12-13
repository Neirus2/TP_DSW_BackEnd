const dotenv = require('dotenv');
const dotenv = require('dotenv');
const path = require('path');

module.exports = (on, config) => {
  // Ruta absoluta al archivo .env.test
  const envFile = path.resolve(__dirname, '../../.env.test');
  
  // Cargar las variables de entorno del archivo .env.test
  const envConfig = dotenv.config({ path: envFile }).parsed;
  
  // Fusionar las variables de entorno con las variables de configuración de Cypress
  config.env = { ...config.env, ...envConfig };

  return config;
};
