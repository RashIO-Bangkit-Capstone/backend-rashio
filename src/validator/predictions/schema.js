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
    .required().messages({
      'any.only': 'Image must valid image type',
    }),
}).unknown(true);

const AuthorizationHeaderSchema = Joi.object({
  authorization: Joi.string().required().default('Bearer '),
}).label('Authorization Header');

const PostPredictionPayloadSchema = Joi.object({
  image: Joi.any().meta({ swaggerType: 'file' }).required().messages({
    'any.required': 'Image is required',
  }),
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

const GetPredictionsParamsSchema = Joi.object({
  userId: Joi.string().required(),
}).label('Get Predictions Params');

const ResponseGetPredictionsSchema = Joi.object({
  status: Joi.string(),
  code: Joi.number(),
  message: Joi.string(),
  data: Joi.object({
    predictionLogs: Joi.array().items(
      Joi.object({
        imageUrl: Joi.string(),
        result: Joi.string(),
        percentage: Joi.number(),
        createdAt: Joi.string(),
      }).label('Prediction Log')
    ),
  }).label('Response Get Predictions Data'),
}).label('Response Get Predictions');

module.exports = {
  PostPredictionImageHeaderSchema,
  AuthorizationHeaderSchema,
  PostPredictionPayloadSchema,
  ResponsePostPredictionSchema,
  GetPredictionsParamsSchema,
  ResponseGetPredictionsSchema,
};
