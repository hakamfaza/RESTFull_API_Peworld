const express = require('express');
const {
  createSkills, getSkill, getMyskills, updateSkills, deleteSkill,
} = require('../controllers/skills.controller');
const jwtAuth = require('../middleware/jwtAuth');

const router = express.Router();

router
  .post('/skills', jwtAuth, createSkills)
  .get('/skills', jwtAuth, getSkill)
  .get('/myskills', jwtAuth, getMyskills)
  .put('/skills/:id', jwtAuth, updateSkills)
  .delete('/skills/:id', jwtAuth, deleteSkill);

module.exports = router;
