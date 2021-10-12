/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-10-12 10:29:52
 * @LastEditTime: 2021-10-12 13:07:53
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.11.182:8801',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/rest/, '/api')
      }
    },
  },
})
