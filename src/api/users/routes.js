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
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
    options: {
      auth: 'rashio_jwt',
      description: 'Get user by id',
      tags: ['api'],
      plugins: {
        'hapi-swagger': swagger.getUserByIdSwagger,
      },
    },
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: handler.putUserByIdHandler,
    options: {
      auth: 'rashio_jwt',
      description: 'Update user by id',
      tags: ['api'],
      plugins: {
        'hapi-swagger': swagger.putUserByIdSwagger,
      },
    },
  },
  {
    method: 'PUT',
    path: '/users/{id}/password',
    handler: handler.putUserPasswordByIdHandler,
    options: {
      auth: 'rashio_jwt',
      description: 'Update user password by id',
      tags: ['api'],
      plugins: {
        'hapi-swagger': swagger.putUserPasswordByIdSwagger,
      },
    },
  },
];

module.exports = routes;
