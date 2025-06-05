import _ from 'lodash';


const complexValue = (value) => {
    if (_.isObject(value) || _.isArray(value)) {
        return '[complex value]'
    }
    if (_.isString(value)) {
        return `'${value}'`
    } return String(value)
}
const outPutFormat = (obj, parentName) => {
    const {
        key,
        type,
        children,
        value,
        oldValue,
        newValue
    } = obj;


    const parentKey = parentName ? `${parentName}.${key}` : key;

    switch (type) {
        case 'nested':
            return outPutFormat(children, parentKey);
        case 'removed':
            return `Property '${parentKey}' was removed`
        case 'added':
            return `Property '${parentKey}' was added with value: ${complexValue(value)}`
        case 'changed':
            return `Property '${parentKey}' was updated. From ${complexValue(oldValue)} to ${complexValue(newValue)}`
        case 'unchanged':
            return ``
        default:
            throw new Error(`Unknown format1: ${type}`)
    }
}

const formatPlain = (diff) => `${diff.map((object) => outPutFormat(object)).join('\n').trim()}`;

export default formatPlain;