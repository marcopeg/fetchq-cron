# Fetchq Cron

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

[![Open in GitPod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/marcopeg/fetchq-cron)

## Local Development

```bash
PGSTRING=postgres://... \
NODE_ENV=development \
yarn start
```

Or with docker:

```bash
# start the service
make start

# stop the service
make stop

# start e2e TDD session
# (run this in a different terminal)
make tdd
```

Configure the host's ports via `.env`:

```bash
PG_PORT=5432
WEBAPP_PORT=8080
```

## Environment Variables

| name                         | type   | description                                                                           |
| ---------------------------- | ------ | ------------------------------------------------------------------------------------- |
| FETCHQ_CRON_PORT             | number | Fastify's service port. It falls back on `PORT` and `8080`                            |
| FETCHQ_CRON_PG_STRING        | string | Postgres connection string. It falls back on `DATABASE_URL`, `PGSTRING`               |
| FETCHQ_CRON_CONSOLE_PASSWORD | string | setup a password to access the console                                                |
| FETCHQ_CRON_ENABLE_CONSOLE   | bool   | set it to `false` to disable the web interface. default: `true`                       |
| FETCHQ_CRON_ENABLE_CORS      | bool   | set it to `true` to enable CORS. default `false` (enabled for `NODE_ENV=development`) |
| FETCHQ_CRON_MODE             | enum   | refer to the specific paragraph                                                       |

#### FETCHQ_CRON_MODE

| prop    | value          |
| ------- | -------------- |
| value   | `api | worker` |
| default | `null`         |

Set to `api` if you want to skip running the queue workers on this particular instance.
Set to `worker` to run only the queue workers (no api, no web console).

## Testing

Run tests:

```bash
npm run test:unit
npm run test:client
npm run test:e2e
```

Work a _test driven session_:

```bash
npm run tdd:unit
npm run tdd:client
npm run tdd:e2e
```

**NOTE:** the `e2e` tests are executed agains the running API and reset the the target
database at every run.
