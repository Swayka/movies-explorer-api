const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const { limit } = require('./middlewares/limiter');

const router = require('./routes');

const { PORT = 3000, NODE_ENV, URL_DB_PROD } = process.env;
const { URL_MONGODB } = require('./utils/constants');

const app = express();

mongoose.connect(NODE_ENV === 'production' ? URL_DB_PROD : URL_MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limit);

app.use(cors);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
