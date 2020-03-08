const Ajv = require('ajv');
const { schedule } = require('./ajv-schema');

const ajv = new Ajv();

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
    refId: {
      type: 'string',
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
  // If "success:false", "logs[]" are mandatory
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
