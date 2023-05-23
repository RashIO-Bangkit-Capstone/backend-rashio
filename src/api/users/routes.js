const routes = (handler, swagger) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      description: 'Add a new user',
      tags: ['api'],
      plugins: {
        'hapi-swagger': swagger.postUserSwagger,
      },
    },
  },
];

module.exports = routes;
