<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-03-01 09:44:26
 * @LastEditTime: 2021-10-12 09:52:36
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="exception404">
    <div class="exception404-content">
      <img class="img" draggable="false" src="./assets/404.png" alt="" />
      <p class="title">404! 出错啦!</p>
      <p class="two-title">您访问的页面已离开了地球</p>
    </div>
  </div>
</template>
<script>
import { onBeforeUnmount, onMounted } from 'vue'
export default {
  name: 'Exception404',
  setup() {
    onMounted(() => {
      const app = document.querySelector('#app') || document.body
      

      onBeforeUnmount(() => {
        app.style.overflowY = 'hidden'
        app.style.height = '100vh'
      })
    })
  },
}
</script>
<style scoped lang="less">
.exception404 {
  margin: 0;
  padding: 0;
  text-align: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  .exception404-content {
    width: 299px;
    height: 320px;
    color: #12aef1;
    text-align: center;
    .img {
      max-width: 299px;
      max-height: 308px;
    }
    .title {
      font-weight: 700;
      font-size: 24px;
      letter-spacing: 2px;
    }
    .two-title {
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
</style>
