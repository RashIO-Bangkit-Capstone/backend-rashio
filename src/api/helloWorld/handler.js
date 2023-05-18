const autoBind = require('auto-bind');

class HelloWorldHandler {
  constructor() {
    autoBind(this);
  }

  async getHelloWorldHandler(request, h) {
    const response = h.response({
      status: 'success',
      code: 200,
      message: 'Hello World',
    });

    response.code(200);
    return response;
  }
}

module.exports = HelloWorldHandler;
