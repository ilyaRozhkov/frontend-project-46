import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';

export default (diffTree, format) => {
  switch (format) {
    case 'stylish':
      return stylishFormatter(diffTree);
    case 'plain':
      return plainFormatter(diffTree);
    case 'json':
      return jsonFormatter(diffTree);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};