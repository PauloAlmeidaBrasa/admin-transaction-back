const bcrypt = require('bcrypt');

class TransactionService {
  constructor(transactionRepo) {
    this.transactionRepository = transactionRepo;
  }

  async findAll(clientId) {
    return this.transactionRepository.findAllTransaction(clientId);
  }

  async getTransactionById(id) {
    const transaction = await this.transactionRepository.transactionById(id);
    if (!transaction) {
      throw new Error('User not found');
    }
    return transaction;
  }

  async createTransaction(data,clientId) {

    const transactionData = await this.prepareUserData(data, clientId);

    const transactionByIdCreated = await this.transactionRepository.createTransaction(transactionData);
    return transactionByIdCreated;
  }

  async update(id, data) {
    const idTransaction = id
    const fieldsUpdate = data

    return this.transactionRepository.updateTransaction(idTransaction, fieldsUpdate);
  }

async deleteTransaction(id) {
    await this.transactionRepository.delete(id);
  }

  async prepareData(data, clientId) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = {
      ...data,
      ID_user: data.cpf,
      client_id: clientId,
      password: hashedPassword,
      created_at: Date.now(),
    };
    
    return userData;
  }

}

module.exports = {
  TransactionService
};
