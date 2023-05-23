const InvariantError = require('../../exceptions/InvariantError');

const schema = require('./schema');

class UsersValidator {
  constructor() {
    this.schema = schema;
  }

  validatePostUserPayload(payload) {
    const { PostUserPayloadSchema } = this.schema;
    const validationResult = PostUserPayloadSchema.validate(payload);

    if (payload.password !== payload.confirmPassword) {
      validationResult.error = new InvariantError("password doesn't match");
    }

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }

  validatePutUserPayload(payload) {
    const { PutUserPayloadSchema } = this.schema;

    const validationResult = PutUserPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }

  validatePutUserPasswordPayload(payload) {
    const { PutUserPasswordPayloadSchema } = this.schema;

    const validationResult = PutUserPasswordPayloadSchema.validate(payload);

    if (payload.newPassword !== payload.confirmPassword) {
      validationResult.error = new InvariantError("password doesn't match");
    }

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}

module.exports = UsersValidator;
