const axios = require('axios');

describe('v1/cron', () => {
  const { TEST_SERVER_ROOT } = global.env;
  const t1 = {
    group_name: 'foo',
    task_name: 't1',
    description: 'fooo',
    action: {
      method: 'webhook',
      request: {
        type: 'rest',
        url: `${TEST_SERVER_ROOT}/test/w1`,
      },
    },
    schedule: {
      method: 'delay',
      value: '+1s',
    },
    payload: {},
  };

  // CLEANUP
  beforeEach(async () => {
    await axios.get(`${TEST_SERVER_ROOT}/test/schema-v1/reset`);
    await axios.get(`${TEST_SERVER_ROOT}/test/schema-v1/queues/stop`);
  });
  afterAll(async () => {
    await axios.get(`${TEST_SERVER_ROOT}/test/schema-v1/reset`);
    await axios.get(`${TEST_SERVER_ROOT}/test/schema-v1/queues/start`);
  });

  describe('details', () => {
    beforeEach(async () => {
      await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t1);
    });

    it('should show details for a single task', async () => {
      const r1 = await axios.get(`${TEST_SERVER_ROOT}/api/v1/cron/foo/t1`);
      expect(r1.data.success).toBe(true);
      expect(r1.data.data.task.subject).toBe('foo/t1');
      expect(r1.data.data.task).toHaveProperty('payload');
      // global.info(r1.data.data);
    });

    it('should return an error if the task was not found', async () => {
      const r1 = await axios.get(`${TEST_SERVER_ROOT}/api/v1/cron/foo/t2`);
      // global.info(r1.data);
      expect(r1.data.success).toBe(false);
      expect(r1.data.errors[0].message).toBe('task not found');
    });
  });
});
