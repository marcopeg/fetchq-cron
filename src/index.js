const { runHookApp } = require('@forrestjs/hooks');
const { Q1 } = require('./contants');

// Services
const serviceFastify = require('./service/service-fastify');
const serviceFastifyCors = require('./service/service-fastify-cors');
const serviceFetchq = require('./service/service-fetchq');
const serviceFastifyFetchq = require('./service/service-fastify-fetchq');
const serviceTdd = require('./service/service-tdd');

// Features
const featurePing = require('./feature/ping');
const featureSchemaV1 = require('./feature/schema-v1');
const featureApiV1 = require('./feature/api-v1');
const featureWorkersV1 = require('./feature/workers-v1');

// Settings
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
};

runHookApp({
  settings,
  trace: 'compact',
  services: [
    serviceFetchq,
    serviceFastify,
    serviceFastifyCors,
    serviceFastifyFetchq,
    serviceTdd,
  ],
  features: [featurePing, featureSchemaV1, featureApiV1, featureWorkersV1],
}).catch(err => console.error(err.message));
