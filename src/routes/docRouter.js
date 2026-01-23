const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('../doc/swagger');

const docRoutes = () => {
  const router = Router();
  
  router.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        persistAuthorization: true,
      }
    })
  );

  // Serve the raw swagger spec as JSON
  router.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  return router;
};

module.exports = docRoutes;
