import _ from 'lodash';

function formatValue(value) {
  if (value === null) return 'null';
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'object') return '[complex value]';
  return String(value);
}

/** A function for finding differences in the "plain" format */
function diffPlain(obj1, obj2, parentPath = '') {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const result = keys.flatMap((key) => {
    const val1 = obj1?.[key];
    const val2 = obj2?.[key];
    const currentPath = parentPath ? `${parentPath}.${key}` : key;

    if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
      return diffPlain(val1, val2, currentPath);
    }
    if (!(key in obj2)) return [`Property '${currentPath}' was removed`];
    if (!(key in obj1))
      return [
        `Property '${currentPath}' was added with value: ${formatValue(val2)}`,
      ];
    if (val1 !== val2)
      return [
        `Property '${currentPath}' was updated. From ${formatValue(
          val1,
        )} to ${formatValue(val2)}`,
      ];

    return [];
  });

  return result.join('\n');
}

export default diffPlain;
