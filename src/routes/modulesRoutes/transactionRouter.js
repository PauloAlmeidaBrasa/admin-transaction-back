const { Router } = require('express');
const TransactionController = require('../../controllers/transaction/transactionController');
const excelMiddleware = require('../../middlewares/uploadExcelMiddleware');


const transactionRoutes = (db) => {
  const router = Router();
  const controller = new TransactionController(db);
  router.get('/transactions', controller.all  );
  router.get('/transaction/:id', controller.getById);
  router.patch('/transaction/update/:id', controller.update);
  router.post('/transaction/create', controller.store);
  router.post('/transaction/delete/:id', controller.delete);
  router.get('/transaction/by-user/:id', controller.getByUserId);
  router.post('/transaction/upload',  excelMiddleware.single('file'), controller.upload);
  return router;
};

module.exports = transactionRoutes;
