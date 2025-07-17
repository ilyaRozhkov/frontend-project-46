import parser from '../src/parser.js'
import fs from 'fs'

test('parser-json-stylish', () => {
  expect(parser('__fixtures__/file3.json', '__fixtures__/file4.json')).toBe(fs.readFileSync('./__fixtures__/expectedStylish.txt', "utf-8"))
})

test ('parser-yaml-stylish', () => {
  expect(parser('__fixtures__/file3.yaml', '__fixtures__/file4.yaml')).toBe(fs.readFileSync('./__fixtures__/expectedStylish.txt', "utf-8"))
})

test ('parser-yaml-plain', () => {
  expect(parser('__fixtures__/file3.yaml', '__fixtures__/file4.yaml', 'plain')).toBe(fs.readFileSync('./__fixtures__/expectedPlain.txt', "utf-8"))
})

test ('parser-json-plain', () => {
  expect(parser('__fixtures__/file3.json', '__fixtures__/file4.json', 'plain')).toBe(fs.readFileSync('./__fixtures__/expectedPlain.txt', "utf-8"))
}) 

test ('parser-json-json', () => {
  expect(parser('__fixtures__/file3.json', '__fixtures__/file4.json', 'json')).toBe(fs.readFileSync('./__fixtures__/expectedJson.txt', "utf-8"))
}) 

test ('parser-yaml-json', () => {
  expect(parser('__fixtures__/file3.yaml', '__fixtures__/file4.yaml', 'json')).toBe(fs.readFileSync('./__fixtures__/expectedJson.txt', "utf-8"))
}) 
