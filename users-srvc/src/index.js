const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');

// errors handler
const errors = require('./api/errors');

// users module
const users = require('./api/users');
const UsersService = require('./services/database/UsersService');
const UsersValidator = require('./validator/users');

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

  server.realm.modifiers.route.prefix = process.env.BASE_PATH;

  // create instance of USER service and validator
  const usersService = new UsersService();
  const usersValidator = new UsersValidator();

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: usersValidator,
      },
    },
    {
      plugin: errors,
    },
  ]);

  await server.start();

  // eslint-disable-next-line no-console
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
  process.exit(1);
});

init();
