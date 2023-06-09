const Joi = require('joi');

module.exports = {
  PostArticlePayloadSchema: Joi.object({
    title: Joi.string().required(),
    referenceUrl: Joi.string().required(),
    bodies: Joi.array().items(Joi.string()).required(),
    author: Joi.string().required(),
  }),

  PutArticleImageHeaderSchema : Joi.object({
    'content-type': Joi.string()
      .valid(
        'image/apng',
        'image/avif',
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/webp'
      )
      .required().messages({
        'any.only': 'Image must valid image type',
      }),
  }).unknown(true),

  PutArticleImagePayloadSchema : Joi.object({
    image: Joi.any().meta({ swaggerType: 'file' }).required().messages({
      'any.required': 'Image is required',
    }),
  }).label('Post Prediction Payload'),

  PutArticlePayloadSchema : Joi.object({
    title: Joi.string().required(),
    referenceUrl: Joi.string().required(),
    bodies: Joi.array().items(Joi.string()).required(),
    author: Joi.string().required(),
  }),

  ResponsePostArticleSchema: Joi.object({
    status: Joi.string().required(),
    code: Joi.number().required(),
    message: Joi.string().required(),
    data: Joi.object({
      articleId: Joi.string().required(),
    }),
  }),

  ResponseGetArticlesSchema: Joi.object({
    status: Joi.string().required(),
    code: Joi.number().required(),
    message: Joi.string().required(),
    data: Joi.array().items(Joi.object({
      id: Joi.number().required(),
      title: Joi.string().required(),
      referenceUrl: Joi.string().required(),
      imageUrl: Joi.string().required(),
      author: Joi.string().required(),
    })),
  }),

  ArticleIdParamsSchema: Joi.object({
    id: Joi.number().required(),
  }),

  ResponseGetArticleByIdSchema: Joi.object({
    status: Joi.string().required(),
    code: Joi.number().required(),
    message: Joi.string().required(),
    data: Joi.object({
      id: Joi.number().required(),
      title: Joi.string().required(),
      referenceUrl: Joi.string().required(),
      imageUrl: Joi.string().required(),
      author: Joi.string().required(),
      bodies: Joi.array().items(Joi.string()).required(),
    }),
  }),

  ResponsePutArticleImageSchema: Joi.object({
    status: Joi.string().required(),
    code: Joi.number().required(),
    message: Joi.string().required(),
    data: Joi.object({
      imageUrl: Joi.string().required(),
    }),
  }),

  ResponsePutArticleSchema: Joi.object({
    status: Joi.string().required(),
    code: Joi.number().required(),
    message: Joi.string().required(),
  }),

  ResponseDeleteArticleSchema: Joi.object({
    status: Joi.string().required(),
    code: Joi.number().required(),
    message: Joi.string().required(),
  }),
}