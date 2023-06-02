const swagger = (schema) => ({
  postDiseaseSwagger: {
    validate: {
      payload: schema.PostDiseasesPayloadSchema,
    },
    responses: {
      201: {
        description: 'Success',
        schema: schema.ResponsePostDiseasesSchema,
      },
    },
  },
  getDiseasesSwagger: {
    responses: {
      200: {
        description: 'Success',
        schema: schema.ResponseGetDiseasesSchema,
      },
    },
  },
  getDiseaseSwagger: {
    validate: {
      params: schema.DiseaseParamsSchema,
    },
    responses: {
      200: {
        description: 'Success',
        schema: schema.ResponseGetDiseaseSchema,
      },
    },
  },
  putDiseaseSwagger: {
    validate: {
      params: schema.DiseaseParamsSchema,
      payload: schema.PutDiseasePayloadSchema,
    },
    responses: {
      201: {
        description: 'Success',
        schema: schema.ResponsePutDiseaseSchema,
      },
    },
  },
  deleteDiseaseSwagger: {
    validate: {
      params: schema.DiseaseParamsSchema,
    },
    responses: {
      200: {
        description: 'Success',
        schema: schema.ResponseDeleteDiseaseSchema,
      },
    },
  },
});

module.exports = swagger;
