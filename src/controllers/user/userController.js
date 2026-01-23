const { UserService } = require('../../services/users/userService');
const { UserRepository } = require('../../repositories/user/userRepository');
const ApiResponse = require('../../utils/http/response');
const { UserRequestHandler } = require('../user/userRequestHandler')

class UserController {
  constructor(db) {

    const userRepository = new UserRepository(db);
    this.userService = new UserService(userRepository);
    this.requestValidator = UserRequestHandler;
  }

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
   *         description: List of users retrieved successfully
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
   *         description: Unauthorized - Missing or invalid token
   *       500:
   *         description: Internal server error
   */
  all = async (req, res) => {
    const users = await this.userService.findAll(req.clientId);
    return ApiResponse.success(res, 'users', users);

  }
  /**
   * @swagger
   * /v1/users:
   *   post:
   *     summary: Create a new user
   *     description: Create a new user with name, email, and password
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
   *                 example: securepassword123
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
   */
  store = async (req, res) => {
    const requestValidate = this.requestValidator.validateToCreate(req.body);
    if(requestValidate.error) {
      throw new Error(`User error: ${requestValidate.message}`)
    }

    const userAdded = await this.userService.createUser(req.body,req.clientId);
    return ApiResponse.message(res, "User added", 201, { idAdded: userAdded });
  }
  /**
   * @swagger
   * /v1/users/{id}:
   *   get:
   *     summary: Get user by ID
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
   *         description: Bad request - Invalid ID format
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  getById = async (req,res) => {
    const requestValidate = this.requestValidator.validateToGetById(req.params.id);
    if(requestValidate.error) {
      throw new Error(`User error: ${requestValidate.message}`)
    }

    const id = req.params.id
    const user = await this.userService.getUserById(id);
    console.log(user)
    return  ApiResponse.success(res, 'user', user);
  }
  /**
   * @swagger
   * /v1/users/{id}:
   *   put:
   *     summary: Update a user
   *     description: Update user information (name, email, password)
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
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 example: Jane Doe
   *               email:
   *                 type: string
   *                 format: email
   *                 example: jane@example.com
   *               password:
   *                 type: string
   *                 example: newpassword123
   *     responses:
   *       200:
   *         description: User updated successfully
   *       400:
   *         description: Bad request - Invalid ID format
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  update = async (req,res) => {
    const requestValidate = this.requestValidator.validateToUpdate(req.params.id);
    if(requestValidate.error) {
      throw new Error(`User error: ${requestValidate.message}`)
    }
    await this.userService.update(req.params.id,req.body);
    return  ApiResponse.message(res, 'user updated');
  }
  /**
   * @swagger
   * /v1/users/{id}:
   *   delete:
   *     summary: Delete a user
   *     description: Remove a user from the system
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
  delete = async (req,res) => {
    const requestValidate = this.requestValidator.validateToDelete(req.params.id);
    if(requestValidate.error) {
      throw new Error(`User error: ${requestValidate.message}`)
    }
    await this.userService.deleteUser(req.params.id);
    return  ApiResponse.message(res, 'user deleted');
  }
  
}

module.exports = UserController;