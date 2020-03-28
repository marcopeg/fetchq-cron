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

  describe('list', () => {
    const t2 = { ...t1, task_name: 't2' };
    const t3 = { ...t1, task_name: 't3' };
    const t4 = { ...t1, task_name: 't4', group_name: 'faa' };
    const t5 = { ...t1, task_name: 't5', group_name: 'faa' };
    const t6 = { ...t1, task_name: 't6', group_name: 'faa' };

    beforeEach(async () => {
      await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t1);
      await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t2);
      await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t3);
      await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t4);
      await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t5);
      await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t6);
    });

    it('should fetch all the available tasks', async () => {
      const r1 = await axios.get(`${TEST_SERVER_ROOT}/api/v1/cron/`);
      expect(r1.data.success).toBe(true);
      expect(r1.data.data.tasks).toHaveLength(6);
    });

    it('should fetch a limited amount of tasks', async () => {
      const r1 = await axios.get(`${TEST_SERVER_ROOT}/api/v1/cron/?limit=1`);
      expect(r1.data.success).toBe(true);
      expect(r1.data.data.tasks).toHaveLength(1);
    });

    it('should paginate with a cursor based on created date', async () => {
      const r1 = await axios.get(`${TEST_SERVER_ROOT}/api/v1/cron/?limit=1`);
      const cursor = r1.data.data.tasks[0].next_iteration;

      const r2 = await axios.get(
        `${TEST_SERVER_ROOT}/api/v1/cron/?limit=1&cursor=${cursor}`,
      );

      expect(r1.data.data.tasks[0].subject).toBe('faa/t6');
      expect(r2.data.data.tasks[0].subject).toBe('faa/t5');
    });

    it('should fetch tasks by group', async () => {
      const r1 = await axios.get(`${TEST_SERVER_ROOT}/api/v1/cron/?group=foo`);
      expect(r1.data.success).toBe(true);
      expect(r1.data.data.tasks).toHaveLength(3);
    });
  });
});
