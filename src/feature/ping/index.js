const { FEATURE_NAME } = require('./hooks');

const pingRouteHandler = async () => ({
  message: '+ok',
  emotion: '💩',
});

const pingRoute = {
  method: 'GET',
  url: '/ping',
  handler: pingRouteHandler,
};

const pingActionHandler = ({ registerRoute }) => registerRoute(pingRoute);

const pingAction = {
  hook: '$FASTIFY_ROUTE',
  name: FEATURE_NAME,
  handler: pingActionHandler,
};

module.exports = ({ registerAction }) => registerAction(pingAction);
