const bcrypt = require('bcrypt');
const { UserRepository } = require('../../repositories/user/userRepository');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  async findAll(clientId) {
    return this.userRepository.findAllUser(clientId);
  }

  async getUserById(id) {
    const user = await this.userRepository.userById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(data,clientId) {
    
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error('Email already exists');
    }

    const userData = await this.prepareUserData(data, clientId);

    const userIdCreated = await this.userRepository.createUser(userData);
    return userIdCreated;
  }

  async update(id, data) {
    return this.userRepository.updateUser(id, data);
  }

  async deleteUser(id) {
    await this.userRepository.deleteUser(id);
  }
  async prepareUserData(data, clientId) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = {
      ...data,
      ID_user: data.cpf,
      client_id: clientId,
      password: hashedPassword,
      created_at: Date.now(),
      access_level: 3,
      updated_at: Date.now()
    };

    delete userData.cpf;
    

    return userData;
  }
}

module.exports = {
  UserService
};
