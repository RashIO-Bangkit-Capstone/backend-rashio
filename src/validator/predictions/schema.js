const Joi = require('joi');

const PostPredictionImageHeaderSchema = Joi.object({
  'content-type': Joi.string()
    .valid(
      'image/apng',
      'image/avif',
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/webp'
    )
    .required(),
  'content-disposition': Joi.string(),
});

const AuthorizationHeaderSchema = Joi.object({
  authorization: Joi.string().required().default('Bearer '),
}).label('Authorization Header');

const PostPredictionPayloadSchema = Joi.object({
  image: Joi.any().meta({ swaggerType: 'file' }).required(),
}).label('Post Prediction Payload');

const ResponsePostPredictionSchema = Joi.object({
  status: Joi.string(),
  code: Joi.number(),
  message: Joi.string(),
  data: Joi.object({
    result: Joi.string(),
    percentage: Joi.number(),
  }).label('Response Post Prediction Data'),
}).label('Response Post Prediction');

module.exports = {
  PostPredictionImageHeaderSchema,
  AuthorizationHeaderSchema,
  PostPredictionPayloadSchema,
  ResponsePostPredictionSchema,
};
