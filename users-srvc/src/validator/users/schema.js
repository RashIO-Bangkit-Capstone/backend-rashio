const Joi = require('joi');

const PostUserPayloadSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .regex(/^0\d{8,15}$/)
    .max(15)
    .required()
    .messages({ 
      'any.required': '\"Phone Number\" is required',
      'string.max':
        '\"Phone Number\" length must be less than or equal to 15 characters long',
      'string.pattern.base': '\"Phone Number\" must be a valid phone number',
    }),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().min(8).required().label('Confirm Password'),
});

const PutUserPayloadSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
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
});

const PutUserPasswordPayloadSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).required(),
  confirmPassword: Joi.string().min(8).required(),
});

module.exports = {
  PostUserPayloadSchema,
  PutUserPayloadSchema,
  PutUserPasswordPayloadSchema,
};
