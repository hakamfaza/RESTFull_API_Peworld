const db = require('../config/db');

module.exports = {
  getUser: () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM users', (err, result) => {
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
      id, name, jobDesk, address, workplace, description,
    } = body;
    db.query('UPDATE users SET name=$1, job_desk=$2, address=$3, workplace=$4, description=$5 WHERE id=$6', [name, jobDesk, address, workplace, description, id], (err, result) => {
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
