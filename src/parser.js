import yaml from 'js-yaml';
import { extname } from 'path';
import fs from 'fs';

const parseJson = (content) => JSON.parse(content);
const parseYaml = (content) => yaml.load(content);
const parser = {
  ".json": parseJson,
  ".yaml": parseYaml,
  ".yml": parseYaml,

}
const parse = (fileContent) => {
  const ext = extname(fileContent);
  const selectParse = parser[ext];
  const content = fs.readFileSync(fileContent, 'utf-8');
  return selectParse(content);
};

export default parse;