import _ from 'lodash';

const getFormattedValue = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const getPropertyPath = (parentPath, property) => (parentPath ? `${parentPath}.${property}` : property);

const plainFormatter = (diffTree, parentPath = '') => {
  const lines = diffTree
    .map(({
      key, type, value, children, oldValue, newValue,
    }) => {
      const propertyPath = getPropertyPath(parentPath, key);
      switch (type) {
        case 'added':
          return `Property '${propertyPath}' was added with value: ${getFormattedValue(value)}`;
        case 'deleted':
          return `Property '${propertyPath}' was removed`;
        case 'changed':
          return `Property '${propertyPath}' was updated. From ${getFormattedValue(oldValue)} to ${getFormattedValue(newValue)}`;
        case 'nested':
          return plainFormatter(children, propertyPath);
        case 'unchanged':
          return null;
		case 'removed':
          return `Property '${propertyPath}' was removed`;
        default:
          throw new Error(`Unknown node type: ${type}`);
      }
    });
  return lines.filter((line) => line !== null).join('\n');
};

export default plainFormatter;