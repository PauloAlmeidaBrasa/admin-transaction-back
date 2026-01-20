class AuthRequestHandler {
  static validateAuth(email, password) {
    if (!email) {
      return { error: true, message: 'email missing' };
    }

    if (!password) {
      return { error: true, message: 'password missing' };
    }

    return { error: false, message: '' };
  }
}

module.exports = {
  AuthRequestHandler
};
