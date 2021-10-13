/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-10-12 10:29:52
 * @LastEditTime: 2021-10-13 16:15:00
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'
import { dfsjUnifyAuth } from '../packages/lib/index'
import 'element-plus/dist/index.css'
import asyncRoutes from './router/asyncRoutes'

createApp(App).use(router).use(ElementPlus).use(dfsjUnifyAuth, {
  systemName: '测试权限管理平台',
  loginAuth: true,
  asyncRoutes,
  loginPath: 'http://192.168.40.4:9081/#/login'
}).mount('#app')
