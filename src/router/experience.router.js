/* eslint-disable max-len */
const express = require('express');
const {
  createExperience, getExperience, getDetailExperience, updateExperience, deleteExperience, experienceByUser,
} = require('../controllers/experience.controller');
const jwtAuth = require('../middleware/jwtAuth');
const upload = require('../middleware/upload');

const router = express.Router();

router
  .post('/experience', jwtAuth, upload, createExperience)
  .get('/experience', jwtAuth, getExperience)
  .get('/experience/:id', jwtAuth, getDetailExperience)
  .put('/experience/:id', jwtAuth, upload, updateExperience)
  .delete('/experience/:id', jwtAuth, deleteExperience)
  .get('/userExperience', jwtAuth, experienceByUser);

module.exports = router;
