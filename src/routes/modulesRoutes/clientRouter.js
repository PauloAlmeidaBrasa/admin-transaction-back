const { Router } = require('express');
const ClientController = require('../../controllers/client/clientController');

const clientRoutes = (db) => {
  const router = Router();
  const controller = new ClientController(db);
  router.get('/clients', controller.all  );

  return router;
};

module.exports = clientRoutes;
