const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const Inert = require('@hapi/inert');
const hapiswagger = require('hapi-swagger');
const Vision = require('@hapi/vision');
const Pack = require('../package.json');

// module api helloWorld
const helloWorld = require('./api/helloWorld');

// module api users
const users = require('./api/users');
const UsersService = require('./services/database/UsersService');
const UsersValidator = require('./validator/users');

dotenv.config();

const init = async () => {
  // create instance of USER service and validator
  const usersService = new UsersService();
  const usersValidator = new UsersValidator();

  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  const swaggerOptions = {
    info: {
      title: 'RashIO API Documentation',
      version: Pack.version,
    },
  };

  // register plugin
  await server.register([
    Inert,
    Vision,
    {
      plugin: hapiswagger,
      options: swaggerOptions,
    },
  ]);

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
  ]);

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server running on ${server.info.uri}`);
};

init();
