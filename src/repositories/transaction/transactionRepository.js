
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
  async transactionByUserId(idUser) {
    const transactions = await this.Transaction.findOne({
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
      where: { id_user_transaction: idUser }
    })
    return transactions;
  }
}


module.exports = {
  TransactionRepository
};
