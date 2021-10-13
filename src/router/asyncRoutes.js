/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-09-11 16:06:23
 * @LastEditTime: 2021-10-13 16:15:51
 * @LastEditors: @Xin (834529118@qq.com)
 */
const asyncRoutes = [
  {
    component: () => import('../layout/HomeLayout.vue'),
    name: 'HomeLayout',
    path: '/',
    children: [
      {
        path: '/demo',
        name: 'LeftLayout',
        component: () => import('../layout/LeftLayout.vue'),
        redirect: '/home',
        children: [
          {
            name: 'demo01',
            path: '/demo01',
            component: () => import('../views/demo1.vue')
          },
          {
            name: 'demo01Edit',
            path: '/demo01-edit/:id',
            component: () => import('../views/demo1.vue')
          },
        ],
      },
    ]
  }
]

export default asyncRoutes
