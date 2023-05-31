const autoBind = require('auto-bind');

class DiseasesHandler {
  constructor(service, validator) {
    this.Service = service;
    this.Validator = validator;

    autoBind(this);
  }

  async postDiseasesHandler(request, h) {
    const { payload } = request;

    this.Validator.validatePostDiseasesPayload(payload);

    await this.Service.checkDiseaseNameAvailable(payload.name);
    const disease = await this.Service.addDisease(payload);

    const response = h.response({
      status: 'success',
      code: 201,
      message: 'disease added successfully',
      data: {
        id: disease.id,
        name: disease.name,
      },
    });

    response.code(201);

    return response;
  }
}

module.exports = DiseasesHandler;
