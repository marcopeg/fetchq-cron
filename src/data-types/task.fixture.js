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

// Pending task
export const f2 = {
  task: {
    subject: 'test/long-poll',
    version: 0,
    priority: 0,
    status: 2,
    attempts: 1,
    iterations: 4,
    next_iteration: new Date(Date.now() + 1000 * 50),
    lock_upgrade: null,
    created_at: '2020-04-03T11:56:13.374Z',
    last_iteration: '2020-04-03T11:58:19.457Z',
    payload: {
      action: {
        method: 'webhook',
        request: {
          url: 'https://8hz1q.sse.codesandbox.io/',
          body: {},
          type: 'rest',
          method: 'GET',
          headers: [],
        },
      },
      payload: {},
      schedule: { value: '1s', method: 'delay' },
      task_name: 'long-poll',
      group_name: 'test',
    },
  },
};

// Orhpan task
export const f3 = {
  task: {
    subject: 'test/long-poll',
    version: 0,
    priority: 0,
    status: 2,
    attempts: 1,
    iterations: 4,
    next_iteration: new Date(Date.now() - 1000 * 50),
    lock_upgrade: null,
    created_at: '2020-04-03T11:56:13.374Z',
    last_iteration: '2020-04-03T11:58:19.457Z',
    payload: {
      action: {
        method: 'webhook',
        request: {
          url: 'https://8hz1q.sse.codesandbox.io/',
          body: {},
          type: 'rest',
          method: 'GET',
          headers: [],
        },
      },
      payload: {},
      schedule: { value: '1s', method: 'delay' },
      task_name: 'long-poll',
      group_name: 'test',
    },
  },
};

// Killed task
export const f4 = {
  task: {
    subject: 'test/long-poll',
    version: 0,
    priority: 0,
    status: -1,
    attempts: 1,
    iterations: 4,
    next_iteration: new Date(Date.now() - 1000 * 60 * 60 * 10),
    lock_upgrade: null,
    created_at: '2020-04-03T11:56:13.374Z',
    last_iteration: '2020-04-03T11:58:19.457Z',
    payload: {
      action: {
        method: 'webhook',
        request: {
          url: 'https://8hz1q.sse.codesandbox.io/',
          body: {},
          type: 'rest',
          method: 'GET',
          headers: [],
        },
      },
      payload: {},
      schedule: { value: '1s', method: 'delay' },
      task_name: 'long-poll',
      group_name: 'test',
    },
  },
};

// Completed task
export const f5 = {
  task: {
    subject: 'test/long-poll',
    version: 0,
    priority: 0,
    status: 3,
    attempts: 1,
    iterations: 4,
    next_iteration: new Date(Date.now() - 1000 * 60 * 60 * 10),
    lock_upgrade: null,
    created_at: '2020-04-03T11:56:13.374Z',
    last_iteration: '2020-04-03T11:58:19.457Z',
    payload: {
      action: {
        method: 'webhook',
        request: {
          url: 'https://8hz1q.sse.codesandbox.io/',
          body: {},
          type: 'rest',
          method: 'GET',
          headers: [],
        },
      },
      payload: {},
      schedule: { value: '1s', method: 'delay' },
      task_name: 'long-poll',
      group_name: 'test',
    },
  },
};
