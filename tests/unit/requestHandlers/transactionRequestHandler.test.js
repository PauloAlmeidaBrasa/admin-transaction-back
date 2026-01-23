const { TransactionRequestHandler } = require('../../../src/controllers/transaction/transactionRequestHandler');

describe('TransactionRequestHandler', () => {
  describe('validateToGetById', () => {
    it('should return error when id is missing', () => {
      const result = TransactionRequestHandler.validateToGetById(null);
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is undefined', () => {
      const result = TransactionRequestHandler.validateToGetById(undefined);
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is empty string', () => {
      const result = TransactionRequestHandler.validateToGetById('');
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is not a number', () => {
      const result = TransactionRequestHandler.validateToGetById('abc');
      expect(result.error).toBe(true);
      expect(result.message).toBe('id bad format');
    });

    it('should return error when id contains non-numeric characters', () => {
      const result = TransactionRequestHandler.validateToGetById('123abc');
      expect(result.error).toBe(true);
      expect(result.message).toBe('id bad format');
    });

    it('should be valid when id is a valid number string', () => {
      const result = TransactionRequestHandler.validateToGetById('123');
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });

    it('should be valid when id is a valid number', () => {
      const result = TransactionRequestHandler.validateToGetById(456);
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });

    it('should be valid when id is a negative number', () => {
      const result = TransactionRequestHandler.validateToGetById('-100');
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });
  });

  describe('validateToGetByUserId', () => {
    it('should return error when id is missing', () => {
      const result = TransactionRequestHandler.validateToGetByUserId(null);
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is undefined', () => {
      const result = TransactionRequestHandler.validateToGetByUserId(undefined);
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is empty string', () => {
      const result = TransactionRequestHandler.validateToGetByUserId('');
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is not a number', () => {
      const result = TransactionRequestHandler.validateToGetByUserId('xyz');
      expect(result.error).toBe(true);
      expect(result.message).toBe('id bad format');
    });

    it('should be valid when id is a valid number string', () => {
      const result = TransactionRequestHandler.validateToGetByUserId('789');
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });

    it('should be valid when id is a valid number', () => {
      const result = TransactionRequestHandler.validateToGetByUserId(999);
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });
  });

  describe('validateToCreate', () => {
    it('should return error when params is null', () => {
      const result = TransactionRequestHandler.validateToCreate(null);
      expect(result.error).toBe(true);
      expect(result.message).toBe('invalid payload');
    });

    it('should return error when params is undefined', () => {
      const result = TransactionRequestHandler.validateToCreate(undefined);
      expect(result.error).toBe(true);
      expect(result.message).toBe('invalid payload');
    });

    it('should return error when params is not an object', () => {
      const result = TransactionRequestHandler.validateToCreate('string');
      expect(result.error).toBe(true);
      expect(result.message).toBe('invalid payload');
    });

    it('should return error when ID_user is missing', () => {
      const params = {
        email: 'test@example.com',
        password: 'password123'
      };
      const result = TransactionRequestHandler.validateToCreate(params);
      expect(result.error).toBe(true);
      expect(result.message).toBe('ID_user missing');
    });

    it('should return error when ID_user is not a string', () => {
      const params = {
        ID_user: 123,
        email: 'test@example.com',
        password: 'password123'
      };
      const result = TransactionRequestHandler.validateToCreate(params);
      expect(result.error).toBe(true);
      expect(result.message).toBe('ID_user missing');
    });

    it('should return error when email is missing', () => {
      const params = {
        ID_user: 'user123',
        password: 'password123'
      };
      const result = TransactionRequestHandler.validateToCreate(params);
      expect(result.error).toBe(true);
      expect(result.message).toBe('email missing');
    });

    it('should return error when email format is invalid', () => {
      const params = {
        ID_user: 'user123',
        email: 'invalid-email',
        password: 'password123'
      };
      const result = TransactionRequestHandler.validateToCreate(params);
      expect(result.error).toBe(true);
      expect(result.message).toBe('email bad format');
    });

    it('should return error when password is missing', () => {
      const params = {
        ID_user: 'user123',
        email: 'test@example.com'
      };
      const result = TransactionRequestHandler.validateToCreate(params);
      expect(result.error).toBe(true);
      expect(result.message).toBe('password missing');
    });

    it('should be valid with all required fields', () => {
      const params = {
        ID_user: 'user123',
        email: 'test@example.com',
        password: 'password123'
      };
      const result = TransactionRequestHandler.validateToCreate(params);
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });

    it('should be valid with additional optional fields', () => {
      const params = {
        ID_user: 'user456',
        email: 'another@example.com',
        password: 'securepass789',
        amount: 100.50,
        description: 'Test transaction',
        date: '2026-01-23'
      };
      const result = TransactionRequestHandler.validateToCreate(params);
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });

    it('should accept various valid email formats', () => {
      const validEmails = [
        'user@example.com',
        'transaction@domain.co.uk',
        'admin+test@example.com'
      ];

      validEmails.forEach(email => {
        const params = {
          ID_user: 'user789',
          email: email,
          password: 'password123'
        };
        const result = TransactionRequestHandler.validateToCreate(params);
        expect(result.error).toBe(false);
        expect(result.message).toBe('');
      });
    });
  });

  describe('validateToUpdate', () => {
    it('should return error when id is missing', () => {
      const result = TransactionRequestHandler.validateToUpdate(null);
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is undefined', () => {
      const result = TransactionRequestHandler.validateToUpdate(undefined);
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is empty string', () => {
      const result = TransactionRequestHandler.validateToUpdate('');
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should be valid when id is provided as string', () => {
      const result = TransactionRequestHandler.validateToUpdate('123');
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });

    it('should be valid when id is provided as number', () => {
      const result = TransactionRequestHandler.validateToUpdate(456);
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });
  });

  describe('validateToDelete', () => {
    it('should return error when id is missing', () => {
      const result = TransactionRequestHandler.validateToDelete(null);
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is undefined', () => {
      const result = TransactionRequestHandler.validateToDelete(undefined);
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is empty string', () => {
      const result = TransactionRequestHandler.validateToDelete('');
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should be valid when id is provided as string', () => {
      const result = TransactionRequestHandler.validateToDelete('789');
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });

    it('should be valid when id is provided as number', () => {
      const result = TransactionRequestHandler.validateToDelete(999);
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });
  });
});
