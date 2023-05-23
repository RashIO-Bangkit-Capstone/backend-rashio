const swagger = (schema) => ({
  postUserSwagger: {
    validate: {
      payload: schema.PostUserPayloadSchema,
    },
    responses: {
      201: {
        description: 'Success',
        schema: schema.ResponsePostUserSchema,
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

  getUserByIdSwagger: {
    validate: {
      headers: schema.AuthorizationHeaderSchema,
      params: schema.GetUserParamsSchema,
    },
    responses: {
      200: {
        description: 'Success',
        schema: schema.ResponseGetUserSchema,
      },
      403: {
        description: 'Forbidden',
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

  putUserByIdSwagger: {
    validate: {
      headers: schema.AuthorizationHeaderSchema,
      params: schema.GetUserParamsSchema,
      payload: schema.PutUserPayloadSchema,
    },
    responses: {
      201: {
        description: 'Success',
        schema: schema.ResponsePostUserSchema,
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
      403: {
        description: 'Forbidden',
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

  putUserPasswordByIdSwagger: {
    validate: {
      headers: schema.AuthorizationHeaderSchema,
      params: schema.GetUserParamsSchema,
      payload: schema.PutUserPasswordPayloadSchema,
    },
    responses: {
      201: {
        description: 'Success',
        schema: schema.ResponsePostUserSchema,
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
      403: {
        description: 'Forbidden',
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
