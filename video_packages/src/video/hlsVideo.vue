<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-10 15:54:58
 * @LastEditTime: 2022-01-11 18:04:16
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="video-container">
    <div class="video--play--loading" v-show="videLoading || playBtnShow">
      <div class="loading-container" v-show="videLoading">
        <span><i class="iconfont icon-loading1"></i></span>
        <p>{{ loadingText }}</p>
      </div>

      <div class="video--play--btn" v-show="playBtnShow">
        <i class="iconfont icon-bofang"></i>
      </div>
    </div>
    <div class="video--controls--container" v-if="videoControlsShow">
      <div class="play--btn">
        <i class="iconfont icon-bofang1"></i>
      </div>
      <div class="progress--bar"></div>

      <div class="audio--btn"></div>
      <div class="screenshot--btn">
        <i class="iconfont icon-quanping"></i>
      </div>
    </div>

    <div class="slot-canvas-layer" v-if="slotContainerShow">

    </div>

    <video class="hls-video-el" :muted="!autoPlay" ref="hlsVideoEl"></video>
  </div>
</template>
<script>
import Hls from 'hls.js'
import { ref, onMounted, computed } from 'vue'

export default {
  name: 'hlsVideo',
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
    },
    loadingText: {
      type: String,
      default: "loading..."
    },
    operateBtns: {
      type: Object,
      default: () => {
        return {
          play: true,
          audio: false,
          screenshot: false,
        }
      },
    }
  },
  setup(props, { slots }) {
    const slotContainerShow = ref(slots.default && slots.default().length ? true : false)
    const hlsVideoEl = ref(null)

    const videLoading = ref(false)
    const playBtnShow = ref(false)

    const videoControlsShow = computed(() => {
      const { play, audio, screenshot } = props.operateBtns

      return play || audio || screenshot
    })

    let hls = null

    const initHlsVideo = () => {
      if (Hls.isSupported()) {
        hls = new Hls()


        hls.attachMedia(hlsVideoEl.value)

        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          hls.loadSource('http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8')

          console.log("video and hls.js are now bound together !");
        })

        hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          conosle.log(event)
          console.log("manifest loaded, found " + data.levels.length + " quality level");
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          // console.log('event', event)
          // console.log('data', data)
        });

        props.autoPlay && hlsVideoEl.value.play();
      }
    }

    onMounted(() => {
      initHlsVideo()
    })

    return {
      hlsVideoEl,
      videLoading,
      playBtnShow,
      videoControlsShow,
      slotContainerShow,
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
      flex-basis: 20px;
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
