const Joi = require('joi');

const PostAuthenticationPayloadSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'email is required',
    'string.email': 'email must be a valid email',
  }),
  password: Joi.string().required().messages({
    'any.required': 'password is required',
  }),
}).label('Post Authentication Payload');

const ResponsePostAuthenticationSchema = Joi.object({
  status: Joi.string(),
  code: Joi.number(),
  message: Joi.string(),
  data: Joi.object({
    accessToken: Joi.string(),
    refreshToken: Joi.string(),
  }),
}).label('Response Post Authentication');

module.exports = {
  PostAuthenticationPayloadSchema,
  ResponsePostAuthenticationSchema,
};
