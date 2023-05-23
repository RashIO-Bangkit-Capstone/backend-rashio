const autoBind = require('auto-bind');

class UserHandler {
  constructor(service, validator) {
    this.Service = service;
    this.Validator = validator;

    autoBind(this);
  }

  async postUserHandler(request, h) {
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
  }

  async getUserByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    this.Service.verifyUserAccess(id, credentialId);
    const user = await this.Service.getUserById(id);

    const response = h.response({
      status: 'success',
      code: 200,
      data: {
        name: user.name,
        email: user.email,
      },
    });

    return response;
  }

  async putUserByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const { payload } = request;

    this.Validator.validatePutUserPayload(payload);
    this.Service.verifyUserAccess(id, credentialId);

    await this.Service.editUserById(id, payload);

    const response = h.response({
      status: 'success',
      code: 200,
      message: 'User updated',
      data: {
        userId: id,
      },
    });

    return response;
  }

  async putUserPasswordByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const { payload } = request;

    this.Validator.validatePutUserPasswordPayload(payload);
    this.Service.verifyUserAccess(id, credentialId);
    await this.Service.editUserPasswordById(id, payload.password);

    const response = h.response({
      status: 'success',
      code: 200,
      message: 'User updated',
      data: {
        userId: id,
      },
    });

    return response;
  }
}

module.exports = UserHandler;
