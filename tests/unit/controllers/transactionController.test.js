const TransactionController = require('../../../src/controllers/transaction/transactionController');

// Mock the TransactionService
jest.mock('../../../src/services/transaction/transactionService');

// Mock response utilities
jest.mock('../../../src/utils/http/response', () => ({
  success: jest.fn((res, key, data) => {
    res.json({ [key]: data });
    return res;
  }),
  message: jest.fn((res, msg, status = 200, data = null) => {
    res.status(status).json({ message: msg, ...(data && { data }) });
    return res;
  })
}));

describe('TransactionController', () => {
  let transactionController;
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Setup controller - it will get the mocked TransactionService
    transactionController = new TransactionController({});

    // Setup mock request and response
    mockRequest = {
      body: {},
      params: {},
      user: { client_id: 'client-123' },
      clientId: 'client-123',
      file: null
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });

  describe('all', () => {
    it('should return all transactions for a client', async () => {
      const mockTransactions = [
        { id: 1, ID_user: 'user1', amount: 100 },
        { id: 2, ID_user: 'user2', amount: 200 }
      ];

      transactionController.transactionService.findAll = jest.fn().mockResolvedValue(mockTransactions);

      await transactionController.all(mockRequest, mockResponse);

      expect(transactionController.transactionService.findAll).toHaveBeenCalledWith('client-123');
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should handle empty transaction list', async () => {
      transactionController.transactionService.findAll = jest.fn().mockResolvedValue([]);

      await transactionController.all(mockRequest, mockResponse);

      expect(transactionController.transactionService.findAll).toHaveBeenCalled();
    });

    it('should handle database errors in all', async () => {
      const error = new Error('Database error');
      transactionController.transactionService.findAll = jest.fn().mockRejectedValue(error);

      await expect(transactionController.all(mockRequest, mockResponse)).rejects.toThrow('Database error');
    });
  });

  describe('getById', () => {
    it('should return a transaction by id', async () => {
      mockRequest.params = { id: '1' };
      const mockTransaction = { id: 1, ID_user: 'user1', amount: 100 };

      transactionController.transactionService.getTransactionById = jest.fn().mockResolvedValue(mockTransaction);

      await transactionController.getById(mockRequest, mockResponse);

      expect(transactionController.transactionService.getTransactionById).toHaveBeenCalledWith('1');
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should reject with missing id', async () => {
      mockRequest.params = { id: null };

      await expect(transactionController.getById(mockRequest, mockResponse)).rejects.toThrow('id missing');
    });

    it('should reject with invalid id format', async () => {
      mockRequest.params = { id: 'abc' };

      await expect(transactionController.getById(mockRequest, mockResponse)).rejects.toThrow('id bad format');
    });

    it('should handle transaction not found', async () => {
      mockRequest.params = { id: '999' };
      transactionController.transactionService.getTransactionById = jest.fn().mockResolvedValue(null);

      await transactionController.getById(mockRequest, mockResponse);

      expect(transactionController.transactionService.getTransactionById).toHaveBeenCalledWith('999');
    });

    it('should accept numeric id', async () => {
      mockRequest.params = { id: 123 };
      const mockTransaction = { id: 123, ID_user: 'user1', amount: 150 };

      transactionController.transactionService.getTransactionById = jest.fn().mockResolvedValue(mockTransaction);

      await transactionController.getById(mockRequest, mockResponse);

      expect(transactionController.transactionService.getTransactionById).toHaveBeenCalledWith(123);
    });
  });

  describe('store', () => {
    it('should create a new transaction with valid data', async () => {
      mockRequest.body = {
        ID_user: 'user123',
        email: 'user@example.com',
        password: 'password123'
      };
      mockRequest.clientId = 'client-123';

      transactionController.transactionService.createUser = jest.fn().mockResolvedValue(1);

      await transactionController.store(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });

    it('should reject creation with missing ID_user', async () => {
      mockRequest.body = {
        email: 'user@example.com',
        password: 'password123'
      };

      await expect(transactionController.store(mockRequest, mockResponse)).rejects.toThrow('ID_user missing');
    });

    it('should reject creation with non-string ID_user', async () => {
      mockRequest.body = {
        ID_user: 123,
        email: 'user@example.com',
        password: 'password123'
      };

      await expect(transactionController.store(mockRequest, mockResponse)).rejects.toThrow('ID_user missing');
    });

    it('should reject creation with missing email', async () => {
      mockRequest.body = {
        ID_user: 'user123',
        password: 'password123'
      };

      await expect(transactionController.store(mockRequest, mockResponse)).rejects.toThrow('email missing');
    });

    it('should reject creation with invalid email format', async () => {
      mockRequest.body = {
        ID_user: 'user123',
        email: 'invalid-email',
        password: 'password123'
      };

      await expect(transactionController.store(mockRequest, mockResponse)).rejects.toThrow('email bad format');
    });

    it('should reject creation with missing password', async () => {
      mockRequest.body = {
        ID_user: 'user123',
        email: 'user@example.com'
      };

      await expect(transactionController.store(mockRequest, mockResponse)).rejects.toThrow('password missing');
    });
  });

  describe('update', () => {
    it('should update a transaction with valid id', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { amount: 250 };

      transactionController.transactionService.update = jest.fn().mockResolvedValue(true);

      await transactionController.update(mockRequest, mockResponse);

      expect(transactionController.transactionService.update).toHaveBeenCalledWith('1', mockRequest.body);
    });

    it('should reject update with missing id', async () => {
      mockRequest.params = { id: null };
      mockRequest.body = { amount: 250 };

      await expect(transactionController.update(mockRequest, mockResponse)).rejects.toThrow('id missing');
    });

    it('should reject update with empty string id', async () => {
      mockRequest.params = { id: '' };
      mockRequest.body = { amount: 250 };

      await expect(transactionController.update(mockRequest, mockResponse)).rejects.toThrow('id missing');
    });

    it('should allow partial updates', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { description: 'Updated description' };

      transactionController.transactionService.update = jest.fn().mockResolvedValue(true);

      await transactionController.update(mockRequest, mockResponse);

      expect(transactionController.transactionService.update).toHaveBeenCalledWith('1', mockRequest.body);
    });

    it('should handle update errors', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { amount: 250 };
      const error = new Error('Update failed');
      transactionController.transactionService.update = jest.fn().mockRejectedValue(error);

      await expect(transactionController.update(mockRequest, mockResponse)).rejects.toThrow('Update failed');
    });
  });

  describe('delete', () => {
    it('should delete a transaction with valid id', async () => {
      mockRequest.params = { id: '1' };

      transactionController.transactionService.deleteTransaction = jest.fn().mockResolvedValue(true);

      await transactionController.delete(mockRequest, mockResponse);

      expect(transactionController.transactionService.deleteTransaction).toHaveBeenCalledWith('1');
    });

    it('should reject delete with missing id', async () => {
      mockRequest.params = { id: null };

      await expect(transactionController.delete(mockRequest, mockResponse)).rejects.toThrow('id missing');
    });

    it('should reject delete with empty string id', async () => {
      mockRequest.params = { id: '' };

      await expect(transactionController.delete(mockRequest, mockResponse)).rejects.toThrow('id missing');
    });

    it('should handle delete when invalid id format is provided', async () => {
      mockRequest.params = { id: 'invalid' };

      transactionController.transactionService.deleteTransaction = jest.fn().mockResolvedValue(true);

      await transactionController.delete(mockRequest, mockResponse);

      // validateToDelete only checks for presence, not format
      expect(transactionController.transactionService.deleteTransaction).toHaveBeenCalledWith('invalid');
    });

    it('should handle delete not found', async () => {
      mockRequest.params = { id: '999' };
      transactionController.transactionService.deleteTransaction = jest.fn().mockResolvedValue(false);

      await transactionController.delete(mockRequest, mockResponse);

      expect(transactionController.transactionService.deleteTransaction).toHaveBeenCalledWith('999');
    });

    it('should handle delete errors', async () => {
      mockRequest.params = { id: '1' };
      const error = new Error('Delete failed');
      transactionController.transactionService.deleteTransaction = jest.fn().mockRejectedValue(error);

      await expect(transactionController.delete(mockRequest, mockResponse)).rejects.toThrow('Delete failed');
    });
  });

  describe('upload', () => {
    it('should reject upload without file', async () => {
      mockRequest.file = null;

      const response = await transactionController.upload(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Excel file is required' });
    });

    it('should reject upload when file is undefined', async () => {
      mockRequest.file = undefined;

      const response = await transactionController.upload(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should handle successful file upload', async () => {
      const mockFileBuffer = Buffer.from('mock excel data');
      mockRequest.file = { buffer: mockFileBuffer };

      // Mock the service upload method
      transactionController.transactionService.upload = jest.fn().mockResolvedValue(true);

      const response = await transactionController.upload(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });

    it('should handle upload service errors', async () => {
      const mockFileBuffer = Buffer.from('mock excel data');
      mockRequest.file = { buffer: mockFileBuffer };

      // Mock service error
      const uploadError = new Error('Invalid Excel format');
      transactionController.transactionService.upload = jest.fn().mockRejectedValue(uploadError);

      const response = await transactionController.upload(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid Excel format' });
    });
  });
});
