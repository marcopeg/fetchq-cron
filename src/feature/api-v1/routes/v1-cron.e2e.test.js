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
    const res = await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t1);
    // console.info(res.data);
    expect(res.data.success).toBe(true);
    expect(res.data.data.was_created).toBe(true);
  });

  it('should upsert a existing task', async () => {
    await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t1);
    const res = await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, t1);
    // console.info(res.data);
    expect(res.data.success).toBe(true);
    expect(res.data.data.was_created).toBe(false);
  });
});
