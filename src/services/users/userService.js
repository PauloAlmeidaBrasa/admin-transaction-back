const bcrypt = require('bcrypt');
const { UserRepository } = require('@repositories/user/UserRepository');

class UserService {
  constructor(userRepository) {
    // Repository is injected (recommended)
    this.userRepository = userRepository || new UserRepository();
  }

  async findAll(clientId) {
    return this.userRepository.findAllUser(clientId);
  }

  async getUserById(id) {
    const user = await this.userRepository.findByUserId(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(data) {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error('Email already exists');
    }

    // Temporary default (same behavior as before)
    data.client_id = 1;

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userData = {
      ...data,
      password: hashedPassword
    };

    const userIdCreated = await this.userRepository.createUser(userData);
    return userIdCreated;
  }

  async update(id, data) {
    return this.userRepository.updateUser(id, data);
  }

  async deleteUser(id) {
    await this.userRepository.deleteUser(id);
  }
}

module.exports = {
  UserService
};
