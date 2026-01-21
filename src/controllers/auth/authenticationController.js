const { AuthenticationService } = require('../../services/authenticationService');
const { UserRepository } = require('../../repositories/user/userRepository');
const { AuthRequestHandler } = require('./authRequestHandler');

class AuthenticationController {
  constructor(db) {

    const userRepository = new UserRepository(db);
    this.authService = new AuthenticationService(userRepository);
  }

  auth = async (req, res) => {
    const requestValidate = AuthRequestHandler.validateAuth(
      req.body?.email,
      req.body?.password
    );

    if (requestValidate.error) {
      throw new Error(`User error: ${requestValidate.message}`);
    }

    const email = req.body.email;
    const pass = req.body.password;

    const user = await this.authService.authentication({
      email,
      password: pass
    });

    res.json(user);
  }
  
}

module.exports = AuthenticationController;
