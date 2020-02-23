const envalid = require('envalid');

// Setup the internal connection to the backend using
// environment variables and some guesswork for
// CodeSanbox.
const BACKEND_ROOT = (() => {
  if (process.env.SERVER_ROOT) {
    return process.env.SERVER_ROOT;
  }

  if (process.env.SANDBOX_URL) {
    return process.env.SANDBOX_URL;
  }

  if (process.env.HOSTNAME) {
    try {
      const sandboxId = process.env.HOSTNAME.split('-')[2];
      return `https://${sandboxId}.sse.codesandbox.io`;
    } catch (err) {
      return null;
    }
  }

  // Apply default if running in localhost
  return 'http://localhost:8080';
})();

module.exports = () =>
  envalid.cleanEnv(process.env, {
    TEST_SERVER_ROOT: envalid.url({
      default: BACKEND_ROOT,
    }),
    TEST_STATUS_CHECK_URL: envalid.url({
      default: `${BACKEND_ROOT}/test/status`,
    }),
    TEST_STATUS_CHECK_INTERVAL: envalid.num({ default: 250 }),
  });
