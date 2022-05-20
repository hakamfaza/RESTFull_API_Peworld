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
};
