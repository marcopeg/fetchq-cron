const globals = require('./jest.globals')();
module.exports = () => globals.serverIsUp('jest');
