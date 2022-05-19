const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/users.model');
const authModel = require('../models/auth.model');
const jwtToken = require('../utils/generatejwtToken');
const actionAccount = require('../utils/email/activationAccount');
const sendEmail = require('../utils/email/sendEmail');
const { sucess, failed } = require('../utils/response');
const {
  APP_NAME, EMAIL_FROM, API_URL, CLIENT_URL,
} = require('../utils/env');
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
        photo: req.file.filename,
      };
      const response = await authModel.register(insertData);
      await authModel.updateToken(insertData.id, token);

      const templateEmail = {
        from: `${APP_NAME} <${EMAIL_FROM}>`,
        to: req.body.email.toLowerCase(),
        subject: 'Activate Your Email!',
        html: actionAccount(`${API_URL}/activation/${token}`, 'Verify'),
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
  activation: async (req, res) => {
    try {
      const { token } = req.params;
      const user = await authModel.checkToken(token);

      if (!user.rowCount) {
        res.send(`
        <div>
          <h1>Actiavtion Failed!</h1>
          <h3>Token invalied!</h3>
        </div>
        `);
      }

      await authModel.activateAccount(user.rows[0].id);
      await authModel.updateToken(user.rows[0].id, '');

      res.send(`
      <div>
        <h1>Activation Success!</h1>
        <h3>You can login now!</h3>
      </div>
      `);
    } catch (error) {
      res.send(`
      <div>
        <h1>Activation Failed!</h1>
        <h3>${error.message}</h3>
       </div>
      `);
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
  forgot: async (req, res) => {
    try {
      const user = await userModel.selectByEmail(req.body.email);
      if (user.rowCount) {
        const token = crypto.randomBytes(30).toString('hex');
        // Update token
        await authModel.updateToken(user.rows[0].id, token);

        const templateEmail = {
          from: `${APP_NAME} <${EMAIL_FROM}>`,
          to: req.body.email.toLowerCase(),
          subject: 'Reset Your Password!',
          html: actionAccount(`${CLIENT_URL}/reset/${token}`, 'Reset Password'),
        };
        sendEmail(templateEmail);
      }

      sucess(res, {
        code: 200,
        payload: null,
        message: 'forgot password success!',

      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  reset: async (req, res) => {
    try {
      const { token } = req.params;
      const user = await authModel.checkToken(token);

      if (!user.rowCount) {
        failed(res, {
          code: 400,
          payload: 'token invalid!',
          message: 'reset password failed!',
        });
        return;
      }

      const password = await bcrypt.hash(req.body.password, salt);
      await authModel.resetPassword(user.rows[0].id, password);
      await authModel.updateToken(user.rows[0].id, '');

      sucess(res, {
        code: 200,
        payload: null,
        message: 'reset password success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server erorr!',
      });
    }
  },
};
