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
  }).label('PostDiseasesPayloadSchema'),

  ResponsePostDiseasesSchema: Joi.object({
    status: Joi.string(),
    code: Joi.number(),
    message: Joi.string(),
    data: Joi.object({
      id: Joi.string(),
      name: Joi.string(),
    }),
  }).label('ResponsePostDiseasesSchema'),

  ResponseGetDiseasesSchema: Joi.object({
    status: Joi.string(),
    code: Joi.number(),
    message: Joi.string(),
    data: Joi.array().items(
      Joi.object({
        id: Joi.string(),
        name: Joi.string(),
      })
    ),
  }).label('ResponseGetDiseasesSchema'),

  DiseaseParamsSchema: Joi.object({
    name: Joi.string().required(),
  }).label('GetDiseaseParamsSchema'),

  ResponseGetDiseaseSchema: Joi.object({
    status: Joi.string(),
    code: Joi.number(),
    message: Joi.string(),
    data: Joi.object({
      id: Joi.string(),
      name: Joi.string(),
      descriptions: Joi.array().items(Joi.string()),
      treatments: Joi.array().items(Joi.string()),
    }),
  }).label('ResponseGetDiseaseSchema'),

  PutDiseasePayloadSchema: Joi.object({
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
  }).label('PutDiseasesPayloadSchema'),

  ResponsePutDiseaseSchema: Joi.object({
    status: Joi.string(),
    code: Joi.number(),
    message: Joi.string(),
  }).label('ResponsePutDiseaseSchema'),

  ResponseDeleteDiseaseSchema: Joi.object({
    status: Joi.string(),
    code: Joi.number(),
    message: Joi.string(),
  }).label('ResponseDeleteDiseaseSchema'),
};
