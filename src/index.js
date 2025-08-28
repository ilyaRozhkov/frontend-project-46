import path from 'path';
import { cwd } from 'node:process';
import fs from 'fs';
import yaml from 'js-yaml';
import changeFormatter from './formatters/index.js';

const getFixturePath = (filename) => {
  if (path.isAbsolute(filename)) return filename;
  return path.resolve(cwd(), '__fixtures__', filename);
};

const parsing = (fileIsStr) => {
  const filePath = getFixturePath(fileIsStr);
  const fileFormat = path.extname(filePath).slice(1);
  const fileContent = fs.readFileSync(filePath, 'utf8').trim();

  switch (fileFormat) {
    case 'yaml':
    case 'yml':
      return yaml.load(fileContent);
    case 'json':
      return JSON.parse(fileContent);
    default:
      throw new Error(`Unsupported file format: ${fileFormat}`);
  }
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') =>
  changeFormatter(parsing(filepath1), parsing(filepath2), formatName);

export default genDiff;
