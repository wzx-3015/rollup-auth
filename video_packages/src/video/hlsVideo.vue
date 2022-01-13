<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-10 15:54:58
 * @LastEditTime: 2022-01-13 09:45:07
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="video-container" @dblclick="handleHslDbclick" ref="hlsVideoFullScreenEl">
    <div class="video--play--loading" v-if="videoStatus.loading || videoStatus.centerPlay">
      <div class="loading-container" v-show="videoStatus.loading" @dblclick="event => event.stopPropagation()">
        <span ><i class="iconfont icon-loading1"></i></span>
        <p>{{ loadingText }}</p>
      </div>

      <div class="video--play--btn" @dblclick="event => event.stopPropagation()" v-show="videoStatus.centerPlay">
        <i class="iconfont icon-bofang" @click="handleClickVideoPlay"></i>
      </div>
    </div>
    <div class="video--controls--container" v-if="controlsBtnShow.show">
      <div class="play--btn" v-show="controlsBtnShow.play" @dblclick="event => event.stopPropagation()">
        <i class="iconfont" :class="[videoStatus.play ? 'icon-zanting' : 'icon-bofang1']" @click="handleClickVideoPlay"></i>
      </div>
      <div class="progress--bar"></div>

      <div class="audio--btn" v-show="controlsBtnShow.audio" @dblclick="event => event.stopPropagation()">
        <i class="iconfont" @click="handleMutedClick" :class="[!videoStatus.muted ? 'icon-jingyin' : 'icon-shengyin']"></i>
      </div>
      <div class="screenshot--btn" v-show="controlsBtnShow.fullscreen" @dblclick="event => event.stopPropagation()">
        <i class="iconfont" @click="handleFullScreenClick" :class="[videoStatus.fullscreen ? 'icon-tuichuquanping' :'icon-quanping']"></i>
      </div>
    </div>

    <div class="slot-canvas-layer" v-if="slotContainerShow">
      <slot />
    </div>

    <video class="hls-video-el" :muted="!videoStatus.muted" ref="hlsVideoEl"></video>
  </div>
</template>
<script>
import Hls from 'hls.js'
import { ref, onMounted, onUnmounted, inject, reactive, watchEffect } from 'vue'
import { launchFullscreen, exitFullscreen } from '../utils/index'
import { getDefaultConfig } from '../utils/config'
import { scratchableLatexData } from '../injectKey'
import { merge } from 'lodash-es'
import emitter from '../emitter/index'

export default {
  name: 'hlsVideo',
  props: {
    url: {
      type: String,
      required: true,
    },
    config: {
      type: Object,
      default: () => getDefaultConfig()
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
  },
  setup(props, { slots }) {
    const parentData = inject(scratchableLatexData)
    const slotContainerShow = ref(slots.default && slots.default().length ? true : false)
    const videoConfig = merge(getDefaultConfig(), props.config, { autoPlay: props.autoPlay }, parentData || {})

    if (videoConfig.autoPlay) {
      videoConfig.isNotMute = false
    }

    const { play: platBtn, audio: audioBtn, fullscreen: fullscreenBtn} = videoConfig.operateBtns

    // video 控制台按钮状态
    const controlsBtnShow = reactive({
      play: videoConfig.operateBtns.play,
      audio: videoConfig.operateBtns.audio,
      fullscreen: videoConfig.operateBtns.fullscreen,
      show: platBtn || audioBtn || fullscreenBtn,
    })

    // video 状态
    const videoStatus = reactive({
      play: false,
      muted: videoConfig.isNotMute,
      fullscreen: false,
      loading: false,
      centerPlay: false
    })

    const hlsVideoEl = ref(null)
    const hlsVideoFullScreenEl = ref(null)

    let stopVideo = false
    let videoShow = true

    /**
     * @description: 主动触发video事件处理
     * @param {*}
     * @return {*}
     */    
    const videoClick = {
      play: () => {
        if (!props.url || !videoShow) {
          return
        }
        
        hlsVideoEl.value.play();
      },
      pause: () => {
        hlsVideoEl.value.pause();
      },
      destroy: () => {
        videoStatus.centerPlay = false
        hls && hls.destroy()
        hls = null
      }
    }

    /**
     * @description: addEventListener监听video事件处理
     * @param {*}
     * @return {*}
     */    
    const videoLinstener = {
      play: () => {
        if (stopVideo) {
          hls.startLoad()
        }

        stopVideo = false
        videoStatus.centerPlay = false
        videoStatus.play = true
      },
      pause: () => {
        hls.stopLoad()
        stopVideo = true
        videoStatus.centerPlay = true
        videoStatus.play = false
      },
      ended: () => {
        videoStatus.centerPlay = true
        videoStatus.play = false
        stopVideo = false
      },
      loadedmetadata: () => {
        videoStatus.loading = false;

        if (!videoStatus.play && !videoConfig.autoPlay) {
          videoStatus.centerPlay = true
        } else {
          videoStatus.centerPlay = false
        }
      },
      loadstart: () => {
        videoStatus.loading = true;
      },
      canplay: () => {
        console.log('canplay')
      },
      waiting: () => {
        console.log('waiting')
      },
      stalled: () => {
        console.log(stalled)
      }
    }

    const isDOMShow = () => {
      const style = window.getComputedStyle(hlsVideoEl.value)

      return style.visibility === 'visible'
    }

    const emitterEvent = {
      handleVideoShow: () => {
        videoShow = isDOMShow()

        if (videoShow && !hls) {
          initHlsVideo(props.url)
        }

        if (!videoShow) {
          videoClick.destroy()
        }
      }
    }

    /**
     * @description: 加载事件
     * @param {*}
     * @return {*}
     */    
    const handAddEventLinstener = el => {
      Object.entries(videoLinstener).forEach(([ eventName, evnetF ]) => {
        el.addEventListener(eventName, evnetF)
      })
    }

    /**
     * @description: 卸载事件
     * @param {*}
     * @return {*}
     */    
    const handleReomveEventLinstener = el => {
      Object.entries(videoLinstener).forEach(([ eventName, evnetF ]) => {
        el.removeEventListener(eventName, evnetF)
      })
    }

    let hls = null
    const initHlsVideo = url => {
      return new Promise((resolve, reject) => {
        if (Hls.isSupported()) {
          hls = new Hls({
            // maxBufferLength: 10,
            // maxBufferSize: 20 * 1000 * 1000,
            // maxLoadingDelay: 2,
            // maxMaxBufferLength: 10,
            // maxBufferSize: 10*1000*1000,
          })
  
          hls.attachMedia(hlsVideoEl.value)
  
          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            hls.loadSource(url)
          })
  
          // 播放异常事件
          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              switch(data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR: // 网络异常
              // try to recover network error
                console.log("fatal network error encountered, try to recover");
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log("fatal media error encountered, try to recover");
                hls.recoverMediaError();
                break;
              default:
              // cannot recover
                videoClick.destroy()
                break;
              }
            }
          });

          handAddEventLinstener(hlsVideoEl.value)
  
          videoConfig.autoPlay && videoClick.play();

          resolve(Hls)
        }
      })
    }

    const fullscreenchange = () => {
      if (document.fullscreenElement) {
        videoStatus.fullscreen = true
      } else {
        videoStatus.fullscreen = false
      }
    }

    onMounted(() => {
      watchEffect(() => {
        if (hls) {
          videoClick.destroy()
        }
        if (isDOMShow()) {
          initHlsVideo(props.url)
        }
      })

      hlsVideoFullScreenEl.value.addEventListener('fullscreenchange', fullscreenchange)

      emitter.on('videShow', emitterEvent.handleVideoShow)
    })

    onUnmounted(() => {
      videoClick.destroy()
      handleReomveEventLinstener(hlsVideoEl.value)
      hlsVideoFullScreenEl.value.removeEventListener('fullscreenchange', fullscreenchange)
      emitter.off('videShow', emitterEvent.handleVideoShow)
    }) 

    /**
     * @description: 视频播放按钮点击事件
     * @param {*}
     * @return {*}
     */    
    const handleClickVideoPlay = () => {
      if (videoStatus.play) {
        videoClick.pause()
      } else {
        videoClick.play()
      }
    }

    /**
     * @description: 音频按钮点击事件
     * @param {*}
     * @return {*}
     */  
    const handleMutedClick = () => {
      videoStatus.muted = !videoStatus.muted
    }

    /**
     * @description: 全屏按钮点击事件
     * @param {*}
     * @return {*}
     */
    const handleFullScreenClick = () => {
      if (!videoStatus.fullscreen) {
        launchFullscreen(hlsVideoFullScreenEl.value)
      } else {
        exitFullscreen()
      }
    }

    /**
     * @description: 双击事件
     * @param {*}
     * @return {*}
     */    
    const handleHslDbclick = () => {
      if (videoConfig.supportDblclickFullscreen) {
        handleFullScreenClick()
      }
    }

    return {
      hlsVideoEl,
      loadingText: videoConfig.loadingText,
      controlsBtnShow,
      slotContainerShow,
      hlsVideoFullScreenEl,
      videoStatus,
      handleFullScreenClick,
      handleHslDbclick,
      handleClickVideoPlay,
      handleMutedClick,
    }
  },
}
</script>
<style>
@keyframes loading {
  from{transform:rotate(0deg);}
  to{transform:rotate(360deg);}
}
</style>
<style scoped lang="less">
.icon__btn () {
  cursor: pointer;
  color: fade(#fff, 70%);
  &:hover {
    color: #fff;
  }

  &:active {
    color: fade(#fff, 70%);
  }
}

.video-container {
  width: 100%;
  height: 100%;
  background-color: #000;
  position: relative;

  .video--play--loading {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: fade(#000, 10%);

    .loading-container,
    .video--play--btn{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: fade(#fff, 70%);
      i.iconfont {
        display: inline-block;
        font-size: 60px;
      }
    }

    .loading-container {
      i {
        animation: 1s linear 0s infinite loading;
      }
    }

    .video--play--btn {
      i {
        cursor: pointer;
      }
    }
  }

  .video--controls--container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background-color: fade(#000, 40%);
    box-sizing: border-box;
    padding: 0 10px;
    color: fade(#fff, 70%);
    display: flex;
    align-items: center;
    z-index: 3;

    > div{
      flex-basis: 26px;
      text-align: center;
    }

    .progress--bar {
      flex-grow: 1;
    }

    i.iconfont {
      font-size: 18px;
      .icon__btn();
    }
  }

  .slot-canvas-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .hls-video-el {
    width: 100%;
    height: 100%;
  }
}
</style>
