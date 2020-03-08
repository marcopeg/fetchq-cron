const fp = require('fastify-plugin');
const jwtPlugin = require('fastify-jwt');
const hooks = require('./hooks');

const onFastifyPlugin = (
  { registerPlugin, decorateRequest },
  { getConfig },
) => {
  const decoratedJWTPlugin = fp(async function(fastify) {
    // Register plugin
    const options = getConfig('fastify.jwt', {});
    fastify.register(jwtPlugin, options);

    // Decorate the request object with the global jwt utilities
    fastify.decorateRequest('jwt', {});
    fastify.addHook('preHandler', (request, reply, done) => {
      request.jwt = fastify.jwt;
      done();
    });
  });

  registerPlugin(decoratedJWTPlugin);
};

module.exports = ({ registerAction }) => {
  registerAction({
    hook: '$FASTIFY_PLUGIN',
    name: hooks.SERVICE_NAME,
    trace: __filename,
    handler: onFastifyPlugin,
  });
};
