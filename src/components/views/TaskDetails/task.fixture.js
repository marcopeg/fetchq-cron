export const f1 = {
  task: {
    subject: 'foo/t1',
    version: 0,
    priority: 0,
    status: 0,
    attempts: 0,
    iterations: 22,
    next_iteration: new Date(Date.now() + 1000 * 60 * 2 + 29000),
    lock_upgrade: null,
    created_at: '2020-03-28T08:10:41.281Z',
    last_iteration: null,
    payload: {
      action: {
        method: 'webhook',
        request: {
          url: 'http://localhost:8080/test/w1',
          type: 'rest',
        },
      },
      payload: {},
      schedule: {
        value: '+1s',
        method: 'delay',
      },
      task_name: 't1',
      group_name: 'foo',
      description: 'This is a demo task, should cleanup some database',
    },
  },
};
