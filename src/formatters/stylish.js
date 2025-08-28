import _ from 'lodash';

function formatValue(value, depth) {
  if (typeof value === 'object' && value !== null) {
    const indent = ' '.repeat(depth * 4 + 4);
    const closingIndent = ' '.repeat(depth * 4);
    const lines = Object.entries(value).map(
      ([k, v]) => `${indent}${k}: ${formatValue(v, depth + 1)}`,
    );
    return `{\n${lines.join('\n')}\n${closingIndent}}`;
  }
  return String(value);
}

/** A function for finding differences in the "stylish" format */
function diffStylish(obj1, obj2, depth = 0) {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const indent = ' '.repeat(depth * 4);
  const result = keys.flatMap((key) => {
    const val1 = obj1?.[key];
    const val2 = obj2?.[key];

    if (_.isPlainObject(val1) && _.isPlainObject(val2))
      return [`${indent}    ${key}: ${diffStylish(val1, val2, depth + 1)}`];
    if (!(key in obj2))
      return [`${indent}  - ${key}: ${formatValue(val1, depth + 1)}`];
    if (!(key in obj1))
      return [`${indent}  + ${key}: ${formatValue(val2, depth + 1)}`];
    if (val1 !== val2)
      return [
        `${indent}  - ${key}: ${formatValue(val1, depth + 1)}`,
        `${indent}  + ${key}: ${formatValue(val2, depth + 1)}`,
      ];

    return [`${indent}    ${key}: ${formatValue(val1, depth + 1)}`];
  });

  return `{\n${result.join('\n')}\n${indent}}`;
}

export default diffStylish;
