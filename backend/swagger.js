// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'Transaction',
      version: '1.0.0',
      description: 'I Build Personnal Expension Application',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Change this to your server URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs (using JSDoc)
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
