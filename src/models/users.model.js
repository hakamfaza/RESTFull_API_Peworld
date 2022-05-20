const db = require('../config/db');

module.exports = {
  allData: () => new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) AS total FROM users WHERE is_active = true', (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  getUser: (getSearch, sortByField, sortByType, getLimitValue, getOffsetValue, getIsActive) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE name ILIKE '%${getSearch}%' AND is_active=${getIsActive} ORDER BY ${sortByField} ${sortByType} LIMIT ${getLimitValue} OFFSET ${getOffsetValue}`, (err, result) => {
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
  updateUsers: (body) => new Promise((resolve, reject) => {
    const {
      id, name, jobDesk, address, workplace, description, instagram, linkedin, photo, userId,
    } = body;
    db.query('UPDATE users SET name=$1, job_desk=$2, address=$3, workplace=$4, description=$5, linkedin=$6, instagram=$7, photo=$8 WHERE id=$9 AND id=$10', [name, jobDesk, address, workplace, description, linkedin, instagram, photo, id, userId], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  deleteUser: (id) => new Promise((resolve, reject) => {
    db.query('DELETE FROM users WHERE id=$1', [id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
};
