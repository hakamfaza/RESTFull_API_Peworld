const { v4: uuidV4 } = require('uuid');
const skillsModels = require('../models/skills.models');
const { sucess, failed } = require('../utils/response');

module.exports = {
  createSkills: async (req, res) => {
    try {
      const { skill } = req.body;

      skill.map(async (item) => {
        const data = {
          id: uuidV4(),
          userId: req.APP_DATA.tokenDecoded.id,
          date: new Date(),
          skill: item,
        };
        await skillsModels.createSkills(data);
      });
      sucess(res, {
        code: 200,
        payload: null,
        message: 'success create skills!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server erorr!',
      });
    }
  },
  getSkill: async (req, res) => {
    try {
      const response = await skillsModels.getSkills();
      sucess(res, {
        code: 200,
        payload: response.rows,
        message: 'get all skills success!',
      });
    } catch (error) {
      failed(res, {
        code: 200,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  getMyskills: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.id;
      const response = await skillsModels.getMySkills(userId);

      sucess(res, {
        code: 200,
        payload: response.rows,
        message: 'get my skills success!',
      });
    } catch (error) {
      failed(res, {
        code: 200,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
};
