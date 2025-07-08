//* parsing the file contents *//
import { load } from 'js-yaml'

export default (readFile, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(readFile)
    case 'yaml':
      return load(readFile)
    case 'yml':
      return load(readFile)
    default:
      throw new Error('File format not supported!')
  }
}
