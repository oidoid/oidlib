include ../oidlib/config.make

dist_dir := dist
src_dir := src

.PHONY: build
build: bundle

.PHONY: dev
dev: bundle\:watch

.PHONY: bundle
bundle: | $(dist_dir)/
  name="$$(deno eval -p 'JSON.parse(await Deno.readTextFile("package.json")).name')"
  $(deno) bundle --config='$(deno_config)' mod.ts "$(dist_dir)/$$name.js"

.PHONY: bundle\:watch
bundle\:watch: | $(dist_dir)/
  name="$$(deno eval -p 'JSON.parse(await Deno.readTextFile("package.json")).name')"
  $(deno) bundle --config='$(deno_config)' mod.ts "$(dist_dir)/$$name.js" --watch

.PHONY: test
test: build test\:unit; $(deno) lint --config='$(deno_config)' --quiet

.PHONY: test\:unit
test\:unit: build; $(deno) test --allow-read=. --config='$(deno_config)'

.PHONY: test\:unit\:update
test\:unit\:update: build
  $(deno) test --allow-read=. --allow-write=. --config='$(deno_config)' -- --update

$(dist_dir)/:; $(mkdir) '$@'

.PHONY: clean
clean:; $(rm) '$(dist_dir)/'
