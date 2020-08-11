const { runHookApp } = require('@forrestjs/hooks');

/**
 * Services
 */
const serviceFastify = require('@forrestjs/service-fastify');
const serviceFastifyCors = require('@forrestjs/service-fastify-cors');
const serviceFastifyStatic = require('@forrestjs/service-fastify-static');
const serviceFastifyCookie = require('@forrestjs/service-fastify-cookie');
const serviceFastifyJwt = require('@forrestjs/service-fastify-jwt');
const serviceFetchq = require('@forrestjs/service-fetchq');
const serviceFastifyFetchq = require('@forrestjs/service-fastify-fetchq');
const serviceTdd = require('./service/service-tdd');

/**
 * Features
 */
const featurePing = require('./feature/ping');
const featureSchemaV1 = require('./feature/schema-v1');
const featureApiV1 = require('./feature/api-v1');
const featureAuthV1 = require('./feature/auth-v1');
const featureWorkersV1 = require('./feature/workers-v1');

const { settings } = require('./settings');

/**
 * Feature Flags
 */

// Use the application scope to flag api and workers feature
const useApi = String(process.env.FETCHQ_CRON_MODE) !== 'worker';
const useWorkers = String(process.env.FETCHQ_CRON_MODE) !== 'api';

// The web console can be disabled in case it's being executed from a CDN (ex CloudFront)
const useConsole =
  useApi && String(process.env.FETCHQ_CRON_ENABLE_CONSOLE) !== 'false';

// CORS are needed during development to run an external client, or in the
// case the UI should be served from a CDN (ex CloudFront)
const useCors =
  useApi &&
  (String(process.env.FETCHQ_CRON_ENABLE_CORS) === 'true' ||
    process.env.NODE_ENV === 'development');

runHookApp({
  settings,
  trace: 'compact',
  services: [
    serviceFetchq,
    ...(useApi ? [serviceFastify] : []),
    ...(useCors ? [serviceFastifyCors] : []),
    ...(useConsole ? [serviceFastifyStatic] : []),
    ...(useApi ? [serviceFastifyCookie] : []),
    ...(useApi ? [serviceFastifyJwt] : []),
    ...(useApi ? [serviceFastifyFetchq] : []),
    serviceTdd,
  ],
  features: [
    ...(useApi ? [featurePing] : []),
    ...(useApi ? [featureSchemaV1] : []),
    ...(useApi ? [featureApiV1] : []),
    ...(useApi ? [featureAuthV1] : []),
    ...(useWorkers ? [featureWorkersV1] : []),
  ],
}).catch(err => console.error(err.message));

// Let Docker exit on Ctrl+C
process.on('SIGINT', () => process.exit());
