const { Response404 } = require("../../validator/errorSchema");

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
        schema: Response404,
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
        schema: Response404,
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
        schema: Response404,
      },
    },
  },
});

module.exports = swagger;
