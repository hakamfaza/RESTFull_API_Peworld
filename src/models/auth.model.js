const db = require('../config/db');

const auth = {
  register: (body) => new Promise((resolve, reject) => {
    const {
      id, name, email, company, password, phone, position, createDate, photo, recruiter,
    } = body;
    db.query('INSERT INTO users (id, name, email, password, company, phone, position, date, photo, recruiter) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [id, name, email, password, company, phone, position, createDate, photo, recruiter], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  updateToken: (id, token) => new Promise((resolve, reject) => {
    db.query('UPDATE users SET token=$1 WHERE id=$2', [token, id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  checkToken: (token) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE token=$1', [token], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  activateAccount: (id) => new Promise((resolve, reject) => {
    db.query('UPDATE users SET is_verify=true WHERE id=$1', [id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  login: (email) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email=$1', [email], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  resetPassword: (id, password) => new Promise((resolve, reject) => {
    db.query('UPDATE users SET password=$1 WHERE id=$2', [password, id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),

};

module.exports = auth;
