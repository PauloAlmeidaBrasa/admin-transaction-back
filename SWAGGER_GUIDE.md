# Swagger Documentation Setup Guide

## Overview

Swagger documentation is now integrated into your API and accessible at:
- **UI**: `http://localhost:3000/v1/docs`
- **JSON**: `http://localhost:3000/v1/docs.json`

## Installation

Dependencies already installed:
- `swagger-ui-express` - Serves the Swagger UI
- `swagger-jsdoc` - Generates OpenAPI spec from JSDoc comments

## File Structure

```
src/
├── doc/
│   └── swagger.js          # Swagger configuration and spec
├── routes/
│   ├── index.js            # Main router with docRoutes integration
│   ├── docRouter.js        # Documentation router
│   ├── authenticationRouter.js
│   └── modulesRoutes/
│       ├── userRouter.js
│       ├── transactionRouter.js
│       └── clientRouter.js
```

## Adding Swagger Documentation to Routes

### Step 1: Add JSDoc Comments to Your Routes

Add Swagger documentation comments above your route definitions. Here's an example for the User routes:

```javascript
/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users for the authenticated client
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', all);

/**
 * @swagger
 * /v1/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the system
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 idAdded:
 *                   type: integer
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/', store);

/**
 * @swagger
 * /v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a specific user by their ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 1
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getById);

/**
 * @swagger
 * /v1/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update an existing user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', update);

/**
 * @swagger
 * /v1/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user from the system
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', delete);
```

### Step 2: Add Similar Documentation for Transaction Routes

```javascript
/**
 * @swagger
 * /v1/transactions:
 *   get:
 *     summary: Get all transactions
 *     description: Retrieve all transactions for the authenticated client
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 *       401:
 *         description: Unauthorized
 */
router.get('/', all);

/**
 * @swagger
 * /v1/transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ID_user
 *               - email
 *               - password
 *             properties:
 *               ID_user:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created
 */
router.post('/', store);

/**
 * @swagger
 * /v1/transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaction found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /v1/transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaction updated
 */
router.put('/:id', update);

/**
 * @swagger
 * /v1/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaction deleted
 */
router.delete('/:id', delete);

/**
 * @swagger
 * /v1/transactions/upload:
 *   post:
 *     summary: Upload transactions from Excel file
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Transactions imported successfully
 */
router.post('/upload', upload);
```

### Step 3: Add Documentation for Authentication Routes

```javascript
/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and receive a JWT token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', login);
```

## Swagger Specification Format

### Basic Endpoint Documentation
```javascript
/**
 * @swagger
 * /v1/endpoint:
 *   get:
 *     summary: Brief description
 *     description: Detailed description
 *     tags:
 *       - TagName
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path/query
 *         name: paramName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success response
 */
```

### Request Body Documentation
```javascript
requestBody:
  required: true
  content:
    application/json:
      schema:
        type: object
        required:
          - field1
        properties:
          field1:
            type: string
          field2:
            type: integer
```

### Response Documentation
```javascript
responses:
  200:
    description: Success
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/User'
  400:
    description: Bad Request
  401:
    description: Unauthorized
  404:
    description: Not Found
```

## Accessing the Documentation

1. **Start your server**:
   ```bash
   npm run dev
   ```

2. **Open Swagger UI** in your browser:
   - http://localhost:3000/v1/docs

3. **Test endpoints** directly from Swagger UI:
   - Click on an endpoint to expand it
   - Click "Try it out"
   - Enter parameters and request body
   - Click "Execute"

4. **Use Bearer Token** for authentication:
   - Click the "Authorize" button
   - Paste your JWT token
   - Click "Authorize"

## Available Components

The swagger configuration includes pre-defined schemas for:

- **User**: Full user object with all properties
- **Transaction**: Transaction object
- **Client**: Client object
- **ErrorResponse**: Standard error format
- **SuccessResponse**: Standard success format

Reference these in your documentation using:
```javascript
$ref: '#/components/schemas/User'
```

## Best Practices

1. **Keep descriptions concise** - Be clear and specific
2. **Document all endpoints** - Don't leave any undocumented
3. **Include examples** - Help users understand what to send
4. **Document errors** - Show possible error responses
5. **Update regularly** - Keep docs in sync with code changes
6. **Use consistent tags** - Group related endpoints (Users, Transactions, etc.)

## Next Steps

1. Add JSDoc comments to all your route files
2. Test the documentation in Swagger UI
3. Share the `/v1/docs` URL with your team
4. Keep documentation updated as you add new features

## Troubleshooting

### Swagger UI shows empty?
- Ensure routes file paths in `swagger.js` `apis` array are correct
- Verify JSDoc comments follow the correct format
- Restart your development server

### Endpoints not showing?
- Check that API paths match exactly (case-sensitive)
- Verify version prefix matches (`/v1`)
- Ensure JSDoc is properly formatted with `@swagger`

### Schema not found?
- Confirm schema name is spelled correctly
- Check it's defined in `swagger.js` components.schemas
- Use correct reference format: `$ref: '#/components/schemas/SchemaName'`
