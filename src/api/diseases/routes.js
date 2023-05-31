const routes = (handler) => [
  {
    method: 'POST',
    path: '/diseases',
    handler: handler.postDiseasesHandler,
  },
];

module.exports = routes;
