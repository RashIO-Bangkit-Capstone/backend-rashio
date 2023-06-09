const routes = (handler, swagger) => [
  {
    method: 'POST',
    path: '/diseases',
    handler: handler.postDiseaseHandler,
    options: {
      description: 'Add a new disease',
      tags: ['api'],
      plugins: {
        'hapi-swagger': swagger.postDiseaseSwagger,
      },
    },
  },
  {
    method: 'GET',
    path: '/diseases',
    handler: handler.getDiseasesHandler,
    options: {
      description: 'Get all diseases',
      tags: ['api'],
      plugins: {
        'hapi-swagger': swagger.getDiseasesSwagger,
      },
    },
  },
  {
    method: 'GET',
    path: '/diseases/{name}',
    handler: handler.getDiseaseByNameHandler,
    options: {
      description: 'Get disease by name',
      tags: ['api'],
      plugins: {
        'hapi-swagger': swagger.getDiseaseSwagger,
      },
    },
  },
  {
    method: 'PUT',
    path: '/diseases/{name}',
    handler: handler.putDiseaseByNameHandler,
    options: {
      description: 'Update disease by name',
      tags: ['api'],
      plugins: {
        'hapi-swagger': swagger.putDiseaseSwagger,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/diseases/{name}',
    handler: handler.deleteDiseaseByNameHandler,
    options: {
      description: 'Delete disease by name',
      tags: ['api'],
      plugins: {
        'hapi-swagger': swagger.deleteDiseaseSwagger,
      },
    },
  },
];

module.exports = routes;
