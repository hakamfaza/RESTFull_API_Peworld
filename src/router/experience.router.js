const express = require('express');
const { createExperience, getExperience } = require('../controllers/experience.controller');
const jwtAuth = require('../middleware/jwtAuth');
const upload = require('../middleware/upload');

const router = express.Router();

router
  .post('/experience', jwtAuth, upload, createExperience)
  .get('/experience', jwtAuth, getExperience);

module.exports = router;
