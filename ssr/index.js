const { runHookApp } = require('@forrestjs/hooks');

// Services
const serviceFastify = require('./service/service-fastify');
const serviceFastifyCors = require('./service/service-fastify-cors');
const serviceFastifyStatic = require('./service/service-fastify-static');
const serviceFastifyCookie = require('./service/service-fastify-cookie');
const serviceFastifyJwt = require('./service/service-fastify-jwt');
const serviceFetchq = require('./service/service-fetchq');
const serviceFastifyFetchq = require('./service/service-fastify-fetchq');
const serviceTdd = require('./service/service-tdd');

// Features
const featurePing = require('./feature/ping');
const featureSchemaV1 = require('./feature/schema-v1');
const featureApiV1 = require('./feature/api-v1');
const featureAuthV1 = require('./feature/auth-v1');
const featureWorkersV1 = require('./feature/workers-v1');

const { settings } = require('./settings');

runHookApp({
  settings,
  trace: 'compact',
  services: [
    serviceFetchq,
    serviceFastify,
    serviceFastifyCors,
    serviceFastifyStatic,
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
