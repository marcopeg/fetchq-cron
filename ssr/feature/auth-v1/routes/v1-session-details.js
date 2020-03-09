const schema = require('./v1-session-details.schema');

const v1SessionDetails = {
  method: 'GET',
  url: '/api/v1/session',
  schema,
  handler: async request => ({
    success: true,
    data: request.auth,
  }),
};

module.exports = { v1SessionDetails };
