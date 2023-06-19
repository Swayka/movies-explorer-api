const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { getUser, updateUser } = require('../controllers/users');
const { updateUserValidation } = require('../utils/validation');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', celebrate(updateUserValidation), updateUser);

module.exports = usersRouter;
