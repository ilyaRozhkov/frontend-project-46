import parsedFile from './parse.js'
import genDiff from './genDiff.js'

const getDiff = (filepath1, filepath2) => {
  const file1 = parsedFile(filepath1)
  const file2 = parsedFile(filepath2)
  return genDiff(file1, file2)
}

export default getDiff
