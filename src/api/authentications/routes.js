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
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
    options: {
      description: 'Refresh Token',
      notes: 'Refresh token to get new access token',
      tags: ['api'],
      plugins: {
        'hapi-swagger': swagger.putAuthenticationSwagger,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
    options: {
      description: 'Logout',
      notes: 'Logout to delete refresh token',
      tags: ['api'],
      plugins: {
        'hapi-swagger': swagger.deleteAuthenticationSwagger,
      },
    },
  },
];

module.exports = routes;
