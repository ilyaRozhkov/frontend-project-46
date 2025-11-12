import _ from 'lodash'

const genDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort()
  let result = ''

  for (const key of keys) {
    if (obj1[key] !== undefined && obj2[key] !== undefined) {
      if (obj1[key] === obj2[key]) {
        result = `${result}\n    ${key}: ${obj1[key]}`
      }
      else {
        result = `${result}\n  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`
      }
    }
    else if (obj1[key] === undefined && obj2[key] !== undefined) {
      result = `${result}\n  + ${key}: ${obj2[key]}`
    }
    else if (obj1[key] !== undefined && obj2[key] === undefined) {
      result = `${result}\n  - ${key}: ${obj1[key]}`
    }
  }
  return `{${result}\n}`
}

export default genDiff
