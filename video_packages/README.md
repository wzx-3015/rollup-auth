<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-10-12 20:32:08
 * @LastEditTime: 2022-01-18 09:39:07
 * @LastEditors: @Xin (834529118@qq.com)
-->
# 视频九宫格组件 支持flv、m3u8 基于hls.js、jessibuca.js二次开发
>  <font color="red">flvVideo 和 hlsVideo 控制栏会存在部分差异</font>

# 依赖插件安装
### webpack
```
yarn add copy-webpack-plugin -D  // 版本号为 6.3.2

// vue.config.js 
module.exports = {
  chainWebpack (config) {
    config.plugin('copy').use(require('copy-webpack-plugin'), [
      {
        patterns: [
          {
            from: 'node_modules/grid-video/dist/jessibuca',
            to: __dirname + '/dist'
          }
        ]
      }
    ])
  },
}
```
### vite
```
yarn add rollup-plugin-copy -D

// vite.config.js 
import copy from 'rollup-plugin-copy'

plugins: [
  copy({
    targets: [
      { src: 'node_modules/grid-video/dist/jessibuca/*', dest: __dirname + '/dist'}, //执行拷贝
    ]
  })
],
```
## flvVideo 播放FLV 视频
#### flvVideo Attributes
| 属性 | 类型 | 说明 | 默认值 | 可选值 | 是否必填 |
| --- | --- | --- | --- | --- | --- |
| url | String | 视频播放地址 |  | | true |
| autoPlay | Boolean | 视频是否自动播放。<font color="red">注：为保证视频自动播放生效，此属性为true时将会强制设置音频为静音模式</font> | false | true / false |
| config | Object | 参考通用配置项以及jessibuca配置项 |  |  |
### 使用方式
```
import { flvVideo } from 'grid-video'
import 'grid-video/dist/style/index.css'

<flvVideo :url="videoUrl" :config="{}"></flvVideo>
```
_________________
## hlsVideo 播放 m3u8 视频
> 组件可嵌套元素，其元素为视频上方layer层，该层级低于控制栏层级，loading层级
#### hlsVideo Attributes
| 属性 | 类型 | 说明 | 默认值 | 可选值 | 是否必填 |
| --- | --- | --- | --- | --- | --- |
| url | String | 视频播放地址 |  | | true |
| autoPlay | Boolean | 视频是否自动播放。<font color="red">注：为保证视频自动播放生效，此属性为true时将会强制设置音频为静音模式</font> | false | true / false |
| config | Object | 参考通用配置项 <font color="red">注：hlsVideo只支持通用配置项</font> |  |  |
#### 使用方式
```
import { hlsVideo } from 'grid-video'
import 'grid-video/dist/style/index.css'

<hlsVideo url="http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8"></hlsVideo>
```
_________________

## 九宫格 ScratchableLatex组件
>1. ScratchableLatex 实现配合visibility: hidden; display: none; <font color="red">注：因jessibuca.js 采用webGL 绘制，频繁创建多个实例会导致最先创建的几个webGL 实例丢失，视频无法播放</font>
>2. ScratchableLatex 播放MP4 等其他视频格式请自行嵌套处理，组件会进行九宫格元素的切换隐藏
>3. <font color="red">当使用ScratchableLatex 其所有相同的配置项优先级高于内部组件配置项，且所有子级视频组件均采用此配置项</font>
#### ScratchableLatex Attributes
| 属性 | 类型 | 说明 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| defaultNum | Number | 默认展示视频数量 | 9 | 2 / 4 / 9 |
| gap | Number | 元素间隔 | 2 | Number |
| autoPlay | Boolean | 视频是否自动播放。<font color="red">注：为保证视频自动播放生效，此属性为true时将会强制设置音频为静音模式</font> | false | true / false |
| config | Object | 视频组件配置项，参考通用配置项。<font color="red">注：flv视频参考详细配置</font> | null | null |


#### ScratchableLatex Methods
| 名称 | 说明 | 参数类型 | 可选值 |
| --- | --- | --- | --- |
| setScratchableLatex | 设置展示视频数量 | Number | 2 / 4 / 9 |
#### 使用方式
```
import { flvVideo, ScratchableLatex, hlsVideo } from 'grid-video'
import 'grid-video/dist/style/index.css'

<ScratchableLatex class="video-container" :autoPlay="false" :defaultNum="2" :config="{}" ref="videoContainer">
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
```

## 通用配置项

| 属性 | 类型 | 说明 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| isNotMute | Boolean | 是否开启声音 | false/关闭 | false/true |
| loadingText | String | 加载文案 | loading... |  |
| supportDblclickFullscreen | Boolean | 是否支持屏幕的双击事件，触发全屏，取消全屏事件 | false | false/true |
| operateBtns | Object | 配置操作按钮 | { play: false, audio: false, fullscreen: false, } |  |
## 使用方式
```
{
  isNotMute: false,
  loadingText: 'loading...',
  supportDblclickFullscreen: false,
  operateBtns: {
    play: false,
    audio: false,
    fullscreen: false,
  }
}
```

## flv 详细配置项  [使用jessibuca.js 作为底层的播放器 ](http://jessibuca.monibuca.com/api.html#container)

## m3u8 详细配置项 [使用hls.js 作为底层的播放器](https://colinrds.gitbooks.io/myapi/content/hlsjsapi.html)

> <font color="red">目前只支持通用配置项</font>

