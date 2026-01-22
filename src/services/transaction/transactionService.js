const bcrypt = require('bcrypt');
// const {TransactionRepository } = require('../../repositories/user/userRepository');

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

  async createUser(data,clientId) {
    
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error('Email already exists');
    }

    const userData = await this.prepareUserData(data, clientId);

    const userIdCreated = await this.userRepository.createUser(userData);
    return userIdCreated;
  }

  async update(id, data) {
    const idUser = id
    const fieldsUpdate = data

    return this.userRepository.updateUser(idUser, fieldsUpdate);
  }

  async deleteUser(id) {
    await this.userRepository.delete(id);
  }
  async prepareUserData(data, clientId) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = {
      ...data,
      ID_user: data.cpf,
      client_id: clientId,
      password: hashedPassword,
      created_at: Date.now(),
      access_level: 3,
      updated_at: Date.now()
    };

    delete userData.cpf;
    

    return userData;
  }
}

module.exports = {
  TransactionService
};
