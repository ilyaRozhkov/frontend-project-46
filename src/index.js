import path from 'path'
import { readFileSync } from 'node:fs'
import parse from './parsers/parse.js'
import { cwd } from 'node:process'
import comparison from './comparison.js'
import makeFormat from './formatters/index.js'

const getFormat = filepath => path.extname(filepath).slice(1)
const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const getFileContent1 = readFileSync(path.resolve(cwd(), '.', filepath1))
  const getFileContent2 = readFileSync(path.resolve(cwd(), '.', filepath2))
  const parseFile1 = parse(getFileContent1, getFormat(filepath1))
  const parseFile2 = parse(getFileContent2, getFormat(filepath2))
  const dataComparison = comparison(parseFile1, parseFile2)
  return makeFormat(dataComparison, format)
}

export default genDiff
