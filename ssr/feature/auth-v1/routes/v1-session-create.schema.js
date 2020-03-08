module.exports = {
  body: {
    type: 'object',
    required: ['uname', 'passw'],
    additionalProperties: false,
    properties: {
      uname: {
        type: 'string',
      },
      passw: {
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
