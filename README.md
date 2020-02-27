# Fetchq Cron

https://gitpod.io#https://github.com/marcopeg/fetchq-cron

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
