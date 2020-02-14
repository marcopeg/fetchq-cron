const { getNextIteration } = require('../../../lib/get-next-iteration');
const schema = require('./v1-cron-upsert.schema');

const v1CronUpsert = {
  method: 'POST',
  url: '/api/v1/cron/',
  schema,
  handler: async (request, reply) => {
    const { fetchq, getConfig } = request;
    const Q1 = getConfig('app.q1');
    const { group_name, task_name, schedule } = request.body;

    const subject = `${group_name}__${task_name}`;
    const nextIteration = getNextIteration(schedule.method, schedule.value);

    const doc = {
      subject,
      payload: request.body,
      nextIteration,
    };

    // Upsert document
    const { queued_docs, updated_docs } = await fetchq.doc.upsert(Q1, doc);

    // Handle upsert error
    if (!queued_docs && !updated_docs) {
      return reply.send({
        success: false,
        errors: [
          {
            message: 'failed to upsert the task',
          },
        ],
      });
    }

    const res = await fetchq.pool.query(
      `
      SELECT * FROM fetchq_catalog.fetchq__${Q1}__documents
      WHERE subject = $1
    `,
      [subject],
    );

    reply.send({
      success: true,
      data: {
        was_created: queued_docs > 0,
        created_at: res.rows[0].created_at,
        next_iteration: res.rows[0].next_iteration,
      },
    });
  },
};

module.exports = { v1CronUpsert };
