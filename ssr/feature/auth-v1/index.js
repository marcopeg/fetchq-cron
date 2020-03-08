const { FEATURE_NAME } = require('./hooks');

const { v1SessionCreate } = require('./routes/v1-session-create');

module.exports = ({ registerAction }) => {
  registerAction({
    hook: '$FASTIFY_ROUTE',
    name: FEATURE_NAME,
    handler: ({ registerRoute }) => {
      registerRoute(v1SessionCreate);
    },
  });
};
