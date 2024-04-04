const { Response403, Response400 } = require('../../validator/errorSchema');

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
        schema: Response400,
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
        schema: Response403,
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
        schema: Response400,
      },
      403: {
        description: 'Forbidden',
        schema: Response403,
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
        schema: Response400,
      },
      403: {
        description: 'Forbidden',
        schema: Response403,
      },
    },
  },
});

module.exports = swagger;
