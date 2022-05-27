const express = require('express');
const {
  getUser, getDetailUser, updateUser, deleteUser, updateProfile,
} = require('../controllers/users.controller');
const upload = require('../middleware/upload');
const jwtAuth = require('../middleware/jwtAuth');

const router = express.Router();

router
  .get('/users', jwtAuth, getUser)
  .get('/users/:id', jwtAuth, getDetailUser)
  .put('/users/:id', jwtAuth, updateUser)
  .put('/profile/:id', jwtAuth, upload, updateProfile)
  .delete('/users/:id', jwtAuth, deleteUser);

module.exports = router;
