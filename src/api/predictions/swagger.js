const swagger = (schema) => ({
  postPredictionSwagger: {
    payloadType: 'multipart/form-data',
    validate: {
      headers: schema.AuthorizationHeaderSchema,
      payload: schema.PostPredictionPayloadSchema,
    },
    responses: {
      201: {
        description: 'Success',
        schema: schema.ResponsePostPredictionSchema,
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
  getPredictionsSwagger: {
    validate: {
      headers: schema.AuthorizationHeaderSchema,
      params: schema.GetPredictionsParamsSchema,
    },
    responses: {
      200: {
        description: 'Success',
        schema: schema.ResponseGetPredictionsSchema,
      },
    },
  },
});

module.exports = swagger;
