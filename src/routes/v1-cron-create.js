const { Q1 } = require('../contants');
const { getNextIteration } = require('../lib/get-next-iteration');

const v1CronCreate = {
  method: 'POST',
  url: '/api/v1/cron/',
  schema: {
    body: {
      type: 'object',
      required: ['group_name', 'task_name', 'webhook', 'schedule'],
      additionalProperties: false,
      properties: {
        group_name: {
          type: 'string',
        },
        task_name: {
          type: 'string',
        },
        webhook: {
          type: 'object',
          required: ['url', 'auth'],
          properties: {
            url: {
              type: 'string',
            },
            auth: {
              type: 'string',
              enum: ['none', 'bearer'],
            },
          },
        },
        schedule: {
          type: 'object',
          required: ['method', 'value'],
          properties: {
            method: {
              type: 'string',
              // delay: 10s
              // cron: cron job schedule format
              // complete: 1 shot then complete
              // single: 1 shot then drop
              enum: ['delay', 'cron'],
            },
            value: {
              type: 'string',
            },
          },
        },
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
  },
  handler: async (request, reply) => {
    const { fetchq } = request;
    const { group_name, task_name, schedule } = request.body;

    const subject = `${group_name}__${task_name}`;
    const nextIteration = getNextIteration(schedule.method, schedule.value);

    const doc = {
      subject,
      payload: request.body,
      nextIteration,
    };

    const { queued_docs } = await fetchq.doc.push(Q1, doc);

    if (!queued_docs) {
      return reply.send({
        success: false,
        errors: [
          {
            message: 'cron already defined',
          },
        ],
      });
    }

    reply.send({
      success: true,
    });
  },
};

module.exports = { v1CronCreate };
