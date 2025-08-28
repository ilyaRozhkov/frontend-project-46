import _ from 'lodash';

/** A function for finding differences in the "stylish" format */
function json(obj1, obj2) {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const result = keys.map((key) => {
    const val1 = obj1?.[key];
    const val2 = obj2?.[key];

    if (_.isPlainObject(val1) && _.isPlainObject(val2))
      return { key, type: 'nested', children: json(val1, val2) };
    if (!(key in obj2)) return { key, type: 'deleted', val1 };
    if (!(key in obj1)) return { key, type: 'added', val2 };
    if (val1 !== val2) return { key, type: 'changed', val1, val2 };

    return { key, type: 'unchanged', val1 };
  });

  return result;
}

export default json;
