<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-09-11 14:47:28
 * @LastEditTime: 2022-01-05 09:53:24
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  demo01
  <el-button v-hasPermi="['PUT']">测试权限</el-button>
  <flvVideo></flvVideo>
</template>

<script>
import { flvVideo } from '../../video_packages/lib/index'

export default {
  component: {
    flvVideo,
  },
  setup () {
    
  }
}
</script>
