const makeString = (key, data, lvl, chang = ' ') => {
  if (typeof data !== 'object' || data === null) {
    return `\n ${' '.repeat(lvl)}${chang} ${key}: ${data}`
  }

  const newData = Object.keys(data).map((elem) => {
    return makeString(elem, data[elem], lvl + 4)
  })

  return `\n ${' '.repeat(lvl)}${chang} ${key}: {${newData.join('')}\n${' '.repeat(lvl + 2)} }`
}

const stylish = (data, depth = 1) => data.map((item) => {
  const {
    type, key, newValue, oldValue, children,
  } = item
  const curentDepth = depth + 2
  const indent = ' '.repeat(curentDepth)

  switch (type) {
    case 'tree': {
      return `\n${indent} ${key}: {${stylish(children, curentDepth + 2)}\n${indent} }`
    }
    case 'added': {
      return makeString(key, newValue, depth, '+')
    }
    case 'deleted': {
      return makeString(key, newValue, depth, '-')
    }
    case 'changed': {
      return `${makeString(key, oldValue, depth, '-')}${makeString(key, newValue, depth, '+')}`
    }
    case 'unchanged': {
      return makeString(key, newValue, depth)
    }
  }
}).join('')

export default data => `{${stylish(data)}\n}`
