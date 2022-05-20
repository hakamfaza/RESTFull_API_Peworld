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
  updateSkill: (data) => new Promise((resolve, reject) => {
    const { id, skill, userId } = data;
    db.query('UPDATE skills SET skill=$1 WHERE id=$2 AND user_id=$3', [skill, id, userId], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  deleteSkil: (data) => new Promise((resolve, reject) => {
    const { id, userId } = data;
    db.query('DELETE FROM skills WHERE id=$1 AND user_id=$2', [id, userId], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
};
