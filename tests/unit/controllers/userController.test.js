const UserController = require('../../../src/controllers/user/userController');

// Mock the UserService
jest.mock('../../../src/services/users/userService');

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

describe('UserController', () => {
  let userController;
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Setup controller - it will get the mocked UserService
    userController = new UserController({});

    // Setup mock request and response
    mockRequest = {
      body: {},
      params: {},
      clientId: 'client-123'
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });

  describe('all', () => {
    it('should return all users for a client', async () => {
      const mockUsers = [
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' }
      ];
      
      userController.userService.findAll = jest.fn().mockResolvedValue(mockUsers);

      await userController.all(mockRequest, mockResponse);

      expect(userController.userService.findAll).toHaveBeenCalledWith('client-123');
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should handle empty user list', async () => {
      userController.userService.findAll = jest.fn().mockResolvedValue([]);

      await userController.all(mockRequest, mockResponse);

      expect(userController.userService.findAll).toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      const error = new Error('Database connection failed');
      userController.userService.findAll = jest.fn().mockRejectedValue(error);

      await expect(userController.all(mockRequest, mockResponse)).rejects.toThrow('Database connection failed');
    });
  });

  describe('store', () => {
    it('should create a new user with valid data', async () => {
      mockRequest.body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };
      mockRequest.clientId = 'client-123';

      userController.userService.createUser = jest.fn().mockResolvedValue(1);

      await userController.store(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });

    it('should reject creation with missing name', async () => {
      mockRequest.body = {
        email: 'john@example.com',
        password: 'password123'
      };

      await expect(userController.store(mockRequest, mockResponse)).rejects.toThrow('name missing');
    });

    it('should reject creation with missing email', async () => {
      mockRequest.body = {
        name: 'John Doe',
        password: 'password123'
      };

      await expect(userController.store(mockRequest, mockResponse)).rejects.toThrow('email missing');
    });

    it('should reject creation with invalid email format', async () => {
      mockRequest.body = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123'
      };

      await expect(userController.store(mockRequest, mockResponse)).rejects.toThrow('email bad format');
    });

    it('should reject creation with missing password', async () => {
      mockRequest.body = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      await expect(userController.store(mockRequest, mockResponse)).rejects.toThrow('password missing');
    });

    it('should reject creation with null payload', async () => {
      mockRequest.body = null;

      await expect(userController.store(mockRequest, mockResponse)).rejects.toThrow('invalid payload');
    });
  });

  describe('getById', () => {
    it('should return a user by id', async () => {
      mockRequest.params = { id: '1' };
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

      userController.userService.getUserById = jest.fn().mockResolvedValue(mockUser);

      await userController.getById(mockRequest, mockResponse);

      expect(userController.userService.getUserById).toHaveBeenCalledWith('1');
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should reject with missing id', async () => {
      mockRequest.params = { id: null };

      await expect(userController.getById(mockRequest, mockResponse)).rejects.toThrow('id missing');
    });

    it('should reject with invalid id format', async () => {
      mockRequest.params = { id: 'abc' };

      await expect(userController.getById(mockRequest, mockResponse)).rejects.toThrow('id bad format');
    });

    it('should handle user not found', async () => {
      mockRequest.params = { id: '999' };
      userController.userService.getUserById = jest.fn().mockResolvedValue(null);

      await userController.getById(mockRequest, mockResponse);

      expect(userController.userService.getUserById).toHaveBeenCalledWith('999');
    });

    it('should accept numeric id', async () => {
      mockRequest.params = { id: 123 };
      const mockUser = { id: 123, name: 'Jane', email: 'jane@example.com' };

      userController.userService.getUserById = jest.fn().mockResolvedValue(mockUser);

      await userController.getById(mockRequest, mockResponse);

      expect(userController.userService.getUserById).toHaveBeenCalledWith(123);
    });
  });

  describe('update', () => {
    it('should update a user with valid id', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { name: 'Updated Name' };

      userController.userService.update = jest.fn().mockResolvedValue(true);

      await userController.update(mockRequest, mockResponse);

      expect(userController.userService.update).toHaveBeenCalledWith('1', mockRequest.body);
    });

    it('should reject update with missing id', async () => {
      mockRequest.params = { id: null };
      mockRequest.body = { name: 'Updated Name' };

      await expect(userController.update(mockRequest, mockResponse)).rejects.toThrow('id missing');
    });

    it('should reject update with empty string id', async () => {
      mockRequest.params = { id: '' };
      mockRequest.body = { name: 'Updated Name' };

      await expect(userController.update(mockRequest, mockResponse)).rejects.toThrow('id missing');
    });

    it('should allow partial updates', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { email: 'newemail@example.com' };

      userController.userService.update = jest.fn().mockResolvedValue(true);

      await userController.update(mockRequest, mockResponse);

      expect(userController.userService.update).toHaveBeenCalledWith('1', mockRequest.body);
    });

    it('should handle update errors', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { name: 'Updated Name' };
      const error = new Error('Database error');
      userController.userService.update = jest.fn().mockRejectedValue(error);

      await expect(userController.update(mockRequest, mockResponse)).rejects.toThrow('Database error');
    });
  });

  describe('delete', () => {
    it('should delete a user with valid id', async () => {
      mockRequest.params = { id: '1' };

      userController.userService.deleteUser = jest.fn().mockResolvedValue(true);

      await userController.delete(mockRequest, mockResponse);

      expect(userController.userService.deleteUser).toHaveBeenCalledWith('1');
    });

    it('should reject delete with missing id', async () => {
      mockRequest.params = { id: null };

      await expect(userController.delete(mockRequest, mockResponse)).rejects.toThrow('id missing');
    });

    it('should reject delete with empty string id', async () => {
      mockRequest.params = { id: '' };

      await expect(userController.delete(mockRequest, mockResponse)).rejects.toThrow('id missing');
    });

    it('should handle delete when invalid id is provided', async () => {
      mockRequest.params = { id: 'invalid' };

      userController.userService.deleteUser = jest.fn().mockResolvedValue(true);

      await userController.delete(mockRequest, mockResponse);

      // validateToDelete only checks for presence, not format
      expect(userController.userService.deleteUser).toHaveBeenCalledWith('invalid');
    });

    it('should handle delete not found', async () => {
      mockRequest.params = { id: '999' };
      userController.userService.deleteUser = jest.fn().mockResolvedValue(false);

      await userController.delete(mockRequest, mockResponse);

      expect(userController.userService.deleteUser).toHaveBeenCalledWith('999');
    });

    it('should handle delete errors', async () => {
      mockRequest.params = { id: '1' };
      const error = new Error('Delete failed');
      userController.userService.deleteUser = jest.fn().mockRejectedValue(error);

      await expect(userController.delete(mockRequest, mockResponse)).rejects.toThrow('Delete failed');
    });
  });
});
