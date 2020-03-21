const { FEATURE_NAME } = require('./hooks');

const { v1SessionCreate } = require('./routes/v1-session-create');
const { v1SessionDetails } = require('./routes/v1-session-details');

const getRequestToken = request => {
  if (request.headers.authorization) {
    return request.headers.authorization.substr(7);
  }
  if (request.cookies.auth) {
    return request.cookies.auth;
  }
  if (request.query.auth) {
    return request.query.auth;
  }
};

const authenticateDecorator = async (request, reply) => {
  const password = request.getConfig('app.auth.console.password');

  // Dynamic session for a non authenticated instance
  if (password === null) {
    request.auth = {
      groups: ['*'],
      secure: false,
      iat: new Date(),
      eat: new Date(Date.now() + 1000 * 60),
    };
    return;
  }

  // Get the JWT token from the request
  const token = getRequestToken(request);
  if (!token) {
    return reply.send({
      success: false,
      errors: [{ message: 'missing auth token' }],
    });
  }

  try {
    request.auth = request.jwt.verify(token);
  } catch (err) {
    return reply.send({
      success: false,
      errors: [{ message: err.message }],
    });
  }
};

module.exports = ({ registerAction }) => {
  registerAction({
    hook: '$FASTIFY_PLUGIN',
    name: FEATURE_NAME,
    handler: ({ registerPlugin, decorate }) => {
      decorate('authenticate', authenticateDecorator);

      registerPlugin((fastify, options, done) => {
        fastify.addHook('preHandler', fastify.authenticate);
        fastify.route(v1SessionDetails);
        done();
      });

      registerPlugin((fastify, options, done) => {
        fastify.route(v1SessionCreate);
        done();
      });
    },
  });
};
