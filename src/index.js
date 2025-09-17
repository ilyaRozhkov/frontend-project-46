import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import parseData from './parsers.js'
import buildDiff from './buildDiff.js'
import stylish from './formatters/stylish.js'
import plain from './formatters/plain.js'
import json from './formatters/json.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const genDiff = (filepath1, filepath2, formatName) => {
  const convertPath = (value) => {
    if (value.startsWith('/')) return value
    return resolve(__dirname, '..', value)
  }
  const path1 = convertPath(filepath1)
  const path2 = convertPath(filepath2)
  const file1 = parseData(path1)
  const file2 = parseData(path2)
  const diff = buildDiff(file1, file2)

  switch (formatName) {
    case 'stylish':
      return stylish(diff)
    case 'plain':
      return plain(diff)
    case 'json':
      return json(diff)
  }
}

export default genDiff
