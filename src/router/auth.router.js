const express = require('express');
const { register, login } = require('../controllers/auth.controllers');
const upload = require('../middleware/upload');

const router = express.Router();

router
  .post('/register', upload, register)
  .post('/login', login);

module.exports = router;
