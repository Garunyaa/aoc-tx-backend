// swaggerConfig.js
const swaggerJSDoc = require('swagger-jsdoc');
const adminRoute = require('./../modules/v1/admin/routes/index')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'https://walletscriptbackend.alphaomegacoin.com', // Replace with your actual server URL
      },
    ],
  },
  apis: ['./../modules/v1/admin/routes/index.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;