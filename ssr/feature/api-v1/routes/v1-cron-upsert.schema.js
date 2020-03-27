const { schedule } = require('../../../lib/ajv-schema');

// Should implement the schema of:
// https://github.com/marcopeg/npm-packages/tree/master/packages/fetch-resolver
const webhookRequest = {
  oneOf: [
    {
      type: 'object',
      required: ['type', 'url'],
      properties: {
        type: {
          type: 'string',
          enum: ['rest', 'graphql'],
        },
        url: {
          type: 'string',
        },
      },
    },
  ],
};

const action = {
  type: 'object',
  required: ['method', 'request'],
  additionalProperties: false,
  properties: {
    method: {
      type: 'string',
      enum: ['webhook'],
    },
    request: webhookRequest,
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
      description: {
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
