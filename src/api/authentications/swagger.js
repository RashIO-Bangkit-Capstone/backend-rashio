const swagger = (schema) => ({
  postAuthenticationSwagger: {
    validate: {
      payload: schema.PostAuthenticationPayloadSchema,
    },
    responses: {
      201: {
        description: 'Success',
        schema: schema.ResponsePostAuthenticationSchema,
      },
      404: {
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
