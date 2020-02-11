const { SERVICE_NAME, ...hooks } = require('./hooks');

const useServiceTDD = ['development', 'test'].includes(process.env.NODE_ENV);

const serviceTDD = ({ registerAction, createHook, registerHook }) => {
  registerHook(hooks);

  registerAction({
    hook: '$FASTIFY_ROUTE?',
    name: SERVICE_NAME,
    trace: __filename,
    handler: ctx => {
      // Provide a health-check route to the TDD environment:
      ctx.registerRoute({
        method: 'GET',
        url: '/test/status',
        handler: async () => ({ message: '+ok' }),
      });

      // Let other features to integrate test routes:
      createHook.sync(hooks.TDD_FASTIFY_ROUTE, ctx);
    },
  });

  // Expose a query interface to interact with the database
  registerAction({
    hook: '$TDD_FASTIFY_ROUTE?',
    name: SERVICE_NAME,
    trace: __filename,
    handler: ({ registerRoute }, { getContext }) => {
      registerRoute({
        method: 'POST',
        url: '/test/query',
        handler: request => getContext('pg').query(request.body.query),
      });
    },
  });

  registerAction({
    hook: '$FINISH',
    name: SERVICE_NAME,
    trace: __filename,
    handler: ctx => {
      createHook.sync(hooks.TDD_HTTP_MOCKS, ctx);
    },
  });
};

module.exports = useServiceTDD ? serviceTDD : () => {};
