import lodash from 'lodash'

const { isObject } = lodash

const plain = (diff) => {
  const formatValue = (currentValue) => {
    if (typeof currentValue === 'string') {
      return `'${currentValue}'`
    }
    else if (!isObject(currentValue)) {
      return currentValue
    }
    else {
      return `[complex value]`
    }
  }

  const formatPlain = (value, currentPath) => {
    const lines = value.map((node) => {
      const fullPath = currentPath ? `${currentPath}.${node.key}` : node.key
      switch (node.type) {
        case 'removed':
          return `Property '${fullPath}' was removed`
        case 'added':
          return `Property '${fullPath}' was added with value: ${formatValue(node.value)}`
        case 'changed':
          return `Property '${fullPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
        case 'nested':
          return formatPlain(node.children, fullPath)
      }
    })
    return lines.filter(line => line !== undefined).join('\n')
  }
  return formatPlain(diff, null)
}

export default plain
