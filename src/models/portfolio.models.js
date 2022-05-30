const db = require('../config/db');

module.exports = {
  createPortfolio: (body) => new Promise((resolve, reject) => {
    const {
      id, userId, title, photo, date, repository,
    } = body;
    db.query('INSERT INTO portfolio (id, user_id, title, photo, date, repository) VALUES ($1, $2, $3, $4, $5, $6)', [id, userId, title, photo, date, repository], (err, result) => {
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
      title, photo, id, userId, repository,
    } = body;
    db.query('UPDATE portfolio SET title=$1, photo=$2, repository=$3 WHERE id=$4 AND user_id=$5', [title, photo, repository, id, userId], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  deletePortfolio: (id, userId) => new Promise((resolve, reject) => {
    db.query('DELETE FROM portfolio WHERE id=$1 AND user_id=$2', [id, userId], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  portfolioByUser: (userId) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM portfolio WHERE user_id=$1', [userId], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
};
