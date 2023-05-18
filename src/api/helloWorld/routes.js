const routes = (handler, swagger) => [
  {
    method: 'GET',
    path: '/',
    handler: handler.getHelloWorldHandler,
    options: {
      description: 'Hello World',
      tags: ['api'],
      plugins: {
        'hapi-swagger': swagger.getHelloWorldSwagger,
      },
    },
  },
];

module.exports = routes;
