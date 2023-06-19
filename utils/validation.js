const { Joi } = require('celebrate');
const { urlRegExp } = require('./constants');

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const createUserValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
};

const createMovieValidation = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegExp),
    trailerLink: Joi.string().required().regex(urlRegExp),
    thumbnail: Joi.string().required().regex(urlRegExp),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const deleteMovieValidation = {
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
};

const updateUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
};

module.exports = {
  loginValidation,
  createUserValidation,
  createMovieValidation,
  deleteMovieValidation,
  updateUserValidation,
};
