const Joi = require('joi');

const PostAuthenticationPayloadSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'email is required',
    'string.email': 'email must be a valid email',
  }),
  password: Joi.string().required().messages({
    'any.required': 'password is required',
  }),
});

module.exports = { PostAuthenticationPayloadSchema };
