require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env_prod' : '.env_dev',
});
console.log('DB Password (masked):', process.env.DB_PASSWORD?.replace(/./g, '*'));
console.log('Type:', typeof process.env.DB_PASSWORD);

console.log(`🟢 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🔧 Using env file: ${process.env.NODE_ENV === 'production' ? '.env_prod' : '.env_dev'}`);

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT, 
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
};
