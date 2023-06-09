const autoBind = require('auto-bind');

class DiseasesHandler {
  constructor(service, validator) {
    this.Service = service;
    this.Validator = validator;

    autoBind(this);
  }

  async postDiseaseHandler(request, h) {
    const { payload } = request;

    this.Validator.validatePostDiseasesPayload(payload);

    await this.Service.checkDiseaseNameAvailability(payload.name);
    const disease = await this.Service.addDisease(payload);

    const response = h.response({
      status: 'success',
      code: 201,
      message: 'Disease added successfully',
      data: {
        id: disease.id,
        name: disease.name,
      },
    });

    response.code(201);

    return response;
  }

  async getDiseasesHandler() {
    const diseases = await this.Service.getDiseases();

    return {
      status: 'success',
      code: 200,
      message: 'Diseases retrieved successfully',
      data: diseases,
    };
  }

  async getDiseaseByNameHandler(request, h) {
    const { name } = request.params;

    await this.Service.checkDiseaseAvailableByName(name);
    const disease = await this.Service.getDiseaseByName(name);

    return h.response({
      status: 'success',
      code: 200,
      message: 'Disease retrieved successfully',
      data: disease,
    });
  }

  async putDiseaseByNameHandler(request, h) {
    const { name } = request.params;
    const { payload } = request;

    this.Validator.validatePutDiseasesPayload(payload);

    await this.Service.checkDiseaseAvailableByName(name);
    await this.Service.updateDiseaseByName(name, payload);

    const response = h.response({
      status: 'success',
      code: 201,
      message: 'Disease updated successfully',
    });

    response.code(201);

    return response;
  }

  async deleteDiseaseByNameHandler(request, h) {
    const { name } = request.params;

    await this.Service.checkDiseaseAvailableByName(name);
    await this.Service.deleteDiseaseByName(name);

    return h.response({
      status: 'success',
      code: 200,
      message: 'Disease deleted successfully',
    });
  }
}

module.exports = DiseasesHandler;
