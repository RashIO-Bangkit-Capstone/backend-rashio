const ArticlesHandler = require('./handler');
const swagger = require('./swagger');
const routes = require('./routes');

module.exports = {
  name: 'articles',
  version: '1.0.0',
  register: async (server, { articlesService, bucketService, validator }) => {
    const articlesHandler = new ArticlesHandler(articlesService, bucketService, validator);
    server.route(routes(articlesHandler, swagger(validator.schema)));
  }
}