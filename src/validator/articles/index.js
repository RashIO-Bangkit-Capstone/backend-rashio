const InvariantError = require('../../exceptions/InvariantError');
const schema = require('./schema');

class ArticlesValidator {
  constructor() {
    this.schema = schema;
  }

  validatePostArticlePayload(payload) {
    const { PostArticlePayloadSchema } = this.schema;

    const validationResult = PostArticlePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }

  validatePutArticleImageHeaders(headers) {
    const { PutArticleImageHeaderSchema } = this.schema;

    const validationResult = PutArticleImageHeaderSchema.validate(headers);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }

  validatePutArticleImagePayload(payload) {
    const { PutArticleImagePayloadSchema } = this.schema;

    const validationResult = PutArticleImagePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }

  validatePutArticlePayload(payload) {
    const { PutArticlePayloadSchema } = this.schema;

    const validationResult = PutArticlePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}

module.exports = ArticlesValidator;
