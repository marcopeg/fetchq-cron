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
};
