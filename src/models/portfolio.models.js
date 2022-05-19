const db = require('../config/db');

module.exports = {
  createPortfolio: (body) => new Promise((resolve, reject) => {
    const {
      id, userId, title, photo, date,
    } = body;
    db.query('INSERT INTO portfolio (id, user_id, title, photo, date) VALUES ($1, $2, $3, $4, $5)', [id, userId, title, photo, date], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  getPortfolio: () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM portfolio', (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
};
