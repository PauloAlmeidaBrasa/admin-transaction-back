// const { AuthenticationService } = require('@services/authenticationService');
// const { UserRepository } = require('@repositories/user/UserRepository');
const { json } = require('express');
const { AuthRequestHandler } = require('./authRequestHandler');

class AuthenticationController {
  constructor(db) {
    
    // const userRepository = new UserRepository(db);
    // this.authService = new AuthenticationService(userRepository);
  }

  auth = async (req, res) => {
    return res.json('23')
    const requestValidate = AuthRequestHandler.validateAuth(
      req.body.email,
      req.body.password
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
