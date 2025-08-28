import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test.each([
  ['file1.json', 'file2.json', 'stylish.txt'],
  ['file1.yaml', 'file2.yml', 'stylish.txt'],
  ['file1.json', 'file2.yml', 'stylish.txt'],
])('gendiff with "stylish" format', (a, b, result) => {
  const pathFirstFile = getFixturePath(a);
  const pathSecondFile = getFixturePath(b);
  const expected = readFixtureFile(result);
  expect(genDiff(pathFirstFile, pathSecondFile)).toEqual(expected);
});

// test.each([
//   ['file1.json', 'file2.json', 'plain.txt'],
//   ['file1.yaml', 'file2.yml', 'plain.txt'],
//   ['file1.json', 'file2.yml', 'plain.txt'],
// ])('gendiff with "plain" format', (a, b, result) => {
//   const pathFirstFile = getFixturePath(a);
//   const pathSecondFile = getFixturePath(b);
//   const expected = readFixtureFile(result).trim();

//   expect(genDiff(pathFirstFile, pathSecondFile, 'plain')).toEqual(expected);
// });

// test.each([
//   ['file1.json', 'file2.json', 'json.txt'],
//   ['file1.yaml', 'file2.yml', 'json.txt'],
//   ['file1.json', 'file2.yml', 'json.txt'],
// ])('gendiff with "json" format', (a, b, result) => {
//   const pathFirstFile = getFixturePath(a);
//   const pathSecondFile = getFixturePath(b);
//   const expected = readFixtureFile(result).trim();

//   expect(genDiff(pathFirstFile, pathSecondFile, 'json')).toEqual(expected);
// });
