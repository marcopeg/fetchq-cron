module.exports = {
  params: {
    type: 'object',
    additionalProperties: false,
    properties: {
      groupName: {
        type: 'string',
      },
      taskName: {
        type: 'string',
      },
    },
  },
};
