const express = require('express');
const {
  addMessage, getMessage, getMessageByUser, deleteMessage, getMessageFromUser,
} = require('../controllers/chat.controller');
const jwtAuth = require('../middleware/jwtAuth');

const router = express.Router();

router
  .post('/message/:id', jwtAuth, addMessage)
  .get('/message', jwtAuth, getMessage)
  .get('/message/:id', jwtAuth, getMessageByUser)
  .get('/myMessage/:id', jwtAuth, getMessageFromUser)
  .delete('/message/:id', jwtAuth, deleteMessage);

module.exports = router;
