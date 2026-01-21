const { UserService } = require('../../services/users/userService');
const { UserRepository } = require('../../repositories/user/userRepository');
const { UserRequestHandler } = require('./userRequestHandler');

class UserController {
  constructor(db) {

    const userRepository = new UserRepository(db);
    this.userService = new UserService(userRepository);
  }

  all = async (req, res) => {
    console.log("req.user.client_id", req.user.client_id)

    const users = await this.userService.findAll(req.user.client_id);
    res.json(users);

  }
  
}

module.exports = UserController;