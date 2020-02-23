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
  // response: {
  //   '2xx': {
  //     type: 'object',
  //     required: ['success'],
  //     properties: {
  //       success: {
  //         type: 'boolean',
  //       },
  //       data: {
  //         type: 'object',
  //         default: {},
  //         additionalProperties: true,
  //       },
  //       errors: {
  //         type: 'array',
  //         items: {
  //           type: 'object',
  //           required: ['message'],
  //           properties: {
  //             message: {
  //               type: 'string',
  //             },
  //           },
  //         },
  //         default: [],
  //       },
  //     },
  //   },
  // },
};
