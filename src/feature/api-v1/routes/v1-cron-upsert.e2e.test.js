const axios = require('axios');

describe('v1/cron/upsert', () => {
  const { TEST_SERVER_ROOT } = global.env;
  it('should work', async () => {
    const res = await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, {
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
    });

    console.info(res.data);
    expect(res.data.success).toBe(true);
  });
});
