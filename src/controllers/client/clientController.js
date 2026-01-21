const { ClientService } = require('../../services/client/clientservice')
const { ClientRepository } = require('../../repositories/client/clientRepository');
const ApiResponse = require('../../utils/http/response');

class ClientController {
  constructor(db) {

    const clientRepository = new ClientRepository(db);
    this.ClientService = new ClientService(clientRepository);
  }

  all = async (req, res) => {
    console.log("req.user.client_id", req.user.client_id)

    const clients = await this.ClientService.findAll(req.user.client_id);
    return ApiResponse.success(res, 'clients', clients);

  }
  
}

module.exports = ClientController;