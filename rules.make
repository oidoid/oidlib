include config.make

dist_dir := dist
src_dir := src

bundle_args ?=
format_args ?=
test_unit_args ?=

.PHONY: build
build: bundle

.PHONY: watch
watch: watch-bundle

.PHONY: bundle
bundle: | $(dist_dir)/
  name="$$(deno eval -p 'JSON.parse(await Deno.readTextFile("package.json")).name')"
  $(deno) bundle --config='$(deno_config)' mod.ts "$(dist_dir)/$$name.js" $(bundle_args)

.PHONY: watch-bundle
watch-bundle: bundle_args += --watch
watch-bundle: bundle

.PHONY: test
test: test-format test-lint build test-unit

.PHONY: test-format
test-format: format_args += --check

.PHONY: format
format:; $(deno) fmt --config='$(deno_config)' $(format_args)

.PHONY: test-lint
test-lint:; $(deno) lint --config='$(deno_config)' $(if $(value v),,--quiet)

.PHONY: test-unit
test-unit: build; $(deno) test --allow-read=. --config='$(deno_config)' $(test_unit_args)

.PHONY: test-unit-update
test-unit-update: test_unit_args += --allow-write=. -- --update
test-unit-update: test-unit

$(dist_dir)/:; $(mkdir) '$@'

.PHONY: clean
clean:; $(rm) '$(dist_dir)/'

.PHONY: rebuild
rebuild:
  $(make) clean
  $(make) build

.PHONY: retest
retest:
  $(make) clean
  $(make) test
