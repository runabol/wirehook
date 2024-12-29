SHELL := /bin/bash
PROJECT_NAME ?= $(shell jq -r '.name' package.json)
PROJECT_VERSION ?= $(shell jq -r '.version' package.json)

.PHONY: docker-build
docker-build:
	docker build -t runabol/${PROJECT_NAME}:$(PROJECT_VERSION) .

.PHONY: docker-push
docker-push:
	@echo "$(DOCKER_PASSWORD)" | docker login -u $(DOCKER_LOGIN) --password-stdin
	docker push runabol/${PROJECT_NAME}:$(PROJECT_VERSION)
	docker tag runabol/${PROJECT_NAME}:$(PROJECT_VERSION) runabol/${PROJECT_NAME}:latest
	docker push runabol/${PROJECT_NAME}:latest
