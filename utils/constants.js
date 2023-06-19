const urlRegExp = /http[s]?:\/\/(www\.)?[-a-zA-Z0-9:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9():%_+.~#?&//=]*)/;

const INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка';
const BAD_EMAIL = 'Некорректно введен email';
const BAD_URL = 'Не является URL адресом';
const NOT_FOUND = 'Нет фильма с таким id';
const VALIDATION_ERROR = 'Переданы некорректные данные';
const FORBIDDEN_DELETE = 'Нет доступа к удалению фильма';
const NOT_FOUND_ERROR = 'Запрашиваемый ресурс не найден';
const UNAUTORIZED_ERROR = 'Необходима авторизация';
const CONFLICT_ERROR = 'Пользователь уже существует!';
const WRONG_DATA = 'Неправильная почта или пароль';
const NOT_FOUND_USER = 'Пользователь не найден';
const BAD_ID = 'Введен некорректный ID';
const NOT_FOUND_URL = 'Страница не найдена';

const allowedCors = [
  'https://manzhikova.diploma.nomoredomains.rocks',
  'http://manzhikova.diploma.nomoredomains.rocks',
  'https://api.manzhikova.diploma.nomoredomains.rocks',
  'http://api.manzhikova.diploma.nomoredomains.rocks',
  'localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
  'localhost:3001',
];

const URL_MONGODB = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  urlRegExp,
  BAD_EMAIL,
  INTERNAL_SERVER_ERROR,
  BAD_URL,
  NOT_FOUND,
  VALIDATION_ERROR,
  FORBIDDEN_DELETE,
  NOT_FOUND_ERROR,
  UNAUTORIZED_ERROR,
  CONFLICT_ERROR,
  WRONG_DATA,
  NOT_FOUND_USER,
  BAD_ID,
  NOT_FOUND_URL,
  allowedCors,
  URL_MONGODB,
};
