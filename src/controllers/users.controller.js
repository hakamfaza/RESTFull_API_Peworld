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
};

module.exports = user;
