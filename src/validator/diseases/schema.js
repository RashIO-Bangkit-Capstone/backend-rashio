const Joi = require('joi');

module.exports = {
  PostDiseasesPayloadSchema: Joi.object({
    name: Joi.string().required().label('Name'),
    descriptions: Joi.array()
      .items(
        Joi.string().messages({
          'string.base': '"Descriptions" must be a string',
        })
      )
      .required()
      .messages({
        'any.required': '"Descriptions" is required',
        'array.base': '"Descriptions" must be an array',
      }),

    treatments: Joi.array()
      .items(
        Joi.string().messages({
          'string.base': '"Treatments" must be a string',
        })
      )
      .required()
      .messages({
        'any.required': '"Treatments" is required',
        'array.base': '"Treatments" must be an array',
      }),
  }).label('Post Diseases Payload Schema'),

  ResponsePostDiseasesSchema: Joi.object({
    status: Joi.string(),
    code: Joi.number(),
    message: Joi.string(),
    data: Joi.object({
      id: Joi.string(),
      name: Joi.string(),
    }).label('Response Post Diseases Schema Data'),
  }).label('Response Post DiseasesSchema'),

  ResponseGetDiseasesSchema: Joi.object({
    status: Joi.string(),
    code: Joi.number(),
    message: Joi.string(),
    data: Joi.array().items(
      Joi.object({
        id: Joi.string(),
        name: Joi.string(),
      }).label('Response Get Diseases Schema Data Item')
    ).label('Response Get Diseases Schema Data'),
  }).label('Response Get Diseases Schema'),

  DiseaseParamsSchema: Joi.object({
    name: Joi.string().required(),
  }).label('Get Disease Params Schema'),

  ResponseGetDiseaseSchema: Joi.object({
    status: Joi.string(),
    code: Joi.number(),
    message: Joi.string(),
    data: Joi.object({
      id: Joi.string(),
      name: Joi.string(),
      descriptions: Joi.array().items(Joi.string()),
      treatments: Joi.array().items(Joi.string()),
    }).label('Response Get Disease Schema Data'),
  }).label('Response Get Disease Schema'),

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
  }).label('Put Diseases Payload Schema'),

  ResponsePutDiseaseSchema: Joi.object({
    status: Joi.string(),
    code: Joi.number(),
    message: Joi.string(),
  }).label('Response Put Disease Schema'),

  ResponseDeleteDiseaseSchema: Joi.object({
    status: Joi.string(),
    code: Joi.number(),
    message: Joi.string(),
  }).label('Response Delete Disease Schema'),
};
