const { TransactionService } = require('../../services/transaction/transactionService')
const { TransactionRepository } = require('../../repositories/transaction/transactionRepository');
const { UserRepository } = require('../../repositories/user/userRepository');
const ApiResponse = require('../../utils/http/response');
const { TransactionRequestHandler } = require('../../controllers/transaction/transactionRequestHandler')

class TransactionController {
  constructor(db) {
    const userRepo = new UserRepository(db)
    const clientRepository = new TransactionRepository(db);
    this.transactionService = new TransactionService(clientRepository,userRepo);
    this.requestValidator = TransactionRequestHandler;
  }

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
   *         description: List of transactions retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 transactions:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Transaction'
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  all = async (req, res) => {

    const clients = await this.transactionService.findAll(req.user.client_id);
    return ApiResponse.success(res, 'transactions', clients);

  }
  /**
   * @swagger
   * /v1/transactions/{id}:
   *   get:
   *     summary: Get transaction by ID
   *     description: Retrieve a specific transaction by its ID
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
   *         description: Transaction ID
   *         example: 1
   *     responses:
   *       200:
   *         description: Transaction found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 transaction:
   *                   $ref: '#/components/schemas/Transaction'
   *       400:
   *         description: Bad request - Invalid ID format
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Transaction not found
   *       500:
   *         description: Internal server error
   */
  getById = async (req,res) => {
    const requestValidate = this.requestValidator.validateToGetById(req.params.id);
    if(requestValidate.error) {
      throw new Error(`transaction error: ${requestValidate.message}`)
    }

    const id = req.params.id
    const user = await this.transactionService.getTransactionById(id);
    return  ApiResponse.success(res, 'transaction', user);
  }
  /**
   * @swagger
   * /v1/transactions/{id}:
   *   put:
   *     summary: Update a transaction
   *     description: Update transaction details
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
   *         description: Transaction ID
   *         example: 1
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               amount:
   *                 type: number
   *                 example: 150.75
   *               description:
   *                 type: string
   *                 example: Updated transaction description
   *     responses:
   *       200:
   *         description: Transaction updated successfully
   *       400:
   *         description: Bad request - Invalid ID format
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Transaction not found
   *       500:
   *         description: Internal server error
   */
  update = async (req,res) => {
    const requestValidate = this.requestValidator.validateToUpdate(req.params.id);
    if(requestValidate.error) {
      throw new Error(`transaction error: ${requestValidate.message}`)
    }
    await this.transactionService.update(req.params.id,req.body);
    return  ApiResponse.message(res, 'transaction updated');
  }  /**
   * @swagger
   * /v1/transactions:
   *   post:
   *     summary: Create a new transaction
   *     description: Create a new transaction with user credentials and amount
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
   *                 example: user123
   *               email:
   *                 type: string
   *                 format: email
   *                 example: user@example.com
   *               password:
   *                 type: string
   *                 example: password123
   *               amount:
   *                 type: number
   *                 example: 100.50
   *               description:
   *                 type: string
   *                 example: Transaction description
   *     responses:
   *       201:
   *         description: Transaction created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: User added
   *                 idAdded:
   *                   type: integer
   *                   example: 1
   *       400:
   *         description: Bad request - Validation failed
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */  store = async (req, res) => {
    const requestValidate = this.requestValidator.validateToCreate(req.body);
    if(requestValidate.error) {
      throw new Error(`User error: ${requestValidate.message}`)
    }

    const userAdded = await this.transactionService.createUser(req.body,req.clientId);
    return ApiResponse.message(res, "User added", 201, { idAdded: userAdded });
  }
  /**
   * @swagger
   * /v1/transactions/{id}:
   *   delete:
   *     summary: Delete a transaction
   *     description: Remove a transaction from the system
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
   *         description: Transaction ID
   *         example: 1
   *     responses:
   *       200:
   *         description: Transaction deleted successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Transaction not found
   *       500:
   *         description: Internal server error
   */
  delete = async (req,res) => {
    const requestValidate = this.requestValidator.validateToDelete(req.params.id);
    if(requestValidate.error) {
      throw new Error(`transaction error: ${requestValidate.message}`)
    }
    await this.transactionService.deleteTransaction(req.params.id);
    return  ApiResponse.message(res, 'transaction deleted');
  }
  /**
   * @swagger
   * /v1/transactions/upload:
   *   post:
   *     summary: Upload transactions from Excel file
   *     description: Upload an Excel file containing transaction data
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
   *             required:
   *               - file
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *                 description: Excel file (.xlsx, .xls)
   *     responses:
   *       201:
   *         description: Transactions imported successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Transactions imported successfully
   *       400:
   *         description: No file provided or bad request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Error processing file
   */
  upload = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Excel file is required' });
      }

      await this.transactionService.upload(req.file.buffer);

      return res.status(201).json({
        message: 'Transactions imported successfully'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  
}

module.exports = TransactionController;