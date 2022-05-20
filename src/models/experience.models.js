const db = require('../config/db');

module.exports = {
  createExperience: (body) => new Promise((resolve, reject) => {
    const {
      id, userId, profession, company, photo, date, description, resignDate, startDate,
    } = body;
    db.query('INSERT INTO experience (id, user_id, profession, company, photo, date, description,start_date, resign_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [id, userId, profession, company, photo, date, description, startDate, resignDate], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
};
