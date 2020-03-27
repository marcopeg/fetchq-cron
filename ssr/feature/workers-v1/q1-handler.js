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
      // TODO: the apply "res2json" should do the very same!!!
      rules: [
        {
          match: ['all'],
          apply: async ({ res }) => {
            let text = null;
            let body = null;

            try {
              text = await res.text();
            } catch (err) {}

            try {
              body = JSON.parse(text);
            } catch (err) {}

            return body || text;
          },
        },
        // {
        //   match: ['all'],
        //   apply: [
        //     'res2json',
        //     {
        //       text: 'text',
        //       body: 'body',
        //       errors: 'errors',
        //     },
        //   ],
        // },
      ],
    });

    // Here I control the variables that are exposed to the actions.
    // those may be forwarded as webhooks' parameters or POST body.
    return resolver(
      {
        payload: doc.payload.payload,
        schedule: doc.payload.schedule,
        iterations: doc.iterations,
        attempts: doc.attempts,
        created_at: doc.created_at,
        next_iteration: doc.next_iteration,
      },
      {
        withDetails: true,
      },
    );
  },
};

module.exports = async doc => {
  // console.log('>>', doc.subject);

  // Run the task's external action
  // Any NON-JSON response is treated as an error and rejected
  const actionHandler = actionHandlers[doc.payload.action.method];
  let actionResult = null;
  let actionDetails = null;
  try {
    [actionResult, actionDetails] = await actionHandler(doc);
  } catch (err) {
    return doc.reject(`Request failed: ${err.message}`, {
      details: {
        originalError: {
          name: err.name,
          type: err.type,
          message: err.message,
        },
      },
    });
  }

  // Logging package to be stored
  const hrTime = process.hrtime();
  const logInfo = {
    type: 'log',
    group_name: doc.payload.group_name,
    task_name: doc.payload.task_name,
    cursor: Math.floor(hrTime[0] * 1000000 + hrTime[1] / 1000),
    data: {
      ...actionDetails,
      response: {
        url: actionDetails.response.url,
        status: actionDetails.response.status,
        statusText: actionDetails.response.statusText,
        headers: actionDetails.response.headers,
        size: actionDetails.response.size,
      },
      result: actionResult,
    },
  };

  // console.log('****>>>>', actionResult);
  // console.log('****>>>>', actionDetails);

  // Log the entire response
  // try {
  //   const hrTime = process.hrtime();
  //   await doc.logError('response', {
  //     type: 'response',
  //     group_name: doc.payload.group_name,
  //     task_name: doc.payload.task_name,
  //     cursor: Math.floor(hrTime[0] * 1000000 + hrTime[1] / 1000),
  //     details: {
  //       ...actionDetails,
  //       response: {
  //         url: actionDetails.response.url,
  //         status: actionDetails.response.status,
  //         statusText: actionDetails.response.statusText,
  //         headers: actionDetails.response.headers,
  //         size: actionDetails.response.size,
  //       },
  //       result: actionResult,
  //     },
  //   });
  // } catch (err) {
  //   console.error(`Unable to log execution result: ${err.message}`);
  //   console.log(Object.keys(doc));
  // }

  // Handle a custom rejection based on the rules applied to the fetcher
  if (actionDetails.response.status >= 300) {
    const { status, statusText } = actionDetails.response;
    return doc.reject(`Invalid status code: ${status} ${statusText}`, {
      details: {
        ...logInfo,
        type: 'error',
      },
    });
  }

  /**
   * Handle TEXT ONLY response
   */
  if (typeof actionResult === 'string') {
    const { schedule } = doc.payload;
    const nextIteration = getNextIteration(schedule.method, schedule.value);

    // Log normal response
    const { status, statusText } = actionDetails.response;
    await doc.logError(`${status} ${statusText}`, {
      ...logInfo,
      type: 'response',
    });
    return doc.reschedule(nextIteration);
  }

  /**
   * Handle a JSON response
   */

  // Apply ajv validation to the webhook's response
  const [isValid, validationErrors] = validateWebhookResponse(actionResult);
  if (!isValid) {
    return doc.reject('Invalid webhook payload', {
      details: {
        ...logInfo,
        type: 'error',
      },
    });
  }

  // Log normal response
  const { status, statusText } = actionDetails.response;
  await doc.logError(`${status} ${statusText}`, {
    ...logInfo,
    type: 'response',
  });

  // Write logs using the document API
  if (actionResult.logs) {
    for (const log of actionResult.logs) {
      const { message, details = {}, refId = null } = log;
      await doc.logError(
        message,
        {
          ...logInfo,
          data: details,
        },
        refId,
      );
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
