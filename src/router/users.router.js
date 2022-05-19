const express = require('express');
const {
  getUser, getDetailUser, updateUser, deleteUser,
} = require('../controllers/users.controller');
const upload = require('../middleware/upload');

const router = express.Router();

router
  .get('/users', getUser)
  .get('/users/:id', getDetailUser)
  .put('/users/:id', upload, updateUser)
  .delete('/users/:id', deleteUser);

module.exports = router;
