# Makefile for developing this server

# capture the current users id and group id.
UID := $(shell id -u)
GID := $(shell id -g)

SHELL := /bin/bash

VERSION := $(shell git describe --tags --always --dirty)

IMAGE := thingful/decodeweb

TAGGED_IMAGE := $(IMAGE):$(VERSION)
LATEST_IMAGE := $(IMAGE):latest

APP_NAME := decodeweb

.PHONY: version
version: ## Display the current version
	echo $(VERSION)

.PHONY: shell
shell: ## Open a shell in the development container
	@docker-compose run --rm --entrypoint /bin/bash app

.PHONY: build
build: dockerfiles ## Build the development environment
	@docker-compose build

.PHONY: dockerfiles
dockerfiles: ## Create our dockerfiles
	@sed \
		-e 's|ARG_UID|$(UID)|g' \
		-e 's|ARG_GID|$(GID)|g' \
		app/Dockerfile.dev > app/.dockerfile.dev

.PHONY: clean
clean: ## Clean generated files and dependencies
	@docker-compose down -v
	rm -rf app/.dockerfile.dev
	rm -rf app/_build
	rm -rf app/deps
	rm -rf app/assets/node_modules

.PHONY: start
start: dockerfiles ## Start the development environment
	@docker-compose up

.PHONY: stop
stop: dockerfiles ## Stop the development environment
	@docker-compose stop

.PHONY: bootstrap
bootstrap: clean build ## Bootstrap local dev environment
	@docker-compose run --rm app mix deps.get
	@docker-compose run --rm --workdir=/app/assets app npm install

.PHONY: test
test: ## run the elixir tests of the phoenix app
	@docker-compose run --rm app mix test

.PHONY: dist
dist: ## Build a distillery release
	pushd app && \
		docker build -t $(TAGGED_IMAGE) -f Dockerfile.web .
	docker tag $(TAGGED_IMAGE) $(LATEST_IMAGE)

.PHONY: dist-shell
dist-shell: ## Open a shell inside the release container
	@docker run --rm -it --entrypoint /bin/sh $(LATEST_IMAGE)

.PHONY: docker-push
docker-push: ## Push generated images to Docker hub
	@docker push $(TAGGED_IMAGE)
	@docker push $(LATEST_IMAGE)

.PHONY: heroku-push
heroku-push: ## Push and deploy to heroku
	@heroku container:push web --recursive --app $(APP_NAME)
	@heroku container:release web --app $(APP_NAME)