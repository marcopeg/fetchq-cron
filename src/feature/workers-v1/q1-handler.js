const createFetchResolver = require('fetch-resolver').default;
const { getNextIteration } = require('../../lib/get-next-iteration');

const actionHandlers = {
  webhook: async doc => {
    const resolver = createFetchResolver(doc.payload.action.request);

    // Here I control the variables that are exposed to the actions.
    // those may be forwarded as webhooks' parameters or POST body.
    return resolver({
      payload: doc.payload.payload,
      schedule: doc.payload.schedule,
    });
  },
};

module.exports = async doc => {
  // console.log('>>', doc.subject);

  // Run the task's external action
  const actionHandler = actionHandlers[doc.payload.action.method];
  const actionResult = await actionHandler(doc);
  //   console.log(actionResult);

  // @TODO: ajv the actionResult against a schema

  // Write logs using the document API
  if (actionResult.logs) {
    for (const log of actionResult.logs) {
      const { message, details = {}, refId = null } = log;
      await doc.logError(message, details, refId);
    }
  }

  // Calculate next iteration
  const schedule = {
    ...doc.payload.schedule,
    ...(actionResult.schedule || {}),
  };

  // Extend the internal task's payload
  const payload = {
    ...doc.payload.payload,
    ...(actionResult.payload || {}),
  };

  // Calculate full payload and nextIteration
  const nextIteration = getNextIteration(schedule.method, schedule.value);
  const nextPayload = {
    ...doc.payload,
    schedule,
    payload,
  };

  return doc.reschedule(nextIteration, { payload: nextPayload });
};
