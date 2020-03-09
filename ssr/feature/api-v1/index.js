const { FEATURE_NAME } = require('./hooks');

const { v1CronUpsert } = require('./routes/v1-cron-upsert');
const { v1CronList } = require('./routes/v1-cron-list');
const { v1CronDetails } = require('./routes/v1-cron-details');
const { v1Logs, v1LogsGroup, v1LogsTask } = require('./routes/v1-cron-logs');

module.exports = ({ registerAction }) => {
  registerAction({
    hook: '$FASTIFY_PLUGIN',
    name: FEATURE_NAME,
    handler: ({ registerPlugin }) => {
      registerPlugin((fastify, options, done) => {
        fastify.addHook('preHandler', fastify.authenticate);
        fastify.route(v1CronUpsert);
        fastify.route(v1CronList);
        fastify.route(v1CronDetails);
        fastify.route(v1Logs);
        fastify.route(v1LogsGroup);
        fastify.route(v1LogsTask);
        done();
      });
    },
  });
};
