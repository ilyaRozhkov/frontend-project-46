import getDiff from '../src/index.js'
import fs from 'fs'

test('getDiff-json-stylish', () => {
  expect(getDiff('__fixtures__/file3.json', '__fixtures__/file4.json')).toBe(fs.readFileSync('./__fixtures__/expectedStylish.txt', "utf-8"))
})

test ('getDiff-yaml-stylish', () => {
  expect(getDiff('__fixtures__/file3.yaml', '__fixtures__/file4.yaml')).toBe(fs.readFileSync('./__fixtures__/expectedStylish.txt', "utf-8"))
})

test ('getDiff-yaml-plain', () => {
  expect(getDiff('__fixtures__/file3.yaml', '__fixtures__/file4.yaml', 'plain')).toBe(fs.readFileSync('./__fixtures__/expectedPlain.txt', "utf-8"))
})

test ('getDiff-json-plain', () => {
  expect(getDiff('__fixtures__/file3.json', '__fixtures__/file4.json', 'plain')).toBe(fs.readFileSync('./__fixtures__/expectedPlain.txt', "utf-8"))
}) 

test ('getDiff-json-json', () => {
  expect(getDiff('__fixtures__/file3.json', '__fixtures__/file4.json', 'json')).toBe(fs.readFileSync('./__fixtures__/expectedJson.txt', "utf-8"))
}) 

test ('getDiff-yaml-json', () => {
  expect(getDiff('__fixtures__/file3.yaml', '__fixtures__/file4.yaml', 'json')).toBe(fs.readFileSync('./__fixtures__/expectedJson.txt', "utf-8"))
}) 