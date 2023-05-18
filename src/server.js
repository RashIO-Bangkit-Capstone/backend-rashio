const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const Inert = require('@hapi/inert');
const Pack = require('../package');
const hapiswagger = require('hapi-swagger');
const Vision = require('@hapi/vision');

// module api helloWorld
const helloWorld = require('./api/helloWorld');

dotenv.config();

const init = async () => {
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
  ]);

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server running on ${server.info.uri}`);
};

init();
