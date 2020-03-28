/**
 * App's Settings Configuration
 * ============================
 *
 * This function gets executed at boot time and should provide a comprehensive
 * set of all the needed configuration.
 *
 * It should eagerly crash and apply static checks to any environment configuration
 * that should be provided at boot time.
 */

const path = require('path');
const { Q1 } = require('./contants');

const settings = ({ setConfig, getConfig }) => {
  // TODO: add envalid

  // FetchQ Client
  setConfig('fetchq', {
    connectionString:
      process.env.FETCHQ_CRON_PG_STRING || // Explicit setup
      process.env.DATABASE_URL || // Heroku
      process.env.PGSTRING || // Default fetchq client
      'postgres://gitpod:gitpod@localhost:5432/postgres',
    pool: {
      max: 1,
    },
    maintenance: {
      limit: 1, // TODO: need to update fetchq-client so to avoid maintenance running
      delay: 10,
      sleep: 100,
    },
    queues: [
      {
        name: Q1,
        isActive: true,
        enableNotifications: true,
        maxAttempts: 5,
        errorsRetention: '1h',
        maintenance: {
          mnt: { delay: '500ms', duration: '5m', limit: 500 },
          sts: { delay: '1h', duration: '5m' },
          cmp: { delay: '30m', duration: '5m' },
          drp: { delay: '10m', duration: '5m' },
        },
      },
    ],
  });

  // Generica app configuration
  setConfig('app.q1.name', Q1);
  setConfig('app.logs.page.size', 100);
  // Authorization setup
  setConfig(
    'app.auth.console.password',
    process.env.FETCHQ_CRON_CONSOLE_PASSWORD || null,
  );
  setConfig('app.auth.cookie.name', 'fetchq_cron_auth');
  setConfig('app.auth.query.param', 'auth');
  setConfig('app.auth.header.name', 'authorization');

  // Heroku compatible port environment variable
  setConfig(
    'fastify.port',
    process.env.FETCHQ_CRON_PORT || process.env.PORT || '8080',
  );

  setConfig('fastify.instance.options', {
    logger: false,
    ignoreTrailingSlash: true,
  });

  // Setup static files from CRA's build folder
  setConfig('fastify.static', {
    root: path.join(__dirname, '..', 'build'),
  });

  setConfig('fastify.cookie', {
    secret: 'fetchq-cron', // TODO: move it to an environment variable
    options: {
      httpOnly: true,
      secure: true,
      path: '/',
    },
  });

  setConfig('fastify.jwt', {
    secret: 'fetchq-cron', // TODO: move it to an environment variable
  });

  // TODO: cors should be enabled only on demand
  //       need to better figure out the environment based configuration
  setConfig('fastify.cors', {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });
};

module.exports = { settings };
