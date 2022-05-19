const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/users.model');
const authModel = require('../models/auth.model');
const jwtToken = require('../utils/generatejwtToken');
const activateAccoount = require('../utils/email/activationAccount');
const { sucess, failed } = require('../utils/response');
const { APP_NAME, EMAIL_FROM, API_URL } = require('../utils/env');
const sendMail = require('../utils/email/sendEmail');

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
      const token = crypto.randomBytes(30).toString('hex');
      const insertData = {
        id: uuidv4(),
        ...req.body,
        password,
        createDate: new Date(),
      };
      const response = await authModel.register(insertData);
      await authModel.updateToken(insertData.id, token);

      const templateEmail = {
        from: `${APP_NAME} <${EMAIL_FROM}>`,
        to: req.body.email.toLowerCase(),
        subject: 'Activate Your Email!',
        html: activateAccoount(`${API_URL}/activation/${token}`),
      };
      sendMail(templateEmail);

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
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authModel.login(email);

      if (user.rowCount > 0) {
        const match = await bcrypt.compare(password, user.rows[0].password);

        if (match) {
          const jwt = await jwtToken({
            id: user.rows[0].id,
            recruiter: user.rows[0].recruiter,
          });
          sucess(res, {
            code: 200,
            payload: null,
            message: 'login success!',
            token: {
              jwt,
              id: user.rows[0].id,
            },
          });
          return;
        }
      }

      failed(res, {
        code: 400,
        payload: 'wrong email or password!',
        message: 'login failed!',
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
