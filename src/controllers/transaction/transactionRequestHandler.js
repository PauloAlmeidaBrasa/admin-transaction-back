const generalUtils = require('../../utils/generalUtils');

class TransactionRequestHandler {
  static validateToGetById(id) {
    if (!id) {
      return { error: true, message: 'id missing' };
    }

    if (isNaN(Number(id))) {
      return { error: true, message: 'id bad format' };
    }

    return { error: false, message: '' };
  }

  static validateToGetByUserId(id) {
    if (!id) {
      return { error: true, message: 'id missing' };
    }

    if (isNaN(Number(id))) {
      return { error: true, message: 'id bad format' };
    }

    return { error: false, message: '' };
  }

  static validateToCreate(params) {
    if (!params || typeof params !== 'object') {
      return { error: true, message: 'invalid payload' };
    }

    if (!params.ID_user || typeof params.ID_user !== 'string') {
      return { error: true, message: 'ID_user missing' };
    }

    if (!params.email) {
      return { error: true, message: 'email missing' };
    }

    if (!generalUtils.parseEmail(params.email)) {
      return { error: true, message: 'email bad format' };
    }

    if (!params.password) {
      return { error: true, message: 'password missing' };
    }

    return { error: false, message: '' };
  }

  static validateToUpdate(id) {
    if (!id) {
      return { error: true, message: 'id missing' };
    }

    return { error: false, message: '' };
  }

  static validateToDelete(id) {
    if (!id) {
      return { error: true, message: 'id missing' };
    }

    return { error: false, message: '' };
  }
  static validateToByDate(params) {
    if (!params.start_date) {

      return { error: true, message: 'start_date missing' };
    }
    if (!params.end_date) {
      return { error: true, message: 'end_date missing' };
    }
    return { error: false, message: '' };
  }
}

module.exports = {
  TransactionRequestHandler
};