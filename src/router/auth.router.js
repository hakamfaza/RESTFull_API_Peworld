const express = require('express');
const {
  register, login, activation, forgot, reset,
} = require('../controllers/auth.controllers');
const { isVerify } = require('../middleware/authorization');

const router = express.Router();

router
  .post('/register', register)
  .get('/activation/:token', isVerify, activation)
  .post('/login', isVerify, login)
  .put('/forgot', isVerify, forgot)
  .put('/reset/:token', isVerify, reset);

module.exports = router;
