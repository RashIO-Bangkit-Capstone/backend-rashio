const Joi = require('joi');

const PostUserPayloadSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')),
});

module.exports = { PostUserPayloadSchema };
