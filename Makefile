JUNKQUIT_WEB_PORT ?= 8080

COOKBOOK_API_URL ?= https://cookbook.sylvan.ovh
SHOPPING_API_URL ?= https://shopping.sylvan.ovh

export

help: ## Show this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% 0-9a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

install: ## Install dev. dependencies with npm
	npm install

.update-env:
	@cat .env.template | envsubst > .env.local

serve: .update-env ## Render and serve vue app with hot reload
	npm run serve -- --port=$(JUNKQUIT_WEB_PORT)
