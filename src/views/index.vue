<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-09-11 14:47:28
 * @LastEditTime: 2022-01-14 14:46:19
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <!-- index测试
  <el-button @click="handleLoGout">
    退出登录
  </el-button> -->
  <div style="height: 900px">
    <ScratchableLatex class="video-container" :gap="4" :autoPlay="false" :defaultNum="9" :config="{ isNotMute: true, operateBtns: { play: true, audio: true, fullscreen: true } }" ref="videoContainer">
      <div>
        <!-- <flvVideo :url="videoUrl"></flvVideo> -->
        <hlsVideo :url="demoUlr"></hlsVideo>
      </div>
      <div>
        <hlsVideo @fullscreenChange="handleFullscreenChange" @audio="handleAudio" @play="handlePlay" url="http://cctvalih5ca.v.myalicdn.com/live/cctv2_2/index.m3u8"></hlsVideo>
      </div>
      <div>
        <hlsVideo url="http://cctvalih5ca.v.myalicdn.com/live/cctv3_2/index.m3u8"></hlsVideo>
      </div>
      <div>
        <hlsVideo url="http://cctvalih5ca.v.myalicdn.com/live/cctv4_2/index.m3u8"></hlsVideo>
      </div>
      <div>
        <hlsVideo url="http://cctvalih5ca.v.myalicdn.com/live/cctv5_2/index.m3u8"></hlsVideo>
      </div>
      <div>
        <hlsVideo url="http://cctvalih5ca.v.myalicdn.com/live/cctv6_2/index.m3u8"></hlsVideo>
      </div>
      <div>
        <hlsVideo url="http://cctvalih5ca.v.myalicdn.com/live/cctv7_2/index.m3u8"></hlsVideo>
      </div>
      <div>
        <hlsVideo url="http://cctvalih5ca.v.myalicdn.com/live/cctv8_2/index.m3u8">
          <button @click="handleceshi">========</button>
        </hlsVideo>
      </div>
      <!-- <div>
        <hlsVideo url="http://cctvalih5ca.v.myalicdn.com/live/cctv10_2/index.m3u8"></hlsVideo>
      </div> -->
      <div>
        <flvVideo :url="videoUrl">
          <button @click="handleceshi">========</button>
        </flvVideo>
      </div>
      <div>
        <flvVideo :url="videoUrl"></flvVideo>
      </div>
      <div>
        <flvVideo :url="videoUrl"></flvVideo>
      </div>
    </ScratchableLatex>
  </div>

  <el-button @click="handleSwitch(4)">
    4
  </el-button>
  <el-button @click="handleSwitch(2)">
    2
  </el-button>
  <el-button @click="handleSwitch(9)">
    9
  </el-button>

</template>
<script>
// import { useDStore } from '../../packages/lib/index'
import { flvVideo, ScratchableLatex, hlsVideo } from 'grid-video'
import { ref } from 'vue'

export default {
  components: { 
    flvVideo,
    hlsVideo,
    ScratchableLatex,
  },
  setup () {
    const flvVideoDemo = ref(null)
    const videoUrl = ref('http://192.168.10.142:8055/15868902d399b87.flv')
    // const dStore = useDStore()

    const videoContainer = ref(null)

    // console.log(dStore.userState.menu)
    const handleLoGout = () => {
      // console.log(dStore.logOut())
    }

    const handleSwitch = num => {
      videoContainer.value.setScratchableLatex(num)
    }

    const demoUlr = ref('http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8')


    setTimeout(() => {
      // demoUlr.value = 'http://220.161.87.62:8800/hls/0/index.m3u8'
      // videoUrl.value = 'http://192.168.10.142:8055/15868902d399b87.flv'
      console.log('setTimeout===============')
    }, 6000)

    const handleceshi = () => {
      alert('===')
    }

    const handleFullscreenChange = (status) => {
      console.log('handleFullscreenChange', status)
    }

    const handlePlay = (status) => {
      console.log('handlePlay', status)
    }

    const handleAudio = (status) => {
      console.log('handleAudio', status)
    }

    return {
      handleLoGout,
      videoUrl,
      flvVideoDemo,
      videoContainer,
      handleSwitch,
      demoUlr,
      handleceshi,
      handleFullscreenChange,
      handlePlay,
      handleAudio,
    }
  }
}
</script>
<style scoped lang="less">
.video-container {
  
}
</style>
