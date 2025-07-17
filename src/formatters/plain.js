const makeValue = (data) => {
  if (typeof data !== 'object' || data === null) {
    return `${data}`
  }
  return `[complex value]`
}

const plain = (data, path = '') => data.map((item) => {
  const {
    type, key, newValue, oldValue, children,
  } = item
  const curentKey = path === '' ? `${key}` : `${path}.${key}`

  switch (type) {
    case 'tree': {
      return `${plain(children, curentKey)}`
    }
    case 'added': {
      return `\nProperty '${curentKey}' was added with value: ${makeValue(newValue)}`
    }
    case 'deleted': {
      return `\nProperty '${curentKey}' was removed`
    }
    case 'changed': {
      return `\nProperty '${curentKey}' was updated. From '${makeValue(oldValue)}' to '${makeValue(newValue)}'`
    }
  }
}).join('')

export default plain
