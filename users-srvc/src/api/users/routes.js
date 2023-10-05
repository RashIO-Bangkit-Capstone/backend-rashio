const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
    options: {
      // auth: 'rashio_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: handler.putUserByIdHandler,
    options: {
      // auth: 'rashio_jwt',
    },
  },
  {
    method: 'PATCH',
    path: '/users/{id}/password',
    handler: handler.putUserPasswordByIdHandler,
    options: {
      // auth: 'rashio_jwt',
    },
  },
];

module.exports = routes;
