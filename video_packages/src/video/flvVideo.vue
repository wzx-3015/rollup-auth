<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-05 13:56:53
 * @LastEditTime: 2022-01-13 11:20:53
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="flv-video-container" :class="videoClass">
    <div ref="flvVideoEl" class="flv-video-el">
      <div class="slot-canvas-layer" v-if="slotContainerShow">
        <slot />
      </div>

      <div class="one-play" v-if="onePlayShow" @click="handleVideoPlay()">
        <i class="iconfont icon-bofang"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, nextTick, watchEffect, computed, onUnmounted, onMounted, inject } from 'vue'
import { loadJessibuca, isDOMVisible, handleEmitterEvent, handleDOMEventLinsteners } from '../utils/index'
import { scratchableLatexData } from '../injectKey'
import { validatorJessibucaConfig, getDefaultConfig } from '../utils/config'
import jessibucaUrl from '../static/jessibuca/jessibuca.js'
import decoderUrl from '../static/jessibuca/decoder.js'
import { merge, throttle } from 'lodash-es'

export default {
  name: 'flvVideo',
  props: {
    url: {
      type: String,
      required: true,
    },
    config: {
      type: Object,
      default: () => {},
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  expose: ['jessibuca', 'handleVideoResize'],
  setup (props, { slots }) {
    const slotContainerShow = ref(slots.default && slots.default().length ? true : false)
    const onePlayShow = ref(false)
    const jessibucaExample = ref(null)
    let jessibuca = null

    const parentData = inject(scratchableLatexData)

    const flvVideoEl = ref(null)

    let videoShowStatus = true
    
    const videoConfig = merge(props.config, { autoPlay: props.autoPlay }, parentData || {})

    if (videoConfig.autoPlay) {
      videoConfig.isNotMute = false
    }

    const { autoPlay } = videoConfig

    /**
     * @description: 处理video class
     * @param {*}
     * @return {*}
     */
    const videoClass = computed(() => {
      const classTem = []

      if (parentData) {
        classTem.push('flex--video--item')
      }

      return classTem
    })

    /**
     * @description: 校验DOM
     * @param {*} el
     * @return {*}
     */    
    const isVideoEl = async el => {
      if (el) {
        return el
      }

      await nextTick()
      return el
    }

    /**
     * @description: 主动触发video事件处理
     * @param {*}
     * @return {*}
     */    
    const videoClick = {
      play: url => {
        console.log(videoShowStatus)
        if (!jessibuca || !videoShowStatus) {
          return
        }

        onePlayShow.value = false
        jessibuca.play(url || props.url)
      },
      pause: () => {
        jessibuca.close()
      },
      destroy: () => {
        jessibuca.destroy()
        jessibuca = null
      }
    }

    const initFlvVideo = async () => {
      const el = await isVideoEl(flvVideoEl.value)

      if (!el) {
        return
      }

      if (!props.url) {
        return
      }

      jessibucaExample.value = jessibuca = new window.Jessibuca({
        container: el,
        isFlv: true,
        debug: false,
        videoBuffer: 0.2,
        loadingTimeout: 40,
        useWCS: true,
        decoder: decoderUrl,
        ...getDefaultConfig(),
        ...validatorJessibucaConfig(videoConfig)
      })

      onePlayShow.value = !autoPlay

      jessibuca.on('load', () => {
        autoPlay && videoClick.play(props.url)
      })

      jessibuca.on('play', () => {
        console.log('play')
      })

      jessibuca.on('error', data => {
        // play 按钮不存在
        if (!videoConfig.operateBtns || !videoConfig.operateBtns.play) {
          onePlayShow.value = true
        }
      })

      jessibuca.on('timeout',function(data){
        console.log(data)
      });

      jessibuca.on('videoInfo', videoInfo => {
        console.log(videoInfo)
      })
    }

    const emitterEvent = {
      videoResize: () => {
        jessibuca && jessibuca.resize()
      },
      videoShow: () => {
        videoShowStatus = isDOMVisible(flvVideoEl)

        if (!videoShowStatus && jessibuca && jessibuca.isPlaying()) {
          videoClick.pause()
        }

        if(videoShowStatus && autoPlay && jessibuca && !jessibuca.isPlaying()) {
          videoClick.play(props.url)
        }
      }
    }

    const windowLinstener = {
      resize: throttle(() => {
        emitterEvent.videoResize()
      }, 800)
    }

    const windowEventLinstener = handleDOMEventLinsteners(windowLinstener)

    watchEffect(() => {
      if (jessibuca && jessibuca.isPlaying) {
        videoClick.play(props.url)
      }
    })

    onMounted(() => {

      windowEventLinstener.on()
      loadJessibuca(jessibucaUrl).then(() => {
        initFlvVideo()
      })
    })

    const emitterEventLinstener = handleEmitterEvent(emitterEvent)

    onUnmounted(() => {
      videoClick.destroy()
      jessibucaExample.value = null
      windowEventLinstener.off()
      emitterEventLinstener.off()
    })

    if (parentData) {
      emitterEventLinstener.on()
    }

    return {
      flvVideoEl,
      jessibuca: jessibucaExample,
      videoClass,
      handleVideoResize: emitterEvent.videoResize,
      slotContainerShow,
      onePlayShow,
      handleVideoPlay: videoClick.play,
    }
  }
}
</script>
<style lang="less" scoped>
.flv-video-container {
  box-sizing: border-box;
  background-color: #000;
  user-select: none;
  width: 100%;
  height: 100%;
  display: inherit;

  ::v-deep(.jessibuca-play-big) {
    z-index: 5;
  }
}
.flv-video-el {
  width: 100%;
  height: 100%;
  position: relative;

  .slot-canvas-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .one-play {
    width: 60px;
    height: 60px;
    color: fade(#fff, 70%);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 5;
    .iconfont {
      font-size: 60px;
    }
  }

  .flv-video-controls {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    background: fade(#000, 30%);
    color: #fff;
    z-index: 3;
    opacity: 0;
    height: 0;
    transition: all 0.2s;
    overflow: hidden;
  }

  &:hover {
    .flv-video-controls {
    }
  }
}
</style>
