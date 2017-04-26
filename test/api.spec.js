const Hapi = require('hapi');

beforeEach(() => {
  let server = this.server = new Hapi.Server();
  server.connection({ port: 8000 });

  server.register([
    { register: require('../api') },
  ]);
});

describe('api plugin', () => {
  describe('when GET / is requested', () => {
    const request = {
      method: 'GET',
      url: '/',
    };

    it('handler should return status of 200', () =>
      this.server.inject(request)
        .then((response) => {
          expect(response.statusCode).to.equal(200);
        }));

    it('handler should return expected message', () =>
      this.server.inject(request)
        .then((response) => {
          expect(response.result.message).to.equal('Hello API ROOT!');
        }));
  });
});
