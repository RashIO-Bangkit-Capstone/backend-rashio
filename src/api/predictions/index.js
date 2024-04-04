const PredictionsHandler = require('./handler');
const routes = require('./routes');
const swagger = require('./swagger');

module.exports = {
  name: 'predictions',
  version: '1.0.0',
  register: async (
    server,
    { bucketService, predictionLogsService, mlService,validator }
  ) => {
    const predictionsHandler = new PredictionsHandler(
      bucketService,
      predictionLogsService,
      mlService,
      validator
    );
    server.route(routes(predictionsHandler, swagger(validator.schema)));
  },
};
