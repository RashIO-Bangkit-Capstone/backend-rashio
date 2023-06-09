const autoBind = require('auto-bind');

class PredictionsHandler {
  constructor(bucketService, predictionLogsService, validator) {
    this.BucketService = bucketService;
    this.PredictionLogsService = predictionLogsService;
    this.Validator = validator;

    autoBind(this);
  }

  async postPredictionHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    
    this.Validator.validatePostPredictionPayload(request.payload);
    
    const { image } = request.payload;
    this.Validator.validatePostPredictionHeader(image.hapi.headers);

    const imageLocation = await this.BucketService.uploadImagePrediction(image);

    // TODO: call python script here

    // TODO: get result and percentage from python script

    await this.PredictionLogsService.addPredictionLog({
      userId,
      result: 'panu',
      percentage: 0.7,
      imageUrl: imageLocation,
    });

    const response = h.response({
      status: 'success',
      code: 201,
      message: 'Detection success',
      data: {
        result: 'panu',
        percentage: 0.7,
      },
    });

    response.code(201);

    return response;
  }

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
