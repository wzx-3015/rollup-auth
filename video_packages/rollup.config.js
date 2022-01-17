/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-10-12 09:13:40
 * @LastEditTime: 2022-01-17 17:42:34
 * @LastEditors: @Xin (834529118@qq.com)
 */
import postcss from "rollup-plugin-postcss";
import vuePlugin from 'rollup-plugin-vue';
import image from '@rollup/plugin-image';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel";
import json from '@rollup/plugin-json';
import del from 'rollup-plugin-delete';
import jsx from "acorn-jsx";
import output from './buildconfig/output';
import copy from 'rollup-plugin-copy'
import cssnano from "cssnano";
import autoprefixer from 'autoprefixer'

export default {
  input: 'src/index.js',
  external: ['vue'],
  output: output,
  inlineDynamicImports: true,
  plugins: [
    del({ targets: 'dist/*' }),
    vuePlugin({ preprocessStyles: true }),
    nodeResolve(),
    babel({
      exclude: ['node_modules/**', 'src/static/jessibuca/**'],
      babelHelpers: 'bundled',
    }),
    commonjs(),
    image(),
    json(),
    postcss({
      plugins: [
        autoprefixer(),
        cssnano()
      ],
      extract: 'style/index.css',
    }),
    copy({ targets: [
      {
        src: ['src/static/fonts/iconfont.ttf', 'src/static/fonts/iconfont.woff', 'src/static/fonts/iconfont.woff2'],
        dest: 'dist/style/fonts'
      },
      {
        src: ['src/static/jessibuca/*'],
        dest: 'dist/jessibuca'
      }
    ]}),
  ],
  acornInjectPlugins: [jsx()],
}
