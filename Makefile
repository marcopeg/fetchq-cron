# Boot development environment
start:
	docker-compose up -d postgres
	docker-compose up -d webapp
	docker-compose logs -f webapp postgres

stop:
	docker-compose down

# Single run tests
test-unit:
	docker-compose exec webapp sh -c 'pwd && yarn test:unit'
test-e2e:
	docker-compose exec webapp sh -c 'pwd && yarn test:e2e'
test: test-unit test-e2e

# Watching tests
unit:
	docker-compose exec webapp sh -c 'pwd && yarn tdd:unit'
tdd:
	docker-compose exec webapp sh -c 'pwd && yarn tdd:e2e'

# Gain access to the web application
ssh:
	docker-compose exec webapp sh
