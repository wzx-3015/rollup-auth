/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-09-11 13:52:00
 * @LastEditTime: 2021-10-12 15:52:00
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { useDStore } from './userStore/index'
import dfsjUnifyAuth from './permission'

const dfsjAuthSelfPermission = () => {
  console.log(`[dfsj-auth-module]:「接入自有权限管理系统」`)
}

export {
  dfsjUnifyAuth,
  dfsjAuthSelfPermission,
  useDStore
}
