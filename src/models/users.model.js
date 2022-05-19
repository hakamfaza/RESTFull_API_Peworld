const db = require('../config/db');

module.exports = {
  getUser: () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM users', (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  getDetailUser: (id) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id=$1', [id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  selectByEmail: (email) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email=$1', [email], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
};
