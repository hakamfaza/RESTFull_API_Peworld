const express = require('express');
const {
  addMessage, getMessage, getMessageByUser, deleteMessage,
} = require('../controllers/chat.controller');
const jwtAuth = require('../middleware/jwtAuth');

const router = express.Router();

router
  .post('/message/:id', jwtAuth, addMessage)
  .get('/message', jwtAuth, getMessage)
  .get('/message/:id', jwtAuth, getMessageByUser)
  .delete('/message/:id', jwtAuth, deleteMessage);

module.exports = router;
