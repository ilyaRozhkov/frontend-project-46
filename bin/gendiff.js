#!/usr/bin/env node
import { program } from 'commander'
import genDiff from '../src/index.js'

if (import.meta.url === `file://${process.argv[1]}`) {
  program
    .description('Compares two configuration files and shows a difference')
    .version('1.0.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format [type]', 'output format (default: "stylish")', 'stylish')
    .action((filepath1, filepath2, options) => {
      const diff = genDiff(filepath1, filepath2, options.format)
      console.log(diff)
    })

  program.parse()
}
