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
    const users = await this.userService.findAll(req.user.client_id);
    return ApiResponse.success(res, 'users', users);

  }
  store = async (req, res) => {
    const requestValidate = this.requestValidator.validateToCreate(req.body);
    if(requestValidate.error) {
      throw new Error(`User error: ${requestValidate.message}`)
    }

    const userAdded = await this.userService.createUser(req.body,req.clientId);
    return ApiResponse.message(res, "User added", 201, { idAdded: userAdded });
  }
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
  update = async (req,res) => {
    const requestValidate = this.requestValidator.validateToUpdate(req.params.id);
    if(requestValidate.error) {
      throw new Error(`User error: ${requestValidate.message}`)
    }
    await this.userService.update(req.params.id,req.body);
    return  ApiResponse.message(res, 'user updated');
  }
  
}

module.exports = UserController;