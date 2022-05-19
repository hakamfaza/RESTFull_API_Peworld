const { v4: uuidv4 } = require('uuid');
const portfolioModels = require('../models/portfolio.models');
const { sucess, failed } = require('../utils/response');

module.exports = {
  createPortfolio: async (req, res) => {
    try {
      const inserData = {
        ...req.body,
        id: uuidv4(),
        userId: req.APP_DATA.tokenDecoded.id,
        date: new Date(),
        photo: req.file.filename,
      };
      await portfolioModels.createPortfolio(inserData);

      sucess(res, {
        code: 200,
        payload: null,
        message: 'create portfolio success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  getPortfolio: async (req, res) => {
    try {
      const response = await portfolioModels.getPortfolio();
      sucess(res, {
        code: 200,
        payload: response.rows,
        message: 'get all portfolio success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
};
