const express = require('express');
const {
  register, login, activation, forgot,
} = require('../controllers/auth.controllers');
const { isVerify } = require('../middleware/authorization');
const upload = require('../middleware/upload');

const router = express.Router();

router
  .post('/register', upload, register)
  .get('/activation/:token', isVerify, activation)
  .post('/login', isVerify, login)
  .put('/forgot', isVerify, forgot);

module.exports = router;
