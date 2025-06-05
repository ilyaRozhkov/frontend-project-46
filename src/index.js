import fs from 'fs';
import { resolve }  from 'path';
import parser from './parser.js';
import selectFormat from './formatters/format.js';
import findDiff from './findDiff.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const content1 = resolve(process.cwd(), filepath1);
  const content2 = resolve(process.cwd(), filepath2);

  const parsedData1 = parser(content1);
  const parsedData2 = parser(content2);

   const diff = findDiff(parsedData1, parsedData2);
   const format = selectFormat(formatName);

   return format(diff);
   
};

export default genDiff;





