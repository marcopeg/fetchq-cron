const createFetchResolver = require('fetch-resolver').default;
const { getNextIteration } = require('../../lib/get-next-iteration');
const {
  validateWebhookResponse,
} = require('../../lib/validate-webhook-response');

const actionHandlers = {
  webhook: async doc => {
    const resolver = createFetchResolver({
      ...doc.payload.action.request,

      /**
       * These rules are intended to catch particular returning data
       * structures from the webhook.
       *
       * So far it handles http status code errors > 400 and trigger
       * a forced rejection that is handled later in the worker function.
       */
      rules: [
        {
          match: ['statusError'],
          apply: [
            'res2json',
            {
              reject: true,
              details: {
                statusCode: 'res.status',
                statusText: 'res.statusText',
                content: 'text',
              },
            },
          ],
        },
      ],
    });

    // Here I control the variables that are exposed to the actions.
    // those may be forwarded as webhooks' parameters or POST body.
    return resolver({
      payload: doc.payload.payload,
      schedule: doc.payload.schedule,
      iterations: doc.iterations,
      attempts: doc.attempts,
      created_at: doc.created_at,
      next_iteration: doc.next_iteration,
    });
  },
};

module.exports = async doc => {
  // console.log('>>', doc.subject);

  // Run the task's external action
  // Any NON-JSON response is treated as an error and rejected
  const actionHandler = actionHandlers[doc.payload.action.method];
  let actionResult = null;
  try {
    actionResult = await actionHandler(doc);
  } catch (err) {
    return doc.reject('failed communication toward webhook', {
      details: {
        originalError: {
          name: err.name,
          type: err.type,
          message: err.message,
        },
      },
    });
  }

  // console.log('****>>>>', actionResult);

  // Handle a custom rejection based on the rules applied to the fetcher
  if (actionResult.reject) {
    return doc.reject('webhook returned an error status code', {
      details: actionResult.details,
    });
  }

  // Apply ajv validation to the webhook's response
  const [isValid, validationErrors] = validateWebhookResponse(actionResult);
  if (!isValid) {
    return doc.reject('failed webhook payload validation', {
      details: validationErrors,
    });
  }

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
