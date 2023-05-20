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
  }).label('Response Post Authentication Data'),
}).label('Response Post Authentication');

const PutAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'any.required': 'refreshToken is required',
  }),
}).label('Put & Delete Authentication Payload');

const ResponsePutAuthenticationSchema = Joi.object({
  status: Joi.string(),
  code: Joi.number(),
  message: Joi.string(),
  data: Joi.object({
    accessToken: Joi.string(),
  }).label('Response Put Authentication Data'),
}).label('Response Put Authentication');

const ResponseDeleteAuthenticationSchema = Joi.object({
  status: Joi.string(),
  code: Joi.number(),
  message: Joi.string(),
});

module.exports = {
  PostAuthenticationPayloadSchema,
  ResponsePostAuthenticationSchema,
  PutAuthenticationPayloadSchema,
  ResponsePutAuthenticationSchema,
  DeleteAuthenticationPayloadSchema: PutAuthenticationPayloadSchema,
  ResponseDeleteAuthenticationSchema,
};
