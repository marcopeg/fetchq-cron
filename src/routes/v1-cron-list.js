const { Q1 } = require('../contants');
const schema = require('./v1-cron-list.schema');

/**
 * GET://v1/cron?
 * group=mpeg
 * limit=10
 */
const v1CronList = {
  method: 'GET',
  url: '/api/v1/cron/',
  schema,
  handler: async (request, reply) => {
    const { fetchq, query } = request;

    const sql = [];
    const where = [];
    sql.push(`SELECT * FROM "fetchq_catalog"."fetchq__${Q1}__documents"`);

    if (query.group) {
      where.push(`"payload"->>'group_name' = '${query.group}'`);
    }

    if (query.cursor) {
      where.push(`next_iteration < '${query.cursor}'`);
    }

    if (where.length) {
      sql.push(`WHERE`);
      sql.push(where.join(' AND '));
    }

    sql.push(`ORDER BY next_iteration DESC`);

    if (query.limit) {
      sql.push(`LIMIT ${query.limit}`);
    }

    const sqlTxt = sql.join(' ');
    console.log(sqlTxt);

    const res = await fetchq.pool.query(sqlTxt);

    console.log(res.rows);

    reply.send({
      success: true,
      data: {
        query: request.query,
        sql: sqlTxt,
        rows: res.rows,
      },
    });
  },
};

module.exports = { v1CronList };
