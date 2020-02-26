// Should implement the schema of:
// https://github.com/marcopeg/npm-packages/tree/master/packages/fetch-resolver
const webhookRequest = {
  oneOf: [
    {
      type: 'object',
      required: ['url'],
      properties: {
        type: {
          type: 'string',
          enum: ['rest', 'graphql'],
          default: 'rest',
        },
        url: {
          type: 'string',
        },
      },
    },
  ],
};

const action = {
  oneOf: [
    {
      type: 'object',
      required: ['method', 'request'],
      properties: {
        method: {
          type: 'string',
          enum: ['webhook'],
        },
        request: webhookRequest,
      },
    },
  ],
};

// TODO: this is duplicate from webhook response validation
//       and should go into a library of shared schemas
const schedule = {
  type: 'object',
  required: ['method', 'value'],
  properties: {
    method: {
      type: 'string',
      // delay: 10s
      // cron: cron job schedule format
      // plan: set a specific date
      // ??? not implemented yet ???
      // complete: 1 shot then complete
      // single: 1 shot then drop
      enum: ['delay', 'cron', 'plan'],
    },
    value: {
      type: 'string',
    },
  },
};

module.exports = {
  body: {
    type: 'object',
    required: ['group_name', 'task_name', 'action', 'schedule'],
    additionalProperties: false,
    properties: {
      group_name: {
        type: 'string',
      },
      task_name: {
        type: 'string',
      },
      action,
      schedule,
      payload: {
        type: 'object',
        default: {},
      },
    },
  },
  response: {
    '2xx': {
      type: 'object',
      required: ['success'],
      properties: {
        success: {
          type: 'boolean',
        },
        data: {
          type: 'object',
          default: {},
          additionalProperties: true,
        },
        errors: {
          type: 'array',
          items: {
            type: 'object',
            required: ['message'],
            properties: {
              message: {
                type: 'string',
              },
            },
          },
          default: [],
        },
      },
    },
  },
};
