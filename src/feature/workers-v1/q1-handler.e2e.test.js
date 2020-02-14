const handler = require('./q1-handler');
const fixture = require('./q1.fixture');

describe('v1/q1-handler', () => {
  const t1 = JSON.parse(
    JSON.stringify(fixture.t1).replace(
      /{{TEST_SERVER_ROOT}}/g,
      global.env.TEST_SERVER_ROOT,
    ),
  );

  it('should work', async () => {
    // console.log(global.env.TEST_SERVER_ROOT);
    // console.log(t1);
    const doc = {
      ...t1,
      complete: () => {},
    };

    const res = await handler(doc);

    console.log(res);
  });
});
