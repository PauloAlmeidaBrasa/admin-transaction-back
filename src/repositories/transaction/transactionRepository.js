
class TransactionRepository {
  constructor(db) {
    this.Transaction = db.Transaction;
  }

  async findAllTransaction(clientId) {
    return this.Transaction.findAll({
       attributes: [
        'id',
        'ID_user',
        'id_user_transaction',
        'desc_transaction',
        'date_transaction',
        'value_in_points',
        'value',
        'status'
      ],
      where: { client_id: clientId }
    });
  }

  async getByDate(startDate, endDate, clientId) {
    const { Op } = require('sequelize');
    return this.Transaction.findAll({
      attributes: [
        'id',
        'ID_user',
        'id_user_transaction',
        'desc_transaction',
        'date_transaction',
        'value_in_points',
        'value',
        'status'
      ],
      where: {
        client_id: clientId,
        date_transaction: {
          [Op.between]: [startDate, endDate]
        }
      },
      order: [['date_transaction', 'DESC']]
    });
  }

  async createTransaction(data) {
    const transaction = await this.Transaction.create(data);
    return transaction.id;
  }
   async transactionById(idTransaction) {
    const transaction = await this.Transaction.findOne({
      attributes: [
        'id',
        'ID_user',
        'id_user_transaction',
        'desc_transaction',
        'date_transaction',
        'value_in_points',
        'value',
        'status'
      ],
      where: { id: idTransaction }
    })
    return transaction;
  }
  async updateTransaction(idTransaction, fieldsUpdate) {
    const result = await this.Transaction.update(fieldsUpdate, {
      where: { id: idTransaction }
    });
    return result;
  }
  async delete(idTransaction) {

    return  await this.Transaction.destroy({
      where: { id: idTransaction }
    });
  }
  async createTransaction(data) {
    const transaction = await this.Transaction.create(data);
    return transaction.id;
  }
  async bulkCreate(transactions) {
    this.Transaction.bulkCreate(transactions)
  }
}

module.exports = {
  TransactionRepository
};
