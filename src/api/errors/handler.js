const ClientError = require('../../exceptions/ClientError');
const ServerError = require('../../exceptions/ServerError');

class ErrorsHandler {
  errorHandler(request, h) {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          code: response.statusCode,
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (response instanceof ServerError) {
        // eslint-disable-next-line no-console

        console.error(response);
        const newResponse = h.response({
          status: 'fail',
          code: response.statusCode,
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      // eslint-disable-next-line no-console
      console.error(response);

      const newResponse = h.response({
        status: 'error',
        code: response.statusCode,
        message: 'Internal server error',
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return response.continue || response;
  }
}

module.exports = ErrorsHandler;
