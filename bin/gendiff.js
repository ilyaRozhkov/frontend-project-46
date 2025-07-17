#!/usr/bin/env node

import { Command } from 'commander'
import genDiff from '../src/parser.js'

const program = new Command()

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1', '-V, --version ', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action ((a, b, option) => {
    console.log (genDiff(a, b, option.format))
  })

program.parse(process.argv)
