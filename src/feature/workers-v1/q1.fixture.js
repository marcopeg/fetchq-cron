const t1 = {
  subject: 'foo__t1',
  version: 0,
  priority: 0,
  status: 2,
  attempts: 0,
  iterations: 1,
  lock_upgrade: null,
  created_at: '2020-02-14 11:41:36.755532+00',
  last_iteration: '2020-02-14 11:41:40.153691+00',
  payload: {
    group_name: 'foo',
    task_name: 't1',
    schedule: {
      value: '+1s',
      method: 'delay',
    },
    action: {
      method: 'webhook',
      request: {
        type: 'rest',
        url: '{{TEST_SERVER_ROOT}}/test/worker/v1/q1/foo__t1',
      },
    },
    payload: {},
  },
};

module.exports = { t1 };
