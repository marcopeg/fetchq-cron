const axios = require('axios');

describe('v1/cron/logs', () => {
  const { TEST_SERVER_ROOT } = global.env;
  const TASKS_COUNT = 5;
  const t1 = {
    group_name: 'foo',
    task_name: 't1',
    action: {
      method: 'webhook',
      request: {
        type: 'rest',
        method: 'POST',
        url: `${TEST_SERVER_ROOT}/test/worker/v1/q1/foo__t5`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          iterations: 'iterations',
          iterationsLimit: TASKS_COUNT,
        },
      },
    },
    schedule: {
      method: 'delay',
      value: '-1y',
    },
  };

  let queueName = '';
  let originalDelay = '';

  beforeAll(async () => {
    await axios.get(`${TEST_SERVER_ROOT}/test/schema-v1/reset`);
    queueName = await global.getAppConfig('app.q1.name');
    originalDelay = await global.getQueueMaintenanceDelay(queueName);
    await global.setQueueMaintenanceDelay(queueName, '3ms');

    // Push a document and await the completion of a few tasks in order
    // to produce a decent amount of logs.
    await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, {
      ...t1,
      group_name: 'foo',
      task_name: 't1',
    });
    await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, {
      ...t1,
      group_name: 'foo',
      task_name: 't2',
    });
    await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, {
      ...t1,
      group_name: 'faa',
      task_name: 't1',
    });
    await global.assertQueueIterations(queueName, 'foo/t1', TASKS_COUNT);
    await global.assertQueueIterations(queueName, 'foo/t2', TASKS_COUNT);
    await global.assertQueueIterations(queueName, 'faa/t1', TASKS_COUNT);
  });

  afterAll(async () => {
    await global.setQueueMaintenanceDelay(queueName, originalDelay);
    await axios.get(`${TEST_SERVER_ROOT}/test/schema-v1/reset`);
  });

  it('should return a page of results using the default page size', async () => {
    const res = await axios.get(`${TEST_SERVER_ROOT}/api/v1/logs`);
    // global.info(res.data);
    expect(res.data.success).toBe(true);
    expect(res.data.data.logs.length).toBeGreaterThan(
      TASKS_COUNT + TASKS_COUNT * 0.5,
    );
  });

  it('should return a page of results using a custom page size', async () => {
    const res = await axios.get(`${TEST_SERVER_ROOT}/api/v1/logs?limit=2`);
    // global.info(res.data);
    expect(res.data.success).toBe(true);
    expect(res.data.data.logs.length).toBe(2);
  });

  it('should return a page of results using a custom page size after a given cursor', async () => {
    const r1 = await axios.get(`${TEST_SERVER_ROOT}/api/v1/logs?limit=2`);
    // global.info(r1.data.data.logs);
    const cursor = r1.data.data.logs[1].cursor;

    expect(r1.data.success).toBe(true);
    expect(r1.data.data.logs.length).toBe(2);
    expect(r1.data.data.logs.length).toBe(2);

    // Get second page based on cursor
    const r2 = await axios.get(
      `${TEST_SERVER_ROOT}/api/v1/logs?limit=2&cursor=${cursor}`,
    );
    // global.info(r2.data.data.logs);

    expect(r2.data.success).toBe(true);
    expect(r2.data.data.logs.length).toBe(2);
    expect(r2.data.data.logs[0].cursor).toBeLessThan(cursor);
  });

  it('should filter logs by group', async () => {
    const res = await axios.get(`${TEST_SERVER_ROOT}/api/v1/logs/foo`);
    // global.info(res.data.data.logs);

    // All logs should have the same group
    expect(res.data.data.logs.length).toBeGreaterThanOrEqual(TASKS_COUNT);
    expect(res.data.data.logs.every(log => log.group_name === 'foo')).toBe(
      true,
    );
  });

  it('should filter logs by task', async () => {
    const res = await axios.get(`${TEST_SERVER_ROOT}/api/v1/logs/foo/t1`);
    // global.info(res.data);

    // All tasks should have the same name and group
    expect(res.data.data.logs.length).toBeGreaterThanOrEqual(TASKS_COUNT);
    expect(
      res.data.data.logs.every(
        log => log.group_name === 'foo' && log.task_name === 't1',
      ),
    ).toBe(true);
  });

  it('a log record should have expected properties', async () => {
    const res = await axios.get(
      `${TEST_SERVER_ROOT}/api/v1/logs/foo/t1?limit=1`,
    );
    const log = res.data.data.logs[0];
    // global.info(log);
    expect(log).toHaveProperty('group_name', expect.any(String));
    expect(log).toHaveProperty('task_name', expect.any(String));
    expect(log).toHaveProperty('created_at', expect.any(String));
    expect(log).toHaveProperty('cursor', expect.any(Number));
    expect(log).toHaveProperty('message', expect.any(String));
    expect(log).toHaveProperty('ref_id');
    expect(log).toHaveProperty('log_id');
    expect(log).toHaveProperty('data', expect.any(Object));
  });
});
