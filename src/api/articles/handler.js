const autoBind = require('auto-bind');

class ArticlesHandler {
  constructor(articlesService, bucketService, validator) {
    this.articlesService = articlesService;
    this.bucketService = bucketService;
    this.validator = validator;

    autoBind(this);
  }

  async postArticleHandler(request, h) {
    const {payload} = request;

    this.validator.validatePostArticlePayload(payload);
    const article = await this.articlesService.addArticle(payload);

    return h.response({
      status: 'success',
      code: 201,
      message: 'Success add article',
      data: {
        articleId: article.id,
      }

    }).code(201);
  }

  async getArticlesHandler(request, h) {
    const articles = await this.articlesService.getArticles();

    return h.response({
      status: 'success',
      code: 200,
      message: 'Success get articles',
      data: articles,
    });
  }

  async getArticleByIdHandler(request, h) {
    const {id} = request.params;

    await this.articlesService.checkArticleId(id);
    const article = await this.articlesService.getArticleById(id);

    return h.response({
      status: 'success',
      code: 200,
      message: 'Success get article',
      data: article,
    });
  }

  async putArticleImageHandler(request, h) {
    const { payload } = request;
    const { id } = request.params;

    this.validator.validatePutArticleImagePayload(payload);
    await this.articlesService.checkArticleId(id);
    
    const { image } = request.payload;
    this.validator.validatePutArticleImageHeaders(image.hapi.headers);

    const imageUrl = await this.bucketService.uploadImageArticle(image);
    await this.articlesService.updateArticleImage(id, imageUrl);

    return h.response({
      status: 'success',
      code: 201,
      message: 'Success update article image',
      data: {
        imageUrl,
      },
    }).code(201);
  }

  async putArticleByIdHandler(request, h) {
    const { id } = request.params;
    const { payload } = request;

    this.validator.validatePutArticlePayload(payload);

    await this.articlesService.checkArticleId(id);
    await this.articlesService.updateArticleById(id, payload);

    return h.response({
      status: 'success',
      code: 200,
      message: 'Success update article',
    });
  }

  async deleteArticleByIdHandler(request, h) {
    const { id } = request.params;

    await this.articlesService.checkArticleId(id);
    await this.articlesService.deleteArticleById(id);

    return h.response({
      status: 'success',
      code: 200,
      message: 'Success delete article',
    });
  }
}

module.exports = ArticlesHandler;