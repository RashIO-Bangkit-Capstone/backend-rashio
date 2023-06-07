const swagger = (schema) => ({
  postArticleSwagger: {
    validate: {
      payload: schema.PostArticlePayloadSchema,
    },
    responses: {
      201: {
        description: 'Success',
        schema: schema.ResponsePostArticleSchema,
      },
    },
  },

  getArticlesSwagger: {
    responses: {
      200: {
        description: 'Success',
        schema: schema.ResponseGetArticlesSchema,
      },
    },
  },

  getArticleByIdSwagger: {
    validate: {
      params: schema.ArticleIdParamsSchema,
    },
    responses: {
      200: {
        description: 'Success',
        schema: schema.ResponseGetArticleByIdSchema,
      },
    },
  },

  putArticleImageSwagger: {
    payloadType: 'multipart/form-data',
    validate: {
      params: schema.ArticleIdParamsSchema,
      payload: schema.PutArticleImagePayloadSchema,
    },
    responses: {
      201: {
        description: 'Success',
        schema: schema.ResponsePutArticleImageSchema,
      },
    },
  },

  putArticleByIdSwagger: {
    validate: {
      params: schema.ArticleIdParamsSchema,
      payload: schema.PutArticlePayloadSchema,
    },
    responses: {
      200: {
        description: 'Success',
        schema: schema.ResponsePutArticleSchema,
      },
    },
  },

  deleteArticleByIdSwagger: {
    validate: {
      params: schema.ArticleIdParamsSchema,
    },
    responses: {
      200: {
        description: 'Success',
        schema: schema.ResponseDeleteArticleSchema,
      },
    },
  },
});

module.exports = swagger;
