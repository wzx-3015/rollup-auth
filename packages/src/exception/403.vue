<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-09-06 17:53:11
 * @LastEditTime: 2021-10-20 10:00:12
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="exception403">
    <div class="exception403-content">
      <img class="img" draggable="false" src="./assets/403.png" alt="" />
      <template v-if="loginAuth">
        <p class="title">403 {{ tipData.text }}</p>
        <el-button type="primary" size="medium" @click="handleLogin">
          {{ tipData.btnText }}
        </el-button>
      </template>
      <template v-else>
        <p class="title">403</p>
      </template>
    </div>
  </div>
</template>
<script>
// import { openLoginPage } from '@/utils/index'
import { computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { authPropsInjectKey } from '../injectKey'
import { openLoginPage, localStorageReomveLoginToken, localStorageGetLoginToken } from '../utils/index'

export default {
  setup() {
    const router = useRouter()

    const authProps = inject(authPropsInjectKey)

    const tipData = computed(() => {
      if (localStorageGetLoginToken()) {
        return {
          text: '请配置权限!',
          btnText: '返回',
          back: true,
        }
      }

      return {
        text: '请登录!',
        btnText: '登录',
      }
    })

    const handleLogin = () => {
      const { systemName, loginPath } = authProps
      if (tipData.value.back) {
        router.back()
      } else {
        localStorageReomveLoginToken()
        const url = window.location.href.replace('403', '')
        openLoginPage({ loginPath, systemName, url })
      }
    }

    return {
      loginAuth: authProps.loginAuth,
      handleLogin,
      tipData,
      localStorageGetLoginToken,
    }
  },
}
</script>
<style lang="less">
.exception403 {
  margin: 0;
  padding: 0;
  text-align: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  .exception403-content {
    min-width: 299px;
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
      margin-bottom: 14px;
    }
    .two-title {
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
</style>
