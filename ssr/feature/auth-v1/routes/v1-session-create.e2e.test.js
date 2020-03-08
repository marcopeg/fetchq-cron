const axios = require('axios');

const PWD_PATH = 'app.auth.console.password';

describe('v1/session', () => {
  const { TEST_SERVER_ROOT } = global.env;

  it('should authenticate without a password', async () => {
    const passwdSettings = await global.setAppConfig(PWD_PATH, null);

    const res = await axios.post(`${TEST_SERVER_ROOT}/api/v1/session`, {
      uname: 'console',
      passw: '',
    });

    global.info(res.headers);
    global.info(res.data);

    await global.setAppConfig(PWD_PATH, passwdSettings.old);
  });
});
