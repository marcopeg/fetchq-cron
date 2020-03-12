const axios = require('axios');

module.exports = async ({ env }) => {
  const { TEST_SERVER_ROOT } = env;

  const action = {
    method: 'webhook',
    request: {
      type: 'rest',
      url: `${TEST_SERVER_ROOT}/test/worker/v1/q1/foo__t1`,
    },
  };

  const schedule = {
    method: 'delay',
    value: '+1s',
  };

  const defaults = {
    action,
    schedule,
    payload: {},
  };

  // await setAppPassword(null);
  await axios.get(`${TEST_SERVER_ROOT}/test/schema-v1/reset`);
  await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, {
    ...defaults,
    group_name: 'mpeg',
    task_name: 't1',
    payload: {
      task: 'first',
    },
  });

  await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, {
    ...defaults,
    group_name: 'mpeg',
    task_name: 't2',
    payload: {
      task: 'second',
    },
  });

  await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, {
    ...defaults,
    group_name: 'foo',
    task_name: 't3',

    payload: {
      task: 'third',
    },
  });

  await axios.post(`${TEST_SERVER_ROOT}/api/v1/cron/`, {
    ...defaults,
    group_name: 'faa',
    task_name: 't4',

    payload: {
      task: 'fourth',
    },
  });
};
