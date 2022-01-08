/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-06 13:47:26
 * @LastEditTime: 2022-01-08 10:28:23
 * @LastEditors: @Xin (834529118@qq.com)
 */
import pkg from '../package.json'

const globals = {
  vue: 'Vue',
};

const output = [];
const name = 'dfsjVideo'

let isSourcemap = process.env.NODE_ENV === 'development';

if (!isSourcemap) {
  ['iife', 'es', 'umd'].forEach((item) => {
    output.push({
      export: 'named',
      file: pkg.main.replace('.', `.${item}.`),
      format: item,
      globals,
      name,
      sourcemap: false,
    });
  });
} else {
  output.push({
    file: pkg.main.replace('.', `.es.`),
    format: 'es',
    globals,
    name,
    sourcemap: true,
  });
}

export default output;
