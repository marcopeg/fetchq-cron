const f1 = {
  task: {
    subject: 'foo__t1',
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
      payload: {
        count: 1,
      },
    },
  },
  handler: {
    method: 'GET',
    url: '/worker/v1/q1/foo__t1',
    handler: async () => ({}),
  },
};

const f2 = {
  task: {
    subject: 'foo__t2',
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
          url: '{{TEST_SERVER_ROOT}}/test/worker/v1/q1/foo__t2',
        },
      },
      payload: {
        count: 1,
      },
    },
  },
  handler: {
    method: 'GET',
    url: '/worker/v1/q1/foo__t2',
    handler: async () => ({
      success: true,
      schedule: {
        method: 'delay',
        value: '+1m',
      },
      payload: {
        foo: 'abc',
      },
    }),
  },
};

module.exports = { f1, f2, handlers: [f1.handler, f2.handler] };
