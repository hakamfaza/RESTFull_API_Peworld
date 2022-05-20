const express = require('express');
const { createSkills } = require('../controllers/skills.controller');
const jwtAuth = require('../middleware/jwtAuth');

const router = express.Router();

router
  .post('/skills', jwtAuth, createSkills);

module.exports = router;
