const axios = require('axios');
const { runHookApp } = require('@forrestjs/hooks');
const serviceFetchq = require('../../ssr/service/service-fetchq');
const makeGlobals = require('../e2e/jest.globals');

const PWD_PATH = 'app.auth.console.password';

const runSeedSuite = ({ registerAction }) =>
  registerAction({
    hook: '$FINISH',
    handler: async ctx => {
      const fetchq = ctx.getContext('fetchq');

      // TODO: present a list of available suites and let the user decide
      const args = process.argv.slice(2);
      let suite = null;
      try {
        suite = require(`./${args[0]}.js`);
      } catch (err) {
        console.info('=======================');
        console.error('Seeder file not found!');
        console.info('=======================');
        console.info('\nUse the seeder command as:');
        console.info('\n  yarn seed {fileName}\n\n');
        process.exit();
      }

      const globals = makeGlobals();
      const { env, pause, serverIsUp } = globals;

      // Execute the suite
      try {
        await serverIsUp('foo');
        await suite({
          ...ctx,
          ...globals,
          query: fetchq.pool.query,
          setAppPassword: pwd => globals.setAppConfig(PWD_PATH, pwd),
        });
        console.info('>>> Done!');
      } catch (err) {
        console.error(err);
      }
    },
  });

runHookApp({
  trace: 'compact',
  settings: ({ setConfig, getConfig }) => {
    // Establish some kind of Postgres connection
    const LOCAL_PG = 'postgres://gitpod:gitpod@localhost:5432/postgres';
    setConfig('fetchq.connectionString', process.env.PGSTRING || LOCAL_PG);
  },
  services: [serviceFetchq],
  features: [runSeedSuite],
});
