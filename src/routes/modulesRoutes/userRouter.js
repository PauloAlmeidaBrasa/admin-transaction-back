const { Router } = require('express');
const UserController = require('../../controllers/user/userController');
const multiTenantMiddlewareFactory = require('../../middlewares/multiTenantMiddleware')


const userRoutes = (db) => {

  const router = Router();
  // router.use(/transactionsmultiTenantMiddlewareFactory(db))

  const controller = new UserController(db);
  router.get('/users', controller.all  );
  router.get('/user/:id', controller.getById);
  router.post('/user/create', multiTenantMiddlewareFactory(db), controller.store);
  router.patch('/user/update/:id', controller.update);
  router.post('/user/delete/:id', controller.delete);

  return router;
};

module.exports = userRoutes;
