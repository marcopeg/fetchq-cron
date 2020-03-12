const axios = require('axios');

module.exports = async ({ setAppPassword }) => {
  await setAppPassword('foobar');
};
