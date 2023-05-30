const moviesRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../utils/validation');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', celebrate(createMovieValidation), createMovie);
moviesRouter.delete('/:_id', celebrate(deleteMovieValidation), deleteMovie);

module.exports = moviesRouter;
