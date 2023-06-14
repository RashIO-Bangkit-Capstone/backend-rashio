const autoBind = require('auto-bind');

class AuthenticationsHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this.AuthenticationsService = authenticationsService;
    this.UsersService = usersService;
    this.TokenManager = tokenManager;
    this.Validator = validator;

    autoBind(this);
  }

  async postAuthenticationHandler(request, h) {
    const { payload } = request;

    this.Validator.validatePostAuthenticationPayload(payload);

    const user = await this.UsersService.verifyUserCredential(payload);

    const accessToken = this.TokenManager.generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });

    const refreshToken = this.TokenManager.generateRefreshToken({
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });

    await this.AuthenticationsService.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      code: 201,
      message: 'Authentication success',
      data: {
        accessToken,
        refreshToken,
      },
    });

    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request, h) {
    const { payload } = request;

    this.Validator.validatePutAuthenticationPayload(payload);

    await this.AuthenticationsService.verifyRefreshToken(payload.refreshToken);
    const tokenPayload = this.TokenManager.verifyRefreshToken(
      payload.refreshToken
    );

    const accessToken = this.TokenManager.generateAccessToken(tokenPayload);

    return h.response({
      status: 'success',
      code: 200,
      message: 'Access token has been refreshed',
      data: {
        accessToken,
      },
    });
  }

  async deleteAuthenticationHandler(request, h) {
    const { refreshToken } = request.payload;

    this.Validator.validateDeleteAuthenticationPayload(request.payload);

    await this.AuthenticationsService.verifyRefreshToken(refreshToken);
    await this.AuthenticationsService.deleteRefreshToken(refreshToken);

    return h.response({
      status: 'success',
      code: 200,
      message: 'Refresh token has been deleted',
    });
  }
}

module.exports = AuthenticationsHandler;
