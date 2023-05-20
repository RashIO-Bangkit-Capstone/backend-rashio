const autoBind = require('auto-bind');

class UserHandler {
  constructor(service, validator) {
    this.Service = service;
    this.Validator = validator;

    autoBind(this);
  }

  async postUserHandler(request, h) {
    try {
      const { payload } = request;

      this.Validator.validatePostUserPayload(payload);
      await this.Service.checkEmailAvailable(payload.email);
      const id = await this.Service.addUser(payload);

      const response = h.response({
        status: 'success',
        code: 201,
        message: 'Registration success',
        data: {
          userId: id,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(400);
      return response;
    }
  }
}

module.exports = UserHandler;
