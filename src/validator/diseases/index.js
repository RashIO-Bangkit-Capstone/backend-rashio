const InvariantError = require('../../exceptions/InvariantError');
const schema = require('./schema');

class DiseasesValidator {
  constructor() {
    this.schema = schema;
  }

  validatePostDiseasesPayload(payload) {
    const { PostDiseasesPayloadSchema } = this.schema;

    const validationResult = PostDiseasesPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}

module.exports = DiseasesValidator;
