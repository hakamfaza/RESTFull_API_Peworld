const express = require('express');
const { getUser, getDetailUser, updateUser } = require('../controllers/users.controller');

const router = express.Router();

router
  .get('/users', getUser)
  .get('/users/:id', getDetailUser)
  .put('/users/:id', updateUser);

module.exports = router;
