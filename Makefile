export PATH := ./node_modules/.bin:$(PATH)

LINT_FLAGS :=
SPEC_FLAGS := -R spec
COVERAGE_FLAGS := -R mocha-text-cov
BABEL_FLAGS := --optional es7.classProperties

level ?= patch

usage:
	@echo lint:     lints the source
	@echo spec:     runs the test specs
	@echo coverage: runs the code coverage test
	@echo test:     lint, spec and coverage threshold test
	@echo build:    builds the minified version
	@echo clean:    removes the build artifacts

lint:
	eslint $(LINT_FLAGS) src/

spec:
	mocha $(SPEC_FLAGS) test/index

coverage:
	mocha $(COVERAGE_FLAGS) test/index

# test:
# 	make lint
# 	make spec SPEC_FLAGS="-R dot"
# 	make coverage COVERAGE_FLAGS="-R travis-cov"

dist: src/*.js
	babel src --out-dir=$@ $(BABEL_FLAGS)

watch:
	babel src --out-dir=dist $(BABEL_FLAGS) --watch

clean:
	rm -rf dist

version:
	npm version $(level)

publish:
	npm publish

.PHONY: usage test spec coverage lint clean version
