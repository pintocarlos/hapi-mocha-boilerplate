const Test = require('./handlers/test');

exports.register = (plugin, options, next) => {
  plugin.route([
    { method: 'GET', path: '/', config: Test.hello },
    { method: 'GET', path: '/{path*}', config: Test.notFound },
  ]);

  next();
};

exports.register.attributes = {
  name: 'api',
};
