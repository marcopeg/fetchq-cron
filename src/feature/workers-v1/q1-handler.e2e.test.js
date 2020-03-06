const handler = require('./q1-handler');
const fixture = require('./q1.fixture');

const makeTask = task =>
  JSON.parse(
    JSON.stringify(task).replace(
      /{{TEST_SERVER_ROOT}}/g,
      global.env.TEST_SERVER_ROOT,
    ),
  );

const deepLog = arg => console.info(JSON.stringify(arg, null, 2));
const deepLogArgs = (...args) => deepLog(args);

const makeHandlerWithReject = async (payload, debugFn) => {
  const doc = {
    ...makeTask(fixture.f4.task),
    reject: debugFn ? jest.fn(debugFn) : jest.fn(),
  };

  doc.payload.payload = payload;
  const result = await handler(doc);
  return [doc, result];
};

const expectReject = (doc, errorMessage) =>
  expect(doc.reject).toHaveBeenCalledWith(errorMessage, {
    details: expect.any(Object),
  });

describe('v1/q1-handler', () => {
  describe('method:webhook', () => {
    describe('rest/GET', () => {
      it('should reschedule from the task definition', async () => {
        const doc = {
          ...makeTask(fixture.f1.task),
          reschedule: (...args) => args,
        };

        const [p1, p2] = await handler(doc);
        expect(p1).toBe('+1s');
        expect(p2.payload.payload.count).toBe(1);
      });

      it('should reschedule from the response', async () => {
        const doc = {
          ...makeTask(fixture.f2.task),
          reschedule: (...args) => args,
          logError: () => {},
        };

        const [p1, p2] = await handler(doc);
        expect(p1).toBe('+1m');
        expect(p2.payload.payload.count).toBe(1);
        expect(p2.payload.payload.foo).toBe('abc');
      });

      it('should add a log out of the webhook response', async () => {
        const logError = jest.fn(async (msg, details, refId) => {
          //   console.log({ msg, details, refId });
          return true;
        });
        const doc = {
          ...makeTask(fixture.f2.task),
          reschedule: (...args) => args,
          logError,
        };

        const [p1, p2] = await handler(doc);
        // console.log(p1, p2);

        expect(logError.mock.calls.length).toBe(2);
        expect(logError).toHaveBeenCalledWith('log1', { a: 123 }, null);
        expect(logError).toHaveBeenCalledWith('log2', {}, 'xxx');
      });
    });

    describe('rest/POST', () => {
      it('should reschedule from the task definition', async () => {
        const doc = {
          ...makeTask(fixture.f3.task),
          reschedule: (...args) => args,
        };

        const [p1, p2] = await handler(doc);
        // console.log(p1, p2);
        expect(p1).toBe('+1m');
        expect(p2.payload.payload.count).toBe(2);
      });
    });

    describe('webhook response validation', () => {
      const testCases = [
        [
          'should detect and log a wrong response schema',
          { foo: 123, aaa: 'hoho' },
        ],
        [
          'should require mandatory logs when success=false',
          { success: false },
        ],
        [
          'should detect a wrong scheduling payload type',
          { success: true, schedule: 'foo' },
        ],
        [
          'should detect a wrong scheduling method',
          {
            success: true,
            schedule: { method: 'xxx', value: 'hoho' },
          },
        ],
        [
          'should detect a wrong payload type in a log request keyword',
          {
            success: true,
            logs: { foo: 123 },
          },
        ],
        [
          'should detect a wrong payload type in a log request item',
          {
            success: true,
            logs: [{ wrogKey: '123' }],
          },
        ],
      ];

      testCases.forEach(([message, payload]) =>
        it(message, async () => {
          const [doc] = await makeHandlerWithReject(payload);
          expect(doc.reject.mock.calls.length).toBe(1);
          expectReject(doc, 'failed webhook payload validation');
        }),
      );
    });

    describe('webhook response code & types', () => {
      it('should detect a non 200 response and log it', async () => {
        const [doc] = await makeHandlerWithReject(
          {
            status: 400,
            payload: {
              success: false,
              foo: 123,
            },
          },
          // deepLogArgs,
        );
        expect(doc.reject.mock.calls.length).toBe(1);
        expectReject(doc, 'webhook returned an error status code');
      });

      it('should detect a NON-JSON response and throw an error', async () => {
        const [doc] = await makeHandlerWithReject(
          {
            status: 200,
            payload: '+ok',
          },
          // deepLogArgs,
        );

        expect(doc.reject.mock.calls.length).toBe(1);
        expectReject(doc, 'failed communication toward webhook');
      });
    });
  });
});
