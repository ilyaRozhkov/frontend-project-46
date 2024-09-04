import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const formats = ['json'];

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();
const resultJson = readFixtureFile('resultJSON.txt');
//console.log(resultJson);
/* const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`; */

test.each(formats)('%s', (format) => {
  // console.log(format);
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const result = genDiff(file1, file1, 'json');
  // console.log(result);
  expect(result).toEqual(resultJson);
});
