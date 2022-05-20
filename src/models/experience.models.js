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
  getExperience: () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM experience', (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  getDetailExperience: (id) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM experience WHERE id=$1', [id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  updateExperience: (body) => new Promise((resolve, reject) => {
    const {
      company, profession, description, photo, startDate, resignDate, id, userId,
    } = body;
    db.query('UPDATE experience SET company=$1, profession=$2, description=$3, photo=$4, start_date=$5, resign_date=$6 WHERE id=$7 AND user_id=$8', [company, profession, description, photo, startDate, resignDate, id, userId], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  deleteExperience: (id, userId) => new Promise((resolve, reject) => {
    db.query('DELETE FROM experience WHERE id=$1 AND user_id=$2', [id, userId], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  experienceByUser: (userId) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM experience WHERE user_id=$1', [userId], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
};
