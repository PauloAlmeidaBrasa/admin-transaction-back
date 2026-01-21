const { TransactionService } = require('../../services/transaction/transactionService')
const { TransactionRepository } = require('../../repositories/transaction/transactionRepository');
const ApiResponse = require('../../utils/http/response');

class TransactionController {
  constructor(db) {

    const clientRepository = new TransactionRepository(db);
    this.transactionService = new TransactionService(clientRepository);
  }

  all = async (req, res) => {

    const clients = await this.transactionService.findAll(req.user.client_id);
    return ApiResponse.success(res, 'transactions', clients);

  }
  
}

module.exports = TransactionController;