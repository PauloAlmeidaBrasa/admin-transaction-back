const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  userRoutes,
  clientRoutes,
  transactionRoutes
} = require('../routes/modulesRoutes');
const authenticationRoutes = require('./authenticationRouter');

const registerRouter = (db) => {
  const router = Router();
  const API_VERSION = process.env.API_VERSION || 'v1';


  // Public routes
  router.use(`/${API_VERSION}`, authenticationRoutes(db));
  //   router.use(`/${API_VERSION}`, docRoutes());

  // Protected routes
  router.use(`/${API_VERSION}`, authMiddleware, userRoutes(db));
  router.use(`/${API_VERSION}`, authMiddleware, clientRoutes(db));
  router.use(`/${API_VERSION}`, authMiddleware, transactionRoutes(db));

  return router;
};

module.exports = registerRouter;
