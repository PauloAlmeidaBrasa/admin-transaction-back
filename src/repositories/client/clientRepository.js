
class ClientRepository {
  constructor(db) {
    this.Client = db.Client;
  }

  async findAllClient(clientId) {
    return this.Client.findAll({
    attributes: [
        'id',
        'email',
        'name',
        'address',
        'subdomain'
    ],
    where: { id: clientId }
    });
  }
  async findBySubdomain(subdomain) {
    return await this.Client.findOne({ where: { subdomain } });
  }

}

module.exports = {
  ClientRepository
};
