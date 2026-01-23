const bcrypt = require('bcrypt');
const { signJwt } = require('../infra/jwt/jwt');

class AuthenticationService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async authentication(payload) {
    const user = await this.userRepository.findByEmail(payload.email);

    if (!user) {
      const error = new Error(`Record not found for email= ${payload.email}`);
      error.status = 404;
      throw error;
    }

    const passwordMatch = await bcrypt.compare(
      String(payload.password),
      String(user.password)
    );

    if (!passwordMatch) {
      const error = new Error('Invalid Credentials');
      error.status = 404;
      throw error;
    }

    const token = signJwt({
      id: user.id,
      name: user.name,
      client_id: user.client_id,
      email: user.email
    });

    return {
      access_token: token,
      expiresIn: '4d',
      user: {
        id: user.id,
        email: user.email,
        access_level: user.access_level
      }
    };
  }
}

module.exports = {
  AuthenticationService
};
