const libFastify = require('fastify');
const libFetchq = require('fetchq');
const envalid = require('envalid');

const { v1QueueCreate } = require('./routes/v1-queue-create');
const { v1QueueDrop } = require('./routes/v1-queue-drop');

const env = envalid.cleanEnv(process.env, {
  PGSTRING: envalid.str(),
});

const fetchq = libFetchq({
  pool: {
    max: 1,
  },
});

const fastify = libFastify();
fastify.decorateRequest('env', env);
fastify.decorateRequest('fetchq', fetchq);

fastify.route(v1QueueCreate);
fastify.route(v1QueueDrop);

Promise.all([fetchq.boot(), fastify.listen(8080)]).catch(err => console.error);
