const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const { JWT_SECRET, NODE_ENV } = require('../config');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const {
  VALIDATION_ERROR,
  CONFLICT_ERROR,
  WRONG_DATA,
  NOT_FOUND_USER,
} = require('../utils/constants');

const createUser = (req, res, next) => {
  const { email, name } = req.body;

  bcrypt
    .hash(req.body.password, 5)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((newUser) => {
      res.status(201).send({ newUser });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictError(CONFLICT_ERROR),
        );
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(
          new BadRequestError(VALIDATION_ERROR),
        );
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(WRONG_DATA);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(WRONG_DATA);
        }

        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key',
          {
            expiresIn: '7d',
          },
        );
        res.status(200).send({ token });
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getUser = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USER);
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const owner = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    owner,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USER);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictError(CONFLICT_ERROR),
        );
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(VALIDATION_ERROR));
        return;
      }
      next(err);
    });
};

module.exports = {
  createUser,
  getUser,
  login,
  updateUser,
};
