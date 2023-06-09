const routes = (handler, swagger) => [
  {
    method: 'POST',
    path: '/articles',
    handler: handler.postArticleHandler,
    options: {
      tags: ['api'],
      description: 'add article',
      plugins: {
        'hapi-swagger': swagger.postArticleSwagger,
      },
    },
  },
  {
    method: 'GET',
    path: '/articles',
    handler: handler.getArticlesHandler,
    options: {
      tags: ['api'],
      description: 'get all articles',
      plugins: {
        'hapi-swagger': swagger.getArticlesSwagger,
      },
    },
  },
  {
    method: 'GET',
    path: '/articles/{id}',
    handler: handler.getArticleByIdHandler,
    options: {
      tags: ['api'],
      description: 'get article by id',
      plugins: {
        'hapi-swagger': swagger.getArticleByIdSwagger,
      },
    },
  },
  {
    method: 'PUT',
    path: '/articles/{id}/image',
    handler: handler.putArticleImageHandler,
    options: {
      tags: ['api'],
      description: 'update article image',
      payload: {
        maxBytes: 5000000,
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
      plugins: {
        'hapi-swagger': swagger.putArticleImageSwagger,
      },
    },
  },
  {
    method: 'PUT',
    path: '/articles/{id}',
    handler: handler.putArticleByIdHandler,
    options: {
      tags: ['api'],
      description: 'update article',
      plugins: {
        'hapi-swagger': swagger.putArticleByIdSwagger,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/articles/{id}',
    handler: handler.deleteArticleByIdHandler,
    options: {
      tags: ['api'],
      description: 'delete article by id',
      plugins: {
        'hapi-swagger': swagger.deleteArticleByIdSwagger,
      },
    },
  },
];

module.exports = routes;
