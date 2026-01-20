const { Router } = require('express');
const AuthenticationController = require('../controllers/auth/authenticationController');

const authenticationRoutes = (db) => {
  const router = Router();
  const controller = new AuthenticationController(db);

  router.post('/authentication', controller.auth);

  return router;
};

module.exports = authenticationRoutes;
