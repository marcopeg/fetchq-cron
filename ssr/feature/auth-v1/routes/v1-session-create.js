const schema = require('./v1-session-create.schema');

const getLoginDetails = (secret, { uname, passw }) => {
  if (secret === null && uname === 'console' && passw === '') {
    return {
      claims: {
        uname,
        group: uname,
      },
      duration: '5s',
    };
  }
};

const v1SessionCreate = {
  method: 'POST',
  url: '/api/v1/session',
  schema,
  handler: async (request, reply) => {
    const { getConfig } = request;
    const password = getConfig('app.auth.console.password');

    const details = getLoginDetails(password, request.body);

    reply.send({
      success: true,
      data: {
        details,
      },
    });
  },
};

module.exports = { v1SessionCreate };
