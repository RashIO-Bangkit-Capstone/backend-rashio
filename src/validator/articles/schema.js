const Joi = require('joi');
const { ARTICLE_CATEGORIES } = require('../../utils/contans');

module.exports = {
  PostArticlePayloadSchema: Joi.object({
    title: Joi.string().required(),
    referenceUrl: Joi.string().required(),
    bodies: Joi.array().items(Joi.string()).required(),
    author: Joi.string().required(),
    category: Joi.string().valid(...ARTICLE_CATEGORIES).required(),
  }).label('Post Article Payload'),

  PutArticleImageHeaderSchema: Joi.object({
    'content-type': Joi.string()
      .valid(
        'image/apng',
        'image/avif',
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/webp'
      )
      .required()
      .messages({
        'any.only': '"Image" must valid image type',
      }),
  }).unknown(true).label('Put Article Image Header'),

  PutArticleImagePayloadSchema: Joi.object({
    image: Joi.any().meta({ swaggerType: 'file' }).required().label('Image'),
  }).label('Put Article Image Payload'),

  PutArticlePayloadSchema: Joi.object({
    title: Joi.string().required(),
    referenceUrl: Joi.string().required(),
    bodies: Joi.array().items(Joi.string()).required(),
    author: Joi.string().required(),
    category: Joi.string().valid(...ARTICLE_CATEGORIES).required(),
  }).label('Put Article Payload'),

  ResponsePostArticleSchema: Joi.object({
    status: Joi.string().required(),
    code: Joi.number().required(),
    message: Joi.string().required(),
    data: Joi.object({
      articleId: Joi.string().required(),
    }).label('Response Post Article Schema Data'),
  }).label('Response Post Article Schema'),

  ResponseGetArticlesSchema: Joi.object({
    status: Joi.string().required(),
    code: Joi.number().required(),
    message: Joi.string().required(),
    data: Joi.array()
      .items(
        Joi.object({
          id: Joi.number().required(),
          title: Joi.string().required(),
          referenceUrl: Joi.string().required(),
          imageUrl: Joi.string().required(),
          author: Joi.string().required(),
          category: Joi.string().required(),
        }).label('Response Get Articles Schema Data Item')
      )
      .label('Response Get Articles Schema Data'),
  }).label('Response Get Articles Schema'),

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
      category: Joi.string().required(),
      bodies: Joi.array().items(Joi.string()).required(),
    }).label('Response Get Article By Id Schema Data'),
  }).label('Response Get Article By Id Schema'),

  ResponsePutArticleImageSchema: Joi.object({
    status: Joi.string().required(),
    code: Joi.number().required(),
    message: Joi.string().required(),
    data: Joi.object({
      imageUrl: Joi.string().required(),
    }).label('Response Put Article Image Schema Data'),
  }).label('Response Put Article Image Schema'),

  ResponsePutArticleSchema: Joi.object({
    status: Joi.string().required(),
    code: Joi.number().required(),
    message: Joi.string().required(),
  }),

  ResponseDeleteArticleSchema: Joi.object({
    status: Joi.string().required(),
    code: Joi.number().required(),
    message: Joi.string().required(),
  }).label('Response Delete Article Schema'),
};
