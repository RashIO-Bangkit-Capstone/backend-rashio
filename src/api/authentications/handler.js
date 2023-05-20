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
    try {
      const { payload } = request;

      this.Validator.validatePostAuthenticationPayload(payload);

      const user = await this.UsersService.verifyUserCredential(payload);

      const accessToken = this.TokenManager.generateAccessToken({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      const refreshToken = this.TokenManager.generateRefreshToken({
        id: user.id,
        name: user.name,
        email: user.email,
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
    } catch (error) {
      const response = h.response({
        status: 'fail',
        code: 400,
        message: error.message,
      });

      response.code(400);
      return response;
    }
  }
}

module.exports = AuthenticationsHandler;
