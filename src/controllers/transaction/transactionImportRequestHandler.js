const { resolveIdUser } = require('../../utils/generalUtils')

class TransactionImportRequestHandler {
  static validateRow(row, rowIndex) {
    if (!row) {
      return { error: true, message: `Row ${rowIndex}: empty row` };
    }
    const idUser = resolveIdUser(row);
    if (!idUser) {
      return { error: true, message: `Row ${rowIndex}: missing ID_user (cpf / ssn / dni)` };
    }

    if (!row.value) {
      return { error: true, message: `Row ${rowIndex}: value is required` };
    }

    if (!row.status) {
      return { error: true, message: `Row ${rowIndex}: status is required` };
    }

    return { error: false };
  }
}

module.exports = TransactionImportRequestHandler;
