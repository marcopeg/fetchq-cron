const createFetchResolver = require('fetch-resolver').default;

const actionHandlers = {
  webhook: async doc => {
    const resolver = createFetchResolver(doc.payload.action.request);
    return resolver(doc.payload.payload);
  },
};

module.exports = async doc => {
  console.log('>>', doc.subject);

  // Run the external action
  const actionHandler = actionHandlers[doc.payload.action.method];
  const actionResult = await actionHandler(doc);
  console.log(actionResult);

  // Calculate exit action

  return doc.complete();
};
