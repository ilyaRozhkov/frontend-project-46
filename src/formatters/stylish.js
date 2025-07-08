import _ from 'lodash'

const symbols = {
  added: ' + ',
  deleted: ' - ',
  space: '   ',
}

function getSpace(depth, symbol) {
  const space = '    '
  if (!symbol) {
    return space.repeat(depth)
  }
  if (depth === 0 && !symbol) {
    return ''
  }
  return `${space.repeat(depth)} ${symbol}`
}

function string(value, level) {
  function iter(currentValue, depth) {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`
    }
    const lines = Object.entries(currentValue).map(([key, val]) => `${getSpace(depth + 1, symbols.space)}${key}: ${iter(val, depth + 1)}`)
    return ['{', ...lines, `${getSpace(depth + 1)}}`].join('\n')
  }
  return iter(value, level)
}

export default function getStylish(tree) {
  const iter = (object, depth) => {
    const result = object.map((key) => {
      switch (key.action) {
        case 'deleted':
          return `${getSpace(depth, symbols.deleted)}${key.key}: ${string(key.oldValue, depth)}`
        case 'added':
          return `${getSpace(depth, symbols.added)}${key.key}: ${string(key.newValue, depth)}`
        case 'nested':
          return `${getSpace(depth, symbols.space)}${key.key}: ${iter(key.children, depth + 1)}`
        case 'changed':
          return [`${getSpace(depth, symbols.deleted)}${key.key}: ${string(key.oldValue, depth)}\n${getSpace(depth, symbols.added)}${key.key}: ${string(key.newValue, depth)}`]
        default:
          return `${getSpace(depth, symbols.space)}${key.key}: ${string(key.oldValue, depth)}`
      }
    })
    return ['{', ...result, `${getSpace(depth)}}`].join('\n')
  }
  return iter(tree, 0)
}
