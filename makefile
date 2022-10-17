include ../oidlib/config.make

repo := oidlib
dist_dir := dist
src_dir := src

.PHONY: build
build: bundle

.PHONY: dev
dev: bundle\:watch

.PHONY: bundle
bundle: | $(dist_dir)/
  $(deno) bundle mod.ts '$(dist_dir)/$(repo).js'

.PHONY: bundle\:watch
bundle\:watch: | $(dist_dir)/
  $(deno) bundle mod.ts '$(dist_dir)/$(repo).js' --watch

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
