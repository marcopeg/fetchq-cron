const { SERVICE_NAME, ...hooks } = require('./hooks');

// Force to use the TDD service if the code is running into
// CodeSandbox or if in a development environment.
const useServiceTDD =
  ['development', 'test'].includes(process.env.NODE_ENV) ||
  Boolean(process.env.SANDBOX_URL);

const serviceTDD = ({ registerAction, createHook, registerHook }) => {
  registerHook(hooks);

  // Exposes a hook that let register routes scoped under `/test`
  registerAction({
    hook: '$FASTIFY_ROUTE?',
    name: SERVICE_NAME,
    trace: __filename,
    handler: ctx => {
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

  // Exposes a hook that is intended to mocking stuff like with NOK
  registerAction({
    hook: '$FINISH',
    name: SERVICE_NAME,
    trace: __filename,
    handler: ctx => {
      createHook.sync(hooks.TDD_HTTP_MOCKS, ctx);
    },
  });

  // Register all the `/test` prefixed routes
  registerAction({
    hook: '$TDD_FASTIFY_ROUTE?',
    name: SERVICE_NAME,
    trace: __filename,
    handler: ({ registerRoute }, { getContext }) => {
      const fq = getContext('fetchq');

      // Provide a health-check route to the TDD environment:
      registerRoute({
        method: 'GET',
        url: '/status',
        handler: async () => ({ message: '+ok' }),
      });

      // Expose a query interface to interact with the database
      // POST://test/query
      // BODY: { query: 'SELECT NOW()' }
      registerRoute({
        method: 'POST',
        url: '/query',
        handler: request => fq.pool.query(request.body.query),
      });

      // Expose a way to dynamically access the App's configuration
      // GET://test/config?path=foo.aaa
      // (query param is optional)
      registerRoute({
        method: 'GET',
        url: '/config',
        handler: async request => request.getConfig(request.query.path),
      });
    },
  });
};

module.exports = useServiceTDD ? serviceTDD : () => {};
