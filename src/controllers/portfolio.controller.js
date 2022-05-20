const { v4: uuidv4 } = require('uuid');
const portfolioModels = require('../models/portfolio.models');
const deleteFile = require('../utils/deleteFile');
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
  getDetailPortfolio: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await portfolioModels.getDetailPortfolio(id);

      sucess(res, {
        code: 200,
        payload: response.rows[0],
        message: 'get detail portfolio succes!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  updatePortfolio: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.APP_DATA.tokenDecoded.id;
      const portfolio = await portfolioModels.getDetailPortfolio(id);

      if (!portfolio.rowCount) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        failed(res, {
          code: 400,
          payload: 'portfolio not found!',
          message: 'update portfolio failed!',
        });
        return;
      }

      if (req.file) {
        if (portfolio.rows[0].photo) {
          deleteFile(`public/${portfolio.rows[0].photo}`);
        }
      }

      const insertData = {
        id: req.params.id,
        photo: req.file.filename,
        title: req.body.title,
        userId,
      };

      const response = await portfolioModels.updatePortfolio(insertData);

      if (!response.rowCount) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        failed(res, {
          code: 400,
          payload: 'can\'t update this portfolio!',
          message: 'update portfolio failed!',
        });
        return;
      }

      sucess(res, {
        code: 200,
        payload: response,
        message: 'update portfolio success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  deletePorfolio: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.APP_DATA.tokenDecoded.id;

      const portfolio = await portfolioModels.getDetailPortfolio(id);

      if (!portfolio.rowCount) {
        failed(res, {
          code: 400,
          payload: 'portfolio not found!',
          message: 'delete portfolio failed!',
        });
        return;
      }

      const response = await portfolioModels.deletePortfolio(id, userId);

      sucess(res, {
        code: 200,
        payload: response,
        message: 'delete portfolio success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server erorr!',
      });
    }
  },
  portfolioByUser: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.id;
      const response = await portfolioModels.portfolioByUser(userId);

      sucess(res, {
        code: 200,
        payload: response.rows,
        message: 'get portfolio by user success!',
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
