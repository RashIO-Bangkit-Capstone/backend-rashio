const ErrorsHandler = require('./handler');

module.exports = {
  name: 'errors',
  version: '1.0.0',

  register: (server) => {
    const errorHandler = new ErrorsHandler(server);
    server.ext('onPreResponse', errorHandler.errorHandler);
  },
};
