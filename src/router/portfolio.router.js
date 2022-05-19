const express = require('express');
const { createPortfolio } = require('../controllers/portfolio.controller');
const jwtAuth = require('../middleware/jwtAuth');
const upload = require('../middleware/upload');

const router = express.Router();

router
  .post('/portfolio', jwtAuth, upload, createPortfolio);

module.exports = router;
