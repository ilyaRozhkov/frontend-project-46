import stylish from './stylish.js'
import plain from './plain.js'
import toJson from './toJson.js'

const toFormat = (data, format) => {
  switch (format) {
    case 'stylish': {
      return stylish(data)
    }
    case 'plain': {
      return plain(data)
    }
    case 'json': {
      return toJson(data)
    }
  }
}

export default toFormat
