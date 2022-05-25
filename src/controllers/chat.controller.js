const { v4: uuidV4 } = require('uuid');
const chatModels = require('../models/chat.models');
const { sucess, failed } = require('../utils/response');

module.exports = {
  addMessage: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.id;

      const body = {
        id: uuidV4(),
        message: req.body.message,
        userId,
        toUserId: req.params.id,
        date: new Date(),
      };

      const response = await chatModels.createMessage(body);
      sucess(res, {
        code: 200,
        payload: response,
        message: 'send message success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  getMessage: async (req, res) => {
    try {
      const response = await chatModels.getMessage();
      sucess(res, {
        code: 200,
        payload: response.rows,
        message: 'success get all message!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  getMessageByUser: async (req, res) => {
    try {
      const data = {
        userId: req.APP_DATA.tokenDecoded.id,
        toUserId: req.params.id,
      };

      const response = await chatModels.getMessageByUser(data);
      sucess(res, {
        code: 200,
        payload: response.rows,
        message: 'get all message to user success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  getMessageFromUser: async (req, res) => {
    try {
      const data = {
        userId: req.APP_DATA.tokenDecoded.id,
        fromUserId: req.params.id,
      };

      const response = await chatModels.getMessageFromUser(data);
      sucess(res, {
        code: 200,
        payload: response.rows,
        message: 'get all message to user success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  deleteMessage: async (req, res) => {
    try {
      const { id } = req.params;

      const response = await chatModels.deleteMessage(id);

      sucess(res, {
        code: 200,
        payload: response,
        message: 'delete message success!',
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
