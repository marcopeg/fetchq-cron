const { runHookApp } = require('@forrestjs/hooks');

/**
 * Services
 */
const serviceFastify = require('./service/service-fastify');
const serviceFastifyCors = require('./service/service-fastify-cors');
const serviceFastifyStatic = require('./service/service-fastify-static');
const serviceFastifyCookie = require('./service/service-fastify-cookie');
const serviceFastifyJwt = require('./service/service-fastify-jwt');
const serviceFetchq = require('./service/service-fetchq');
const serviceFastifyFetchq = require('./service/service-fastify-fetchq');
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

// The web console can be disabled in case it's being executed from a CDN (ex CloudFront)
const useConsole = String(process.env.FETCHQ_CRON_ENABLE_CONSOLE) !== 'false';

// CORS are needed during development to run an external client, or in the
// case the UI should be served from a CDN (ex CloudFront)
const useCors =
  String(process.env.FETCHQ_CRON_ENABLE_CORS) === 'true' ||
  process.env.NODE_ENV === 'development';

runHookApp({
  settings,
  trace: 'compact',
  services: [
    serviceFetchq,
    serviceFastify,
    ...(useCors ? [serviceFastifyCors] : []),
    ...(useConsole ? [serviceFastifyStatic] : []),
    serviceFastifyCookie,
    serviceFastifyJwt,
    serviceFastifyFetchq,
    serviceTdd,
  ],
  features: [
    featurePing,
    featureSchemaV1,
    featureApiV1,
    featureAuthV1,
    featureWorkersV1,
  ],
}).catch(err => console.error(err.message));

// Let Docker exit on Ctrl+C
process.on('SIGINT', () => process.exit());
