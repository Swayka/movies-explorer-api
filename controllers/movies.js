const mongoose = require('mongoose');
const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const { VALIDATION_ERROR, BAD_ID } = require('../utils/constants');

const { NOT_FOUND, FORBIDDEN_DELETE } = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((newMovie) => res.status(201).send(newMovie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(VALIDATION_ERROR));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params._id;
  const ownerId = req.user._id;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND);
      } else if (movie.owner.toString() !== ownerId) {
        throw new ForbiddenError(FORBIDDEN_DELETE);
      } else {
        return Movie.deleteOne({ _id: movieId }).then(() => res.send(movie));
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(BAD_ID));
        return;
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
