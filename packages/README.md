<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-10-12 20:32:08
 * @LastEditTime: 2021-10-13 18:08:05
 * @LastEditors: @Xin (834529118@qq.com)
-->
# 使用方式

## 权限校验npm包引入
~~~
import { dfsjUnifyAuth } from 'dfsj-auth'

app.use(dfsjUnifyAuth, {
  systemName: '系统名称',
  loginAuth: true, 系统鉴权默认为true Boolean
  asyncRoutes: [], 异步加载路由
  loginPath: '', 登录跳转地址（必填）
})
~~~

## 获取用户信息
~~~
import { useDStore } from 'dfsj-auth'
获取用户信息：DStore.userState
退出登录：DStore.logOut() 返回Promise
~~~

