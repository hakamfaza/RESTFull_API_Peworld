const express = require('express');
const { createExperience } = require('../controllers/experience.controller');
const jwtAuth = require('../middleware/jwtAuth');
const upload = require('../middleware/upload');

const router = express.Router();

router
  .post('/experience', jwtAuth, upload, createExperience);

module.exports = router;
