const Joi = require('joi');

const PostUserPayloadSchema = Joi.object({
  name: Joi.string().required().label('Name'),
  email: Joi.string().email().required().label('Email'),
  phoneNumber: Joi.string()
    .regex(/^0\d{8,15}$/)
    .max(15)
    .required()
    .label('Phone Number')
    .messages({
      'string.pattern.base': '"Phone Number" must be a valid phone number',
    }),
  password: Joi.string().min(8).required().label('Password'),
  confirmPassword: Joi.string().min(8).required().label('Confirm Password'),
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
  name: Joi.string().required().label('Name'),
  email: Joi.string().email().required().label('Email'),
  phoneNumber: Joi.string()
    .regex(/^0\d{8,15}$/)
    .max(15)
    .required()
    .label('Phone Number')
    .messages({
      'string.pattern.base': '"Phone Number"must be a valid phone number',
    }),
}).label('Put User Payload');

const PutUserPasswordPayloadSchema = Joi.object({
  oldPassword: Joi.string().required().label('Old Password'),
  newPassword: Joi.string().min(8).required().label('New Password'),
  confirmPassword: Joi.string().min(8).required().label('Confirm Password'),
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
