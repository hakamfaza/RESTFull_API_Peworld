const db = require('../config/db');

const auth = {
  register: (body) => new Promise((resolve, reject) => {
    const {
      id, name, email, company, password, phone, position, createDate, photo,
    } = body;
    db.query('INSERT INTO users (id, name, email, password, company, phone, position, date, photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [id, name, email, password, company, phone, position, createDate, photo], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
};

module.exports = auth;
