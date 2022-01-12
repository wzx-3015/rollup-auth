<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-10-12 20:32:08
 * @LastEditTime: 2022-01-12 16:58:53
 * @LastEditors: @Xin (834529118@qq.com)
-->
# 视频九宫格组件 支持flv、m3u8 基于hls.js、jessibuca.js二次开发

## flvVideo 播放FLV 视频
#### flvVideo Attributes
| 属性 | 类型 | 说明 | 默认值 | 可选值 | 是否必填 |
| --- | --- | --- | --- | --- | --- |
| url | String | 视频播放地址 |  | | true |
| autoPlay | Boolean | 视频是否自动播放。<font color="red">注：为保证视频自动播放生效，此属性为true时将会强制设置音频为静音模式</font> | false | true / false |
| config | Object | 参考通用配置项以及jessibuca配置项 |  |  |
### 使用方式
```
import { flvVideo } from 'dfsj-video'

<flvVideo :url="videoUrl" :config="{}"></flvVideo>
```
_________________
## hlsVideo 播放 m3u8 视频

#### hlsVideo Attributes
| 属性 | 类型 | 说明 | 默认值 | 可选值 | 是否必填 |
| --- | --- | --- | --- | --- | --- |
| url | String | 视频播放地址 |  | | true |
| autoPlay | Boolean | 视频是否自动播放。<font color="red">注：为保证视频自动播放生效，此属性为true时将会强制设置音频为静音模式</font> | false | true / false |
| config | Object | 参考通用配置项 <font color="red">注：hlsVideo只支持通用配置项</font> |  |  |
#### 使用方式
```
import { hlsVideo } from 'dfsj-video'

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
| autoPlay | Boolean | 视频是否自动播放。<font color="red">注：为保证视频自动播放生效，此属性为true时将会强制设置音频为静音模式</font> | false | true / false |
| config | Object | 视频组件配置项，参考通用配置项。<font color="red">注：flv视频参考详细配置</font> | null | null |


#### ScratchableLatex Methods
| 名称 | 说明 | 参数类型 | 可选值 |
| --- | --- | --- | --- | --- |
| setScratchableLatex | 设置展示视频数量 | Number | 2 / 4 / 9 |
#### 使用方式
```
import { flvVideo, ScratchableLatex, hlsVideo } from 'dfsj-video'

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
| isNotMute | Boolean | 是否开启声音 | false/不开启 | false/true |
| loadingText | String | 加载文案 | loading... |  |
| supportDblclickFullscreen | Boolean | 是否支持屏幕的双击事件，触发全屏，取消全屏事件 | false | false/true |
| operateBtns | Object | 配置操作按钮 | { play: false, audio: false, fullscreen: false, } |  |
## 使用方式
```
{
  isNotMute: true,
  loadingText: 'loading...',
  supportDblclickFullscreen: false,
  operateBtns: {
    play: true,
    audio: false,
    fullscreen: false,
  }
}
```

## flv 详细配置项  [使用jessibuca.js 作为底层的播放器 ](http://jessibuca.monibuca.com/api.html#container)

## m3u8 详细配置项 [使用hls.js 作为底层的播放器](https://colinrds.gitbooks.io/myapi/content/hlsjsapi.html)

> <font color="red">目前只支持通用配置项</font>

