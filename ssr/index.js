const { runHookApp } = require('@forrestjs/hooks');

// Services
const serviceFastify = require('./service/service-fastify');
const serviceFastifyCors = require('./service/service-fastify-cors');
const serviceFastifyStatic = require('./service/service-fastify-static');
const serviceFetchq = require('./service/service-fetchq');
const serviceFastifyFetchq = require('./service/service-fastify-fetchq');
const serviceTdd = require('./service/service-tdd');

// Features
const featurePing = require('./feature/ping');
const featureSchemaV1 = require('./feature/schema-v1');
const featureApiV1 = require('./feature/api-v1');
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
    serviceFastifyFetchq,
    serviceTdd,
  ],
  features: [featurePing, featureSchemaV1, featureApiV1, featureWorkersV1],
}).catch(err => console.error(err.message));
