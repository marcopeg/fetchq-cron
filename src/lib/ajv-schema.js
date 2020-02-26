/**
 * Contains reusable portions of AJV schemas
 */

const schedule = {
  type: 'object',
  required: ['method', 'value'],
  additionalProperties: false,
  properties: {
    method: {
      type: 'string',
      enum: ['delay', 'cron', 'plan'],
    },
    value: {
      type: 'string',
    },
  },
};

module.exports = { schedule };
