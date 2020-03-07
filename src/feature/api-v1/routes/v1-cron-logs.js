const schema = require('./v1-cron-details.schema');

const v1CronLogs = {
  method: 'GET',
  url: '/api/v1/cron/logs/:groupName/:taskName',
  schema,
  handler: async (request, reply) => {
    reply.send({
      success: true,
      data: {
        ...request.body,
      },
    });
  },
};

module.exports = { v1CronLogs };
