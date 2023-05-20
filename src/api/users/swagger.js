const swagger = (schema) => ({
  postUserSwagger: {
    validate: {
      payload: schema.PostUserPayloadSchema,
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
});

module.exports = swagger;
