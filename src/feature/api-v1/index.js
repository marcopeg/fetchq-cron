const { FEATURE_NAME } = require('./hooks');

const { v1CronUpsert } = require('./routes/v1-cron-upsert');
const { v1CronList } = require('./routes/v1-cron-list');
const { v1CronDetails } = require('./routes/v1-cron-details');
const { v1Logs, v1LogsGroup, v1LogsTask } = require('./routes/v1-cron-logs');

module.exports = ({ registerAction }) => {
  registerAction({
    hook: '$FASTIFY_ROUTE',
    name: FEATURE_NAME,
    handler: ({ registerRoute }) => {
      registerRoute(v1CronUpsert);
      registerRoute(v1CronList);
      registerRoute(v1CronDetails);
      registerRoute(v1Logs);
      registerRoute(v1LogsGroup);
      registerRoute(v1LogsTask);
    },
  });
};
