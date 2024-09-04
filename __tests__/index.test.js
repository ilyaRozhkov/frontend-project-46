import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('main func JSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFixtureFile('resultTree.txt');
  const result = genDiff(file1, file2);
  console.log('expected => ', expected);
  console.log('result =>', result);
  expect(genDiff(file1, file2)).toEqual(expected);
});
