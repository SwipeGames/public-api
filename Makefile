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
	$(API_GEN_RUN) $(V10_API_GEN_IMPORT_COMMON) -package coreapiv1 -generate server,types,skip-prune,spec,client $(V10_API_PATH)/core/core-api.yaml > $(V10_API_PATH)/core/core-api.gen.go
# 	$(API_GEN_RUN) $(V10_API_GEN_IMPORT_COMMON) -package playhubintegrationapiv1 -generate types,skip-prune,spec,client $(V10_API_PATH)/playhubintegration/playhub-integration-api.yaml > $(V10_API_PATH)/playhubintegration/playhub-integration-api.gen.go

# gen-api-v11:
# 	$(API_GEN_RUN) -package apiv1 -generate types,skip-prune,spec $(V11_API_PATH)/common-components.yaml > $(V11_API_PATH)/common-components.gen.go
# 	$(API_GEN_RUN) $(V11_API_GEN_IMPORT_COMMON) -package coreapiv1 -generate server,types,skip-prune,spec,client $(V11_API_PATH)/core/core-api.yaml > $(V11_API_PATH)/core/core-api.gen.go
# 	$(API_GEN_RUN) $(V11_API_GEN_IMPORT_COMMON) -package playhubintegrationapiv1 -generate types,skip-prune,spec,client $(V11_API_PATH)/playhubintegration/playhub-integration-api.yaml > $(V11_API_PATH)/playhubintegration/playhub-integration-api.gen.go

# gen-api-v12:
# 	$(API_GEN_RUN) -package apiv1 -generate types,skip-prune,spec $(V12_API_PATH)/common-components.yaml > $(V12_API_PATH)/common-components.gen.go
# 	$(API_GEN_RUN) $(V12_API_GEN_IMPORT_COMMON) -package coreapiv1 -generate server,types,skip-prune,spec,client $(V12_API_PATH)/core/core-api.yaml > $(V12_API_PATH)/core/core-api.gen.go
# 	$(API_GEN_RUN) $(V12_API_GEN_IMPORT_COMMON) -package playhubintegrationapiv1 -generate types,skip-prune,spec,client $(V12_API_PATH)/playhubintegration/playhub-integration-api.yaml > $(V11_API_PATH)/playhubintegration/playhub-integration-api.gen.go

