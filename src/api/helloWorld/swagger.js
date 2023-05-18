const swagger = {
  getHelloWorldSwagger: {
    responses: {
      200: {
        description: 'Success',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            code: { type: 'number' },
            message: { type: 'string' },
          },
        },
      },
    },
  },
};

module.exports = swagger;
