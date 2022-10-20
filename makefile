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
  $(deno) bundle mod.ts '$(dist_dir)/$$name.js'

.PHONY: bundle\:watch
bundle\:watch: | $(dist_dir)/
  name="$$(deno eval -p 'JSON.parse(await Deno.readTextFile("package.json")).name')"
  $(deno) bundle mod.ts '$(dist_dir)/$$name.js' --watch

.PHONY: test
test: build test\:unit; $(deno) lint

.PHONY: test\:unit
test\:unit: build; $(deno) test --allow-read=.

.PHONY: test\:unit\:update
test\:unit\:update: build
  $(deno) test --allow-read=. --allow-write=. -- --update

$(dist_dir)/:; $(mkdir) '$@'

.PHONY: clean
clean:; $(rm) '$(dist_dir)/'
