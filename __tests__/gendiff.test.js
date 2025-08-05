import fs from 'fs';
import genDiff from '../src/index.js';
import getFixturePath from '../src/helper.js';
import { describe, test, expect } from '@jest/globals';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const runTest = (fileName1, fileName2, resultFileName, format) => {
  const filePath1 = getFixturePath(fileName1);
  const filePath2 = getFixturePath(fileName2);
  const resultPath = getFixturePath(resultFileName);
  const expectedResult = readFile(resultPath).trim();

  if (format === 'json') {
    const expectedJsonString = JSON.stringify(JSON.parse(expectedResult));
    const actualDiff = genDiff(filePath1, filePath2, 'json');
    return { expected: expectedJsonString, actual: actualDiff };
  } else {
    const actualDiff = genDiff(filePath1, filePath2, format);
    return { expected: expectedResult, actual: actualDiff };
  }
};

describe('genDiff tests', () => {
  test('stylish format with JSON files', () => {
    const { expected, actual } = runTest('file1.json', 'file2.json', 'expectFileStylish.txt', 'stylish');
    expect(actual.trim()).toBe(expected);
  });

  test('stylish format with YAML files', () => {
    const { expected, actual } = runTest('file1.yaml', 'file2.yaml', 'expectFileStylish.txt', 'stylish');
    expect(actual.trim()).toBe(expected);
  });

  test('plain format with JSON files', () => {
    const { expected, actual } = runTest('file1.json', 'file2.json', 'expectFilePlain.txt', 'plain');
    expect(actual.trim()).toBe(expected);
  });

  test('plain format with YAML files', () => {
    const { expected, actual } = runTest('file1.yaml', 'file2.yaml', 'expectFilePlain.txt', 'plain');
    expect(actual.trim()).toBe(expected);
  });

  test('json format with YAML files', () => {
    const { expected, actual } = runTest('file1.yaml', 'file2.yaml', 'diffJSON.txt', 'json');
    expect(actual.trim()).toBe(expected);
  });
});