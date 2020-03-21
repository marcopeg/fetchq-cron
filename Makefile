# Running container's name
organization?=$(shell node -p "require('./package.json').organization")
name?=$(shell node -p "require('./package.json').name")
version:=$(shell node -p "require('./package.json').version")

# Docker image tag name
tag?=${organization}/${name}


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


###
### Use Docker for Production
### =========================
###

# Build the project using cache
image:
	docker build -t ${tag} -t ${tag}:${version} .

# Spins up a container from the latest available image
# this is useful to test locally
prod: image
	docker run \
		--rm \
		--name ${name} \
		--env PGSTRING=${pgstring} \
		-p 8080:8080 \
		${tag}
