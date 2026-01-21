
class ClientRepository {
  constructor(db) {
    this.Client = db.client;
  }

  async findAllClient(clientId) {
      return this.Client.findAll({
      attributes: [
          'id',
          'email',
          'name',
          'address'
      ],
      where: { id: clientId }
      });
  }

}

module.exports = {
  ClientRepository
};
