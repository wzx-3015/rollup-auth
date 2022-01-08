<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-05 13:56:53
 * @LastEditTime: 2022-01-08 11:23:25
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
import { loadJessibuca } from '../utils/index'
import { scratchableLatexData } from '../injectKey'
import { validatorJessibucaConfig } from '../utils/config'
import emitter from '../emitter/index'

export default {
  name: 'video-container',
  props: {
    url: {
      type: String,
      required: true,
    },
    jessibucaConfig: {
      type: Object,
      default: () => {},
    },
    show: {
      type: Boolean,
      default: true,
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

    let videoShow = true

    /**
     * @description: 初始化config配置
     * @param {*}
     * @return {*}
     */    
    const initConfig = () => {
      if (parentData) {
        return parentData
      }

      return {
        jessibucaConfig,
        autoPlay
      }
    }

    const { autoPlay, jessibucaConfig } = initConfig()

    console.log('========jessibucaConfig', jessibucaConfig)

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
        loadingText: "加载中...",
        isFlv: true,
        debug: false,
        videoBuffer: 0.2,
        loadingTimeout: 40,
        useWCS: true,
        decoder: './jessibuca/decoder.js',
        isNotMute: false,
        supportDblclickFullscreen: true,
        operateBtns: {
          play: false,
          audio: false,
          fullscreen : false,
        },
        ...validatorJessibucaConfig(jessibucaConfig)
      })

      onePlayShow.value = !autoPlay

      jessibuca.on('load', () => {
        autoPlay && handleVideoPlay(props.url)
      })

      jessibuca.on('play', () => {
        console.log('play')
      })

      jessibuca.on('error', data => {
        // play 按钮不存在
        if (!jessibucaConfig.operateBtns || !jessibucaConfig.operateBtns.play) {
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

    /**
     * @description: 播放
     * @param {*}
     * @return {*}
     */
    const handleVideoPlay = url => {
      if (!jessibuca || !videoShow) {
        return
      }

      onePlayShow.value = false
      jessibuca.play(url || props.url)
    }

    watchEffect(() => {
      handleVideoPlay(props.url)
    })

    const handleVideoResize = () => {
      jessibuca && jessibuca.resize()
    }

    /**
     * @description: 控制video出现隐藏
     * @param {*}
     * @return {*}
     */  
    const handleVideoShow = () => {
      const style = window.getComputedStyle(flvVideoEl.value)

      videoShow = style.visibility === 'visible'

      if (!videoShow && jessibuca && jessibuca.isPlaying()) {
        jessibuca.close()
      }

      if(videoShow && autoPlay && jessibuca && !jessibuca.isPlaying()) {
        handleVideoPlay(props.url)
      }
    }

    onMounted(() => {
      loadJessibuca().then(() => {
        initFlvVideo()
      })
    })

    onUnmounted(() => {
      jessibuca.destroy()
      jessibuca = null
      jessibucaExample.value = null

      emitter.off('videoResize', handleVideoResize)
      emitter.off('videShow', handleVideoShow)
    })

    if (parentData) {
      emitter.on('videoResize', handleVideoResize)
      emitter.on('videShow', handleVideoShow)
    }

    return {
      flvVideoEl,
      jessibuca: jessibucaExample,
      videoClass,
      handleVideoResize,
      slotContainerShow,
      onePlayShow,
      handleVideoPlay,
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
    background: fade(red, 10%);
    color: #fff;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .one-play {
    width: 60px;
    height: 60px;
    color: #fff;
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
