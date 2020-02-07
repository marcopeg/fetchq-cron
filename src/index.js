const libFastify = require('fastify');
const libFetchq = require('fetchq');
const envalid = require('envalid');
const { Q1 } = require('./contants');

const { v1CronUpsert } = require('./routes/v1-cron-upsert');
const { v1CronList } = require('./routes/v1-cron-list');

const env = envalid.cleanEnv(process.env, {
  PGSTRING: envalid.str(),
});

const fetchq = libFetchq({
  pool: {
    max: 1,
  },
  maintenance: {
    limit: 1,
    delay: 100,
    sleep: 1000,
  },
  queues: [
    {
      name: Q1,
      isActive: true,
      enableNotifications: true,
      maxAttempts: 5,
      errorsRetention: '1h',
      maintenance: {
        mnt: { delay: '3s', duration: '5m', limit: 500 },
        sts: { delay: '1m', duration: '5m' },
        cmp: { delay: '30m', duration: '5m' },
        drp: { delay: '10m', duration: '5m' },
      },
    },
  ],
});

const fastify = libFastify();
fastify.decorateRequest('env', env);
fastify.decorateRequest('fetchq', fetchq);

fastify.route(v1CronUpsert);
fastify.route(v1CronList);

Promise.all([fetchq.boot(), fastify.listen(8080)]).catch(err => console.error);
