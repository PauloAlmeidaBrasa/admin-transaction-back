const { UserService } = require('../../services/users/userService');
const { UserRepository } = require('../../repositories/user/userRepository');
// const { UserRequestHandler } = require('./userRequestHandler');

class UserController {
  constructor(db) {

    const userRepository = new UserRepository(db);
    this.userService = new UserService(userRepository);
  }

  all = async (req, res) => {
    const requestValidate = AuthRequestHandler.validateAuth(
      req.body?.email,
      req.body?.password
    );

    if (requestValidate.error) {
      throw new Error(`User error: ${requestValidate.message}`);
    }

    const email = req.body.email;
    const pass = req.body.password;

    const user = await this.userService.authentication({
      email,
      password: pass
    });

    res.json(user);
  }
  
}

module.exports = UserController;