const { FEATURE_NAME } = require('./hooks');

module.exports = ({ registerAction }) => {
  registerAction({
    hook: '$TDD_FASTIFY_ROUTE?',
    name: FEATURE_NAME,
    handler: ({ registerRoute }) => {
      console.log('********');
      registerRoute({
        method: 'GET',
        url: '/schema-v1/reset',
        handler: (request, reply) => {
          console.log('reset schema');
          reply.send('ok');
        },
      });
    },
  });
};
