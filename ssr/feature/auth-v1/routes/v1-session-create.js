const ms = require('ms');
const schema = require('./v1-session-create.schema');

const getLoginDetails = async (secret, { uname, passw }) => {
  // Login into a non secured instance
  if (secret === null && uname === 'console' && passw === '') {
    return {
      jwtClaims: {
        groups: ['*'],
        secure: false,
      },
      jwtOptions: {
        expiresIn: '5s',
      },
      public: {
        groups: ['*'],
        secure: false,
        iat: new Date(),
        eat: new Date(Date.now() + ms('5s')),
      },
    };
  }

  // Login with console credentials to a secured instance
  if (secret !== null && uname === 'console' && secret === passw) {
    return {
      jwtClaims: {
        groups: ['*'],
        secure: true,
      },
      jwtOptions: {
        expiresIn: '2h',
      },
      iat: new Date(),
      eat: new Date(Date.now() + ms('2h')),
      public: {
        groups: ['*'],
        secure: true,
      },
    };
  }

  return {
    errors: [{ message: 'Authentication failed' }],
  };
};

const v1SessionCreate = {
  method: 'POST',
  url: '/api/v1/session',
  schema,
  handler: async (request, reply) => {
    const { getConfig } = request;
    const password = getConfig('app.auth.console.password');
    const cookieName = getConfig('app.auth.cookie.name');
    const cookieOptions = getConfig('fastify.cookie.options', {});

    const details = await getLoginDetails(password, request.body);
    if (details.errors) {
      return reply.send({
        success: false,
        errors: details.errors,
      });
    }

    // Generate JWT
    const { jwtClaims, jwtOptions } = details;
    const token = await request.jwt.sign(jwtClaims, jwtOptions);

    // Send out secure cookie
    const expiryMs = ms(jwtOptions.expiresIn);
    reply.setCookie(cookieName, token, {
      ...cookieOptions,
      maxAge: expiryMs / 1000,
      expires: details.eat,
    });

    reply.send({
      success: true,
      data: {
        ...details.public,
        iat: details.iat,
        eat: details.eat,
        token,
      },
    });
  },
};

module.exports = { v1SessionCreate };
