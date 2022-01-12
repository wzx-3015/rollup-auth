/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-05 09:39:04
 * @LastEditTime: 2022-01-12 16:52:56
 * @LastEditors: @Xin (834529118@qq.com)
 */
import flvVideo from './video/flvVideo.vue';
import hlsVideo from './video/hlsVideo.vue';
import ScratchableLatex from './ScratchableLatex/index.vue';
import './static/fonts/iconfont.less'

export {
  flvVideo,
  hlsVideo,
  ScratchableLatex,
}

const install = app => {
  app.component(flvVideo.name, flvVideo)
  app.component(hlsVideo.name, hlsVideo)
  app.component(ScratchableLatex.name, ScratchableLatex)
}

export default {
  install,
  version: '0.0.1',
}
