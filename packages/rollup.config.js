/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-10-12 09:13:40
 * @LastEditTime: 2021-10-12 21:16:38
 * @LastEditors: @Xin (834529118@qq.com)
 */

import postcss from "rollup-plugin-postcss"
import vuePlugin from 'rollup-plugin-vue'
import image from '@rollup/plugin-image';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel"
import json from '@rollup/plugin-json';
import del from 'rollup-plugin-delete'

let isSourcemap = process.env.NODE_ENV === 'development'

export default {
  input: 'src/index.js',
  external: ['axios', 'vue-router', 'vue', 'element-plus'],
  output: {
    exports: "named",
    name: "dfsj-auth",
    dir: 'lib',
    sourcemap: isSourcemap,
  },
  plugins: [
    del({ targets: 'lib/*' }),
    vuePlugin(),
    nodeResolve(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    commonjs(),
    postcss(),
    image(),
    json(),
  ]
}
