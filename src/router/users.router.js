const express = require('express');
const { getUser, getDetailUser } = require('../controllers/users.controller');

const router = express.Router();

router
  .get('/users', getUser)
  .get('/users/:id', getDetailUser);

module.exports = router;
