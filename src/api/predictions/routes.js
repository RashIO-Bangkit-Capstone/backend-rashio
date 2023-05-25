const routes = (handler, swagger) => [
  {
    method: 'POST',
    path: '/predictions',
    handler: handler.postPredictionHandler,
    options: {
      auth: 'rashio_jwt',
      description: 'Add a new prediction',
      tags: ['api'],
      payload: {
        maxBytes: 512000,
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
      plugins: {
        'hapi-swagger': swagger.postPredictionSwagger,
      },
    },
  },
  {
    method: 'GET',
    path: '/predictions/{userId}',
    handler: handler.getPredictionsHandler,
    options: {
      auth: 'rashio_jwt',
      description: 'Get predictions logs by user id',
      tags: ['api'],
      plugins: {
        'hapi-swagger': swagger.getPredictionsSwagger,
      },
    },
  },
];

module.exports = routes;
