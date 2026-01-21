const bcrypt = require('bcrypt');
const { ClientRepository } = require('../../repositories/client/clientRepository');

class ClientService {
  constructor(clientRepository) {
    this.clientRepository = clientRepository || new ClientRepository();
  }

  async findAll(clientId) {
    return this.clientRepository.findAllClient(clientId);
  }

  async getClientBySubdomain(subdomain) {
    return await this.clientRepository.findBySubdomain(subdomain);
  }
}

module.exports = {
  ClientService
};
