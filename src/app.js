const express = require('express');
// const corsMiddleware = require('./middlewares/cors');
// const errorHandler = require('./middlewares/errorHandler');
const registerRouter = require('./routes');

const createApp = (db) => {
  const app = express();

  console.log('testing pipeline, testing only');

  app.use(express.json());
//   app.use(corsMiddleware);

  // pass db (sequelize + models) to routes
  app.use(registerRouter(db));

  // app.use(errorHandler);

  return app;
};

module.exports = { createApp };
