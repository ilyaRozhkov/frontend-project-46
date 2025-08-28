import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

function changeFormatter(obj1, obj2, formatName) {
  switch (formatName) {
    case 'plain':
      return plain(obj1, obj2);
    case 'json':
      return JSON.stringify(json(obj1, obj2));
    case 'stylish':
      return stylish(obj1, obj2);
    default:
      throw new Error(`Uncorrect format ${formatName}!`);
  }
}

export default changeFormatter;
