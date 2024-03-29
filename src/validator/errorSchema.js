const Joi = require('joi');

const Response404 = Joi.object({
  status: Joi.string().required(),
  code: Joi.number().required(),
  message: Joi.string().required(),
}).label('Response 404');

const Response403 = Joi.object({
  status: Joi.string().required(),
  code: Joi.number().required(),
  message: Joi.string().required(),
}).label('Response 403');

const Response400 = Joi.object({
  status: Joi.string().required(),
  code: Joi.number().required(),
  message: Joi.string().required(),
}).label('Response 400');

module.exports = {
  Response404,
  Response403,
  Response400,
};
