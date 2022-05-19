const express = require('express');
const {
  getUser, getDetailUser, updateUser, deleteUser,
} = require('../controllers/users.controller');
const upload = require('../middleware/upload');
const jwtAuth = require('../middleware/jwtAuth');

const router = express.Router();

router
  .get('/users', jwtAuth, getUser)
  .get('/users/:id', jwtAuth, getDetailUser)
  .put('/users/:id', jwtAuth, upload, updateUser)
  .delete('/users/:id', jwtAuth, deleteUser);

module.exports = router;
