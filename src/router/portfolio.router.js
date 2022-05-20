const express = require('express');
const {
  createPortfolio, getPortfolio, getDetailPortfolio, updatePortfolio, deletePorfolio, portfolioByUser,
} = require('../controllers/portfolio.controller');
const jwtAuth = require('../middleware/jwtAuth');
const upload = require('../middleware/upload');

const router = express.Router();

router
  .post('/portfolio', jwtAuth, upload, createPortfolio)
  .get('/portfolio', jwtAuth, getPortfolio)
  .get('/portfolio/:id', jwtAuth, getDetailPortfolio)
  .put('/portfolio/:id', jwtAuth, upload, updatePortfolio)
  .delete('/portfolio/:id', jwtAuth, deletePorfolio)
  .get('/portfolioByUser', jwtAuth, portfolioByUser);

module.exports = router;
