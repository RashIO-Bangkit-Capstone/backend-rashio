const { nanoid } = require('nanoid');
const { Predictionlog } = require('../../../db/models');
const InvariantError = require('../../exceptions/InvariantError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PredictionLogsService {
  constructor() {
    this.Predictionlog = Predictionlog;
  }

  async addPredictionLog({ userId, result, percentage, imageUrl }) {
    const id = `prediction-log-${nanoid()}`;

    const predictionLog = await this.Predictionlog.create({
      id,
      userId,
      result,
      percentage,
      imageUrl,
    });

    if (!predictionLog) {
      throw new InvariantError('Failed to add prediction log');
    }

    return id;
  }

  verifyOwner(userId, credentialId) {
    if (userId !== credentialId) {
      throw new AuthorizationError(
        'You are not authorized to access this resource'
      );
    }
  }

  async getPredictionLogsByUserId(userId) {
    const predictionLogs = await this.Predictionlog.findAll({
      where: {
        userId,
      },
      order: [['createdAt', 'DESC']],
      attributes: {
        exclude: ['id', 'userId', 'updatedAt'],
      },
    });

    return predictionLogs;
  }
}

module.exports = PredictionLogsService;
