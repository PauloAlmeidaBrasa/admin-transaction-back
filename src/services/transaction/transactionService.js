const bcrypt = require('bcrypt');
const XLSX = require('xlsx');
const parseExcelDate = require('../../infra/xls/xls');
const TransactionImportRequestHandler =
  require('../../controllers/transaction/transactionImportRequestHandler');



class TransactionService {
  constructor(transactionRepo,userRepo) {
    this.userRepository = userRepo
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
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const errors = [];

    rows.forEach((row, index) => {
      const validation =
        TransactionImportRequestHandler.validateRow(row, index + 2);

      if (validation.error) {
        errors.push(validation.message);
      }
    });

    if (errors.length) {
      throw new Error(errors.join(' | '));
    }

    const validTransactions = await Promise.all(
      rows.map(async (row, index) => {
        console.log(row)
        const user = await this.userRepository.findByEmailAndIdUser(
          row.user_email,
          row.cpf
        );

        if (!user) {
          throw new Error(
            `User not found at line ${index + 2} (email=${row.email}, cpf=${row.cpf})`
          );
        }

        return {
          ID_user: row.cpf,
          id_user_transaction: user.id,
          desc_transaction: row.desc_transaction,
          date_transaction: parseExcelDate(row.date_transaction),
          value_in_points: Number(row.value_in_points),
          value: Number(row.value),
          client_id: user.client_id,
          status: row.status,
          user_email: row.user_email
        };
      })
    );
    await this.transactionRepository.bulkCreate(validTransactions);
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
