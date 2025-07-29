API_GEN_RUN := go run github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest

V10_API_PATH:=./api/v1.0
V10_API_GEN_IMPORT_COMMON = "-import-mapping=../common-components.yaml:github.com/swipegames/public-api/api/v1.0"

# V11_API_PATH:=./api/v1.1
# V11_API_GEN_IMPORT_COMMON = "-import-mapping=../common-components.yaml:github.com/swipegames/public-api/api/v1.1"

# V12_API_PATH:=./api/v1.2
# V12_API_GEN_IMPORT_COMMON = "-import-mapping=../common-components.yaml:github.com/swipegames/public-api/api/v1.2"

.PHONY: gen-api
gen-api: gen-api-v10

gen-api-v10:
	$(API_GEN_RUN) -package apiv1 -generate types,skip-prune,spec $(V10_API_PATH)/common-components.yaml > $(V10_API_PATH)/common-components.gen.go
	$(API_GEN_RUN) $(V10_API_GEN_IMPORT_COMMON) -package coreapiv1 -generate server,types,skip-prune,spec,client $(V10_API_PATH)/core/api.yaml > $(V10_API_PATH)/core/api.gen.go
	$(API_GEN_RUN) $(V10_API_GEN_IMPORT_COMMON) -package swipegamesintegrationapiv1 -generate server,types,skip-prune,spec,client $(V10_API_PATH)/swipegames-integration/api.yaml > $(V10_API_PATH)/swipegames-integration/api.gen.go


.PHONY: gen-docs
gen-docs:
	yarn docusaurus clean-api-docs all
	yarn docusaurus gen-api-docs all
	find docs -name "*info.mdx" -delete


.PHONY: up
up:
	yarn start


