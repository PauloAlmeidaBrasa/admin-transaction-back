const express = require('express');
const corsMiddleware = require('./middlewares/corsMiddleware');
// const errorHandler = require('./middlewares/errorHandler');
const registerRouter = require('./routes');

const createApp = (db) => {

  const app = express();

  app.use(express.json());

  app.use(corsMiddleware);

  app.use(registerRouter(db));

  // app.use(errorHandler);

  return app;
};

module.exports = { createApp };
