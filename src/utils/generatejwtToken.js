const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRES_IN } = require('./env');

module.exports = async (payload) => {
  const token = await jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};
