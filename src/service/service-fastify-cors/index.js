const corsPlugin = require('fastify-cors');
const hooks = require('./hooks');

const onFastifyHacksBefore = ({ registerPlugin }) => {
  registerPlugin(corsPlugin, {
    // put your options here
  })
};

module.exports = ({ registerAction }) => {
  registerAction({
    hook: '$FASTIFY_PLUGIN',
    name: hooks.SERVICE_NAME,
    trace: __filename,
    handler: onFastifyHacksBefore,
  });
};
