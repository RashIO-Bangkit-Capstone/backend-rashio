const Joi = require('joi');

const PostUserPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email',
  }),
  phoneNumber: Joi.string()
    .regex(/^0\d{8,15}$/)
    .max(15)
    .required()
    .messages({
      'any.required': 'Phone number is required',
      'string.max':
        'Phone number length must be less than or equal to 15 characters long',
      'string.pattern.base': 'Phone number must be a valid phone number',
    }),
  password: Joi.string().min(8).required().messages({
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 8 characters',
  }),
  confirmPassword: Joi.string().min(8).required().messages({
    'any.required': 'Confirm password is required',
    'string.min': 'Confirm password must be at least 8 characters',
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
    phoneNumber: Joi.string(),
  }).label('Response Get User Data'),
}).label('Response Get User');

const PutUserPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email',
  }),
  phoneNumber: Joi.string()
    .regex(/^0\d{8,15}$/)
    .max(15)
    .required()
    .messages({
      'any.required': 'Phone number is required',
      'string.max':
        'Phone number length must be less than or equal to 15 characters long',
      'string.pattern.base': 'Phone number must be a valid phone number',
    }),
}).label('Put User Payload');

const PutUserPasswordPayloadSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    'any.required': 'Old password is required',
  }),
  newPassword: Joi.string().min(8).required().messages({
    'any.required': 'New password is required',
    'string.min': 'New password must be at least 8 characters',
  }),
  confirmPassword: Joi.string().min(8).required().messages({
    'any.required': 'Confirm password is required',
    'string.min': 'Confirm password must be at least 8 characters',
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
