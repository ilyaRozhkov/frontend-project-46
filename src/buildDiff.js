import lodash from 'lodash'

const { sortBy, isObject } = lodash

const buildDiff = (file1, file2) => {
  const allKeys = [...Object.keys(file1), ...Object.keys(file2)]
  const sortedUniqueKeys = sortBy([...new Set(allKeys)])

  return sortedUniqueKeys.map((key) => {
    if (!Object.hasOwn(file2, key)) {
      return { key, type: 'removed', value: file1[key] }
    }
    if (!Object.hasOwn(file1, key)) {
      return { key, type: 'added', value: file2[key] }
    }
    if (isObject(file1[key]) && isObject(file2[key])) {
      return { key, type: 'nested', children: buildDiff(file1[key], file2[key]) }
    }
    if (file1[key] === file2[key]) {
      return { key, type: 'unchanged', value: file1[key] }
    }
    return { key, type: 'changed', oldValue: file1[key], newValue: file2[key] }
  })
}

export default buildDiff
