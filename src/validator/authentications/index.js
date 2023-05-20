const schema = require('./schema');

class AuthenticationsValidator {
  constructor() {
    this.schema = schema;
  }

  validatePostAuthenticationPayload(payload) {
    const { PostAuthenticationPayloadSchema } = this.schema;

    const validationResult = PostAuthenticationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  }
}

module.exports = AuthenticationsValidator;
