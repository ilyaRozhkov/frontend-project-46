import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { expect, test, describe } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturesPath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

describe('formatters', () => {
  const fileJsonPath1 = getFixturesPath('file1.json');
  const fileJsonPath2 = getFixturesPath('file2.json');
  const fileYamlPath1 = getFixturesPath('file1.yaml');
  const fileYamlPath2 = getFixturesPath('file2.yaml');
  const fileYmlPath1 = getFixturesPath('file1.yml');
  const fileYmlPath2 = getFixturesPath('file2.yml');

  test('genDiff in the "stylish" format', () => {
    const stylishDiff = fs.readFileSync(getFixturesPath('stylishStyle.txt'), 'utf-8').trim();
    expect(genDiff(fileJsonPath1, fileJsonPath2)).toEqual(stylishDiff);
    expect(genDiff(fileYmlPath1, fileYmlPath2)).toEqual(stylishDiff);
    expect(genDiff(fileYamlPath1, fileYamlPath2)).toEqual(stylishDiff);
  });

  test('genDiff in the "plain" format', () => {
    const plainDiff = fs.readFileSync(getFixturesPath('plainStyle.txt'), 'utf-8').trim();
    expect(genDiff(fileJsonPath1, fileJsonPath2, 'plain')).toEqual(plainDiff);
    expect(genDiff(fileYmlPath1, fileYmlPath2, 'plain')).toEqual(plainDiff);
    expect(genDiff(fileYamlPath1, fileYamlPath2, 'plain')).toEqual(plainDiff);
  });

  test('genDiff in the "json" format', () => {
    const jsonDiff = fs.readFileSync(getFixturesPath('jsonStyle.txt'), 'utf-8').trim();
    expect(genDiff(fileJsonPath1, fileJsonPath2, 'json')).toEqual(jsonDiff);
    expect(genDiff(fileYmlPath1, fileYmlPath2, 'json')).toEqual(jsonDiff);
    expect(genDiff(fileYamlPath1, fileYamlPath2, 'json')).toEqual(jsonDiff);
  });
});

