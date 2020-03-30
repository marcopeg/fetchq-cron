module.exports = {
  query: {
    type: 'object',
    additionalProperties: false,
    properties: {
      group: {
        type: 'string',
      },
      limit: {
        type: 'integer',
      },
      cursor: {
        type: 'string',
      },
      reverse: {
        type: 'boolean',
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
