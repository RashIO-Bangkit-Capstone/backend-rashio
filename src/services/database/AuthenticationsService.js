const { Authentication } = require('../../../db/models');
const InvariantError = require('../../exceptions/InvariantError');

class AuthenticationsService {
  constructor() {
    this.Authentication = Authentication;
  }

  async addRefreshToken(refreshToken) {
    const result = await this.Authentication.create({ refreshToken });

    if (!result) {
      throw new InvariantError('Failed to add refresh token');
    }
  }
}

module.exports = AuthenticationsService;
