const axios = require('axios');

describe('v1/session/details', () => {
  const PWD_PATH = 'app.auth.console.password';
  const { TEST_SERVER_ROOT } = global.env;
  // let passwdSettings = null;

  // beforeAll(async () => {
  //   passwdSettings = await global.setAppConfig(PWD_PATH, null);
  // });

  // afterAll(async () => {
  //   await global.setAppConfig(PWD_PATH, passwdSettings.old);
  // });

  it('should receive a dummy session for a non secured instance', async () => {
    const passwdSettings = await global.setAppConfig(PWD_PATH, null);
    const res = await axios.get(`${TEST_SERVER_ROOT}/api/v1/session`);
    expect(res.data.success).toBe(true);
    expect(res.data.data.groups[0]).toBe('*');
    await global.setAppConfig(PWD_PATH, passwdSettings.old);
  });

  it('should receive an error for a secured instance and no login', async () => {
    const passwdSettings = await global.setAppConfig(PWD_PATH, 'foobar');
    const res = await axios.get(`${TEST_SERVER_ROOT}/api/v1/session?q=1`);
    expect(res.data.success).toBe(false);
    expect(res.data.errors[0].message).toBe('missing auth token');
    await global.setAppConfig(PWD_PATH, passwdSettings.old);
  });

  it('should validate a session via Authentication header', async () => {
    // Obtain a valid session token by authentication method
    const passwdSettings = await global.setAppConfig(PWD_PATH, 'foobar');
    const r1 = await axios.post(`${TEST_SERVER_ROOT}/api/v1/session`, {
      uname: 'console',
      passw: 'foobar',
    });
    // Check the session status by forwarding the session token
    const res = await axios.get(`${TEST_SERVER_ROOT}/api/v1/session?q=2`, {
      headers: {
        Authorization: `Bearer ${r1.data.data.token}`,
      },
    });
    // console.log(res.data);
    expect(res.data.success).toBe(true);
    expect(res.data.data.groups[0]).toBe('*');
    await global.setAppConfig(PWD_PATH, passwdSettings.old);
  });

  it('should fail to validate a session with a wrong signature', async () => {
    const passwdSettings = await global.setAppConfig(PWD_PATH, 'foobar');
    const res = await axios.get(`${TEST_SERVER_ROOT}/api/v1/session?q=2`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cHMiOlsiKiJdLCJpYXQiOjE1ODM3NDI1NDUsImV4cCI6MTU4Mzc0MjU0N30.D3E7MPe_uB7TrI-gSwh1Ij_8mefX17AjeRqQ434K7yI`,
      },
    });
    // console.log(res.data);
    expect(res.data.success).toBe(false);
    expect(res.data.errors[0].message).toBe('invalid signature');
    await global.setAppConfig(PWD_PATH, passwdSettings.old);
  });

  it('should fail to validate a session with an expired token', async () => {
    const passwdSettings = await global.setAppConfig(PWD_PATH, 'foobar');
    const res = await axios.get(`${TEST_SERVER_ROOT}/api/v1/session?q=2`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cHMiOlsiKiJdLCJpYXQiOjE1ODM3NDI1NDUsImV4cCI6MTU4Mzc0MjU0N30.5MsIEMv2zYmlC7i8dmZvMMunDElYv1N3Dp0ODR8UDOE`,
      },
    });
    // console.log(res.data);
    expect(res.data.success).toBe(false);
    expect(res.data.errors[0].message).toBe('jwt expired');
    await global.setAppConfig(PWD_PATH, passwdSettings.old);
  });
});
