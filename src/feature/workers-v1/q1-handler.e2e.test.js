const handler = require('./q1-handler');
const fixture = require('./q1.fixture');

const makeTask = task =>
  JSON.parse(
    JSON.stringify(task).replace(
      /{{TEST_SERVER_ROOT}}/g,
      global.env.TEST_SERVER_ROOT,
    ),
  );

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
  });
});
