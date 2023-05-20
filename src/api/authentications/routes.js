const routes = (handler, swagger) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
    options: {
      description: 'Login',
      notes: 'Login to get token',
      tags: ['api'],
      plugins: {
        'hapi-swagger': swagger.postAuthenticationSwagger,
      },
    },
  },
];

module.exports = routes;
