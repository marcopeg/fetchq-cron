const {
  v1LogsSchema,
  v1LogsSchemaGroup,
  v1LogsSchemaTask,
} = require('./v1-cron-logs.schema');

const prepareLog = log => ({
  group: log.details.group_name,
  task: log.details.task_name,
  created_at: log.created_at,
  cursor: log.details.cursor,
  message: log.message,
  details: log.details,
  ref_id: log.ref_id,
});

const handler = async (request, reply) => {
  const { query, params, getConfig, getContext } = request;
  const Q1 = getConfig('app.q1.name');
  const pageSize = query.limit || getConfig('app.logs.page.size');
  const fetchq = getContext('fetchq');

  const sql = [];
  const where = [];
  sql.push(`SELECT * FROM "fetchq_catalog"."fetchq__${Q1}__errors"`);

  if (params.groupName && params.taskName) {
    where.push(`subject = '${params.groupName}/${params.taskName}'`);
  } else if (params.groupName) {
    where.push(`details->>'group_name' = '${params.groupName}'`);
  }

  if (query.cursor) {
    where.push(`(details->>'cursor')::bigint < ${query.cursor}`);
  }

  if (where.length) {
    sql.push(`WHERE`);
    sql.push(where.join(' AND '));
  }

  sql.push(`ORDER BY details->>'cursor' DESC`);
  sql.push(`LIMIT ${pageSize}`);

  const sqlTxt = sql.join(' ');
  // console.info(sqlTxt);
  const res = await fetchq.pool.query(sqlTxt);

  reply.send({
    success: true,
    data: {
      params: request.params,
      query: request.query,
      logs: res.rows.map(prepareLog),
      sqlTxt,
    },
  });
};

const v1Logs = {
  method: 'GET',
  url: '/api/v1/logs',
  schema: v1LogsSchema,
  handler,
};
const v1LogsGroup = {
  method: 'GET',
  url: '/api/v1/logs/:groupName',
  schema: v1LogsSchemaGroup,
  handler,
};
const v1LogsTask = {
  method: 'GET',
  url: '/api/v1/logs/:groupName/:taskName',
  schema: v1LogsSchemaTask,
  handler,
};

module.exports = { v1Logs, v1LogsGroup, v1LogsTask };
