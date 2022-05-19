const usersModel = require('../models/users.model');
const { sucess, failed } = require('../utils/response');

const user = {
  getUser: async (req, res) => {
    try {
      const response = await usersModel.getUser();
      console.log(response.rows);
      sucess(res, {
        code: 200,
        payload: response.rows,
        message: 'get all users success!',
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

      sucess(res, {
        code: 200,
        payload: response.rows[0],
        message: 'get detail users success!',
      });
    } catch (error) {
      failed(res, {
        code: 200,
        payload: error.message,
        message: 'internal server eroor!',
      });
    }
  },
};

module.exports = user;
