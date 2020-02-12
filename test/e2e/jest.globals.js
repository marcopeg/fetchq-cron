// const axios = require('axios');
const getEnv = require('./jest.env');

const env = getEnv();

// const pause = (delay = 0) => new Promise((r) => setTimeout(r, delay));

// const assertQueueMetrics = async (queue, metric, value, { interval = 50 } = {}) => {
//   // eslint-disable-next-line no-constant-condition
//   let attempts = 0;
//   while (true) {
//     // eslint-disable-next-line no-await-in-loop
//     let doBreak = false;
//     try {
//       const r1 = await axios.post(`${env.TEST_SERVER_ROOT}/test/query`, {
//         query: `select * from fetchq_metric_compute('${queue}')`
//       });
//       if (r1.data[0][0][metric] >= value) {
//         doBreak = true;
//       }
//     } catch (err) {
//       console.error('@assertQueueMetrics', err.message);
//       attempts++;
//       await pause(1000);

//       if (attempts >= 10) {
//         console.error('@assertQueueMetrics', 'Max retries reached. Stopping')
//         break;
//       }
//     }

//     if (doBreak) break;

//     // eslint-disable-next-line no-await-in-loop
//     await pause(interval);
//   }
// };

// const seed = async (file, delay = 1000) => {
//   await axios.get(`${env.TEST_SERVER_ROOT}/test/dd/seed/${file}`);

//   await pause(delay);
// };

module.exports = () => ({
  env,
  // axios,
  // pause,
  // assertQueueMetrics,
  // seed,
});
