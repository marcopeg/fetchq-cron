const { FEATURE_NAME } = require('./hooks');

const resetFetchq = async fetchq => {
  const queues = await fetchq.pool.query(
    'SELECT * FROM fetchq_catalog.fetchq_sys_queues',
  );
  for (const queue of queues.rows) {
    await fetchq.pool.query(
      `TRUNCATE fetchq_catalog.fetchq__${queue.name}__documents`,
    );
    await fetchq.pool.query(
      `TRUNCATE fetchq_catalog.fetchq__${queue.name}__errors`,
    );
    await fetchq.pool.query(
      `TRUNCATE fetchq_catalog.fetchq__${queue.name}__metrics`,
    );
  }
  await await fetchq.pool.query('SELECT fetchq_metric_reset_all()');
};

module.exports = ({ registerAction }) => {
  registerAction({
    hook: '$TDD_FASTIFY_ROUTE?',
    name: FEATURE_NAME,
    handler: ({ registerRoute }) => {
      registerRoute({
        method: 'GET',
        url: '/schema-v1/reset',
        handler: async (request, reply) => {
          console.info('@TEST: reset schema/v1');
          const fetchq = request.getContext('fetchq');
          await resetFetchq(fetchq);
          reply.send('+ok');
        },
      });
    },
  });
};
