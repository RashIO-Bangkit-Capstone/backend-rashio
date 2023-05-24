const { nanoid } = require('nanoid');
const { Predictionlog } = require('../../../db/models');
const InvariantError = require('../../exceptions/InvariantError');

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
}

module.exports = PredictionLogsService;
