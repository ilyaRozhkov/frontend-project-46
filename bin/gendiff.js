#!/usr/bin/env node // убран лишний перенос строки
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {//Проводимые операции лучше обернуть в try catch
    try {
      const diff = genDiff(filepath1, filepath2, options.format);
      console.log(diff);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);//Так как приложение может упасть, а у нас работает нода, её лучше наглядно вырубать
    }
  });

program.parse(process.argv); //process.argv это массив, который содержит аргументы, передаваемые в командную строку при запуске скрипта
// поэтому стоит его наглядно передавать