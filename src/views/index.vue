<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-09-11 14:47:28
 * @LastEditTime: 2021-10-12 16:16:28
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  index测试
  <el-button @click="handleLoGout">
    退出登录
  </el-button>
</template>
<script>
import { useDStore } from '../../packages/lib/index'
export default {
  setup () {
    const dStore = useDStore()

    console.log(dStore)
    const handleLoGout = () => {
      console.log(dStore.logOut())
    }

    return {
      handleLoGout
    }
  }
}
</script>
