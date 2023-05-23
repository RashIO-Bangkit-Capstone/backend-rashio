const { PostUserPayloadSchema } = require('./schema');

class UsersValidator {
  validatePostUserPayload(payload) {
    const validationResult = PostUserPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  }
}

module.exports = UsersValidator;
