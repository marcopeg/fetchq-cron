const createFetchResolver = require('fetch-resolver').default;
const { getNextIteration } = require('../../lib/get-next-iteration');

const actionHandlers = {
  webhook: async doc => {
    const resolver = createFetchResolver(doc.payload.action.request);
    return resolver(doc.payload.payload);
  },
};

module.exports = async doc => {
  // console.log('>>', doc.subject);

  // Run the task's external action
  const actionHandler = actionHandlers[doc.payload.action.method];
  const actionResult = await actionHandler(doc);

  // Calculate next iteration
  const schedule = actionResult.schedule || doc.payload.schedule;
  const nextIteration = getNextIteration(schedule.method, schedule.value);

  // Calculate next payload
  const payload = {
    ...doc.payload.payload,
    ...(actionResult.payload || {}),
  };

  return doc.reschedule(nextIteration, { payload });
};
