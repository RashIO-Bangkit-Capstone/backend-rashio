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
}).label('Post User Payload');

const ResponsePostUserSchema = Joi.object({
  status: Joi.string(),
  code: Joi.number(),
  message: Joi.string(),
  data: Joi.object({
    userId: Joi.string(),
  }).label('Response Post User Data'),
}).label('Response Post User');

const GetUserParamsSchema = Joi.object({
  id: Joi.string().required(),
}).label('Get User Params');

const AuthorizationHeaderSchema = Joi.object({
  authorization: Joi.string().required().default('Bearer '),
}).label('Authorization Header');

const ResponseGetUserSchema = Joi.object({
  status: Joi.string(),
  code: Joi.number(),
  message: Joi.string(),
  data: Joi.object({
    name: Joi.string(),
    email: Joi.string(),
  }).label('Response Get User Data'),
}).label('Response Get User');

const PutUserPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'name is required',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'email is required',
    'string.email': 'email must be a valid email',
  }),
}).label('Put User Payload');

const PutUserPasswordPayloadSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    'any.required': 'old password is required',
  }),
  newPassword: Joi.string().min(8).required().messages({
    'any.required': 'new password is required',
    'string.min': 'new password must be at least 8 characters',
  }),
  confirmPassword: Joi.string().min(8).required().messages({
    'any.required': 'confirm password is required',
    'string.min': 'confirm password must be at least 8 characters',
  }),
}).label('Put User Password Payload');

module.exports = {
  PostUserPayloadSchema,
  ResponsePostUserSchema,
  GetUserParamsSchema,
  AuthorizationHeaderSchema,
  ResponseGetUserSchema,
  PutUserPayloadSchema,
  PutUserPasswordPayloadSchema,
};
