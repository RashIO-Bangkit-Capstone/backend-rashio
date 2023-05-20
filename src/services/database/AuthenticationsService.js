const { Authentication } = require('../../../db/models');

class AuthenticationsService {
  constructor() {
    this.Authentication = Authentication;
  }

  async addRefreshToken(refreshToken) {
    const result = await this.Authentication.create({ refreshToken });

    if (!result) {
      throw new Error('Error adding refresh token');
    }
  }
}

module.exports = AuthenticationsService;
