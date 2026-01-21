const { Router } = require('express');
const ClientController = require('../../controllers/client/clientController');

const clientRoutes = (db) => {
  const router = Router();
  const controller = new ClientController(db);
  router.get('/clients', controller.all  );
  // router.get('/user/:id', controller.getById);
  // router.post('/user/create', controller.store);
  // router.patch('/user/update/:id', controller.update);
  // router.post('/user/delete/:id', controller.delete);

  return router;
};

module.exports = clientRoutes;
