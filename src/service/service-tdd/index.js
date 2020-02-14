const { SERVICE_NAME, ...hooks } = require('./hooks');

// Force to use the TDD service if the code is running into
// CodeSandbox or if in a development environment.
const useServiceTDD =
  ['development', 'test'].includes(process.env.NODE_ENV) ||
  Boolean(process.env.SANDBOX_URL);

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

      // Register route abstraction that prefixes
      // end routes with `/test`
      const registerRoute = config => {
        ctx.registerRoute({
          ...config,
          url: `/test${config.url}`,
        });
      };

      // Let other features to integrate test routes:
      createHook.sync(hooks.TDD_FASTIFY_ROUTE, { registerRoute });
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
