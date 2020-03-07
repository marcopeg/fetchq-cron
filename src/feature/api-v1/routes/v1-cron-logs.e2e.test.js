const axios = require('axios');

describe('v1/cron', () => {
  const { TEST_SERVER_ROOT } = global.env;
  const t1 = {
    group_name: 'foo',
    task_name: 't5',
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
          iterationsLimit: 10,
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
    queueName = await global.getAppConfig('app.q1');
    originalDelay = await global.getQueueMaintenanceDelay(queueName);
  });

  // CLEANUP
  beforeEach(async () => {
    await axios.get(`${TEST_SERVER_ROOT}/test/schema-v1/reset`);
    await global.setQueueMaintenanceDelay(queueName, '1ms');
  });
  afterAll(async () => {
    await axios.get(`${TEST_SERVER_ROOT}/test/schema-v1/reset`);
    await global.setQueueMaintenanceDelay(queueName, originalDelay);
  });

  describe('logs', () => {
    it('should just work', async () => {
      // Push a document and await the completion of a few tasks in order
      // to produce a decent amount of logs.
      await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t1);
      await global.assertQueueIterations(queueName, 'foo__t5', 10);

      // TODO: build expectations on the logs
    });
  });
});
