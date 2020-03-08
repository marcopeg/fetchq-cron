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

    expect(res.data.success).toBe(true);
    expect(res.data.data.groups[0]).toBe('*');
    expect(res.data.data.token.length).toBeGreaterThan(50);
    expect(res.headers['set-cookie'].some($ => $.includes('auth='))).toBe(true);

    await global.setAppConfig(PWD_PATH, passwdSettings.old);
  });

  it('should authenticate with a custom password', async () => {
    const passwdSettings = await global.setAppConfig(PWD_PATH, 'foobar');
    const res = await axios.post(`${TEST_SERVER_ROOT}/api/v1/session`, {
      uname: 'console',
      passw: 'foobar',
    });

    expect(res.data.success).toBe(true);
    expect(res.data.data.groups[0]).toBe('*');
    expect(res.data.data.token.length).toBeGreaterThan(50);
    expect(res.headers['set-cookie'].some($ => $.includes('auth='))).toBe(true);

    await global.setAppConfig(PWD_PATH, passwdSettings.old);
  });

  it('should deny authentication in case of a custom secret and wrong password', async () => {
    const passwdSettings = await global.setAppConfig(PWD_PATH, 'foobar');
    const res = await axios.post(`${TEST_SERVER_ROOT}/api/v1/session`, {
      uname: 'console',
      passw: 'wtf',
    });

    expect(res.data.success).toBe(false);
    expect(res.data.errors[0].message).toBe('Authentication failed');
  });

  it('should deny authentication in case of a custom secret and empty password', async () => {
    const passwdSettings = await global.setAppConfig(PWD_PATH, 'foobar');
    const res = await axios.post(`${TEST_SERVER_ROOT}/api/v1/session`, {
      uname: 'console',
      passw: '',
    });

    expect(res.data.success).toBe(false);
    expect(res.data.errors[0].message).toBe('Authentication failed');
  });

  it('should deny authentication in case of a null secret and wrong', async () => {
    const passwdSettings = await global.setAppConfig(PWD_PATH, null);
    const res = await axios.post(`${TEST_SERVER_ROOT}/api/v1/session`, {
      uname: 'foobar',
      passw: '',
    });

    expect(res.data.success).toBe(false);
    expect(res.data.errors[0].message).toBe('Authentication failed');
  });
});
