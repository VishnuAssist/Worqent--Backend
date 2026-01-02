import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movies API",
      version: "1.0.0",
      description: "Simple Movies CRUD API using Express & MongoDB",
    },
    servers: [
      {
        url: "http://localhost:8989",
      },
    ],
  },
  apis: ["./routes/*.js"], // 👈 where swagger comments live
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
