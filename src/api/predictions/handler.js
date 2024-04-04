const { Request, ResponseToolkit } = require('@hapi/hapi');
const autoBind = require('auto-bind');
const MachineLearning = require('../../services/ml/MachineLearning');
const LocalStorageService = require('../../services/storage/LocalStorageService');
const PredictionLogsService = require('../../services/database/PredictionLogsService');
const PredictionsValidator = require('../../validator/predictions');

class PredictionsHandler {
  /**
   * @param {LocalStorageService} bucketService
   * @param {PredictionLogsService} predictionLogsService
   * @param {MachineLearning} mlService
   * @param {PredictionsValidator} validator
   */
  constructor(bucketService, predictionLogsService, mlService, validator) {
    this.BucketService = bucketService;
    this.PredictionLogsService = predictionLogsService;
    this.Ml = mlService;
    this.Validator = validator;

    autoBind(this);
  }

  /**
   * @param {Request} request
   * @param {ResponseToolkit} h
   */
  async postPredictionHandler(request, h) {
    const { id: userId } = request.auth.credentials;

    this.Validator.validatePostPredictionPayload(request.payload);

    const { image } = request.payload;
    this.Validator.validatePostPredictionHeader(image.hapi.headers);

    // eslint-disable-next-line no-underscore-dangle
    const { result, percentage } = await this.Ml.predict(image._data);

    const imageLocation = await this.BucketService.uploadImagePrediction(image);

    await this.PredictionLogsService.addPredictionLog({
      userId,
      result,
      percentage,
      imageUrl: imageLocation,
    });

    const response = h.response({
      status: 'success',
      code: 201,
      message: 'Detection success',
      data: {
        result,
        percentage,
        imageUrl: imageLocation,
      },
    });

    response.code(201);

    return response;
  }

  /**
   * @param {Request} request
   * @param {ResponseToolkit} h
   */
  async getPredictionsHandler(request, h) {
    const { userId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    this.PredictionLogsService.verifyOwner(userId, credentialId);
    const predictionLogs =
      await this.PredictionLogsService.getPredictionLogsByUserId(userId);

    const response = h.response({
      status: 'success',
      message: 'Prediction logs successfully retrieved',
      code: 200,
      data: {
        predictionLogs,
      },
    });

    response.code(200);

    return response;
  }
}

module.exports = PredictionsHandler;
