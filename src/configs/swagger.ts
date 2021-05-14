const swaggerConfig = {
  info: {
    version: '1.0.0',
    title: 'License seat allocation floating service',
    description: 'API documentation for sample license seat allocation service',
  },
  basePath: '/',
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

export default swaggerConfig;
