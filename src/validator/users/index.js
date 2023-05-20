const schema = require('./schema');

class UsersValidator {
  constructor() {
    this.schema = schema;
  }

  validatePostUserPayload(payload) {
    const { PostUserPayloadSchema } = this.schema;
    const validationResult = PostUserPayloadSchema.validate(payload);

    if (payload.password !== payload.confirmPassword) {
      validationResult.error = new Error("password doesn't match");
    }

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  }
}

module.exports = UsersValidator;
