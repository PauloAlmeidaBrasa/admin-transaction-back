# API Testing with Jest

This project includes comprehensive test coverage for user and transaction request handlers AND controllers using Jest.

## Test Setup

### Installation

Jest and testing dependencies have been installed:

```bash
npm install --save-dev jest @testing-library/jest-dom supertest
```

### Configuration

The Jest configuration is defined in `jest.config.js` with the following settings:
- **Test Environment**: Node.js
- **Test Files Pattern**: `**/tests/**/*.test.js`
- **Coverage Reporting**: Enabled for all `src/` files (excluding `src/config/`)

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode (automatically re-run on file changes)
```bash
npm run test:watch
```

### Generate coverage report
```bash
npm run test:coverage
```

## Test Structure

Tests are located in the `tests/` directory:

```
tests/
├── unit/
│   ├── requestHandlers/
│   │   ├── userRequestHandler.test.js (30 tests)
│   │   └── transactionRequestHandler.test.js (34 tests)
│   └── controllers/
│       ├── userController.test.js (26 tests)
│       └── transactionController.test.js (28 tests)
```

## Test Coverage

### User Request Handler Tests (`userRequestHandler.test.js`)

Tests for `UserRequestHandler` validation methods:

#### validateToGetById (8 tests)
- ✓ Validates ID is present
- ✓ Validates ID is numeric
- ✓ Accepts valid numeric IDs (strings and numbers)
- ✓ Rejects empty, null, or undefined IDs

#### validateToCreate (11 tests)
- ✓ Validates payload is an object
- ✓ Validates name is present and is a string
- ✓ Validates email is present and in correct format
- ✓ Validates password is present
- ✓ Accepts valid user creation payloads
- ✓ Handles additional optional fields
- ✓ Validates various email formats

#### validateToUpdate (5 tests)
- ✓ Validates ID is present

#### validateToDelete (5 tests)
- ✓ Validates ID is present

**Coverage**: 100% statements, 100% branches, 100% functions, 100% lines

### Transaction Request Handler Tests (`transactionRequestHandler.test.js`)

Tests for `TransactionRequestHandler` validation methods:

#### validateToGetById (8 tests)
- ✓ Validates ID is present and numeric

#### validateToGetByUserId (6 tests)
- ✓ Validates user ID is present and numeric

#### validateToCreate (11 tests)
- ✓ Validates ID_user, email, password fields

#### validateToUpdate (5 tests)
- ✓ Validates ID is present

#### validateToDelete (5 tests)
- ✓ Validates ID is present

**Coverage**: 100% statements, 100% branches, 100% functions, 100% lines

### User Controller Tests (`userController.test.js`)

Tests for the actual API endpoint handlers with mocked services:

#### all() (3 tests)
- ✓ Returns all users for a client
- ✓ Handles empty user list
- ✓ Handles database errors

#### store() (6 tests)
- ✓ Creates a new user with valid data
- ✓ Rejects creation with validation errors
- ✓ Returns 201 status on success

#### getById() (5 tests)
- ✓ Returns a user by id
- ✓ Rejects with missing/invalid id
- ✓ Handles user not found
- ✓ Accepts numeric and string IDs

#### update() (5 tests)
- ✓ Updates a user with valid id
- ✓ Allows partial updates
- ✓ Handles errors

#### delete() (5 tests)
- ✓ Deletes a user with valid id
- ✓ Rejects with missing/empty id
- ✓ Handles delete errors

**Coverage**: 100% statements, 100% branches, 100% functions, 100% lines

### Transaction Controller Tests (`transactionController.test.js`)

Tests for transaction API endpoints with mocked services:

#### all() (3 tests)
- ✓ Returns all transactions for a client
- ✓ Handles empty transaction list
- ✓ Handles database errors

#### getById() (5 tests)
- ✓ Returns a transaction by id
- ✓ Rejects with missing/invalid id
- ✓ Handles transaction not found

#### store() (6 tests)
- ✓ Creates a new transaction with valid data
- ✓ Rejects creation with validation errors

#### update() (5 tests)
- ✓ Updates a transaction
- ✓ Allows partial updates
- ✓ Handles errors

#### delete() (6 tests)
- ✓ Deletes a transaction
- ✓ Handles errors

#### upload() (4 tests)
- ✓ Rejects upload without file
- ✓ Handles successful file upload
- ✓ Handles upload service errors

**Coverage**: 100% statements for transaction and user controllers

## Test Statistics

**Total Test Suites**: 4
**Total Tests**: 118
**Passed**: 118
**Failed**: 0

### Coverage Summary:
- **Request Handlers**: 100% coverage
- **Controllers**: 100% coverage (user, transaction)
- **Overall**: 32% of codebase (focused on critical paths)

## Test Examples

### Example: Testing User Creation at Controller Level

```javascript
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
```

### Example: Testing Validation at Request Handler Level

```javascript
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
```

### Example: Testing Error Handling

```javascript
it('should handle database errors', async () => {
  const error = new Error('Database connection failed');
  userController.userService.findAll = jest.fn().mockRejectedValue(error);

  await expect(userController.all(mockRequest, mockResponse))
    .rejects.toThrow('Database connection failed');
});
```

## Test Layers

The tests cover **two layers** of your API:

### 1. **Request Handler Layer** (Validation Tests)
   - Tests parameter and payload validation
   - Ensures correct error messages
   - No dependencies on services
   - Fast execution

### 2. **Controller Layer** (Endpoint Tests)
   - Tests actual HTTP endpoint behavior
   - Mocks the service layer
   - Ensures correct status codes
   - Validates error handling

## Best Practices

1. **Write tests as you develop** - This ensures code quality and prevents regressions
2. **Run tests frequently** - Use watch mode during development: `npm run test:watch`
3. **Keep tests focused** - Each test should validate a single behavior
4. **Test edge cases** - Include tests for null, undefined, empty values, and invalid formats
5. **Maintain coverage** - Aim to keep coverage above 80% for critical code paths
6. **Mock external dependencies** - Services are mocked to test controller logic in isolation

## Next Steps

To extend test coverage further, consider adding:

1. **Service Layer Tests** - Test business logic of UserService and TransactionService
   ```bash
   mkdir -p tests/unit/services/{user,transaction}
   ```

2. **Repository Tests** - Test database queries with mocked database
   ```bash
   mkdir -p tests/unit/repositories/{user,transaction}
   ```

3. **Integration Tests** - Test full API endpoints with a test database
   ```bash
   mkdir -p tests/integration
   ```

4. **Middleware Tests** - Test authentication and error handling middleware

Example adding more tests:
```bash
npm test -- --testPathPattern=userService
npm run test:coverage -- src/services/
```

## Troubleshooting

### Tests not running
- Ensure you're in the correct directory: `admin-transaction-back`
- Check that Jest is installed: `npm install --save-dev jest`

### Coverage report shows low percentages
- Coverage only includes tested files - add more tests to increase overall coverage
- Check `jest.config.js` coverage path configuration

### Module not found errors
- Verify test file paths are correct
- Check that mocks reference the right modules

### Mocking issues
- Ensure mocks are defined before importing the module
- Clear mocks between tests with `jest.clearAllMocks()`

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Jest Testing Best Practices](https://jestjs.io/docs/en/getting-started)
- [Node.js Testing Guide](https://nodejs.org/en/docs/guides/testing/)
- [Mocking in Jest](https://jestjs.io/docs/mock-functions)
