const descriptions = {
  added: 'was added with value:',
  deleted: 'was removed',
  changed: 'was updated. From',
}

function getString(value) {
  switch (typeof value) {
    case 'object':
      return value == null ? value : '[complex value]'
    case 'string':
      return `'${value}'`
    default:
      return value
  }
}

function getPlain(tree) {
  function iter(object, path) {
    const result = object.map((key) => {
      const fullKey = `${path}${key.key}`
      if (key.action === 'deleted') {
        return `Property '${fullKey}' ${descriptions.deleted}`
      }
      if (key.action === 'added') {
        return `Property '${fullKey}' ${descriptions.added} ${getString(key.newValue)}`
      }
      if (key.action === 'nested') {
        return iter(key.children, `${fullKey}.`)
      }
      if (key.action === 'changed') {
        return `Property '${fullKey}' ${descriptions.changed} ${getString(key.oldValue)} to ${getString(key.newValue)}`
      }
      return null
    })
    return result.filter(item => item != null).join('\n')
  }
  return iter(tree, '')
}

export default getPlain
