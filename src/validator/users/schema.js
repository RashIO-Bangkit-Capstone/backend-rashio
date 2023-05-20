const Joi = require('joi');

const PostUserPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'name is required',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'email is required',
    'string.email': 'email must be a valid email',
  }),
  password: Joi.string().min(8).required().messages({
    'any.required': 'password is required',
    'string.min': 'password must be at least 8 characters',
  }),
  confirmPassword: Joi.string().min(8).required().messages({
    'any.required': 'confirm password is required',
    'string.min': 'confirm password must be at least 8 characters',
  }),
});

module.exports = { PostUserPayloadSchema };
