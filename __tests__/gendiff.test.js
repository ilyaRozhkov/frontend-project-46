import getDiff from '../src/index.js'
import fs from 'fs'
import { test, expect } from '@jest/globals'

test('getDiff test', () => {
  expect(getDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(fs.readFileSync('./__fixtures__/expectedResult.txt', 'utf-8').trim())
})
