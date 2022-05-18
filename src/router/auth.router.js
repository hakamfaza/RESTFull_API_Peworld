const express = require('express');
const { register } = require('../controllers/auth.controllers');
const upload = require('../middleware/upload');

const router = express.Router();

router
  .post('/register', upload, register);

module.exports = router;
