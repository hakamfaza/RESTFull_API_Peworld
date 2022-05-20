const { v4: uuidv4 } = require('uuid');
const experienceModels = require('../models/experience.models');
const { sucess, failed } = require('../utils/response');

module.exports = {
  createExperience: async (req, res) => {
    try {
      const insertData = {
        ...req.body,
        id: uuidv4(),
        userId: req.APP_DATA.tokenDecoded.id,
        date: new Date(),
        photo: req.file.filename,
      };

      const response = await experienceModels.createExperience(insertData);

      sucess(res, {
        code: 200,
        payload: response,
        message: 'create experience success!',
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
