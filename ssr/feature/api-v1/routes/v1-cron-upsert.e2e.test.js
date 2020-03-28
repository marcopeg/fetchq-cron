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

  describe('upsert', () => {
    it('should upsert a new task with a delay', async () => {
      const r1 = await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t1);
      // global.info(r1.data);
      expect(r1.data.success).toBe(true);
      expect(r1.data.data.was_created).toBe(true);

      // Assert on the delay
      const ni = new Date(r1.data.data.next_iteration);
      const ct = new Date(r1.data.data.created_at);
      expect(ni - ct).toBeLessThanOrEqual(1000);
    });

    it('should upsert a new task at a specific point in time', async () => {
      const r1 = await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, {
        ...t1,
        schedule: {
          method: 'plan',
          value: '2012-12-26T12:00:00Z',
        },
      });
      //   console.info(r1.data);
      expect(r1.data.success).toBe(true);
      expect(r1.data.data.was_created).toBe(true);
      expect(r1.data.data.next_iteration).toBe('2012-12-26T12:00:00.000Z');
    });

    it('should upsert a new task with a cron strategy', async () => {
      const r1 = await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, {
        ...t1,
        schedule: {
          method: 'cron',
          value: '* * * * *',
        },
      });
      const dateNext = new Date(r1.data.data.next_iteration);
      const dateCreate = new Date(r1.data.data.created_at);
      expect(dateNext - dateCreate).toBeLessThanOrEqual(60000);
    });

    it('should upsert a existing task', async () => {
      await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t1);
      const res = await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t1);
      // console.info(res.data);
      expect(res.data.success).toBe(true);
      expect(res.data.data.was_created).toBe(false);
    });

    it('should not upsert an existing task in strict mode', async () => {
      const url = `${TEST_SERVER_ROOT}/api/v1/cron?mode=insert`;
      const r1 = await axios.post(url, t1);
      const r2 = await axios.post(url, t1);

      // global.info(r1.data);
      // global.info(r2.data);

      expect(r1.data.success).toBe(true);
      expect(r1.data.data.was_created).toBe(true);
      expect(r2.data.success).toBe(false);
      expect(r2.data.errors[0].message).toBe('task exists');
    });
  });
});
