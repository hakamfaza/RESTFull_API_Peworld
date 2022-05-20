const db = require('../config/db');

module.exports = {
  createSkills: (data) => new Promise((resolve, reject) => {
    const {
      id, userId, skill, date,
    } = data;
    db.query('INSERT INTO skills (id, user_id, skill, date) VALUES ($1, $2, $3, $4)', [id, userId, skill, date], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  getSkills: () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM skills', (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  getMySkills: (userId) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM skills WHERE user_id=$1', [userId], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
};
