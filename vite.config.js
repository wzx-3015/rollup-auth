/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-10-12 10:29:52
 * @LastEditTime: 2022-01-18 09:32:57
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    copy({
      targets: [
        { src: 'node_modules/grid-video/dist/jessibuca/*', dest: __dirname + '/dist'}, //执行拷贝
      ]
    })
  ],
  server: {
    host: '0.0.0.0',
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://192.168.11.182:8801',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/rest/, '/api')
      },
      '/asset': {
        target: 'http://img.ksbbs.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/rest/, '/asset')
      }
    },
  },
})
