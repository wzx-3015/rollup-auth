/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-10-12 10:29:52
 * @LastEditTime: 2022-01-06 15:41:48
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
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
