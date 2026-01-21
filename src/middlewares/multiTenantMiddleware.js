const { getClientBySubdomain } = require('../services/client/clientservice');

const multiTenantMiddleware = async (req, res, next) => {
  try {
    const host = req.headers.host;
    if (!host) return res.status(400).json({ error: 'Host header missing' });

    const subdomain = host.split('.')[0];

    const client = await getClientBySubdomain(subdomain);
    if (!client) return res.status(404).json({ error: 'Invalid subdomain' });

    req.clientId = client.id;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = multiTenantMiddleware;
