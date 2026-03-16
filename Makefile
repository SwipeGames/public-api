API_GEN_RUN := go run github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest

V10_API_PATH:=./api/v1.0
V10_API_GEN_IMPORT_COMMON = "-import-mapping=../common-components.yaml:github.com/swipegames/public-api/api/v1.0"

# V11_API_PATH:=./api/v1.1
# V11_API_GEN_IMPORT_COMMON = "-import-mapping=../common-components.yaml:github.com/swipegames/public-api/api/v1.1"

# V12_API_PATH:=./api/v1.2
# V12_API_GEN_IMPORT_COMMON = "-import-mapping=../common-components.yaml:github.com/swipegames/public-api/api/v1.2"

.PHONY: gen-api
gen-api: gen-api-v10 gen-api-php

gen-api-v10:
	$(API_GEN_RUN) -package apiv1 -generate types,skip-prune,spec $(V10_API_PATH)/common-components.yaml > $(V10_API_PATH)/common-components.gen.go
	$(API_GEN_RUN) $(V10_API_GEN_IMPORT_COMMON) -package coreapiv1 -generate server,types,skip-prune,spec,client $(V10_API_PATH)/core/api.yaml > $(V10_API_PATH)/core/api.gen.go
	$(API_GEN_RUN) $(V10_API_GEN_IMPORT_COMMON) -package swipegamesintegrationapiv1 -generate server,types,skip-prune,spec,client $(V10_API_PATH)/swipegames-integration/api.yaml > $(V10_API_PATH)/swipegames-integration/api.gen.go
	yarn gen-api-ts


PHP_GEN := npx @openapitools/openapi-generator-cli generate
PHP_GEN_CONFIG := openapi-generator-php.yaml
PHP_OUT := packages/php

.PHONY: gen-api-php
gen-api-php:
	rm -rf $(PHP_OUT)/src
	$(PHP_GEN) -c $(PHP_GEN_CONFIG) -i $(V10_API_PATH)/common-components.yaml \
		--additional-properties=modelPackage=Common -o $(PHP_OUT)
	$(PHP_GEN) -c $(PHP_GEN_CONFIG) -i $(V10_API_PATH)/core/api.yaml \
		--additional-properties=modelPackage=Core -o $(PHP_OUT)
	$(PHP_GEN) -c $(PHP_GEN_CONFIG) -i $(V10_API_PATH)/swipegames-integration/api.yaml \
		--additional-properties=modelPackage=Integration -o $(PHP_OUT)
	# Remove duplicate models – canonical versions live in Common/
	rm -f $(PHP_OUT)/src/Core/ErrorResponse.php $(PHP_OUT)/src/Core/User.php
	rm -f $(PHP_OUT)/src/Integration/ErrorResponse.php
	# Fix namespace references to point to Common/ versions (perl -pi works on both macOS and Linux)
	find $(PHP_OUT)/src/Core -name '*.php' -exec perl -pi -e 's|\\SwipeGames\\PublicApi\\Core\\ErrorResponse|\\SwipeGames\\PublicApi\\Common\\ErrorResponse|g' {} +
	find $(PHP_OUT)/src/Core -name '*.php' -exec perl -pi -e 's|\\SwipeGames\\PublicApi\\Core\\User|\\SwipeGames\\PublicApi\\Common\\User|g' {} +
	find $(PHP_OUT)/src/Integration -name '*.php' -exec perl -pi -e 's|\\SwipeGames\\PublicApi\\Integration\\ErrorResponse|\\SwipeGames\\PublicApi\\Common\\ErrorResponse|g' {} +
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
	sed -i '' 's/^  version: .*/  version: $(v)/' api/v1.0/common-components.yaml api/v1.0/core/api.yaml api/v1.0/swipegames-integration/api.yaml
	@echo "Version updated to $(v)"
	$(MAKE) gen-api
	$(MAKE) gen-docs

.PHONY: build-node
build-node:
	cd packages/node && npm run build
