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

  all = async (req, res) => {
    console.log("req.user.client_id", req.user.client_id)

    const users = await this.userService.findAll(req.user.client_id);
    return ApiResponse.success(res, 'users', users);

  }
  store = async (req, res) => {

    const requestValidate = this.requestValidator.validateToCreate(req.body);
    if(requestValidate.error) {
      throw new Error(`User error: ${requestValidate.message}`)
    }

    const userAdded = await this.userService.createUser(req.body,req.clientId);
    return userAdded
  }
  
}

module.exports = UserController;