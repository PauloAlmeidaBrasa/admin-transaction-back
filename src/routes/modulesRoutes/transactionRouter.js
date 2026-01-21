const { Router } = require('express');
const TransactionController = require('../../controllers/transaction/transactionController');

const transactionRoutes = (db) => {
  const router = Router();
  const controller = new TransactionController(db);
  router.get('/transactions', controller.all  );

  return router;
};

module.exports = transactionRoutes;
