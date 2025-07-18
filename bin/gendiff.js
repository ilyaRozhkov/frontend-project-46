#!/usr/bin/env node

import { program } from 'commander'
import genDiff from '../src/parser.js'



program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish') // Дефолтный формат – 4 параметр
  .action((path1, path2) => { // Код вызова внутри action
    // Вывод на экран происходит здесь, а не внутри библиотеки
    console.log(genDiff(path1, path2, program.opts().format))
  })
  .parse(process.argv)

