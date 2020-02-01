const v1QueueDrop = {
  method: 'DELETE',
  url: '/api/v1/queue/',
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
        },
      },
    },
    response: {
      '2xx': {
        type: 'object',
        required: ['success', 'data', 'errors'],
        properties: {
          success: {
            type: 'boolean',
          },
          data: {
            type: 'object',
            properties: {
              was_dropped: {
                type: 'boolean',
              },
            },
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
    const { name } = body;

    const { was_dropped } = await fetchq.queue.drop(name);

    reply.send({
      success: true,
      data: { was_dropped },
      errors: [],
    });
  },
};

module.exports = { v1QueueDrop };
