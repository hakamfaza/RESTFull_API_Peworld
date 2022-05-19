const userModel = require('../models/users.model');
const { failed } = require('../utils/response');

module.exports = {
  isVerify: async (req, res, next) => {
    try {
      const user = await userModel.selectByEmail(req.body.email);
      if (!user.rowCount) {
        next();
      } else if (user.rows[0].is_verify) {
        next();
      } else {
        failed(res, {
          code: 400,
          payload: 'Your email is not vefied yet',
          message: 'unauthorized!',
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
};
