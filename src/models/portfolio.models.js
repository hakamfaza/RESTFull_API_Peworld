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
  getDetailPortfolio: (id) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM portfolio WHERE id=$1', [id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  updatePortfolio: (body) => new Promise((resolve, reject) => {
    const {
      title, photo, id, userId,
    } = body;
    db.query('UPDATE portfolio SET title=$1, photo=$2 WHERE id=$3 AND user_id=$4', [title, photo, id, userId], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
};
