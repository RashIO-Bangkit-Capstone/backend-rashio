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

  putAuthenticationSwagger: {
    validate: {
      payload: schema.PutAuthenticationPayloadSchema,
    },
    responses: {
      200: {
        description: 'Success',
        schema: schema.ResponsePutAuthenticationSchema,
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

  deleteAuthenticationSwagger: {
    validate: {
      payload: schema.DeleteAuthenticationPayloadSchema,
    },
    responses: {
      200: {
        description: 'Success',
        schema: schema.ResponseDeleteAuthenticationSchema,
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
