import getPlain from './plain.js'
import getStylish from './stylish.js'

export default function makeFormat(obj, format = 'stylish') {
  switch (format) {
    case 'stylish':
      return getStylish(obj)
    case 'plain':
      return getPlain(obj)
    case 'json':
      return JSON.stringify(obj)
    default:
      throw new Error('Output format not supported')
  }
}
