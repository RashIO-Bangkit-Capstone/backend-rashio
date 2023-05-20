const schema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

class AuthenticationsValidator {
  constructor() {
    this.schema = schema;
  }

  validatePostAuthenticationPayload(payload) {
    const { PostAuthenticationPayloadSchema } = this.schema;

    const validationResult = PostAuthenticationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }

  validatePutAuthenticationPayload(payload) {
    const { PutAuthenticationPayloadSchema } = this.schema;

    const validationResult = PutAuthenticationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }

  validateDeleteAuthenticationPayload(payload) {
    const { DeleteAuthenticationPayloadSchema } = this.schema;

    const validationResult =
      DeleteAuthenticationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}

module.exports = AuthenticationsValidator;
