const bcrypt = require('bcrypt');
const XLSX = require('xlsx');
const parseExcelDate = require('../../infra/xls/xls');



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
	async upload(fileBuffer) {
		const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
		const sheetName = workbook.SheetNames[0];
		const sheet = workbook.Sheets[sheetName];

		const rows = XLSX.utils.sheet_to_json(sheet);

		

		const transactions = rows.map(row => ({
			ID_user: row.cpf,
			id_user_transaction: 1,
			desc_transaction: row.desc_transaction,
			date_transaction: parseExcelDate(row.date_transaction),
			value_in_points: Number(row.value_in_points),
			value: Number(row.value),
			client_id: 1,
			status: row.status
		}));
		await this.transactionRepository.bulkCreate(transactions);
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
