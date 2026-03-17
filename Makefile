API_GEN_RUN := go run github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest

V10_API_PATH:=./api/v1.0

.PHONY: gen-api
gen-api: gen-api-v10 gen-api-php

gen-api-v10:
	$(API_GEN_RUN) -package coreapiv1 -generate server,client,types,skip-prune,spec \
		$(V10_API_PATH)/core/api.yaml > $(V10_API_PATH)/core/api.gen.go
	$(API_GEN_RUN) -package coretypesv1 -generate types,skip-prune \
		$(V10_API_PATH)/core/api.yaml > $(V10_API_PATH)/core/types/types.gen.go
	$(API_GEN_RUN) -package swipegamesintegrationapiv1 -generate server,client,types,skip-prune,spec \
		$(V10_API_PATH)/swipegames-integration/api.yaml > $(V10_API_PATH)/swipegames-integration/api.gen.go
	$(API_GEN_RUN) -package swipegamesintegrationtypesv1 -generate types,skip-prune \
		$(V10_API_PATH)/swipegames-integration/api.yaml > $(V10_API_PATH)/swipegames-integration/types/types.gen.go
	yarn gen-api-ts


PHP_GEN := npx @openapitools/openapi-generator-cli generate
PHP_GEN_CONFIG := openapi-generator-php.yaml
PHP_OUT := packages/php

.PHONY: gen-api-php
gen-api-php:
	rm -rf $(PHP_OUT)/src
	$(PHP_GEN) -c $(PHP_GEN_CONFIG) -i $(V10_API_PATH)/core/api.yaml \
		--additional-properties=modelPackage=Core -o $(PHP_OUT)
	$(PHP_GEN) -c $(PHP_GEN_CONFIG) -i $(V10_API_PATH)/swipegames-integration/api.yaml \
		--additional-properties=modelPackage=Integration -o $(PHP_OUT)
	# Clean up generator scaffolding
	rm -rf $(PHP_OUT)/.openapi-generator $(PHP_OUT)/.openapi-generator-ignore
	rm -f $(PHP_OUT)/.travis.yml $(PHP_OUT)/git_push.sh $(PHP_OUT)/phpunit.xml.dist
	rm -f $(PHP_OUT)/.php-cs-fixer.dist.php $(PHP_OUT)/.gitignore $(PHP_OUT)/README.md
	# Overwrite generated composer.json with our own
	@printf '{\n  "name": "swipegames/public-api",\n  "description": "Generated PHP types for Swipe Games Public API",\n  "type": "library",\n  "license": "proprietary",\n  "require": {\n    "php": "^8.1"\n  },\n  "autoload": {\n    "psr-4": {\n      "SwipeGames\\\\PublicApi\\\\": "src/"\n    }\n  }\n}\n' > $(PHP_OUT)/composer.json

.PHONY: gen-docs
gen-docs:
	yarn docusaurus clean-api-docs all
	yarn docusaurus gen-api-docs all
	find docs -name "*info.mdx" -delete


.PHONY: up
up:
	yarn start

.PHONY: bump-version
bump-version:
	@test -n "$(v)" || (echo "Usage: make bump-version v=x.y.z" && exit 1)
	sed -i '' 's/const API_VERSION = ".*"/const API_VERSION = "$(v)"/' docusaurus.config.ts
	sed -i '' 's/^  version: .*/  version: $(v)/' api/v1.0/core/api.yaml api/v1.0/swipegames-integration/api.yaml
	@# Update changes-log: replace last version header with new version
	@LAST_VER=$$(sed -n 's/^## \(.*\)/\1/p' docs/changes-log.md | head -1); \
	sed -i '' "s/^## $$LAST_VER/## $(v)/" docs/changes-log.md; \
	echo "Changes log: $$LAST_VER -> $(v)"
	@echo "Version updated to $(v)"
	$(MAKE) gen-api
	$(MAKE) gen-docs

.PHONY: build-node
build-node:
	cd packages/node && npm run build
