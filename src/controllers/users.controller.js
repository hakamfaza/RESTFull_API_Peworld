const usersModel = require('../models/users.model');
const experienceModels = require('../models/experience.models');
const { sucess, failed } = require('../utils/response');
const deleteFile = require('../utils/deleteFile');
const skillsModels = require('../models/skills.models');
const portfolioModels = require('../models/portfolio.models');

const userController = {
  getUser: async (req, res) => {
    try {
      const {
        search, sortField, sortType, page, limit, isActive,
      } = req.query;
      const getIsActive = isActive || true;

      const getSearch = search || '';
      const sortByField = sortField || 'name';
      const sortByType = sortType || 'ASC';

      // pagination
      const getPageValue = page ? Number(page) : 1;
      const getLimitValue = limit ? Number(limit) : 5;
      const getOffsetValue = (getPageValue - 1) * getLimitValue;
      const allData = await usersModel.allData();
      const totalData = Number(allData.rows[0].total);

      const pagination = {
        currentPage: getPageValue,
        dataPerPage: getLimitValue,
        totalPage: Math.ceil(totalData / getLimitValue),
        totalData,
      };

      const response = await usersModel.getUser(getSearch, sortByField, sortByType, getLimitValue, getOffsetValue, getIsActive);

      sucess(res, {
        code: 200,
        payload: response.rows,
        message: 'get all users success!',
        pagination,
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error,
        message: 'internal server error!',
      });
    }
  },
  getDetailUser: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await usersModel.getDetailUser(id);

      const experience = await experienceModels.experienceByUser(id);
      const skills = await skillsModels.getMySkills(id);
      const portfolio = await portfolioModels.portfolioByUser(id);

      sucess(res, {
        code: 200,
        payload: {
          user: response.rows[0],
          experience: experience.rows,
          skills: skills.rows,
          portfolio: portfolio.rows,
        },
        message: 'get detail users success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server eroor!',
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await usersModel.getDetailUser(id);

      if (!user.rowCount) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        failed(res, {
          code: 400,
          payload: 'user not found!',
          message: 'update user failed!',
        });
        return;
      }

      if (req.file) {
        if (user.rows[0].photo) {
          deleteFile(`public/${user.rows[0].photo}`);
        }
      }

      const insertData = {
        id,
        ...req.body,
        userId: req.APP_DATA.tokenDecoded.id,
        linkedin: `https://www.linkedin.com/in/${req.body.linkedin}/`,
        instagram: `https://www.instagram.com/${req.body.instagram}/`,
        photo: req.file.filename,
      };
      const response = await usersModel.updateUsers(insertData);

      if (!response.rowCount) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        failed(res, {
          code: 400,
          payload: 'you can\'t update this user!',
          message: 'update user failed!',
        });
        return;
      }

      sucess(res, {
        code: 200,
        payload: response,
        message: 'update users success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await usersModel.deleteUser(id);

      sucess(res, {
        code: 200,
        payload: response,
        message: 'success delete user!',
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

module.exports = userController;
