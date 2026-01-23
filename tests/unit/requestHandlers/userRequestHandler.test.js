const { UserRequestHandler } = require('../../../src/controllers/user/userRequestHandler');

describe('UserRequestHandler', () => {
  describe('validateToGetById', () => {
    it('should return error when id is missing', () => {
      const result = UserRequestHandler.validateToGetById(null);
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is undefined', () => {
      const result = UserRequestHandler.validateToGetById(undefined);
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is empty string', () => {
      const result = UserRequestHandler.validateToGetById('');
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is not a number', () => {
      const result = UserRequestHandler.validateToGetById('abc');
      expect(result.error).toBe(true);
      expect(result.message).toBe('id bad format');
    });

    it('should return error when id contains non-numeric characters', () => {
      const result = UserRequestHandler.validateToGetById('123abc');
      expect(result.error).toBe(true);
      expect(result.message).toBe('id bad format');
    });

    it('should be valid when id is a valid number string', () => {
      const result = UserRequestHandler.validateToGetById('123');
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });

    it('should be valid when id is a valid number', () => {
      const result = UserRequestHandler.validateToGetById(456);
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });

    it('should be valid when id is a negative number', () => {
      const result = UserRequestHandler.validateToGetById('-789');
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });
  });

  describe('validateToCreate', () => {
    it('should return error when params is null', () => {
      const result = UserRequestHandler.validateToCreate(null);
      expect(result.error).toBe(true);
      expect(result.message).toBe('invalid payload');
    });

    it('should return error when params is undefined', () => {
      const result = UserRequestHandler.validateToCreate(undefined);
      expect(result.error).toBe(true);
      expect(result.message).toBe('invalid payload');
    });

    it('should return error when params is not an object', () => {
      const result = UserRequestHandler.validateToCreate('string');
      expect(result.error).toBe(true);
      expect(result.message).toBe('invalid payload');
    });

    it('should return error when name is missing', () => {
      const params = {
        email: 'test@example.com',
        password: 'password123'
      };
      const result = UserRequestHandler.validateToCreate(params);
      expect(result.error).toBe(true);
      expect(result.message).toBe('name missing');
    });

    it('should return error when name is not a string', () => {
      const params = {
        name: 123,
        email: 'test@example.com',
        password: 'password123'
      };
      const result = UserRequestHandler.validateToCreate(params);
      expect(result.error).toBe(true);
      expect(result.message).toBe('name missing');
    });

    it('should return error when email is missing', () => {
      const params = {
        name: 'John Doe',
        password: 'password123'
      };
      const result = UserRequestHandler.validateToCreate(params);
      expect(result.error).toBe(true);
      expect(result.message).toBe('email missing');
    });

    it('should return error when email format is invalid', () => {
      const params = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123'
      };
      const result = UserRequestHandler.validateToCreate(params);
      expect(result.error).toBe(true);
      expect(result.message).toBe('email bad format');
    });

    it('should return error when password is missing', () => {
      const params = {
        name: 'John Doe',
        email: 'test@example.com'
      };
      const result = UserRequestHandler.validateToCreate(params);
      expect(result.error).toBe(true);
      expect(result.message).toBe('password missing');
    });

    it('should be valid with all required fields', () => {
      const params = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };
      const result = UserRequestHandler.validateToCreate(params);
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });

    it('should be valid with additional optional fields', () => {
      const params = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'securepass456',
        phone: '123456789',
        address: '123 Main St'
      };
      const result = UserRequestHandler.validateToCreate(params);
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });

    it('should accept various valid email formats', () => {
      const validEmails = [
        'user@example.com',
        'first.last@example.co.uk',
        'user+tag@example.com',
        'user123@test-domain.com'
      ];

      validEmails.forEach(email => {
        const params = {
          name: 'Test User',
          email: email,
          password: 'password123'
        };
        const result = UserRequestHandler.validateToCreate(params);
        expect(result.error).toBe(false);
        expect(result.message).toBe('');
      });
    });
  });

  describe('validateToUpdate', () => {
    it('should return error when id is missing', () => {
      const result = UserRequestHandler.validateToUpdate(null);
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is undefined', () => {
      const result = UserRequestHandler.validateToUpdate(undefined);
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is empty string', () => {
      const result = UserRequestHandler.validateToUpdate('');
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should be valid when id is provided', () => {
      const result = UserRequestHandler.validateToUpdate('123');
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });

    it('should be valid when id is a number', () => {
      const result = UserRequestHandler.validateToUpdate(456);
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });
  });

  describe('validateToDelete', () => {
    it('should return error when id is missing', () => {
      const result = UserRequestHandler.validateToDelete(null);
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is undefined', () => {
      const result = UserRequestHandler.validateToDelete(undefined);
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should return error when id is empty string', () => {
      const result = UserRequestHandler.validateToDelete('');
      expect(result.error).toBe(true);
      expect(result.message).toBe('id missing');
    });

    it('should be valid when id is provided', () => {
      const result = UserRequestHandler.validateToDelete('123');
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });

    it('should be valid when id is a number', () => {
      const result = UserRequestHandler.validateToDelete(789);
      expect(result.error).toBe(false);
      expect(result.message).toBe('');
    });
  });
});
