import _ from 'lodash'

const genDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort()

  const diff = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'tree', children: genDiff(obj1[key], obj2[key]) }
    }
    if (!_.has(obj1, key)) {
      return { key, type: 'added', newValue: obj2[key] }
    }
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', newValue: obj1[key] }
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key, type: 'changed', oldValue: obj1[key], newValue: obj2[key],
      }
    }
    return {
      key, type: 'unchanged', newValue: obj1[key],
    }
  })

  return diff
}
export default genDiff
