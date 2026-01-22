const { TransactionService } = require('../../services/transaction/transactionService')
const { TransactionRepository } = require('../../repositories/transaction/transactionRepository');
const ApiResponse = require('../../utils/http/response');
const { TransactionRequestHandler } = require('../../controllers/transaction/transactionRequestHandler')

class TransactionController {
  constructor(db) {

    const clientRepository = new TransactionRepository(db);
    this.transactionService = new TransactionService(clientRepository);
    this.requestValidator = TransactionRequestHandler;
  }

  all = async (req, res) => {

    const clients = await this.transactionService.findAll(req.user.client_id);
    return ApiResponse.success(res, 'transactions', clients);

  }
  getById = async (req,res) => {
    const requestValidate = this.requestValidator.validateToGetById(req.params.id);
    if(requestValidate.error) {
      throw new Error(`transaction error: ${requestValidate.message}`)
    }

    const id = req.params.id
    const user = await this.transactionService.getTransactionById(id);
    console.log(user)
    return  ApiResponse.success(res, 'transaction', user);
  }
  
}

module.exports = TransactionController;