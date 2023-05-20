const AuthenticationsHandler = require('./handler');
const routes = require('./routes');
const swagger = require('./swagger');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (
    server,
    { authenticationsService, usersService, tokenManager, validator }
  ) => {
    const authenticationsHandler = new AuthenticationsHandler(
      authenticationsService,
      usersService,
      tokenManager,
      validator
    );
    server.route(routes(authenticationsHandler, swagger(validator.schema)));
  },
};
