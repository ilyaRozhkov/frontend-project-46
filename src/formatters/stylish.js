import lodash from 'lodash'

const { isObject } = lodash

const stylish = (diff) => {
  const replacer = '    '

  const formatValue = (currentValue, depth) => {
    if (!isObject(currentValue)) {
      return currentValue
    }
    const currentIndent = replacer.repeat(depth + 1)
    const bracketIndent = replacer.repeat(depth)
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${formatValue(val, depth + 1)}`)
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n')
  }

  const formatStylish = (value, depth) => {
    const indent = replacer.repeat(depth)
    const signIndent = replacer.repeat(depth - 1)

    const lines = value.map((node) => {
      switch (node.type) {
        case 'added':
          return `${signIndent}  + ${node.key}: ${formatValue(node.value, depth)}`
        case 'removed':
          return `${signIndent}  - ${node.key}: ${formatValue(node.value, depth)}`
        case 'unchanged':
          return `${indent}${node.key}: ${formatValue(node.value, depth)}`
        case 'changed':
          return [
            `${signIndent}  - ${node.key}: ${formatValue(node.oldValue, depth)}`,
            `${signIndent}  + ${node.key}: ${formatValue(node.newValue, depth)}`,
          ].join('\n')
        case 'nested':
          return `${indent}${node.key}: {\n${formatStylish(node.children, depth + 1)}\n${indent}}`
      }
    })
    return lines.join('\n')
  }
  return `{\n${formatStylish(diff, 1)}\n}`
}

export default stylish
