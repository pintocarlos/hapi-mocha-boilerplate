const envKey = (key) => {
  const env = process.env.NODE_ENV || 'development';

  const configuration = {
    development: {
      host: 'localhost',
      port: 8000,
    },
    // These should match environment variables on hosted server
    production: {
      host: process.env.HOST,
      port: process.env.PORT,
    },
  };

  return configuration[env][key];
};

const manifest = {
  connections: [
    {
      host: envKey('host'),
      port: envKey('port'),
      routes: {
        cors: true,
      },
      router: {
        stripTrailingSlash: true,
      },
    },
  ],
  registrations: [
    {
      plugin: './api',
      options: { routes: { prefix: '/api' } },
    },
    {
      plugin: {
        register: 'good',
        options: {
          ops: { interval: 60000 },
          reporters: {
            console: [
              { module: 'good-squeeze', name: 'Squeeze', args: [{ error: '*' }] }, { module: 'good-console' },
              'stdout',
            ],
          },
        },
      },
    },
  ],
};

if (process.env.NODE_ENV === 'development') {
  manifest.registrations.push({
    "plugin": {
      "register": "blipp",
      "options": {},
    },
  });
}

module.exports = manifest;
