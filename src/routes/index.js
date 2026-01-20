const { Router } = require('express');

// const {
//   userRoutes,
//   clientRoutes
// } = require('@routes/modulesRoutes');

const authenticationRoutes = require('./authenticationRouter');
// const { authMiddleware } = require('middleware/authMiddleware');
// const docRoutes = require('./docRouter');

const registerRouter = (db) => {
  const router = Router();
  const API_VERSION = process.env.API_VERSION || 'v1';


  // Public routes
  router.use(`/${API_VERSION}`, authenticationRoutes(db));
//   router.use(`/${API_VERSION}`, docRoutes());

  // Protected routes
//   router.use(`/${API_VERSION}`, authMiddleware, userRoutes(db));
//   router.use(`/${API_VERSION}`, authMiddleware, clientRoutes(db));

  return router;
};

module.exports = registerRouter;
