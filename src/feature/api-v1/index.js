const { FEATURE_NAME } = require('./hooks');

const { v1CronUpsert } = require('./routes/v1-cron-upsert');
const { v1CronList } = require('./routes/v1-cron-list');

module.exports = ({ registerAction }) => {
  registerAction({
    hook: '$FASTIFY_ROUTE',
    name: FEATURE_NAME,
    handler: ({ registerRoute }) => {
      registerRoute(v1CronUpsert);
      registerRoute(v1CronList);
    },
  });
};
