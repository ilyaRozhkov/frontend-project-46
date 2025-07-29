import fs from 'fs'
import path from 'path'
import parsers from './parser.js'
import genDiff from './genDiff.js'
import toFormat from './formatters/index.js'

const makePath = fileName => path.resolve(fileName)

const getDiff = (filepath1, filepath2, format = 'stylish') => {
  const extention = filePath => path.extname(filePath)
  const file1 = parsers(fs.readFileSync(makePath(filepath1), 'utf-8'), extention(filepath1))
  const file2 = parsers(fs.readFileSync(makePath(filepath2), 'utf-8'), extention(filepath2))
  const diffData = genDiff(file1, file2)
  return toFormat(diffData, format)
}

export default getDiff
