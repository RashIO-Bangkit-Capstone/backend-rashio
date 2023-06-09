const Joi = require('joi');

module.exports = {
  PostDiseasesPayloadSchema: Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Name is required',
      'string.base': 'Name must be a string',
    }),

    descriptions: Joi.array()
      .items(
        Joi.string().messages({
          'string.base': 'Descriptions must be a string',
        })
      )
      .required()
      .messages({
        'any.required': 'Descriptions is required',
        'array.base': 'Descriptions must be an array',
      }),

    treatments: Joi.array()
      .items(
        Joi.string().messages({
          'string.base': 'Treatments must be a string',
        })
      )
      .required()
      .messages({
        'any.required': 'Treatments is required',
        'array.base': 'Treatments must be an array',
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
          'string.base': 'Descriptions must be a string',
        })
      )
      .required()
      .messages({
        'any.required': 'Descriptions is required',
        'array.base': 'Descriptions must be an array',
      }),

    treatments: Joi.array()

      .items(
        Joi.string().messages({
          'string.base': 'Treatments must be a string',
        })
      )
      .required()
      .messages({
        'any.required': 'Treatments is required',
        'array.base': 'Treatments must be an array',
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
