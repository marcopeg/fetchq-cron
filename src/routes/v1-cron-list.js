const { Q1 } = require('../contants');
const schema = require('./v1-cron-list.schema');

const listAllSql = `
  
  ORDER BY next_iteration
`;

const v1CronList = {
  method: 'GET',
  url: '/api/v1/cron/',
  schema,
  handler: async (request, reply) => {
    const { fetchq } = request;
    const { group } = request.query;

    const sql = [];
    const where = [];
    sql.push(`SELECT * FROM "fetchq_catalog"."fetchq__${Q1}__documents"`);

    if (group) {
      where.push(`"payload"->>'group_name' = '${group}'`);
    }

    if (where.length) {
      sql.push(`WHERE`);
      sql.push(where.join(' '));
    }

    sql.push(`ORDER BY next_iteration DESC`);

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
