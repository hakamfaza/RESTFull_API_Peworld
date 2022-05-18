const { Pool } = require('pg');
const {
  DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER,
} = require('../utils/env');

const db = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
});

module.exports = db;
