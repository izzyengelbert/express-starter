const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const config = require('../../config/index');

const AUTH_HEADER = 'Authorization';

const authenticate = async (req, res, next) => {
  try {
    const authToken = req.get(AUTH_HEADER);
    const decodedToken = jwt.verify(authToken, config.default.secret);
    if (decodedToken.user) {
      req.user = decodedToken.user;
      return next();
    }
    return next(new createError.Unauthorized());
  } catch (error) {
    return next(new createError.Unauthorized());
  }
};

module.exports = authenticate;
