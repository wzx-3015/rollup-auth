<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-05 13:56:53
 * @LastEditTime: 2022-01-05 16:27:31
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="flv-video-container">
    <div></div>
    <video ref="flvVideoEl" autoPlay="autoPlay" muted="false" controls class="flv-video-el"></video>
  </div>

  <button @click="handleClick">asdsa</button>
</template>
<script>
import flvjs from 'flv.js'
import { ref, nextTick, watchEffect } from 'vue'

export default {
  props: {
    url: {
      type: String,
      required: true,
    }
  },
  setup (props) {
    const flvVideoEl = ref(null)
    let flvPlayer = null

    const isVideEl = async el => {
      if (el) {
        return el
      }

      await nextTick()
      return el
    }

    const initFlvVide = async url => {
      const el = await isVideEl(flvVideoEl.value)

      if (!el) {
        return
      }

      if (!props.url && flvPlayer) {
        flvPlayer.unload()
        return
      }

      flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        hasAudio: true,
        hasVideo: true,
        url: url,
      })

      flvPlayer.attachMediaElement(el)

      flvPlayer.load()

      flvPlayer.on(flvjs.Events.LOADING_COMPLETE, () => {
        flvPlayer.play()
      })

      flvPlayer.on(flvjs.Events.STATISTICS_INFO, res => {
        console.log('STATISTICS_INFO', res)
      })

      console.log(flvPlayer)
    }

    if (flvjs.isSupported()) {
      watchEffect(() => {
        initFlvVide(props.url)
      })
    } else {
      console.warn('flvjs 不支持')
    }

    const handleClick = () => {
      flvPlayer && flvPlayer.play()
    }


    return {
      flvVideoEl,
      handleClick,
    }
  }
}
</script>
<style lang="less" scoped>
.flv-video-el {
  height: 400px;
  width: 400px;
}
</style>
