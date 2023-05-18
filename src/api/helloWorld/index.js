const HelloWorldHandler = require('./handler');
const routes = require('./routes');
const swagger = require('./swagger');

module.exports = {
  name: 'helloWorld',
  version: '1.0.0',
  register: async (server) => {
    const helloWorldHandler = new HelloWorldHandler();
    server.route(routes(helloWorldHandler, swagger));
  },
};
