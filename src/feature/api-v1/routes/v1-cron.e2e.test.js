const axios = require('axios');

describe('v1/cron', () => {
  const { TEST_SERVER_ROOT } = global.env;
  const t1 = {
    group_name: 'foo',
    task_name: 't1',
    action: {
      method: 'webhook',
      endpoint: `${TEST_SERVER_ROOT}/test/w1`,
      auth: {
        method: 'none',
      },
    },
    schedule: {
      method: 'delay',
      value: '+1s',
    },
    payload: {},
  };

  // CLEANUP
  beforeEach(() => axios.get(`${TEST_SERVER_ROOT}/test/schema-v1/reset`));
  // afterAll(() => axios.get(`${TEST_SERVER_ROOT}/test/schema-v1/reset`));

  it('should upsert a new task', async () => {
    const r1 = await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t1);
    // console.info(r1.data);
    expect(r1.data.success).toBe(true);
    expect(r1.data.data.was_created).toBe(true);

    const r2 = await axios.get(`${TEST_SERVER_ROOT}/api/v1/cron/`);
    console.log(r2.data);
  });

  it('should upsert a existing task', async () => {
    await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t1);
    const res = await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t1);
    // console.info(res.data);
    expect(res.data.success).toBe(true);
    expect(res.data.data.was_created).toBe(false);
  });

  describe('list', () => {
    const t2 = { ...t1, task_name: 't2' };
    const t3 = { ...t1, task_name: 't3' };

    beforeEach(async () => {
      await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t1);
      await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t2);
      await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t3);
    });

    it('should fetch a list of tasks', async () => {
      const r1 = await axios.get(`${TEST_SERVER_ROOT}/api/v1/cron/`);
      expect(r1.data.success).toBe(true);
      expect(r1.data.data.tasks).toHaveLength(3);
    });
  });
});
