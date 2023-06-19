const router = require('express').Router();
const { celebrate } = require('celebrate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { auth } = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { loginValidation, createUserValidation } = require('../utils/validation');

const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND_URL } = require('../utils/constants');

router.post('/signin', celebrate(loginValidation), login);
router.post('/signup', celebrate(createUserValidation), createUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('/*', auth, (req, res, next) => {
  const err = new NotFoundError(NOT_FOUND_URL);
  next(err);
});

module.exports = router;
