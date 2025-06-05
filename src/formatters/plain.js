import _ from 'lodash';

const complexValue = (value) => {
  if (_.isObject(value) || _.isArray(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);//забыла учесть что могут быть данные типа number
};
//функция outPutFormat не нужна
const buildPlainLines = (diff, parentPath = '') => diff.flatMap((node) => {
  const currentPath = parentPath ? `${parentPath}.${node.key}` : node.key;

  switch (node.type) {
    case 'added':
      return `Property '${currentPath}' was added with value: ${complexValue(node.value)}`;
    case 'removed':
      return `Property '${currentPath}' was removed`;
    case 'changed':
      return `Property '${currentPath}' was updated. From ${complexValue(node.value1)} to ${complexValue(node.value2)}`;
    case 'nested':
      return buildPlainLines(node.children, currentPath);
    case 'unchanged':
      return [];
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}).join('\n');

export default (diff) => buildPlainLines(diff);