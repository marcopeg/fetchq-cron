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

const settings = ({ setConfig }) => {
  // FetchQ Maintenance
  setConfig('fetchq', {
    connectionString:
      process.env.PGSTRING ||
      'postgres://gitpod:gitpod@localhost:5432/postgres',
    pool: {
      max: 1,
    },
    maintenance: {
      limit: 1,
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
          sts: { delay: '1m', duration: '5m' },
          cmp: { delay: '30m', duration: '5m' },
          drp: { delay: '10m', duration: '5m' },
        },
      },
    ],
  });

  // Generica app configuration
  setConfig('app.q1.name', Q1);
  setConfig('app.logs.page.size', 100);

  // Setup static files from CRA's build folder
  setConfig('fastify.static', {
    root: path.join(__dirname, '..', 'build'),
  });
};

module.exports = { settings };
