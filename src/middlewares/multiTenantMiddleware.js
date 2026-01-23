const { ClientRepository } = require('../repositories/client/clientRepository');
const { ClientService } = require('../services/client/clientservice');

function multiTenantMiddlewareFactory(db) {
  return async function multiTenantMiddleware(req, res, next) {
    try {
      // console.log(req)
      const host = req.headers.host;
      if (!host) return res.status(400).json({ error: 'Host header missing' });
      if (host.startsWith('0.0.0.0') || host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
        //dev//
        req.clientId = 1;
        return next();  
      }
      console.log('22')


      const subdomain = host.split('.')[0];

      console.log("SUB IN MIDDLEWARE  ", req.headers.host)

      const clientRepository = new ClientRepository(db);
      const clientService = new ClientService(clientRepository);

      const client = await clientService.getClientBySubdomain(subdomain);

      if (!client) return res.status(404).json({ error: 'Invalid subdomain' });

      req.clientId = client.id;

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
}

module.exports = multiTenantMiddlewareFactory;
