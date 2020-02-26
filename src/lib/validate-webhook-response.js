const Ajv = require('ajv');

const ajv = new Ajv();

// TODO: this is duplicate from the API feature and should go into a library
//       of shared schemas
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

const log = {
  type: 'object',
  required: ['message'],
  additionalProperties: false,
  properties: {
    message: {
      type: 'string',
    },
    details: {
      type: 'object',
    },
  },
};

const validate = ajv.compile({
  type: 'object',
  required: ['success'],
  properties: {
    success: {
      type: 'boolean',
    },
    schedule,
    payload: {
      type: 'object',
    },
    logs: {
      type: 'array',
      items: log,
    },
  },
  // If "success:false", "logs" are mandatory
  if: {
    properties: {
      success: {
        const: false,
      },
    },
  },
  then: {
    required: ['logs'],
    properties: {
      logs: {
        minItems: 1,
      },
    },
  },
});

const validateWebhookResponse = data => [validate(data), validate.errors];

module.exports = { validateWebhookResponse };
