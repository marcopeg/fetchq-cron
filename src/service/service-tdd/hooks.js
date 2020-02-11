const { SERVICE } = require('@forrestjs/hooks');

const SERVICE_NAME = `${SERVICE} tdd`;
const TDD_FASTIFY_ROUTE = `${SERVICE_NAME}/tdd/fastify/route`;
const TDD_HTTP_MOCKS = `${SERVICE_NAME}/tdd/mocks/http`;

module.exports = {
  SERVICE_NAME,
  TDD_FASTIFY_ROUTE,
  TDD_HTTP_MOCKS,
};
