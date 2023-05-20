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

  async verifyRefreshToken(refreshToken) {
    const result = await this.Authentication.findOne({
      where: { refreshToken },
    });

    if (!result) {
      throw new InvariantError('Refresh token not found');
    }
  }

  async deleteRefreshToken(refreshToken) {
    const result = await this.Authentication.destroy({
      where: { refreshToken },
    });

    if (!result) {
      throw new InvariantError('Failed to delete refresh token');
    }
  }
}

module.exports = AuthenticationsService;
