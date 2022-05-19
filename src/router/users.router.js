const express = require('express');
const { getUser } = require('../controllers/users.controller');

const router = express.Router();

router
  .get('/users', getUser);

module.exports = router;
