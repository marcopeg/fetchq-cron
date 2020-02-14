const { FEATURE_NAME } = require('./hooks');
const q1Handler = require('./q1-handler');

module.exports = ({ registerAction }) => {
  registerAction({
    hook: '$FETCHQ_REGISTER_WORKER',
    name: FEATURE_NAME,
    handler: (_, { getConfig }) => ({
      queue: getConfig('app.q1'),
      handler: q1Handler,
    }),
  });

  registerAction({
    hook: '$TDD_FASTIFY_ROUTE?',
    name: FEATURE_NAME,
    handler: ({ registerRoute }) => {
      const { handlers } = require('./q1.fixture');
      handlers.forEach(h => registerRoute(h));
    },
  });
};
