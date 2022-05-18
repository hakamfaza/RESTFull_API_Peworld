const db = require('../config/db');

module.exports = {
  selectByEmail: (email) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email=$1', [email], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
};
