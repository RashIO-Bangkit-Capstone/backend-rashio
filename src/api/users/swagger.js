const swagger = {
  postUserSwagger: {
    validate: {
      payload: {
        name: String,
        email: String,
        password: String,
        confirmPassword: String,
      },
      tags: ['api'],
    },
    responses: {
      201: {
        description: 'Success',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            code: { type: 'number' },
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                userId: { type: 'string' },
              },
            },
          },
        },
      },
      400: {
        description: 'Bad Request',
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
