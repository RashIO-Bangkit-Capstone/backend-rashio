const InvariantError = require('../../exceptions/InvariantError');

const schema = require('./schema');

class PredictionsValidator {
  constructor() {
    this.schema = schema;
  }

  validatePostPredictionHeader(headers) {
    const { PostPredictionImageHeaderSchema } = this.schema;

    const validationResult = PostPredictionImageHeaderSchema.validate(headers);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}

module.exports = PredictionsValidator;
