const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "What's in you fridge? API",
      description: "What's in you fridge? Web App RESTful API Documentation",
  
    },
    servers: [
      {
        url: "http://localhost:5000/",
        description: "Local Development",
      },
      {
        url: "http://whats-in-your-fridge.ap-northeast-2.elasticbeanstalk.com/",
        description: "Real Server",
      },
    ],
  },
  apis: ["./routes/api/*.js", "./swagger/*"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};