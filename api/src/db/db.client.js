const path = require('path');
const dotenvPath = path.resolve(__dirname, '../../../docs/src/.env');
console.log('Путь к .env:', dotenvPath);

//require('dotenv').config({path:dotenvPath})

const { Pool } = require('pg');

const pool = new Pool({ 
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack))

module.exports = pool;