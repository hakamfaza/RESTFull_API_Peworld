const { Pool } = require('pg');
const {
  DB_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, NODE_ENV,
} = require('../utils/env');

const config = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
};

if (NODE_ENV === 'production') {
  config.ssl = {
    rejectUnauthorized: false,
  };
}

const db = new Pool(config);

db.connect((err) => {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
  console.log('Database connected successfully');
});

module.exports = db;
