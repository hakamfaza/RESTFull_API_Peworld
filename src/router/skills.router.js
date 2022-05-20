const express = require('express');
const { createSkills, getSkill, getMyskills } = require('../controllers/skills.controller');
const jwtAuth = require('../middleware/jwtAuth');

const router = express.Router();

router
  .post('/skills', jwtAuth, createSkills)
  .get('/skills', jwtAuth, getSkill)
  .get('/myskills', jwtAuth, getMyskills);

module.exports = router;
