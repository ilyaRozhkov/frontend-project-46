#!/usr/bin/env node
import { Command } from 'commander';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  });

// Добавьте проверку на прямой запуск файла
if (process.argv[1] === __filename) {
  program.parse(process.argv);
} else {
  // Для совместимости с тестами
  export default gendiff;
}
