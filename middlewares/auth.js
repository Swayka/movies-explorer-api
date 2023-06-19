const jwt = require('jsonwebtoken');
const { UNAUTORIZED_ERROR } = require('../utils/constants');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(UNAUTORIZED_ERROR));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key');
  } catch (err) {
    return next(new UnauthorizedError(UNAUTORIZED_ERROR));
  }

  req.user = payload;

  return next();
};

module.exports = {
  auth,
};
