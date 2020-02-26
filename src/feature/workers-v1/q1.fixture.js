/**
 * Each of those fixtures exposes a "task" and a "handler".
 *
 * The "handler" is setup as route only during testing.
 * (in the future we need to figure out a better way to solve this)
 *
 *
 */

exports.f1 = {
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

exports.f2 = {
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
      logs: [
        {
          message: 'log1',
          details: { a: 123 },
        },
        {
          message: 'log2',
          refId: 'xxx',
        },
      ],
    }),
  },
};

/**
 * Uses a POST webhook that receives variables from the
 * document's payload.
 *
 * The test handler's increases a counter and decorates
 * the payload with more informations.
 *
 * The handler is also responsible for changing the schedule
 * plan
 */
exports.f3 = {
  task: {
    subject: 'foo__t3',
    payload: {
      group_name: 'foo',
      task_name: 't1',
      schedule: {
        method: 'delay',
        value: '+1s',
      },
      action: {
        method: 'webhook',
        request: {
          type: 'rest',
          method: 'POST',
          url: '{{TEST_SERVER_ROOT}}/test/worker/v1/q1/foo__t3',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            payload: 'payload',
          },
        },
      },
      payload: {
        untouched: 'this prop will not be affected by the handler',
        count: 1,
      },
    },
  },
  handler: {
    method: 'POST',
    url: '/worker/v1/q1/foo__t3',
    handler: async request => {
      const { payload } = request.body;
      return {
        success: true,
        schedule: {
          method: 'delay',
          value: '+1m',
        },
        payload: {
          ...payload,
          count: payload.count + 1,
          now: new Date(),
        },
      };
    },
  },
};

/**
 * The task returns an invalid schema and should be
 * logged into the queue's errors table.
 */
exports.f4 = {
  task: {
    subject: 'foo__t4',
    payload: {
      group_name: 'foo',
      task_name: 't4',
      schedule: {
        method: 'delay',
        value: '+1s',
      },
      action: {
        method: 'webhook',
        request: {
          type: 'rest',
          method: 'GET',
          url: '{{TEST_SERVER_ROOT}}/test/worker/v1/q1/foo__t4',
        },
      },
      payload: {},
    },
  },
  handler: {
    method: 'GET',
    url: '/worker/v1/q1/foo__t4',
    handler: async request => {
      return {
        success: true,
      };
    },
  },
};
