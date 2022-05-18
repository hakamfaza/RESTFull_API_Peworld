const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/users.model');
const authModel = require('../models/auth.model');
const { sucess, failed } = require('../utils/response');

const salt = 10;

module.exports = {
  register: async (req, res) => {
    try {
      const user = await userModel.selectByEmail(req.body.email);

      if (user.rowCount) {
        failed(res, {
          code: 400,
          payload: 'email already exist!',
          message: 'register failed!',
        });
        return;
      }

      const password = await bcrypt.hash(req.body.password, salt);

      const insertData = {
        id: uuidv4(),
        ...req.body,
        password,
        createDate: new Date(),
      };
      const response = await authModel.register(insertData);

      sucess(res, {
        code: 200,
        payload: response,
        message: 'register success!',
      });
    } catch (error) {
      failed(res, {
        code: 400,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
};
