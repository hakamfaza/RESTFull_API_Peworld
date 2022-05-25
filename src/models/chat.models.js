const db = require('../config/db');

module.exports = {
  createMessage: (body) => new Promise((resolve, reject) => {
    const {
      id, userId, toUserId, message, date,
    } = body;
    db.query('INSERT INTO chat (id, from_user_id, to_user_id, chat, date) VALUES ($1, $2, $3, $4, $5)', [id, userId, toUserId, message, date], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  getMessage: () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM chat', (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  deleteMessage: (id) => new Promise((resolve, reject) => {
    db.query('DELETE FROM chat WHERE id=$1', [id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  getMessageByUser: (data) => new Promise((resolve, reject) => {
    const { userId, toUserId } = data;
    db.query('SELECT * FROM chat WHERE from_user_id=$1 AND to_user_id=$2', [userId, toUserId], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  getMessageFromUser: (data) => new Promise((resolve, reject) => {
    const { fromUserId, userId } = data;
    console.log(data);
    console.log(`from${fromUserId} & to ${userId}`);
    db.query('SELECT * FROM chat WHERE from_user_id=$1 AND to_user_id=$2', [fromUserId, userId], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
};
