const Joi = require('joi');

module.exports = {
  PostDiseasesPayloadSchema: Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'name is required',
    }),

    descriptions: Joi.array()
      .items(
        Joi.string().messages({
          'string.base': 'descriptions must be a string',
        })
      )
      .required()
      .messages({
        'any.required': 'descriptions is required',
        'array.base': 'descriptions must be an array',
      }),

    treatments: Joi.array()
      .items(
        Joi.string().messages({
          'string.base': 'treatments must be a string',
        })
      )
      .required()
      .messages({
        'any.required': 'treatments is required',
        'array.base': 'treatments must be an array',
      }),
  }),
};
