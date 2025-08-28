install: # The first cloning of the project
	npm ci

lint: # Launching the linter
	npx eslint .

test: # Testing CI
	npm run test:ci

test-watch: # Testing local
	npm run test:watch

link: # Launching the npm-package
	npm link

publish: # Updating packages
	npm publish --dry-run

fix: # Massive Fix
	npx eslint . --fix

gendiff: # Calling the utility
	node bin/gendiff.js