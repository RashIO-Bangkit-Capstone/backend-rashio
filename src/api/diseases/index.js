const DiseasesHandler = require('./handler');
const routes = require('./routes');
const swagger = require('./swagger');

module.exports = {
  name: 'diseases',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const diseasesHandler = new DiseasesHandler(service, validator);
    server.route(routes(diseasesHandler, swagger(validator.schema)));
  },
};
