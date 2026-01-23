const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Admin Transaction API',
      version: '1.0.0',
      description: 'API for managing users and transactions with multi-tenant support',
      contact: {
        name: 'Admin Transaction Team',
        url: 'https://github.com/PauloAlmeidaBrasa/admin-transaction-back',
        email: 'support@admintransaction.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8000}`,
        description: 'Development server'
      },
      {
        url: process.env.PROD_URL || 'https://api.admintransaction.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token for authentication'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            id: {
              type: 'integer',
              description: 'User ID'
            },
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john@example.com'
            },
            password: {
              type: 'string',
              description: 'User password (required for creation)',
              example: 'password123'
            },
            client_id: {
              type: 'string',
              description: 'Client ID for multi-tenancy'
            },
            access_level: {
              type: 'string',
              description: 'User access level'
            },
            ID_user: {
              type: 'string',
              description: 'Custom user identifier'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Transaction: {
          type: 'object',
          required: ['ID_user', 'email', 'password'],
          properties: {
            id: {
              type: 'integer',
              description: 'Transaction ID'
            },
            ID_user: {
              type: 'string',
              description: 'Associated user ID'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Transaction email'
            },
            password: {
              type: 'string',
              description: 'Transaction password'
            },
            amount: {
              type: 'number',
              format: 'float',
              description: 'Transaction amount'
            },
            description: {
              type: 'string',
              description: 'Transaction description'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Client: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            name: {
              type: 'string'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            },
            message: {
              type: 'string'
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string'
            },
            data: {
              type: 'object'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    './src/routes/authenticationRouter.js',
    './src/routes/modulesRoutes/*.js'
  ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec };
