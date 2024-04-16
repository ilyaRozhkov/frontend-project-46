install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8