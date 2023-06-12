const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const Inert = require('@hapi/inert');
const hapiswagger = require('hapi-swagger');
const Vision = require('@hapi/vision');
const Jwt = require('@hapi/jwt');
const Pack = require('../package.json');
const errors = require('./api/errors');
// module api helloWorld
const helloWorld = require('./api/helloWorld');
// module api users
const users = require('./api/users');
const UsersService = require('./services/database/UsersService');
const UsersValidator = require('./validator/users');
// module api authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/database/AuthenticationsService');
const AuthenticationsValidator = require('./validator/authentications');
const tokenManager = require('./tokenize/TokenManager');
// module api prediction
const predictions = require('./api/predictions');
const BucketService = require('./services/storage/BucketService');
const PredictionLogsService = require('./services/database/PredictionLogsService');
const PredictionsValidator = require('./validator/predictions');
// module api diseases
const diseases = require('./api/diseases');
const DiseasesService = require('./services/database/DiseasesService');
const DiseasesValidator = require('./validator/diseases');
// module api articles
const articles = require('./api/articles');
const ArticlesService = require('./services/database/ArticlesService');
const ArticlesValidator = require('./validator/articles');

dotenv.config();

const init = async () => {
  // create instance of USER service and validator
  const usersService = new UsersService();
  const usersValidator = new UsersValidator();
  // create instance of AUTHENTICATION service and token manager
  const authenticationsService = new AuthenticationsService();
  const authenticationsValidator = new AuthenticationsValidator();
  // create instance of prediction service and validator
  const bucketService = new BucketService();
  const predictionLogsService = new PredictionLogsService();
  const predictionsValidator = new PredictionsValidator();
  // create instance of diseases service and validator
  const diseasesService = new DiseasesService();
  const diseasesValidator = new DiseasesValidator();
  // create instance of articles service and validator
  const articlesService = new ArticlesService();
  const articlesValidator = new ArticlesValidator();

  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
    
  });

  server.realm.modifiers.route.prefix = process.env.BASE_PATH;

  const swaggerOptions = {
    info: {
      title: 'RashIO API Documentation',
      version: Pack.version,
    },
    basePath: process.env.BASE_PATH,
    pathPrefixSize: 2,
    schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
  };

  // register plugin
  await server.register([
    Inert,
    Vision,
    Jwt,
    {
      plugin: hapiswagger,
      options: swaggerOptions,
    },
  ]);

  // register auth strategy
  server.auth.strategy('rashio_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
        name: artifacts.decoded.payload.name,
        email: artifacts.decoded.payload.email,
        phoneNumber: artifacts.decoded.payload.phoneNumber,
      },
    }),
  });

  // register module api
  await server.register([
    {
      plugin: helloWorld,
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: usersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager,
        validator: authenticationsValidator,
      },
    },
    {
      plugin: predictions,
      options: {
        bucketService,
        predictionLogsService,
        validator: predictionsValidator,
      },
    },
    {
      plugin: diseases,
      options: {
        service: diseasesService,
        validator: diseasesValidator,
      },
    },
    {
      plugin: articles,
      options: {
        articlesService,
        bucketService,
        validator: articlesValidator,
      },
    },
    {
      plugin: errors,
    },
  ]);

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server running on ${server.info.uri}`);
};

init();
