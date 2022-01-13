<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-09-11 14:47:28
 * @LastEditTime: 2022-01-13 09:35:13
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <!-- index测试
  <el-button @click="handleLoGout">
    退出登录
  </el-button> -->
  <div style="height: 900px">
    <ScratchableLatex class="video-container" :autoPlay="false" :defaultNum="2" :config="{ isNotMute: true, operateBtns: { play: true, audio: true, fullscreen: true } }" ref="videoContainer">
      <div>
        <!-- <flvVideo :url="videoUrl"></flvVideo> -->
        <hlsVideo url="http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8"></hlsVideo>
      </div>
      <div>
        <flvVideo :url="videoUrl"></flvVideo>
      </div>
      <div>
        <flvVideo :url="videoUrl"></flvVideo>
      </div>
      <div>
        <flvVideo :url="videoUrl"></flvVideo>
      </div>
      <div>
        <flvVideo :url="videoUrl"></flvVideo>
      </div>
      <div>
        <flvVideo :url="videoUrl"></flvVideo>
      </div>
      <div>
        <flvVideo :url="videoUrl"></flvVideo>
      </div>
      <div>
        <flvVideo :url="videoUrl"></flvVideo>
      </div>
      <div>
        <hlsVideo url="http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8"></hlsVideo>
      </div>
      <div>
        <flvVideo :url="videoUrl"></flvVideo>
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
import { flvVideo, ScratchableLatex, hlsVideo } from '@grid/video'
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

    return {
      handleLoGout,
      videoUrl,
      flvVideoDemo,
      videoContainer,
      handleSwitch,
    }
  }
}
</script>
<style scoped lang="less">
.video-container {
  
}
</style>
