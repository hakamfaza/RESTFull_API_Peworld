const { v4: uuidv4 } = require('uuid');
const experienceModels = require('../models/experience.models');
const deleteFile = require('../utils/deleteFile');
const { sucess, failed } = require('../utils/response');

module.exports = {
  createExperience: async (req, res) => {
    try {
      const insertData = {
        ...req.body,
        id: uuidv4(),
        userId: req.APP_DATA.tokenDecoded.id,
        date: new Date(),
        // photo: req.file.filename,
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
  getExperience: async (req, res) => {
    try {
      const response = await experienceModels.getExperience();

      sucess(res, {
        code: 200,
        payload: response.rows,
        message: 'get all experience success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  getDetailExperience: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await experienceModels.getDetailExperience(id);

      sucess(res, {
        code: 200,
        payload: response.rows[0],
        message: 'get detail experience success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  updateExperience: async (req, res) => {
    try {
      const { id } = req.params;

      const experience = await experienceModels.getDetailExperience(id);

      if (!experience.rowCount) {
        // if (req.file) {
        //   deleteFile(req.file.path);
        // }
        failed(res, {
          code: 400,
          payload: 'experience not found!',
          message: 'update experience failed!',
        });
        return;
      }

      // if (req.file) {
      //   if (req.file) {
      //     deleteFile(`public/${experience.rows[0].photo}`);
      //   }
      // }

      const insertData = {
        ...req.body,
        userId: req.APP_DATA.tokenDecoded.id,
        id,
        // photo: req.file.filename,
      };

      const response = await experienceModels.updateExperience(insertData);

      if (!response.rowCount) {
        failed(res, {
          code: 400,
          payload: 'you can\'t update this experience!',
          message: 'update experience failed!',
        });
        return;
      }

      sucess(res, {
        code: 200,
        payload: response,
        message: 'update experience success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  deleteExperience: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.APP_DATA.tokenDecoded.id;

      const experience = await experienceModels.getDetailExperience(id);

      if (!experience.rowCount) {
        failed(res, {
          code: 400,
          payload: 'experience not found!',
          message: 'delete experience failed!',
        });
        return;
      }

      const response = await experienceModels.deleteExperience(id, userId);

      sucess(res, {
        code: 200,
        payload: response,
        message: 'detele experience success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  experienceByUser: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.id;

      const response = await experienceModels.experienceByUser(userId);

      sucess(res, {
        code: 200,
        payload: response.rows,
        message: 'get all experience by user success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server eroor!',
      });
    }
  },
};
