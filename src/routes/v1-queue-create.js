const v1QueueCreate = {
  method: 'POST',
  url: '/api/v1/queue/',
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
        },
        enable_notifications: {
          type: 'boolean',
          default: true,
        },
        max_attempts: {
          type: 'number',
          default: 3,
        },
        errors_retention: {
          type: 'string',
          default: '10m',
        },
        webhook_url: {
          type: 'string',
          default: '',
        },
        webhook_token: {
          type: 'string',
          default: '',
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
            properties: {
              was_created: {
                type: 'boolean',
              },
            },
            default: {},
          },
          errors: {
            type: 'object',
            default: [],
          },
        },
      },
    },
  },
  handler: async (request, reply) => {
    const { fetchq, body } = request;
    const {
      name,
      enable_notifications: enableNotifications,
      max_attempts: maxAttempts,
      errors_retention: errorsRetention,
      webhook_url: webhookUrl,
      webhook_token: webhookToken,
    } = body;

    // Upsert queue & apply basic configs
    const { queue_id: queueId, was_created } = await fetchq.queue.create(name);
    await fetchq.queue.enableNotifications(name, enableNotifications);
    await fetchq.queue.setMaxAttempts(name, maxAttempts);
    await fetchq.queue.setErrorsRetention(name, errorsRetention);

    // Update the settings with the webhook configuration
    const settingsSQL = `
      UPDATE "fetchq_catalog"."fetchq_sys_queues" 
      SET config = jsonb_set(jsonb_set(config, '{webhook_token}', to_jsonb($1::text)), '{webhook_url}', to_jsonb($2::text))
      WHERE id = $3;`;

    await fetchq.pool.query(settingsSQL, [webhookToken, webhookUrl, queueId]);

    reply.send({
      success: true,
      data: { was_created },
    });
  },
};

module.exports = { v1QueueCreate };
